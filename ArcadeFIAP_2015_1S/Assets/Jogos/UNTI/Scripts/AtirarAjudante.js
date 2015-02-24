#pragma strict
public var tiro : Transform;
public var contador : float;
public var timer : float;
private var animator : Animator;
public var somtiroajudante : AudioClip;
public var morreajudante : AudioClip;

function Start () {
transform.parent.gameObject.GetComponent(Personagem).limiteMinY += 1.20;
animator = GetComponent("Animator");

}
function Update () {
	if(ArcadeFIAP.ApertouBotao(1, EBotao.A) && contador <= 4){
	audio.PlayOneShot (somtiroajudante);
		
		var prefabTiro : Transform;
		prefabTiro = Instantiate (
			tiro,
			transform.position + new Vector3(0.3f,0.4f, 0),
			transform.rotation);
			contador++;
			
	}
	
		if(ArcadeFIAP.ApertouBotao(1, EBotao.A) && contador <= 4){
		audio.PlayOneShot (somtiroajudante);
		
		var prefabTiro2 : Transform;
		prefabTiro2 = Instantiate (
			tiro,
			transform.position + new Vector3(0.3f,0.4f, 0),
			transform.rotation);
			contador++;
			
	}


if (contador >= 4){
timer += Time.deltaTime;
animator.SetBool("gatocansado", true); 
}

if (timer >=2 ){
animator.SetBool("gatocansado", false); 
contador += -4;
timer += -timer;
}
}


function OnTriggerEnter2D(coll: Collider2D) 
{
	if(coll.gameObject.tag == "minion"){
	audio.PlayOneShot (morreajudante);
	transform.parent.gameObject.GetComponent(Personagem).ajudantes += -1;
	transform.parent.gameObject.GetComponent(Personagem).limiteMinY += -1.20; 
		Destroy(coll.gameObject);
		Destroy(gameObject);
		
	
		}
	}


