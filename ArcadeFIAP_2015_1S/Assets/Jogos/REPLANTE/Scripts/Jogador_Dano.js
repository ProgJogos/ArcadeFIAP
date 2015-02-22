#pragma strict

//colisao direta com inimigos
public var inimigoLenhador : float = 10;
public var inimigoDano : float = 5;
public static var inimigoImovel : float = 10;

//colisao com tiros dos inimigos
public var inimigoTiroMenino : float = 10;
public var inimigoTiroCacador : float = 15;

public static var jogadorColidiu : boolean = false;
public var tempoColidiu : float = 0;

public var animador : Animator;

public var dano : AudioClip;
public var morrendo : AudioClip;

function Start (){

	jogadorColidiu = false;
	animador = GetComponent("Animator") as Animator;
	animador.SetBool("Colidiu", false);
}

function Update(){
	
	if(jogadorColidiu == true){
		tempoColidiu += Time.deltaTime;
		collider2D.enabled = false;
		animador.SetBool("Colidiu", true);
		
		if(tempoColidiu >= 1.5){
			tempoColidiu = 0;
			collider2D.enabled = true;
			animador.SetBool("Colidiu", false);
			jogadorColidiu = false;
		}
	}
	
	if(Jogador_Stamina.curStamina <= 0){
		audio.PlayOneShot (morrendo);
	}
}

function OnCollisionEnter2D (colisao : Collision2D){
	
	if(jogadorColidiu == false){
		if(colisao.gameObject.CompareTag("InimigoMeninoTiro")){
			Jogador_Stamina.curStamina -= inimigoTiroMenino;
			Destroy(colisao.gameObject);
			jogadorColidiu = true;
			audio.PlayOneShot (dano);
		}
		else if(colisao.gameObject.CompareTag("InimigoCacadorTiro")){
			Jogador_Stamina.curStamina -= inimigoTiroCacador;
			Destroy(colisao.gameObject);
			jogadorColidiu = true;
			audio.PlayOneShot (dano);
		}
		else if(colisao.gameObject.CompareTag("Aviao")){
			Jogador_Stamina.curStamina = 0;
			jogadorColidiu = true;
			audio.PlayOneShot (dano);
		}
		else if(colisao.gameObject.CompareTag("InimigoLenhador")){
			Jogador_Stamina.curStamina -= inimigoLenhador;
			jogadorColidiu = true;
			audio.PlayOneShot (dano);
		}
		else if(colisao.gameObject.CompareTag("InimigoImoveis")){
			Jogador_Stamina.curStamina -= inimigoImovel;
			jogadorColidiu = true;
			audio.PlayOneShot (dano);
		}
		else if(colisao.gameObject.CompareTag("InimigoCacador") || colisao.gameObject.CompareTag("InimigoMenino")){
			Jogador_Stamina.curStamina -= inimigoDano;
			jogadorColidiu = true;
			audio.PlayOneShot (dano);
		}
	}
}

function OnCollisionStay2D (colisao : Collision2D){
	jogadorColidiu = true;
}