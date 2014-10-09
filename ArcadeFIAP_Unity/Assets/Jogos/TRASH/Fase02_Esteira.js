#pragma strict

private var velocidade : float = 5.0;
private var deslocamento : Vector3;

function Update () {
	deslocamento = Vector3.zero;
	deslocamento.z += -1 * velocidade;
}

function FixedUpdate () {
	rigidbody.MovePosition (rigidbody.position + deslocamento * Time.fixedDeltaTime);
}