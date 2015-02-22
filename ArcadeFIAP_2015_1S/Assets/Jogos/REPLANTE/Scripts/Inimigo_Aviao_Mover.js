#pragma strict

public var velocidade : float = 1;
public var posicao : float;

function Update (){
	velocidade += Time.deltaTime;
	posicao = this.transform.position.x + velocidade;
}