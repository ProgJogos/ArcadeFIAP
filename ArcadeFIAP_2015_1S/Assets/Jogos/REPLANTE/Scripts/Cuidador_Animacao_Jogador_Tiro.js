#pragma strict

public var animadorJogador : Animator;

function OnTriggerEnter2D (colisao : Collider2D){
	if(colisao.gameObject.CompareTag("Fezes") /*|| colisao.gameObject.CompareTag("Fezes2")*/){
		animadorJogador.SetBool("Segurando", false);
		Jogador_Atirar_Fezes.atirou = false;
	}
}