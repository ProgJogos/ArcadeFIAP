#pragma strict

private var currentMaterial:Material;
public var speed:float;
private var offset:float;
public var cam:Camera;
function Start () {
	currentMaterial = renderer.material;
}

function Update () {
	speed=0.1;
	offset+=0.01f;
	currentMaterial.SetTextureOffset("_MainTex", Vector3.Slerp(Vector3(cam.transform.position.x/60,cam.transform.position.y/60,0),Vector3(offset*speed*cam.camera.velocity.x,offset*speed*cam.camera.velocity.y,0),0.00001f));
}