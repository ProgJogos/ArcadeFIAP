/*#pragma strict

public var Fezes : GUITexture;
static var curFezes : float;
private var maxFezes : float;
public var minFezes : float;

function Start () {
	maxFezes = 2;
	minFezes = 1;
	curFezes = 1;
	Fezes.pixelInset.width = curFezes * 20;
}

function Update () {

	Fezes.pixelInset.width = curFezes * 20 * Jogador_Atirar_Fezes.tempo;
	
	
	if(Fezes.pixelInset.width > 41 ){
		Fezes.pixelInset.width = 41;
	}
}
*/