#pragma strict

public static var g : gamevars;
public static var motor : motor;

public var image : Texture;
public var imagef : Texture;
public var largura:float;
public var altura:float=9;
public var posX:float=512;
public var posY:float=50;
public var hudp2:HUDp2;

function OnGUI(){
	hudp2=GetComponent("HUDp2") as HUDp2;
	posX=Screen.width - ((100/g.forcamaxima)*g.forcamaxima-28);
	//SE AJUSTA PROPORCIONALMENTE AO HUD POR UMA VARIAVEL TESTE DEFINIDA MANUALMENTE
	largura=(80f/220f)*hudp2.largura;
	altura=(7f/70f)*hudp2.altura;
	posX=157f/220f*hudp2.largura+hudp2.posX;
	posY=(41.3f)/70f*hudp2.altura+hudp2.posY;
	largura=-81*motor.forcatiro/g.forcamaxima;
	var fundo : Rect = Rect(posX,posY,-(80f/220f)*hudp2.largura ,altura);  
    GUI.DrawTexture (fundo , imagef );
    var rect : Rect = Rect(posX,posY,largura ,altura);  
    GUI.DrawTexture (rect , image );
}