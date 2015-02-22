#pragma strict

function Update () {
	guiText.text = PlayerPrefs.GetFloat("mudaPlantadaParcial").ToString("00");
}