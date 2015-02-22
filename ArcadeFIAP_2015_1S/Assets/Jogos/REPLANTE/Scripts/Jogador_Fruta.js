#pragma strict

public var vida : float ;
public static var coletou : boolean;

function Start (){
	coletou = false;
}

function OnCollisionEnter2D (colisao : Collision2D){
	if(colisao.gameObject.CompareTag("Fruta")){
		Jogador_Stamina.curStamina += vida;
		Jogador_Semente.curSemente += 1;
		Jogador_Atirar_Sementes.curTiro += 1;
		Destroy(colisao.gameObject);
		
		if(ControlarTutorial.tutorial4  == true){
			coletou = true;
		}
	}
}