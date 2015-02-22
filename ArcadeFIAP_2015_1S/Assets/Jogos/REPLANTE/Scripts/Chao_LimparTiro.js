#pragma strict

function OnCollisionEnter2D (colisao : Collision2D){
	if(colisao.gameObject.CompareTag("InimigoMeninoTiro") || colisao.gameObject.CompareTag("InimigoCacadorTiro")){
		Destroy(colisao.gameObject);
		}
	else if(colisao.gameObject.CompareTag("Semente")){
		Jogador_Atirar_Sementes.atirou = false;
		Destroy(colisao.gameObject);
		}
	else if(colisao.gameObject.CompareTag("Fezes") /*|| colisao.gameObject.CompareTag("Fezes2")*/){
		Jogador_Atirar_Fezes.atirou = false;
		//Jogador_Atirar_Fezes.tempo = 0;
		Destroy(colisao.gameObject);
		}
}