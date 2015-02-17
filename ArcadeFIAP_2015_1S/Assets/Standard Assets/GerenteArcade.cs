using UnityEngine;
using System.Collections;
using System.Collections.Generic;

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
	public float transicao;
	public GoEaseType easing;
	
	private Renderer fade;
	private Canvas canvasVotacao;
	private Canvas canvasInstrucoes;
	
	public bool primeiroFrame;
	
	public static EEtapa etapa;
	public static GerenteArcade i;
	public static float timerJogo;
	public bool votacaoPermitida = false;
	public static int indJogo = -1;
	
	void Awake ()
	{
		if (i != null) {
			Destroy (this.gameObject);
			return;
		}
		i = this;
		DontDestroyOnLoad (this.gameObject);
		primeiroFrame = true;
		if (indJogo < 0)
			indJogo = Random.Range (0, jogos.Count);
	}
	
	void Update ()
	{
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
				jogos = new List<RostoJogo> (rostos);
				
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
	
	void TerminarJogo ()
	{
		print ("TerminarJogo");
		etapa = (votacaoPermitida) ? EEtapa.VOTACAO : EEtapa.MENU_JOGOS;
		primeiroFrame = true;
		Application.LoadLevel ("MenuArcade");
	}
	
	void ReiniciarJogo ()
	{
		print ("ReiniciarJogo");
		primeiroFrame = true;
		Application.LoadLevel (jogos [indJogo].jogoAtual + "_Inicio");
	}
	
	void CarregarJogo ()
	{
		timerJogo = 0;
		votacaoPermitida = false;
		etapa = EEtapa.JOGO;
		primeiroFrame = true;
		Application.LoadLevel (jogos [indJogo].jogoAtual + "_Inicio");
	}
}
