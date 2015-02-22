#pragma strict
var topBannerH : float;
var topBannerW : float;
var buttonSizeH : float;
var buttonSizeW : float;
var buttonPosY1 : float;
var buttonPosX : float;
var customSkin1 : GUISkin;

function Start () {	
	topBannerH = Screen.height*0.1;
	topBannerW = Screen.width;
	buttonSizeH = Screen.height/10;
	buttonSizeW = Screen.width/5;
	buttonPosY1 = 600;
	buttonPosX = 0.5*Screen.width - 0.5 * buttonSizeW;
}

function Update () {

}
function OnGUI() {
	GUI.skin = customSkin1;
	GUI.Box(Rect(0,0,topBannerW,topBannerH),"Vitor Caetano");
	GUI.Box(Rect(0,100,topBannerW,topBannerH),"Lucas Silva");
	GUI.Box(Rect(0,200,topBannerW,topBannerH),"Samuel");
	GUI.Box(Rect(0,300,topBannerW,topBannerH),"Aurelio");
	if (GUI.Button(Rect(buttonPosX,buttonPosY1,buttonSizeW,buttonSizeH),"Voltar (B)")){
		
	}
	if(ArcadeFIAP.ApertouBotao(1, EBotao.B)){
		Application.LoadLevel("SALVANDO_Inicio");
	}
}