#pragma strict

public var prefabAviao : Transform;
public var timer : float;
public var intervalo : float;
public var altura : float;
public var largura : float;
public var gerou : boolean;

function Start (){
	timer = 0;
	altura = Random.Range(6,13);
	largura = Random.Range(0,10);
	intervalo = Random.Range(5, 10);
	gerou = false;
}

function Update (){
	
	if(ControlarTutorial.tutorialFinalizou){
		timer += Time.deltaTime;
		
		if(timer > intervalo && gerou == false){
			timer = 0;
			gerou = true;
			var aviao : Transform = Instantiate(
	        	prefabAviao, new Vector3 (
	        		largura,
	        		altura,
	        		0),
	        		Quaternion.identity);
	    	
	    	if(gerou == true){
	    		intervalo = Random.Range(5, 10);
	    		altura = Random.Range(6,13);
				largura = Random.Range(0,10);
				gerou = false;
	    	}
		}
	}
}