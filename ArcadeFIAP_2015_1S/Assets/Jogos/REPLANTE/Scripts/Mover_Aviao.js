#pragma strict

public var aviao : GameObject;

function Update (){
	var posicao = Time.deltaTime * 15 + Mapa_Mover.vMovimento;
	aviao.transform.Translate(-posicao, 0, 0); 
}