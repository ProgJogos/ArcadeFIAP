#pragma strict

public var animadorCacador : Animator;
public var hp : float;
public static var rendererInimigo : boolean;

function Start () {
	hp = 2;
	animadorCacador.SetFloat("Vida", 2);
}

function Update (){
	
	if(hp == 1){
		animadorCacador.SetFloat("Vida", 1);
	}
	else if(hp <= 0){
		animadorCacador.SetFloat("Vida", 0);
	}
}

function OnCollisionEnter2D (colisao : Collision2D){
	
	if(colisao.gameObject.CompareTag("Fezes")){
		hp -= 1;
		Destroy(colisao.gameObject);
		Jogador_Atirar_Fezes.atirou = false;
			
		if(hp <= 0){
			Destroy(this.gameObject, 1.5);
		}
	}
}

function TocarSom (){
	audio.PlayOneShot(audio.clip);
}

function OnDestroy (){
	CalcularPontuacao.pontosParciais += 60;
}