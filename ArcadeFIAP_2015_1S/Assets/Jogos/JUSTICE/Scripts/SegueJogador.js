#pragma strict

public var alvo:Transform;
public var distancia:float;

function Start () {

}

function LateUpdate () {
	var distZ : float = Mathf.Clamp(-20 - alvo.transform.position.y * 5, -40, -20);;
	transform.position = Vector3.Lerp(transform.position, alvo.position + Vector3(6, 2, distZ), 0.03);
	
	
}