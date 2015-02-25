using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Diagnostics;

public enum EEtapa
{
	MENU_JOGOS,
	JOGO,
	VOTACAO
}

public class GerenteArcade : MonoBehaviour
{
	public List<RostoJogo> jogos;
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
		Screen.showCursor = false;
		etapa = EEtapa.MENU_JOGOS;
		primeiroFrame = true;
		var rostos = GameObject.FindObjectsOfType<RostoJogo> ();
		jogos = new List<RostoJogo> (rostos.OrderBy (r => r.ordem));
		if (indJogo < 0)
			indJogo = Random.Range (0, jogos.Count);
		fade = GameObject.Find ("Fade").renderer;
		fade.material.color = Color.black;
		canvasInstrucoes = GameObject.Find ("CanvasInstrucoes").GetComponent<Canvas> ();
		canvasInstrucoes.enabled = false;
		canvasVotacao = GameObject.Find ("CanvasVotacao").GetComponent<Canvas> ();
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
	
	void Update ()
	{
		//zerar metricas
		if (Input.GetKey (KeyCode.F1) && Input.GetKey (KeyCode.F2) && !Metricas.zerado) {
			UnityEngine.Debug.Log ("ZERAR!");
			Metricas.Zerar ();
		}
		switch (etapa) {
		case EEtapa.JOGO:	
			timerJogo += Time.deltaTime;
			// FIXME mudar para 60 no build final
			if (timerJogo >= 5) {
				votacaoPermitida = true;
			}
			
			if (ArcadeFIAP.BotaoApertado (1, EBotao.MENU) && ArcadeFIAP.BotaoApertado (2, EBotao.MENU) &&
				timerJogo > 1) {
				ReiniciarJogo ();
			}
			
			if ((ArcadeFIAP.BotaoApertado (1, EBotao.MENU) && ArcadeFIAP.BotaoApertado (1, EBotao.START)) ||
				(ArcadeFIAP.BotaoApertado (2, EBotao.MENU) && ArcadeFIAP.BotaoApertado (2, EBotao.START))) {
				TerminarJogo ();
			}
			break;
			
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
				UnityEngine.Debug.Log ("Voto positivo");
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
				UnityEngine.Debug.Log ("Voto negativo");
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
		tempo = Time.realtimeSinceStartup - tempo;
		if (tempo > 2f) {
			votacaoPermitida = true;
		}
		print (tempo + " | Votacao: " + votacaoPermitida);
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
}
