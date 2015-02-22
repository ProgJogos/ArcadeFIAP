#pragma strict

public static var barco : barco;
private var currentMaterial:Material;
public var speed:float;
private var offset:float;
function Start () {
	currentMaterial = renderer.material;
}

function Update () {
	offset+=0.001f;
	currentMaterial.SetTextureOffset("_MainTex", Vector3(offset*speed,offset*speed,offset*speed));
}

function OnTriggerStay(col:Collider){
	if(col.gameObject.CompareTag("barco")){
		if(barco.litros<barco.litrosmax){
			barco.litros +=0.01;
		}
	}
	col.gameObject.rigidbody.velocity=Vector3.Slerp(col.gameObject.rigidbody.velocity,col.gameObject.rigidbody.velocity*0.7,3f);
}