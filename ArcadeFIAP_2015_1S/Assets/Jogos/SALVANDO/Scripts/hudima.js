#pragma strict

public static var g : gamevars;
public static var barco : barco;

public var image : Texture;
public var imagef : Texture;
public var largura:float=50;
public var altura:float=50;
public var posX:float=157;
public var posY:float=27;
public var hudp1:HUDp1;

function OnGUI(){
	//SE AJUSTA PROPORCIONALMENTE AO HUD POR UMA VARIAVEL TESTE DEFINIDA MANUALMENTE
	hudp1=GetComponent("HUDp1") as HUDp1;
	largura=(70f/220f)*hudp1.largura;
	altura=(38.2f/70f)*hudp1.altura;
	posX=(147f)/220f*hudp1.largura+hudp1.posX;
	posY=(17f)/70f*hudp1.altura+hudp1.posY;
	if(!barco.imaligado){
		var fundo : Rect = Rect(posX,posY,largura ,altura);  
   		GUI.DrawTexture (fundo , imagef );
   	}
    if(barco.imaligado){
    	var rect : Rect = Rect(posX,posY,largura ,altura);  
    	GUI.DrawTexture (rect , image );
    }
}