#pragma strict

function OnDestroy (){
	Jogador_Atirar_Fezes.atirou = false;
	Jogador_Atirar_Fezes.animadorPai.SetBool("Segurando", false);
}