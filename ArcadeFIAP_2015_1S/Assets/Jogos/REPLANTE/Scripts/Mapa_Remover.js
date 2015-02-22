#pragma strict
 
function OnTriggerEnter2D(outro : Collider2D) {
	if(outro.gameObject.CompareTag("BloqueioEsq")){
	Destroy(GameObject.FindWithTag("Chao"));
	}
}