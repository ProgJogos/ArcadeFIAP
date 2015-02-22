#pragma strict

function Start () {
	StartCoroutine ("ControlaHistoria");
}

function Update (){
	if (ArcadeFIAP.ApertouBotao(1, EBotao.B)){
		Application.LoadLevel ("REPLANTE_Start");
	}
}

function ControlaHistoria() {
	yield WaitForSeconds (11);
	Application.LoadLevel ("REPLANTE_Start");
}