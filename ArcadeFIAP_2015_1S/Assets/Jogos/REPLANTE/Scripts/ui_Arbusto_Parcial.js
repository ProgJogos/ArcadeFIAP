#pragma strict

function Update () {
	guiText.text = PlayerPrefs.GetFloat("REPLANTE_mudaPlantadaParcial").ToString("00");
}