﻿#pragma strict

public var btnNovoJogo : Transform; // 0
public var btnCreditos : Transform; // 1

// guarda qual eh o botao atual
public var btnSelecionado : int; 

public var suavizacao : float = 2f;
private var podeMudar : boolean;

function Start () {
	btnSelecionado = 0;
	podeMudar = true;
}

function Update () {
	
	var botaoAtual : Transform;
	
	// colocar efeito visual
	switch (btnSelecionado) {
		case 0 : 
			// colocar aqui o efeito visual que quiser
			botaoAtual = btnNovoJogo;
			
			// checa se o botao de acao for solto
			if (ArcadeFIAP.ApertouBotao(1, EBotao.A)){
				Application.LoadLevel("NEDMEG_wow");
			}
			break;
		case 1 : 
			botaoAtual = btnCreditos;
			
			// checa se o botao de acao for solto
			if (ArcadeFIAP.ApertouBotao(1, EBotao.A)){
				Application.LoadLevel("NEDMEG_Creditos");	
			}
			break;
			
	}
	
	// efeito visual do botao selecionado
	transform.forward = 
		Vector3.Slerp(
			transform.forward,
			botaoAtual.position - transform.position,
			Time.deltaTime * suavizacao);
	botaoAtual.forward = transform.forward;
	
	
	// mudar entre botoes pelo input
	var direcao = ArcadeFIAP.Eixo(1, EEixo.HORIZONTAL);
	// quero diminuir o btnSelecionado
	if (direcao < 0 && podeMudar) {
		btnSelecionado--;
		podeMudar = false;
		if (btnSelecionado < 0) btnSelecionado = 0;
		
	}
	// quer aumentar o btnSecionado
	if (direcao > 0  && podeMudar) {
		btnSelecionado++;
		podeMudar = false;
		if ( btnSelecionado > 1) btnSelecionado = 1;
	}
	// destrava mudanca de botao
	if(direcao == 0) {
		podeMudar = true;
	}
	
	
	}