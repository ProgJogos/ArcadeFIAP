#pragma strict
function Start(){
	rigidbody.velocity.y=-10;
}
function OnTriggerEnter(other:Collider){
	if(!other.gameObject.CompareTag("agua")&&!other.gameObject.CompareTag("barco")){
		Destroy(this.gameObject);
		Destroy(transform.parent.gameObject,0.5);
	}
}