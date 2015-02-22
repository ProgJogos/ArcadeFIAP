#pragma strict
var velocidade : float;


function Start () {


}

function Update () {
transform.Translate(velocidade * Time.fixedDeltaTime,0,0);

}
	function OnTriggerEnter2D(coll: Collider2D) {
	
	if(coll.gameObject.tag == "minion")
		{
		transform.gameObject.tag = "Untagged";

	}
	if(coll.gameObject.tag == "morte"){
	Destroy(gameObject);
	

	if(coll.gameObject.tag == "minion");
	{
	
	print("Bala colidiu !!");
	Destroy(gameObject);


}

}


}

