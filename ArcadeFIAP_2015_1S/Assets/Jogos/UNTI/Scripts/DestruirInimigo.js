#pragma strict
var contador : float;
var tirosparamorrer : float;
//var rdnumber : float = Random.Range(1.0, 100.0);
public var lixo : Transform;
public var sommorte : AudioClip;
public var somacerto : AudioClip;


function Update () {
}
	

function destroiobjeto() {
var rdnumber : float = Random.Range(1.0, 100.0);
if (rdnumber < 15.0) {
		var prefabLixo : Transform;
		prefabLixo = Instantiate (
			lixo,
			transform.position,
			transform.rotation);
			
Destroy(gameObject);
}
else { Destroy(gameObject);}
}


function OnCollisionEnter2D(coll: Collision2D){
	if(coll.gameObject.tag == "tiro"){
		audio.PlayOneShot (somacerto);
		contador++;
		GetComponent.<Animator>().SetBool("dano", true);
	Destroy(coll.gameObject);
	}

	if(coll.gameObject.tag == "morte"){
		Destroy(gameObject);
	}
	
	if (contador == tirosparamorrer){
		audio.PlayOneShot (sommorte);
	
		GetComponent.<Animator>().SetTrigger("morrer");   	
		gameObject.tag = "Untagged";
		
		
		// yield WaitForSeconds(0.625);
		
}	
}