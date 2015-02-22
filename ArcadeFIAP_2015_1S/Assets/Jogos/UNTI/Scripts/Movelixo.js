#pragma strict
public var velocidade : float;
function Start () {

}


function Update () {
transform.Translate(velocidade * Time.fixedDeltaTime,0,0);
}
function OnTriggerEnter2D(coll: Collider2D) 
{
	if(coll.gameObject.tag == "unti"){
		Destroy(gameObject);
		}
	if(coll.gameObject.tag == "morte"){
		Destroy(gameObject);
		}
	}
		
