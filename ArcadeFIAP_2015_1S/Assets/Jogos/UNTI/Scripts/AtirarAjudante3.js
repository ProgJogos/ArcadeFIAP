#pragma strict
public var tiro : Transform;
public var contador : float;
public var timer : float;


function Start () {

}
function Update () {
if (contador == 1){
GetComponent.<Animator>().SetInteger("tiros",1);}
if (contador == 2){
GetComponent.<Animator>().SetInteger("tiros",2);}
if (contador == 3){
transform.parent.gameObject.GetComponent(Personagem).ajudantes += -1;
Destroy(gameObject);}
	
}

function OnTriggerEnter2D(coll: Collider2D) 
{
	if(coll.gameObject.tag == "minion"){
	contador ++;

		Destroy(coll.gameObject);
		
		
	
		}
	}


