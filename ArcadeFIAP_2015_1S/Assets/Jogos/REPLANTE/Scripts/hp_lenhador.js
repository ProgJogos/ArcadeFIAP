#pragma strict

public var animadorLenhador : Animator;
public var animadorArvore : Animator;
public static var hp : float;
public static var lenhadorMorreu : boolean;
public static var acertou : boolean;
public var morreu : boolean;

public var somCorte : AudioClip;
public var somMorrendo : AudioClip;
public var somQuedaArvore : AudioClip;

function Start () {
	hp = 1;
	acertou = false;
	morreu = false;
	animadorLenhador = GetComponent("Animator") as Animator;
	animadorArvore = GetComponent("Animator") as Animator;
	animadorLenhador.SetFloat("Vida", 1);
}

function Update () {
	if(hp <= 0){
		animadorLenhador.SetFloat("Vida", 0);
		acertou = true;
	}
}

function OnCollisionEnter2D (colisao : Collision2D){
	if(colisao.gameObject.CompareTag("Fezes")){
		lenhadorMorreu = true;
		hp -= 1;
		Destroy(colisao.gameObject);
		Destroy(this.gameObject, 1.5);
		Jogador_Atirar_Fezes.atirou = false;
	}
}

function OnTriggerExit2D(outro : Collider2D) {
	if(outro.gameObject.CompareTag("BloqueioEsq")){
		Destroy(this.gameObject);
		Jogador_Stamina.curStamina -= 30;
		animadorArvore.SetBool("Morreu", true);
	}
}

function Corte (){
	audio.PlayOneShot(somCorte);
}

function Morte (){
	audio.PlayOneShot(somMorrendo);
}

function Queda (){
	audio.PlayOneShot(somQuedaArvore);
}

function OnDestroy (){
	if (lenhadorMorreu == true) { 
		CalcularPontuacao.pontosParciais += 100;
		CalcularPontuacao.qtdDesmatamentoEvitadoParcial += 1;
	}
}