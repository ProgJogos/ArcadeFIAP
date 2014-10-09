#pragma strict

private var velocidade : float;
private var limiteEsquerda : Vector3;
private var limiteDireita : Vector3;

function Start () {
	velocidade = Principal.velocidadeInimigo;
}

function Update () {
	limiteEsquerda = Vector3(-2, 7.9, 2);
	limiteDireita = Vector3(2, 7.9, 2);
	transform.position = Vector3.Lerp (limiteEsquerda, limiteDireita, Mathf.PingPong(Time.time * velocidade, 1));
}