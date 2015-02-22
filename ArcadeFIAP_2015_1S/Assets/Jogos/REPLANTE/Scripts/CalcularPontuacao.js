#pragma strict

public static var pontosParciais : float;
public static var qtdDesmatamentoEvitadoParcial : float;
public static var qtdDesmatamentoEvitadoTotal : float;
public static var qtdMudaPlantadaParcial : float;
public static var qtdMudaPlantadaTotal : float;

function Update (){
	PlayerPrefs.SetFloat("pontuacaoParcial", pontosParciais);
	PlayerPrefs.SetFloat("desmatamentoEvitadoParcial", qtdDesmatamentoEvitadoParcial);
	PlayerPrefs.SetFloat("mudaPlantadaParcial", qtdMudaPlantadaParcial);
	PlayerPrefs.SetFloat("desmatamentoEvitadoTotal", qtdDesmatamentoEvitadoTotal);
	PlayerPrefs.SetFloat("mudaPlantadaTotal", qtdMudaPlantadaTotal);
}