#pragma strict
 
function OnTriggerEnter2D(outro : Collider2D) {
	if(outro.gameObject.CompareTag("Aviao")){
	Destroy(GameObject.FindWithTag("Aviao"));
	}
}