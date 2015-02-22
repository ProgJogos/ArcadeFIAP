#pragma strict

public var animador : Animator;
static var curSemente : float;
public var maxSemente : float;

function Start () {
	animador = GetComponent("Animator") as Animator;
	curSemente = Jogador_Atirar_Sementes.curTiro;
	maxSemente = 1;
}

function Update () {

	curSemente = Jogador_Atirar_Sementes.curTiro;
	
	if(curSemente > maxSemente){
  		curSemente = maxSemente;
  	}
  		
  	if(curSemente == 1){
			animador.SetInteger("Fruta", 1);
	}
	else if(curSemente == 0){
			animador.SetInteger("Fruta", 0);
	}
}