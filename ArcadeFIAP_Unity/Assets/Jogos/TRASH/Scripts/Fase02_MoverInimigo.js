#pragma strict

private var velocidade : float = 1.7;
private var limiteEsquerda : Vector3;
private var limiteDireita : Vector3;

function Update () {
	limiteEsquerda = Vector3(-3, -1, 7);
	limiteDireita = Vector3(3, -1, 7);
	transform.position = Vector3.Lerp (limiteEsquerda, limiteDireita, Mathf.PingPong(Time.time * velocidade, 1));
}