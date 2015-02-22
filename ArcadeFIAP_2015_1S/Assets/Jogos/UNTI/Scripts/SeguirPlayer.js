#pragma strict

	public var smooth : float;
	public var alvo : Transform;
	

function Start () {

}

function Update () {
	
	 transform.position = Vector2.Lerp(transform.position, alvo.position, smooth * Time.deltaTime);
	 transform.position.z = -10;
}