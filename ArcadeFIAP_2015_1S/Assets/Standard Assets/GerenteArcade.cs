using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using System.Linq;

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
	public static GerenteArcade i;
	public static float timerJogo;
	public bool votacaoPermitida = false;
	public static int indJogo = -1;
	
	void Awake ()
	{
		Screen.showCursor = false;
		if (i != null) {
			Destroy (this.gameObject);
			return;
		}
		temMenu = false;
		if (Application.loadedLevelName == "MenuArcade") {
			temMenu = true;
			etapa = EEtapa.MENU_JOGOS;
		} else {
			etapa = EEtapa.JOGO;
		}
		i = this;
		DontDestroyOnLoad (this.gameObject);
		primeiroFrame = true;
		if (indJogo < 0)
			indJogo = Random.Range (0, jogos.Count);
	}
	
	void Update ()
	{
		//zerar metricas
		if (Input.GetKey (KeyCode.F1) && Input.GetKey (KeyCode.F2) && !Metricas.zerado) {
			Debug.Log ("ZERAR!");
			Metricas.Zerar ();
		}
		switch (etapa) {
		case EEtapa.JOGO:	
			timerJogo += Time.deltaTime;
			// FIXME mudar para 60 no build final
			if (timerJogo >= 2) {
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
				var rostos = GameObject.FindObjectsOfType<RostoJogo> ();
				jogos = new List<RostoJogo> (rostos.OrderBy (r => r.ordem));
				votacaoPermitida = false;
				canvasInstrucoes = GameObject.Find ("CanvasInstrucoes").GetComponent<Canvas> ();
				canvasVotacao = GameObject.Find ("CanvasVotacao").GetComponent<Canvas> ();
				canvasVotacao.enabled = true;
				canvasVotacao.transform.localScale = Vector3.one;
				fade = GameObject.Find ("Fade").renderer;
				fade.material.color = Color.black;
				Go.from (canvasVotacao.transform, transicao / 2, new GoTweenConfig ()
				         .scale (0.001f)
				         .setEaseType (GoEaseType.BackInOut));
			}
			
			canvasInstrucoes.enabled = false;
			if (ArcadeFIAP.ApertouBotao (1, EBotao.A)) {
				Debug.Log ("Voto positivo");
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
				Debug.Log ("Voto negativo");
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
				
				var rostos = GameObject.FindObjectsOfType<RostoJogo> ();
				jogos = new List<RostoJogo> (rostos.OrderBy (r => r.ordem));
				canvasInstrucoes = GameObject.Find ("CanvasInstrucoes").GetComponent<Canvas> ();
				canvasVotacao = GameObject.Find ("CanvasVotacao").GetComponent<Canvas> ();
				fade = GameObject.Find ("Fade").renderer;
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
		
		if (temMenu) {
			Application.LoadLevel ("MenuArcade");
		} else {
			etapa = EEtapa.JOGO;
			#if UNITY_EDITOR
			Debug.Log ("Sair");
			#else
			Application.Quit ();
			#endif
		}
		
		
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
		Application.LoadLevel (jogos [indJogo].nomeJogo + "_Inicio");
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
