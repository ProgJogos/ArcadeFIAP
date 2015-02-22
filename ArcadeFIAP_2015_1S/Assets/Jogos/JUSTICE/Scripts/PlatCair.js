#pragma strict

private var cair:boolean; //plataforma cair ou nao
public var timer:float; 
public var intervalo:float = 2; //tempo que a plataforma vai continuar no lugar


function Start () {

}

function FixedUpdate () {
	if (cair) { 
		timer += Time.deltaTime;
		if (timer > intervalo) {
			rigidbody.isKinematic = false; //Plataforma deixara de ser kinematic
			rigidbody.AddForce(-transform.up * 5, ForceMode.VelocityChange); //Adiciona uma forca para plataforma ser afetada 
			timer = 0;														 //intantaneamente quando o timer chegar em intervalo
			cair = false;
		}
	}
}

function OnCollisionEnter(colisao:Collision) {
	if (colisao.gameObject.CompareTag("Player")) { //Se o jogador tocar na plataforma
		cair = true;
	}
}