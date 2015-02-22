#pragma strict

public var velocidade : float;
private var limiteCima : Vector3;
private var limiteBaixo : Vector3;

function Update () {
	limiteCima = Vector3(5, 0, 0);
	limiteBaixo = Vector3(5, -11.5998, 0);
	transform.position = Vector3.Lerp (limiteCima, limiteBaixo, Mathf.PingPong(Time.time * velocidade, 1));
}