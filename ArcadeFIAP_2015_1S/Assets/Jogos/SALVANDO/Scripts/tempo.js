#pragma strict
public static var g : gamevars;
public static var timer : float;
public static var subtrairscore:int;
public var myStyle : GUIStyle;
public var largura:float;
public var altura:float;
public var tempoinicial:float;

function Start () {
	timer = 0;
	largura=200;
	altura=30;
	tempoinicial=360;
}

function Update () {
	timer += Time.deltaTime;
	if (timer > 0) {
		tempoinicial -= timer;
		timer = 0;	
	}
}

function OnGUI(){
    GUI.Label(Rect(Screen.width/2-largura/2,5,largura,altura),"Tempo: " + parseInt(tempoinicial),myStyle);
}