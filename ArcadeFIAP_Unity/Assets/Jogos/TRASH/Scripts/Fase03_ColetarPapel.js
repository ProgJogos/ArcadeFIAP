#pragma strict

function OnCollisionEnter (objeto : Collision) {
	if (objeto.gameObject.CompareTag("Papel")) {
    	Principal.pontuacao += 100;
    	collider.enabled = false;
    	renderer.enabled = false;
	}
	else if ((objeto.gameObject.tag == "Plastico") || (objeto.gameObject.tag == "Vidro")) {
    	Principal.pontuacao += 10;
	}
}