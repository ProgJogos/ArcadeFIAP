#pragma strict
public var smoke:Transform;

function OnTriggerEnter(other:Collider){
	Destroy(this.gameObject,2.5);
}