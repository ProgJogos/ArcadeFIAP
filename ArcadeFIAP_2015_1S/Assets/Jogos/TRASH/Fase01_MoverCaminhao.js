#pragma strict

private var velocidade : float = 2.0;
private var deslocamento : Vector3;

function Update () {
	deslocamento = Vector3.zero;
	deslocamento.x += 1 * velocidade;
}

function FixedUpdate () {
	rigidbody.MovePosition (rigidbody.position + deslocamento * Time.fixedDeltaTime);
}