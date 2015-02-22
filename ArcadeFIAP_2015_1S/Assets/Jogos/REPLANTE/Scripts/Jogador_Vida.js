#pragma strict

public var animador : Animator;
public static var curLife : float;

function Start () {
	animador = GetComponent("Animator") as Animator;
	curLife = 1;
	animador.SetFloat("Vida", 1);
}

function Update () {

	if(curLife == 1){
		animador.SetFloat("Vida", 1);
	}
	else if(curLife <= 0){
		animador.SetFloat("Vida", 0);
		Application.LoadLevel("REPLANTE_GameOver");
		CalcularPontuacao.qtdMudaPlantadaTotal += CalcularPontuacao.qtdMudaPlantadaParcial;
		CalcularPontuacao.qtdDesmatamentoEvitadoTotal += CalcularPontuacao.qtdDesmatamentoEvitadoParcial;
	}
}