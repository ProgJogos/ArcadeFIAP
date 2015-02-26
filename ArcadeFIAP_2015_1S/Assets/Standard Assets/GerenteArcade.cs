using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Diagnostics;
using System;
using System.IO;

public enum EEtapa
{
	MENU_JOGOS,
	JOGO,
	VOTACAO
}

public class GerenteArcade : MonoBehaviour
{
	public Capa prefabCapa;

	public List<Capa> jogos;
	public bool ativo;
	public float transicao = 0.35f;
	public GoEaseType easing = GoEaseType.CubicInOut;
	
	private Renderer fade;
	private Canvas canvasVotacao;
	private Canvas canvasInstrucoes;
	
	public bool primeiroFrame;
	public bool temMenu = false;
	
	public static EEtapa etapa = EEtapa.JOGO;
	public static float timerJogo;
	public bool votacaoPermitida = false;
	public static int indJogo = -1;
	
	void Awake ()
	{
		Config.CarregarJogos ();
		Application.runInBackground = true;
		Screen.fullScreen = true;
		Screen.showCursor = false;
		etapa = EEtapa.MENU_JOGOS;
		primeiroFrame = true;
		jogos = new List<Capa> ();
		for (int i= 0; i < Config.jogos.Count; i++) {
			Capa novoJogo = Instantiate (prefabCapa, 
                new Vector3 (30 * i, 0, 0), Quaternion.Euler (0, -20, 0)) as Capa;
			StartCoroutine (CarregarCapa (novoJogo, i));
			jogos.Add (novoJogo);
		}
		jogos = jogos.OrderBy (r => r.ordem).ToList ();
		fade = GameObject.Find ("Fade").renderer;
		fade.material.color = Color.black;
		canvasInstrucoes = GameObject.Find ("CanvasInstrucoes").GetComponent<Canvas> ();
		canvasInstrucoes.enabled = false;
		canvasVotacao = GameObject.Find ("CanvasVotacao").GetComponent<Canvas> ();
		canvasVotacao.enabled = false;
		if (indJogo < 0)
			indJogo = UnityEngine.Random.Range (0, jogos.Count);
		Camera.main.transform.position = new Vector3 (
			jogos [indJogo].transform.position.x, 
			Camera.main.transform.position.y, 
			Camera.main.transform.position.z);
		Go.to (fade, transicao * 2, new GoTweenConfig ()
		       .materialColor (Color.clear)
		       .onComplete (f => {
			ativo = true;
			canvasInstrucoes.enabled = true;
		}));
	}
	
