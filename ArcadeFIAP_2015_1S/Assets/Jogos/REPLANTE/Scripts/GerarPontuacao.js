#pragma strict

public var jogadorEvitou : Transform;
public var jogadorPlantou : Transform;
public var totalEvitou : Transform;
public var totalPlantou : Transform;

function Update(){

	jogadorEvitou.guiText.text = PlayerPrefs.GetFloat("REPLANTE_desmatamentoEvitadoParcial").ToString("00");
	jogadorPlantou.guiText.text = PlayerPrefs.GetFloat("REPLANTE_mudaPlantadaParcial").ToString("00");
	totalEvitou.guiText.text = PlayerPrefs.GetFloat("REPLANTE_desmatamentoEvitadoTotal").ToString("00");
	totalPlantou.guiText.text = PlayerPrefs.GetFloat("REPLANTE_mudaPlantadaTotal").ToString("00");
	
	if(ArcadeFIAP.ApertouBotao(1, EBotao.A) || ArcadeFIAP.ApertouBotao(1, EBotao.B)){
		Application.LoadLevel("REPLANTE_Menu");
	}
}