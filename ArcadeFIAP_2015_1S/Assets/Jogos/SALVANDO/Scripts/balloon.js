#pragma strict
var prefabwater:Transform;

function OnCollisionEnter(colisao:Collision){
	if(colisao.gameObject){
		Destroy(this.gameObject);
		var water : Transform = Instantiate (prefabwater, transform.position, prefabwater.rotation) as Transform;
	}
}