#pragma strict

public var animadorLenhador : Animator;
public var animadorArvore : Animator;
public var lenhadorMorreu : boolean;
public var hp : float;
public static var acertou : boolean;

public var somCorte : AudioClip;
public var somMorrendo : AudioClip;
public var somQuedaArvore : AudioClip;

function Start () {
	hp = 1;
	acertou = false;
	lenhadorMorreu = false;
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
		Morte();
	}
}

function OnTriggerExit2D(outro : Collider2D) {
	
	if((outro.gameObject.CompareTag("BloqueioEsq")) && (lenhadorMorreu == false)){
		Destroy(this.gameObject, 1);
		animadorArvore.SetBool("Morreu", true);
		Jogador_Stamina.curStamina -= 30;
		Queda();
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
	
	if (lenhadorMorreu == true){
		CalcularPontuacao.pontosParciais += 200;
		CalcularPontuacao.qtdDesmatamentoEvitadoParcial += 1;
	}
}