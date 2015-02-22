#pragma strict

public var morreu : boolean = false;

function OnTriggerExit2D(outro : Collider2D) {
	if(outro.gameObject.CompareTag("InimigoLenhador")){
		Destroy(outro.gameObject);
		Jogador_Stamina.curStamina -= 30;
		morreu = true;
	}
}