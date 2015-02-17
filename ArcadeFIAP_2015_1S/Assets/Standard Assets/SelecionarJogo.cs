using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class SelecionarJogo : MonoBehaviour
{
	public List<RostoJogo> jogos;
	public int indJogo;
	public bool ativo;
	public float transicao;
	public GoEaseType easing;
	
	void Start ()
	{
		ativo = true;
		GerenteArcade.i.ingame = false;
	}
	
	void Update ()
	{
		if (ativo) {
			if (ArcadeFIAP.ApertouBotao (1, EBotao.START)) {
				ativo = false;
				Go.to (jogos [indJogo].transform, transicao * 2, new GoTweenConfig ()
					.scale (1f)
					.setEaseType (GoEaseType.QuadIn)
					.onComplete (f => {
					ArcadeFIAP.CarregarJogo (jogos [indJogo].jogoAtual);
				}));
				return;
			}	
			
			if (ArcadeFIAP.Eixo (1, EEixo.HORIZONTAL) > 0) {
				ativo = false;
				indJogo++;
				if (indJogo > jogos.Count - 1) {
					indJogo = 0;
				}
				Go.to (transform, transicao, new GoTweenConfig ()
					.position (new Vector3 (jogos [indJogo].transform.position.x, 
					transform.position.y, transform.position.z))
			    	.setEaseType (easing)
					.onComplete (f => {
					ativo = true;
				}));
				return;
			}
			
			if (ArcadeFIAP.Eixo (1, EEixo.HORIZONTAL) < 0) {
				ativo = false;
				indJogo--;
				if (indJogo < 0) {
					indJogo = jogos.Count - 1;
				}
				Go.to (transform, transicao, new GoTweenConfig ()
			       .position (new Vector3 (jogos [indJogo].transform.position.x, 
			       transform.position.y, transform.position.z))
			       .setEaseType (easing)
			       .onComplete (f => {
					ativo = true;
				}));
				return;
			}
		}
		
		
	}
}
