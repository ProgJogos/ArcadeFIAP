#pragma strict

public static var g : gamevars;
public static var barco : barco;

public var image : Texture;
public var imagef : Texture;
public var largura:float;
public var altura:float=14;
public var posX:float=72;
public var posY:float=34;
public var hudp1:HUDp1;

function OnGUI(){
	//SE AJUSTA PROPORCIONALMENTE AO HUD POR UMA VARIAVEL TESTE DEFINIDA MANUALMENTE
	hudp1=GetComponent("HUDp1") as HUDp1;
	largura=(81f/220f)*hudp1.largura+1;
	altura=(14f/70f)*hudp1.altura;
	posX=(63f)/220f*hudp1.largura+hudp1.posX;
	posY=(24f)/70f*hudp1.altura+hudp1.posY;
	largura=largura*barco.vidaatual/barco.vidamax;//recebe o tamanho da nova largura
	var fundo : Rect = Rect(posX,posY,(81f/220f)*hudp1.largura ,altura);  
    GUI.DrawTexture (fundo , imagef );
    var rect : Rect = Rect(posX,posY,largura ,altura);  
    GUI.DrawTexture (rect , image );
}