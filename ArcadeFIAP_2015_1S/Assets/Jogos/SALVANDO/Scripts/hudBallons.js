#pragma strict

public static var g : gamevars;
public static var motor : motor;

public var image : Texture;
public var imagef : Texture;
public var largura:float=50;
public var altura:float=50;
public var posX:float=157;
public var posY:float=27;
public var hudp2:HUDp2;
public var zig : Font;

function OnGUI(){
	hudp2=GetComponent("HUDp2") as HUDp2;
	largura=70;
	altura=38;
	posX=Screen.width - 226;
	posY=27;
	//SE AJUSTA PROPORCIONALMENTE AO HUD POR UMA VARIAVEL TESTE DEFINIDA MANUALMENTE
	largura=(70f/220f)*hudp2.largura;
	altura=(38.2f/70f)*hudp2.altura;
	posX=4/220f*hudp2.largura+hudp2.posX;
	posY=(17f)/70f*hudp2.altura+hudp2.posY;
	if(g.p2balloons<=0){
		var fundo : Rect = Rect(posX,posY,largura ,altura);  
   		GUI.DrawTexture (fundo , imagef );
   	}
    if(g.p2balloons>0){
    	var rect : Rect = Rect(posX,posY,largura ,altura);  
    	GUI.DrawTexture (rect , image );
    }
    GUI.skin.font = zig; 
    GUI.skin.label.fontSize = 18;
    GUI.Label(Rect(posX+10,posY+10,largura,altura),""+g.p2balloons);
}