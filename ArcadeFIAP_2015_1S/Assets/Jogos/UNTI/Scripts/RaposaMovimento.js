#pragma strict
var velocidade : float;
var contador : float;

function Start () {



}

function Update () {
transform.Translate(velocidade * Time.fixedDeltaTime,0,0);
}

function OnCollisionEnter2D(coll: Collision2D){
	if(coll.gameObject.tag == "tiro" && contador < 1 ){
	GetComponent.<Animator>().SetTrigger("mao");
	velocidade += 20;
	contador++;
	transform.gameObject.tag = "tiro";
	transform.localScale = new Vector3(1, 1, 1);
	Destroy(coll.gameObject);
	
	}
	if(coll.gameObject.tag == "morte"){
		Destroy(gameObject);
	}
	
	}
function morreu () {
velocidade += 5;
}