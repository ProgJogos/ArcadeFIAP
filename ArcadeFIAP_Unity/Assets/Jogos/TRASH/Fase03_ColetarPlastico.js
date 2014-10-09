#pragma strict

function OnCollisionEnter (objeto : Collision) {
	if (objeto.gameObject.CompareTag("Plastico")) {
    	Principal.pontuacao += 100;
    	collider.enabled = false;
    	renderer.enabled = false;
	}
	else if ((objeto.gameObject.tag == "Papel") || (objeto.gameObject.tag == "Vidro")) {
    	Principal.pontuacao += 10;
	}
}