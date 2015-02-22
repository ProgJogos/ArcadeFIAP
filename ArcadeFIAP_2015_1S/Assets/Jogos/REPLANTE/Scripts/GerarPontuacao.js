#pragma strict

public var jogadorEvitou : Transform;
public var jogadorPlantou : Transform;
public var totalEvitou : Transform;
public var totalPlantou : Transform;

function Update(){

	jogadorEvitou.guiText.text = PlayerPrefs.GetFloat("desmatamentoEvitadoParcial").ToString("00");
	jogadorPlantou.guiText.text = PlayerPrefs.GetFloat("mudaPlantadaParcial").ToString("00");
	totalEvitou.guiText.text = PlayerPrefs.GetFloat("desmatamentoEvitadoTotal").ToString("00");
	totalPlantou.guiText.text = PlayerPrefs.GetFloat("mudaPlantadaTotal").ToString("00");
	
	if((Input.GetKeyDown(KeyCode.K)) || (Input.GetKeyDown(KeyCode.J))){
		Application.LoadLevel("Menu");
	}
}