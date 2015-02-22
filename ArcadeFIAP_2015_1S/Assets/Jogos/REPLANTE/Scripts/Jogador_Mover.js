#pragma strict

public var velocidade : float;
//public var tempoTiro : float;
private var direcaoX : float;
private var direcaoY : float;

public static var chegouTut1 : boolean;
public static var chegouTut3 : boolean;
public static var chegouTut5 : boolean;
public static var chegouTut7 : boolean;

public static var controleTut2 : boolean;
public static var controleTut4 : boolean;
public static var controleTut6 : boolean;
public static var controleTut8 : boolean;

function Start () {
	
	controleTut2 = false;
	controleTut4 = false;
	controleTut6 = false;
	controleTut8 = false;
}

function Update () {
	
	direcaoX = Input.GetAxis("Horizontal");
	direcaoY = Input.GetAxis("Vertical");
	
	if(transform.position.x < -49.3){
		transform.position.x = -49.295;
	}
	if(transform.position.y > 12.3){
		transform.position.y = 12.299;
	}
	
	if(transform.position.y < 1){
		transform.position.y = 1.01;
	}
	
	if(ControlarTutorial.tutorialFinalizou == false){
		
		if(ControlarTutorial.tutorial1 == true || ControlarTutorial.tutorial2 == true){

			if(controleTut2 == true){
				
				if(transform.position.x >= -43.2){
					chegouTut1 = true;
					transform.position.x = -43.205;
				}
				else if( transform.position.x < -43.2){
					chegouTut1 = false;
				}
			}
		}
		
		else if(ControlarTutorial.tutorial3 == true || ControlarTutorial.tutorial4 == true){
			
			if(controleTut4 == true){
				
				if(transform.position.x >= -41.6){
					chegouTut3 = true;
					transform.position.x = -41.605;
				}
				else if(transform.position.x < -41.6){
					chegouTut3 = false;
				}
			}
		}
		
		else if(ControlarTutorial.tutorial5 == true || ControlarTutorial.tutorial6 == true){
			
			if(controleTut6 == true){
				
				if(transform.position.x >= -34.8){
					chegouTut5 = true;
					transform.position.x = -34.805;
				}
				else if(transform.position.x < -34.8){
					chegouTut5 = false;
				}
			}
		}
		
		else if(ControlarTutorial.tutorial7 == true || ControlarTutorial.tutorial8 == true){
			
			if(controleTut8 == true){
				
				if(transform.position.x >= -28.45){
					chegouTut7 = true;
					transform.position.x = -28.455;
				}
				else if(transform.position.x < -28.45){
					chegouTut7 = false;
				}
			}
		}
	}
	
	else if(ControlarTutorial.tutorialFinalizou == true){
		
		
		if(transform.position.x > -25.6){
			transform.position.x = -25.595;
		}
	}
	
	/*if(Input.GetKey(KeyCode.J)){
		tempoTiro += Time.deltaTime;
		//transform.localPosition.y -= tempoTiro / 20;
	}
	
	if(Input.GetKeyUp(KeyCode.J)){
		tempoTiro = 0;
	}*/
}

function FixedUpdate () {
	
	rigidbody2D.velocity.y = direcaoY * velocidade * Time.deltaTime;
	rigidbody2D.velocity.x = direcaoX * velocidade * Time.deltaTime;
}