	void Update ()
	{
		//zerar metricas
		if (Input.GetKey (KeyCode.F1) && Input.GetKey (KeyCode.F2) && !Metricas.zerado) {
			UnityEngine.Debug.Log ("ZERAR!");
			Metricas.Zerar ();
		}
		switch (etapa) {
			
		case EEtapa.VOTACAO:
			if (primeiroFrame) {
				primeiroFrame = false;
				votacaoPermitida = false;
				canvasVotacao.enabled = true;
				canvasVotacao.transform.localScale = Vector3.one;
				fade.material.color = Color.black;
				Go.from (canvasVotacao.transform, transicao / 2, new GoTweenConfig ()
				         .scale (0.001f)
				         .setEaseType (GoEaseType.BackInOut));
			}
			
			canvasInstrucoes.enabled = false;
			if (ArcadeFIAP.ApertouBotao (1, EBotao.A)) {
				//UnityEngine.Debug.Log ("Voto positivo");
				InfoJogo.infos [jogos [indJogo].nomeJogo].partidas++;
				InfoJogo.infos [jogos [indJogo].nomeJogo].votosPositivos++;
				Metricas.SalvarLista ();
				Go.to (canvasVotacao.transform, transicao / 3, new GoTweenConfig ()
					.scale (0.001f)
					.setEaseType (GoEaseType.BackIn)
					.onComplete (f => {
					ativo = true;
					etapa = EEtapa.MENU_JOGOS;
					primeiroFrame = true;
					Application.LoadLevel ("MenuArcade");
				}));
				
			}
			// voto negativo
			if (ArcadeFIAP.ApertouBotao (1, EBotao.B)) {
				//UnityEngine.Debug.Log ("Voto negativo");
				InfoJogo.infos [jogos [indJogo].nomeJogo].partidas++;
				InfoJogo.infos [jogos [indJogo].nomeJogo].votosNegativos++;
				Metricas.SalvarLista ();
				Go.to (canvasVotacao.transform, transicao / 3, new GoTweenConfig ()
				       .scale (0.001f)
				       .setEaseType (GoEaseType.BackIn)
				       .onComplete (f => {
					ativo = true;
					etapa = EEtapa.MENU_JOGOS;
					primeiroFrame = true;
					Application.LoadLevel ("MenuArcade");
				}));
				
			}
			break;
		
		case EEtapa.MENU_JOGOS: 
			if (primeiroFrame) {
				primeiroFrame = false;
				fade.material.color = Color.black;
				canvasVotacao.enabled = false;
				Camera.main.transform.position = new Vector3 (
					jogos [indJogo].transform.position.x, 
                    Camera.main.transform.position.y, 
                    Camera.main.transform.position.z);
				Go.to (fade, transicao * 2, new GoTweenConfig ()
				       .materialColor (Color.clear)
				       .onComplete (f => {
					ativo = true;
					canvasInstrucoes.enabled = true;
				}));
			}
			// se eh o menu normal
			if (ativo) {
				canvasInstrucoes.enabled = true;
				// entrar em jogo
				if (ArcadeFIAP.ApertouBotao (1, EBotao.START)) {
					ativo = false;
					Go.to (jogos [indJogo].transform, transicao * 2, new GoTweenConfig ()
					       .scale (1f)
					       .setEaseType (GoEaseType.QuadIn)
					       .onComplete (f => {
						CarregarJogo ();
					}));
					canvasInstrucoes.enabled = false;
					Go.to (fade, transicao * 2 * 0.6f, new GoTweenConfig ()
					       .materialColor (Color.black));
					return;
				}	
				// trocar de jogo
				if (ArcadeFIAP.Eixo (1, EEixo.HORIZONTAL) != 0) {
					ativo = false;
					if (ArcadeFIAP.Eixo (1, EEixo.HORIZONTAL) > 0) {
						indJogo++;
						if (indJogo > jogos.Count - 1) {
							indJogo = 0;
						}
					} else {
						indJogo--;
						if (indJogo < 0) {
							indJogo = jogos.Count - 1;
						}
					}
					Camera.main.GetComponent<EfeitosMenu> ().TocarNome (indJogo);
					Go.to (Camera.main.transform, transicao, new GoTweenConfig ()
					       .position (new Vector3 (jogos [indJogo].transform.position.x, 
					                        Camera.main.transform.position.y, 
					                        Camera.main.transform.position.z))
					       .setEaseType (easing)
					       .onComplete (f => {
						ativo = true;
						
					}));
					return;
				}
			}	
			break;
		}
		
	}
	
	public void TerminarJogo ()
	{
		print ("TerminarJogo");
		etapa = (votacaoPermitida) ? EEtapa.VOTACAO : EEtapa.MENU_JOGOS;
		primeiroFrame = true;
	}
	
	void ReiniciarJogo ()
	{
		print ("ReiniciarJogo");
		primeiroFrame = true;
		Application.LoadLevel (jogos [indJogo].nomeJogo + "_Inicio");
	}
	
	void CarregarJogo ()
	{
		timerJogo = 0;
		votacaoPermitida = false;
		etapa = EEtapa.JOGO;
		primeiroFrame = true;
		float tempo = Time.realtimeSinceStartup;
		#if UNITY_EDITOR
		var proc = Process.Start ("notepad.exe");
		#else
		var proc = Process.Start (jogos [indJogo].nomeJogo + ".exe");
		#endif
		proc.WaitForExit ();
		proc = null;
		tempo = Time.realtimeSinceStartup - tempo;
		if (tempo > 2f) {
			votacaoPermitida = true;
		}
		// print (tempo + " | Votacao: " + votacaoPermitida);
		TerminarJogo ();
		
	}
	
	IEnumerator SalvarLogs ()
	{
		while (true) {
			yield return new WaitForSeconds (10f);
			Metricas.SalvarLista ();
		}
	}
	
	void OnApplicationQuit ()
	{
		if (temMenu)
			Metricas.SalvarLista ();
		PlayerPrefs.Save ();
	}
	
	IEnumerator CarregarCapa (Capa capa, int i)
	{
		capa.nomeJogo = Config.jogos [i].id;
		capa.txtNome.text = Config.jogos [i].titulo;
		#if UNITY_EDITOR
		var url = "file://" + Application.dataPath.Replace (@"\", "/") + "/" + Config.jogos [i].imagem;
		#else
		var url = "file://" + Environment.CurrentDirectory.Replace (@"\", "/") + "/" + Config.jogos [i].imagem;
		#endif
		var www = new WWW (url);
		yield return www;
		var img = Sprite.Create (
			www.texture,
			new Rect (0, 0, 800, 450),
			new Vector2 (0.5f, 0.5f));
		capa.imagem.sprite = img;
		capa.ordem = i;
	}
}
