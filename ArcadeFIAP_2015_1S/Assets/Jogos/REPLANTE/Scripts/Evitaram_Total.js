#pragma strict

function Update () {
	guiText.text = PlayerPrefs.GetFloat("desmatamentoEvitadoTotal").ToString("00");
}