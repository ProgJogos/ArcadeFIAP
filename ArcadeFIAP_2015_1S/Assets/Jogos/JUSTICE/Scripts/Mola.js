#pragma strict
//Variaveis
//---------
public var anim : Animator;

//Start
//-----
function Start(){
	anim = GetComponent.<Animator>();
}


//Funcao de colisao
//------------------
function OnCollisionEnter(outro:Collision){
	if(outro.gameObject.CompareTag("Player")){
		anim.SetTrigger("Mola"); //-- Animacao da mola --
		outro.gameObject.rigidbody.AddForce(Vector3.up * 400, ForceMode.Impulse);
		Debug.Log("Voa!"); //--So pra verificar se hoouve ou nao a acao --
	}else return;
}