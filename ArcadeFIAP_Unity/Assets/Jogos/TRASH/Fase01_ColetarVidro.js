#pragma strict

function OnCollisionEnter (objeto : Collision) {
	if (objeto.gameObject.CompareTag("Vidro")) {
		Principal.pontuacao += 100;
	}
	else if ((objeto.gameObject.tag == "Plastico") || (objeto.gameObject.tag == "Vidro")) {
    	Principal.pontuacao += 10;
	}
}