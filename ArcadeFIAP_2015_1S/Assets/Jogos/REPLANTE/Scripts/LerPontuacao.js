#pragma strict

function Update () {
	guiText.text = PlayerPrefs.GetFloat("REPLANTE_pontuacaoParcial").ToString("00000");
}