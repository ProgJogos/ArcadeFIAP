#pragma strict

public static var hp : float;
public static var hp_1de2 : boolean;
public static var hp_0de2 : boolean;
public var tempoFimTutorial8 : float;
public var tempoComeca : boolean;

function Start () {
	hp = 2;
	hp_0de2 = false;
	hp_1de2 = false;
	tempoComeca = false;
	tempoFimTutorial8 = 0;
}

function Update (){
	if(tempoComeca == true){
		tempoFimTutorial8 += Time.deltaTime;
		
		if(tempoFimTutorial8 >= 1){
			ControlarTutorial.tutorial8 = false;
		}
	}
}

function OnCollisionEnter2D (colisao : Collision2D){
	
	if(colisao.gameObject.CompareTag("Fezes")){
		hp -= 1;
		hp_1de2 = true;
		Destroy(colisao.gameObject);
		Jogador_Atirar_Fezes.atirou = false;
		
		if(hp <= 0){
			hp_1de2 = false;
			hp_0de2 = true;
			CalcularPontuacao.pontosParciais += 60;
			tempoComeca = true;
		}
	}
}

function TocarSom (){
	audio.PlayOneShot (audio.clip);
}