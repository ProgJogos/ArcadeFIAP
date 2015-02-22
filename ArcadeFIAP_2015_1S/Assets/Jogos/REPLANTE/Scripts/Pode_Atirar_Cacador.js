#pragma strict

public static var rendererInimigo : boolean;

function OnBecameVisible (){
	rendererInimigo = true;
}

function OnBecameInvisible (){
	rendererInimigo = false;
}