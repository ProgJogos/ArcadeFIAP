#pragma strict

public var Stamina : GUITexture;
public static var curStamina : float;
private var maxStamina : float;
private var minStamina : float;
public var removeColisor : boolean;
public var colisor : Collider2D;

function Start () {
	maxStamina = 100;
	minStamina = 0;
	curStamina = 100;
	Stamina.pixelInset.width = curStamina * 2;
	removeColisor = false;
	colisor = gameObject.GetComponent(CircleCollider2D);
}

function Update () {

	if(ControlarTutorial.tutorialFinalizou == true){
		curStamina -= Time.fixedDeltaTime * 0.5;
	}
	
	Stamina.pixelInset.width = curStamina * 2;
	
	if(curStamina >= maxStamina){
		curStamina = maxStamina;
	}
	if(curStamina <= minStamina){
		Jogador_Vida.curLife = Jogador_Vida.curLife - 1;
		curStamina = maxStamina;
		removeColisor = true;
		
		if(removeColisor == true){
			ControlarLimiteTela.colidiu = true;
			ControlarLimiteTela.tempo = 0;
			collider2D.enabled = false;
			removeColisor = false;
		}
	}
}