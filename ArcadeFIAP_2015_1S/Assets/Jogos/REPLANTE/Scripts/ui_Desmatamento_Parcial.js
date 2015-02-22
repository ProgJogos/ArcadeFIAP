#pragma strict

function Update () {
	guiText.text = PlayerPrefs.GetFloat("desmatamentoEvitadoParcial").ToString("00");
}