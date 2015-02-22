#pragma strict

public var arbusto : Transform;

function Update () {
	
	if(ControlarTutorial.g_ArbustoTut == true){
		collider2D.enabled = true;
	}
	else if(ControlarTutorial.g_ArbustoTut == false){
		collider2D.enabled = false;
	}
}