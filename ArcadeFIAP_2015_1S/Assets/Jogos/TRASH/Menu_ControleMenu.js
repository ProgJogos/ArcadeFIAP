﻿#pragma strict

public var btnNovoJogo : Transform; //0
public var btnPlacar : Transform; //1
public var btnCreditos : Transform;//2
public var btnNomes: Transform;
var estacreditos : boolean;

//guarda qual eh o botao selecionado
public var btnSelecionado : int;

public var suavizacao : float = 2f;
public var podeMudar : boolean;

function Start () {
	btnSelecionado = 1;
	podeMudar = true;
}

function Update () {

	var botaoAtual : Transform;
	
	//colocar efeito visual
	switch (btnSelecionado) {
	case 0 :
		botaoAtual = btnPlacar;
		
		//checa se o botao de acao for solto
		if (ArcadeFIAP.ApertouBotao(1, EBotao.A)) {
		}
	break;
		
	case 1 :
		//colocar efeito desejado
		botaoAtual = btnNovoJogo;
		
		//checa se o botao de acao for solto
		if (ArcadeFIAP.ApertouBotao(1, EBotao.A)) {
			Principal.statusMenu = true;
		}		
	break;
	
	case 2 :
		botaoAtual = btnCreditos;
		
		//checa se o botao de acao for solto
		if (ArcadeFIAP.ApertouBotao(1, EBotao.A)) {
			estacreditos = true;
		}
		if (ArcadeFIAP.ApertouBotao(1, EBotao.B)) {
			estacreditos = false;
		}
	break;
	}

//efeito visual do botao selecionado
if (estacreditos == true) {
	transform.forward =
			Vector3.Slerp(
			transform.forward,
			btnNomes.position - transform.position,
			Time.deltaTime * suavizacao);
}
else {
	transform.forward =
		Vector3.Slerp(
			transform.forward,
			botaoAtual.position - transform.position,
			Time.deltaTime * suavizacao);
	botaoAtual.forward = transform.forward;
}

//mudar entre botoes pelo input
	var direcao = ArcadeFIAP.Eixo(1, EEixo.HORIZONTAL);
	//quer diminuir o btnSelecionado
	if (direcao < 0 && podeMudar) {
		btnSelecionado--;
		podeMudar = false;
		if (btnSelecionado < 0) btnSelecionado = 0;
	}
	//quer aumentar o btnSelecionado
	if (direcao > 0 && podeMudar) {
		btnSelecionado++;
		podeMudar = false;
		estacreditos = false;
		if (btnSelecionado > 2) btnSelecionado = 2;
	}
		
	
	//destrava mudança de botao
	if (direcao == 0){
		podeMudar = true;
	}
}