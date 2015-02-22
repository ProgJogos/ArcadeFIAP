#pragma strict

function Update () {
	guiText.text = PlayerPrefs.GetFloat("pontuacaoParcial").ToString("00000");
}