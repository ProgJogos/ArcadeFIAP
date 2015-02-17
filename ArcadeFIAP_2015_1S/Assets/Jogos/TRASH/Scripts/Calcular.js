#pragma strict

private var pontos : int;

function Update() {
	pontos = Principal.pontuacao;
    guiText.text = pontos.ToString();
}