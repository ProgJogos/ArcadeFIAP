#pragma strict

function Update () {
	guiText.text = PlayerPrefs.GetFloat("REPLANTE_mudaPlantadaTotal").ToString("00");
}