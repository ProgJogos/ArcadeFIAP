#pragma strict
public var image : Texture;
public var largura:float;
public var altura:float;
public var posX:float;
public var posY:float;
public var zig : Font;

function OnGUI(){
	posX=Screen.width-(largura+10);
    var rect : Rect = Rect(posX,posY,largura,altura);  
    GUI.DrawTexture (rect , image );
    GUI.skin.label.fontSize = 16;
    GUI.skin.font = zig; 
    GUI.color=Color.red;
    GUI.Label(Rect(posX+largura-174,posY+57,largura,altura),"Player 2");
}