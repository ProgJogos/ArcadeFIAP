#pragma strict

public var tempoColidiuSom : float;
public var colidiuSom : boolean;

function Update (){
	
	if (colidiuSom == true){
		tempoColidiuSom += Time.deltaTime;
	} 
	if (tempoColidiuSom >= 1){
		this.gameObject.SetActive(false);
		tempoColidiuSom = 0;
		colidiuSom = false;
	}
}

function OnTriggerEnter2D (colisao: Collider2D){
	
	if(colisao.gameObject.CompareTag("Jogador")){
	audio.PlayOneShot (audio.clip);
	colidiuSom = true;	
	}
}