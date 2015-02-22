#pragma strict
var velocidade : float;
var contador : float;
public var tiro1 : AudioClip;
public var tiro2 : AudioClip;
public var morte : AudioClip;

public var tirosparamorrer : float;

function Start () {



}


function Update () {
transform.Translate(velocidade * Time.fixedDeltaTime,0,0);



	}

function OnCollisionEnter2D(coll: Collision2D){
	
	if(coll.gameObject.tag == "tiro"){
		contador ++;
		Destroy(coll.gameObject);
	}
	if(coll.gameObject.tag == "tiro" && contador == 1){
	audio.PlayOneShot (tiro1);
		GetComponentInChildren.<Animator>().SetTrigger("tiro2");
		
	}
	
	if(coll.gameObject.tag == "tiro" && contador == 2){
	audio.PlayOneShot (tiro2);
		GetComponentInChildren.<Animator>().SetTrigger("tiro1");
		velocidade += -1.5;
	}
	
	
	
	if(coll.gameObject.tag == "morte"){
	
		Destroy(gameObject);
	
	}
	
	if(coll.gameObject.tag == "tiro" && contador == 3){
	audio.PlayOneShot (morte);
		contador=0;
		Destroy(coll.gameObject);
		GetComponentInChildren.<Animator>().SetTrigger("morte");
	
	}


	}
	



		
