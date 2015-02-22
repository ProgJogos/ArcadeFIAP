#pragma strict
public var image : Texture;
public var largura:float;
public var altura:float;
public var posX:float;
public var posY:float;
public var rect : Rect;
public var zig : Font;

function OnGUI(){

    rect = Rect(posX,posY,largura,altura);  
    GUI.DrawTexture (rect , image );
    GUI.skin.label.fontSize = 16;
    GUI.color=Color.green;
    GUI.skin.font = zig; 
    GUI.Label(Rect(posX+72,posY+57,largura,altura),"Player 1");
}