#pragma strict

function OnCollisionEnter (objeto : Collision) {
	if ((objeto.gameObject.tag == "Vidro") || (objeto.gameObject.tag == "Plastico") || (objeto.gameObject.tag == "Papel")) {
    	Principal.pontuacao += 100;
	}
}