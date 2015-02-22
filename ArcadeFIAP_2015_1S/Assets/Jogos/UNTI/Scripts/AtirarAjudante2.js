#pragma strict
public var tiro : Transform;
public var contador : float;
public var timer : float;
public var tempoespera : float;
public var contador2 : float;
public var somtiroajudante : AudioClip;



function Start () {
transform.parent.gameObject.GetComponent(Personagem).limiteMinY += 1.20;



}
function Update () {
	if(Input.GetKey(KeyCode.V) && contador < tempoespera ){
	GetComponent.<Animator>().SetTrigger("atirou");
		audio.PlayOneShot (somtiroajudante);
		
		var prefabTiro : Transform;
		prefabTiro = Instantiate (
			tiro,
			transform.position + new Vector3(0.25f,-0.1f, 0),
			transform.rotation);
		
		contador += Time.deltaTime;	
	}
	if (contador > tempoespera){
	transform.parent.gameObject.GetComponent(Personagem).ajudantes += -1;
	transform.parent.gameObject.GetComponent(Personagem).limiteMinY += -1.20; 
	Destroy(gameObject);}	
	
	
	
		
			
	}





function OnTriggerEnter2D(coll: Collider2D) 
{
	if(coll.gameObject.tag == "minion"){
	transform.parent.gameObject.GetComponent(Personagem).ajudantes += -1;
	transform.parent.gameObject.GetComponent(Personagem).limiteMinY += -1.20; 
		Destroy(coll.gameObject);
		Destroy(gameObject);
		
	
		}
	}
