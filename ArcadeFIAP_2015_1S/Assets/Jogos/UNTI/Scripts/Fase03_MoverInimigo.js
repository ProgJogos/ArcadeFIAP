#pragma strict

public var velocidade : float;
private var limiteCima : Vector3;
private var limiteBaixo : Vector3;

function Update () {
	limiteCima = Vector3(-6.057913, -14.8429, 0);
	limiteBaixo = Vector3(-6.057913, -20.35976, 0);
	transform.position = Vector3.Lerp (limiteCima, limiteBaixo, Mathf.PingPong(Time.time * velocidade, 1));
}