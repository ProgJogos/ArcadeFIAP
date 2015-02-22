#pragma strict

function Start () {
	StartCoroutine ("ControlaHistoria");
}

function Update (){
	if (Input.GetKeyDown(KeyCode.K)){
		Application.LoadLevel ("Start");
	}
}

function ControlaHistoria() {
	yield WaitForSeconds (11);
	Application.LoadLevel ("Start");
}