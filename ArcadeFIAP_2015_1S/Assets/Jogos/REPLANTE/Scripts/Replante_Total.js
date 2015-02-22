#pragma strict

function Update () {
	guiText.text = PlayerPrefs.GetFloat("mudaPlantadaTotal").ToString("00");
}