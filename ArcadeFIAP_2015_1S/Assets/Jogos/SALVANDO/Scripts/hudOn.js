#pragma strict
public static var g : gamevars;
public static var barco : barco;
public var zig : Font;
public var largura:float;
public var altura:float;
public var myStyle : GUIStyle;
public var heart:Texture;

function OnGUI () {
	largura=300;
	altura=40;
	//DEFINE A POSICAO DOS CORAÇOEZINHOS E A QUANTIDADE
	if(g.lifes==3){
    	GUI.Label(Rect(Screen.width/2-largura/1.7,40,largura,altura),heart,myStyle);
    	GUI.Label(Rect(Screen.width/2-largura/2,40,largura,altura),heart,myStyle);
    	GUI.Label(Rect(Screen.width/2-largura/2.4,40,largura,altura),heart,myStyle);
	}
	if(g.lifes==2){
    	GUI.Label(Rect(Screen.width/2-largura/1.7,40,largura,altura),heart,myStyle);
    	GUI.Label(Rect(Screen.width/2-largura/2,40,largura,altura),heart,myStyle);
	}	
	if(g.lifes==1){
    	GUI.Label(Rect(Screen.width/2-largura/1.7,40,largura,altura),heart,myStyle);
	}
    GUI.Label(Rect(Screen.width/2-largura/2,20,largura,altura),"Score: " + g.score,myStyle);
}