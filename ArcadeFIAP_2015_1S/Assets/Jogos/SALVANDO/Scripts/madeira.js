#pragma strict

function Start () {

}

function OnCollisionEnter(col:Collision){
	Destroy(this.gameObject,1);
	if(col.gameObject.CompareTag("player2")){
		var m : motor;
		m.vidaatual -= 10;
	}
	if(col.gameObject.CompareTag("barco")){
		var b : barco;
		b.vidaatual -= 10;
	}
}

function Update () {
	this.transform.Rotate(Vector3(0,0,10));
}