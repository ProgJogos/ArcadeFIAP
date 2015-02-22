#pragma strict

function Update () {
	guiText.text = PlayerPrefs.GetFloat("REPLANTE_desmatamentoEvitadoParcial").ToString("00");
}