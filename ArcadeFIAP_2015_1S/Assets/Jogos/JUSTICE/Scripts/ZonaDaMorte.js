#pragma strict

//Variaveis
//---------
public var Heroi : JusticeMovimento;

//Start
//-----
function Start () {
	Heroi = GameObject.Find("Jogador").GetComponent.<JusticeMovimento>();
}

//Function Trigger
//----------------
function OnTriggerEnter(objeto:Collider) {
	if (objeto.gameObject.CompareTag("Player")) {
		Heroi.vida -=1;
		if(Heroi.vida > 0){			
			Application.LoadLevel("JUSTICE_Cena1");			
		}else{
			 Application.LoadLevel("JUSTICE_Inicio");		
		}				
	}else {
		Destroy(objeto.gameObject);
	
	}
}