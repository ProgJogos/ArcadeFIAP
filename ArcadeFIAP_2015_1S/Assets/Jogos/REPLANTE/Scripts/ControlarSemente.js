#pragma strict

public var semente : Transform;

function Update () {
	
	if(ControlarTutorial.g_SementeTut == true){
		collider2D.enabled = true;
	}
	else if(ControlarTutorial.g_SementeTut == false){
		collider2D.enabled = false;
	}
}