#pragma strict

private var currentMaterial : Material;
public var velocidade : float;
private var offset : float;

function Start () {
	currentMaterial = renderer.material;
}

function Update () {
	
	if(ControlarTutorial.tutorialFinalizou == true){
		offset += 0.001f + Mapa_Mover.vMovimento;
		currentMaterial.SetTextureOffset("_MainTex", new Vector2 (offset * velocidade,0));
	}
}