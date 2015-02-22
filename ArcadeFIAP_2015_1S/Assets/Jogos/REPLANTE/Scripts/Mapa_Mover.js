#pragma strict

public static var vMovimento : float;

function Update () {
	
	if(ControlarTutorial.tutorialFinalizou == true){
	
		if((CalcularPontuacao.pontosParciais >= 0) && (CalcularPontuacao.pontosParciais < 200)) {
			transform.position.x -= 0.04f;
			vMovimento = 0.0001f;
		}
		
		else if((CalcularPontuacao.pontosParciais >= 200) && (CalcularPontuacao.pontosParciais < 800)){
			transform.position.x -= 0.05f;
			vMovimento = 0.0002f;
		}
			
		else if((CalcularPontuacao.pontosParciais >= 800) && (CalcularPontuacao.pontosParciais < 1200)){
			transform.position.x -= 0.06f;
			vMovimento = 0.0004f;
		}
		
		else if((CalcularPontuacao.pontosParciais >= 1200) && (CalcularPontuacao.pontosParciais < 1600)){
			transform.position.x -= 0.08f;
			vMovimento = 0.0005f;
		}
		
		else if((CalcularPontuacao.pontosParciais >= 1600) && (CalcularPontuacao.pontosParciais < 2000)){
			transform.position.x -= 0.10f;
			vMovimento = 0.0006f;
		}
		
		else if((CalcularPontuacao.pontosParciais >= 2000) && (CalcularPontuacao.pontosParciais < 2400)){
			transform.position.x -= 0.12f;
			vMovimento = 0.0007f;
		}
		
		else if((CalcularPontuacao.pontosParciais >= 2400) && (CalcularPontuacao.pontosParciais < 3000)){
			transform.position.x -= 0.14f;
			vMovimento = 0.0008f;
		}
		
		else if((CalcularPontuacao.pontosParciais >= 3000) && (CalcularPontuacao.pontosParciais < 4000)){
			transform.position.x -= 0.16f;
			vMovimento = 0.0009f;
		}
		
		else if((CalcularPontuacao.pontosParciais >= 4000) && (CalcularPontuacao.pontosParciais < 6000)){
			transform.position.x -= 0.18f;
			vMovimento = 0.001f;
		}
		
		else if((CalcularPontuacao.pontosParciais >= 6000)){
			transform.position.x -= 0.20f;
			vMovimento = 0.0011f;
		}
	}
}