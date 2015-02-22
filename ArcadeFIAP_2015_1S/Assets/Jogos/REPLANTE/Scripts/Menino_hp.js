#pragma strict

public var animadorMenino : Animator;
public var hp : float;

function Start () {
	hp = 1;
	animadorMenino.SetFloat("Vida", 1);
}

function Update () {
	if(hp <= 0){
		animadorMenino.SetFloat("Vida", 0);
	}
}

function OnCollisionEnter2D (colisao : Collision2D){
	
	if(colisao.gameObject.CompareTag("Fezes")){
		hp -= 1;
		Destroy(colisao.gameObject);
		Destroy(this.gameObject, 1);
		Jogador_Atirar_Fezes.atirou = false;
	}
}

function TocarSom (){
	audio.PlayOneShot (audio.clip);
}

function OnDestroy (){
	CalcularPontuacao.pontosParciais += 20;
}