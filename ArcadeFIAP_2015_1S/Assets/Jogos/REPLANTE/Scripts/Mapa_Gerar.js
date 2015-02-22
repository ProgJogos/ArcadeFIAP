#pragma strict

public var prefabMapa1 : Transform;
public var prefabMapa2 : Transform;
public var prefabMapa3 : Transform;
public var randomMapa : float;
public var gerou : boolean;
public static var flag : boolean;

function Start (){
	flag = false;
	gerou = false;
}

function Update (){
	if(flag == false && gerou == false){
		randomMapa = Random.Range(1,4);
		gerou = true;
	}
}

function OnTriggerEnter2D(outro : Collider2D) {
	if(outro.gameObject.CompareTag("GerarMapa") && flag == false){
		
		if(randomMapa == 1){
			flag = true;
			Instantiate(
        	prefabMapa1, new Vector3 (24, 6.642818, 0), Quaternion.identity);
        }
		
		else if (randomMapa == 2){
			flag = true;
			Instantiate(
        	prefabMapa2, new Vector3 (24, 6.642818, 0), Quaternion.identity);
        }
        
		else if (randomMapa == 3){
			flag = true;
			Instantiate(
        	prefabMapa3, new Vector3 (24, 6.642818, 0), Quaternion.identity);
        }
	}
}

function OnTriggerExit2D (outro : Collider2D){
	if(outro.gameObject.CompareTag("GerarMapa")){
		flag = false;
		gerou = false;
	}
}