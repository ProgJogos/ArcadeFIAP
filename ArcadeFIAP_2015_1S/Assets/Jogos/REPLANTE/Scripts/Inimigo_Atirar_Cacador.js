#pragma strict

public var prefabTiro : Transform;
public var forcaTiro : float = 2000f;
public var tempoTiro : float = 1f;
public var alvo : Transform;

function Start (){
	StartCoroutine("Atirar");
}

function Atirar (){
	     
	while (true){
    	yield WaitForSeconds(tempoTiro);
    	
    	if (Pode_Atirar_Cacador.rendererInimigo == true){
    		var tiro : Transform = Instantiate(
        	prefabTiro,
        	transform.position,
        	Quaternion.identity) as Transform;
        
        	alvo = GameObject.Find("Jogador").transform;
        
        	var direcao = alvo.position - transform.position;
        
        	tiro.rigidbody2D.AddForce(
				direcao.normalized * forcaTiro);
    	}
    }
}

function OnCollisionEnter2D (colisao : Collision2D){

	if(colisao.gameObject.CompareTag("Fezes")){
		Destroy(this.gameObject);
		Jogador_Atirar_Fezes.atirou = false;
	}
}