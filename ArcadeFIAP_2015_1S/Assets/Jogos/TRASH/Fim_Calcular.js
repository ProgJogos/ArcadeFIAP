#pragma strict

private var pontos : int;

function Update() {
	pontos = Principal.pontuacao;
    GetComponent(TextMesh).text = pontos.ToString();
}