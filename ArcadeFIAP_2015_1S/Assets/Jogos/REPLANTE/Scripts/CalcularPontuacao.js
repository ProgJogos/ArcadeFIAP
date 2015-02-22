#pragma strict

public static var pontosParciais : float;
public static var qtdDesmatamentoEvitadoParcial : float;
public static var qtdDesmatamentoEvitadoTotal : float;
public static var qtdMudaPlantadaParcial : float;
public static var qtdMudaPlantadaTotal : float;

function Update (){
	PlayerPrefs.SetFloat("REPLANTE_pontuacaoParcial", pontosParciais);
	PlayerPrefs.SetFloat("REPLANTE_desmatamentoEvitadoParcial", qtdDesmatamentoEvitadoParcial);
	PlayerPrefs.SetFloat("REPLANTE_mudaPlantadaParcial", qtdMudaPlantadaParcial);
	PlayerPrefs.SetFloat("REPLANTE_desmatamentoEvitadoTotal", qtdDesmatamentoEvitadoTotal);
	PlayerPrefs.SetFloat("REPLANTE_mudaPlantadaTotal", qtdMudaPlantadaTotal);
}