#pragma strict

public var prefabSemente : Transform;
public var forcaSemente : float;
public static var curTiro : float;
private var maxTiro : float;
public var minTiro : float;
public static var atirou : boolean;

function Start () {
	atirou = false;
	maxTiro = 1;
	minTiro = 0;
	curTiro = 0;
}

function Update () {
	if (curTiro > maxTiro){
		curTiro = maxTiro;
	}
	
	if ((curTiro > minTiro) && atirou == false){
		if (ArcadeFIAP.SoltouBotao(1, EBotao.B)) {
			atirou = true;
			var semente : Transform = Instantiate (
   			prefabSemente, 
   			transform.position, 
  			transform.rotation) as Transform;
			semente.rigidbody2D.AddForce (
   			transform.forward * forcaSemente);
   			
   			if(ControlarTutorial.tutorialFinalizou == true){
   				curTiro -= 1;
   			}
		}
	}
}