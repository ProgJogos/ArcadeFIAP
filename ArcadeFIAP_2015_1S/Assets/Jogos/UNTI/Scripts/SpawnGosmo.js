#pragma strict
public var gosmito : Transform;

function Spawn () {
GetComponent.<Animator>().SetTrigger("morte");
		var prefabgosmito : Transform;
		prefabgosmito = Instantiate (
			gosmito,
			transform.position + new Vector3(1.5f, 0, 0),
			transform.rotation);
		var prefabgosmito2 : Transform;
		prefabgosmito2 = Instantiate (
			gosmito,
			transform.position + new Vector3(-1.5f, 0, 0),
			transform.rotation);
}