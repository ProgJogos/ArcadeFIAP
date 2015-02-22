#pragma strict

private var animador : Animator;
public static var cresceu : boolean;

function Start () {
	animador = GetComponent("Animator") as Animator;
	animador.SetBool("Crescer", false);
	cresceu = false;
}

function OnCollisionEnter2D (colisao : Collision2D){
	
	if(colisao.gameObject.CompareTag("Semente")){
		animador.SetBool("Crescer", true);
		audio.PlayOneShot (audio.clip);
		Jogador_Atirar_Sementes.atirou = false;
		Destroy(colisao.gameObject);
		CalcularPontuacao.pontosParciais += 75;
		CalcularPontuacao.qtdMudaPlantadaParcial += 1;
		collider2D.enabled = false;
		
		if(ControlarTutorial.tutorial6 == true){
			cresceu = true;
		}
	}
}