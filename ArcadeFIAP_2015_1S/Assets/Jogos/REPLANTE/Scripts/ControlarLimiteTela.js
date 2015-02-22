#pragma strict

public static var tempo : float;
public static var colidiu : boolean;
private var animador : Animator;

function Start (){
	tempo = 0;
	animador = GetComponent.<Animator>();
	colidiu = false;
}

function Update (){
	if(colidiu == true){
		tempo += Time.deltaTime;
		collider2D.enabled = false;
		animador.SetBool("Colidiu", true);
		
		if(tempo >= 1.5){
			tempo = 0;
			collider2D.enabled = true;
			animador.SetBool("Colidiu", false);
		}
	}
}

function OnCollisionEnter2D (colisao : Collision2D){
	
	if((colisao.gameObject.CompareTag("InimigoImoveis")) && (colidiu == false)){
		Jogador_Stamina.curStamina -= Jogador_Dano.inimigoImovel;
		colidiu = true;
	}
	
	if((colisao.gameObject.CompareTag("Aviao")) && (colidiu == false)){
		Jogador_Stamina.curStamina = 0;
		colidiu = true;
	}
}