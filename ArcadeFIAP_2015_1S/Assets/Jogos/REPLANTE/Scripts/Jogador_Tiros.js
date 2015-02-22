/*#pragma strict

public var Tiro : GUITexture;
static var curTiro : float;
private var maxTiro : float;
public var minTiro : float;
public var atirou : boolean;

function Start () {
	atirou = false;
	maxTiro = 3;
	minTiro = 0;
	curTiro = 3;
	Tiro.pixelInset.width = curTiro * 30;
}

function Update () {
	if ((curTiro > minTiro) && atirou == false){
	
	}
}
	
function OnCollisionEnter2D (colisao : Collision2D) {
	if (colisao.gameObject.CompareTag("Chao")) {
	atirou = false;
	}
}*/