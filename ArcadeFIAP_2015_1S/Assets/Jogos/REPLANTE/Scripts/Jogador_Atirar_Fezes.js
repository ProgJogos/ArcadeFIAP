﻿#pragma strict

public var prefabFezes1 : Transform;
public var forcaFezes : float;
public static var atirou : boolean;
public static var animadorPai : Animator;

function Start () {
	atirou = false;
	animadorPai = transform.parent.GetComponent.<Animator>();
}

function Update () {
	
	if (ArcadeFIAP.ApertouBotao(1, EBotao.A)){
		animadorPai.SetBool("Segurando", true);
		if (Jogador_Dano.jogadorColidiu == true){
			animadorPai.SetBool("Colidiu", false);
		}
	}
	
	
	if (ArcadeFIAP.SoltouBotao(1, EBotao.A) && atirou == false){
		atirou = true;
		var fezes1 : Transform = Instantiate (
   		prefabFezes1, 
   		transform.position, 
  		transform.rotation) as Transform;
		fezes1.rigidbody2D.AddForce (
   		transform.forward * forcaFezes);
   		animadorPai.SetBool("Atirar", true);
   		animadorPai.SetBool("Segurando", false);
   		/*audio.PlayOneShot (audio.clip);*/
   			
   		if(atirou == true){
   			animadorPai.SetBool("Atirar", false);
   		}
	}
}