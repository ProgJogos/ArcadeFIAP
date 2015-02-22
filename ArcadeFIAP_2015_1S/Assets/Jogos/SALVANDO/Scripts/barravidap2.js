#pragma strict

public static var g : gamevars;
public static var barco : barco;

public var image : Texture;
public var imagef : Texture;
public var largura:float;
public var altura:float=14;
public var posX:float;
public var posY:float=34;
public var hudp2:HUDp2;

function OnGUI(){
	//SE AJUSTA PROPORCIONALMENTE AO HUD POR UMA VARIAVEL TESTE DEFINIDA MANUALMENTE
	hudp2=GetComponent("HUDp2") as HUDp2;
	largura=-(80f/220f)*hudp2.largura;
	altura=(14f/70f)*hudp2.altura;
	posX=157f/220f*hudp2.largura+hudp2.posX;
	posY=(24f)/70f*hudp2.altura+hudp2.posY;
	largura=largura*motor.vidaatual/motor.vidamax;//recebe o tamanho da nova largura
	var fundo : Rect = Rect(posX,posY,-(80f/220f)*hudp2.largura ,altura);  
    GUI.DrawTexture (fundo , imagef );
    var rect : Rect = Rect(posX,posY,largura ,altura);  
    GUI.DrawTexture (rect , image );
}