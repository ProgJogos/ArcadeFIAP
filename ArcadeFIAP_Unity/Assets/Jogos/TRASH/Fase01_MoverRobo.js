#pragma strict

private var tHorizontal : float;
private var velocidade : float = 10.0;
private var deslocamento : Vector3;

function Update () {
	tHorizontal = Input.GetAxis ("TRASH_Horizontal");
	deslocamento = Vector3.zero;

	if ((tHorizontal == -1) && (rigidbody.position.x > 0)) {
		deslocamento.x += -1 * velocidade;
	}
	
	if ((tHorizontal == 1) && (rigidbody.position.x < 8)) {
		deslocamento.x += 1 * velocidade;
	}
}

function FixedUpdate () {
	rigidbody.MovePosition (rigidbody.position + deslocamento * Time.fixedDeltaTime);
}