#pragma strict
var velocidade : float;
var contador : float;

function Start () {
transform.localScale = new Vector3(-1, 1, 1);


}

function Update () {
transform.Translate(velocidade * Time.fixedDeltaTime,0,0);
}

function OnCollisionEnter2D(coll: Collision2D){
	if(coll.gameObject.tag == "tiro" && contador <= 1 ){
	velocidade += -4.5;
	contador++;
	
	}
	
	}
function morreu () {
this.collider2D.enabled = false;
velocidade += 5;
}