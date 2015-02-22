#pragma strict

private var pai : ControlarPersonagemUnti;

function Start () {
	pai = transform.parent.GetComponent.<ControlarPersonagemUnti>();
}

function OnTriggerEnter2D () {
	pai.estaNoChao = true;
	pai.animator.SetFloat("PulandoUnti", 0);
}

function OnTriggerExit2D () {
	pai.estaNoChao = false;
	
}