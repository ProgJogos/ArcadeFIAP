#pragma strict

function Start () {

}

function Update () {

}

function OnTriggerEnter2D(coll: Collider2D) 
{
	if(coll.gameObject.tag == "chao")
	{
		//print("nochao");
		Personagem.noChao = true;
		transform.parent.GetComponent.<Animator>().SetBool("pular", false);
	}
	
}
function OnTriggerExit2D(coll: Collider2D) 
{
	if(coll.gameObject.tag == "chao")
	{
		//print("nochao");
		Personagem.noChao = false;
		
	}
	
}