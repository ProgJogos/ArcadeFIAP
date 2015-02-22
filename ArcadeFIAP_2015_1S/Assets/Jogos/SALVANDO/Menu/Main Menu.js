//Top Banner
var topBannerH : float;
var topBannerW : float;
//Buttons
var buttonSizeH : float;
var buttonSizeW : float;
var buttonPosY1 : float;
var buttonPosY2 : float;
var buttonPosY3 : float;
var buttonPosY4 : float;
var buttonPosY5 : float;
var buttonPosX : float;
//Bottom Banner
var bottomBannerH : float;
var bottomBannerW : float;
var bottomBannerPos : float;
var var1 : String;
var customSkin1 : GUISkin;
var customSkin2 : GUISkin;
var customSkin3 : GUISkin;

function Awake () {
	topBannerH = Screen.height*0.1;
	topBannerW = Screen.width;
	buttonSizeH = Screen.height/10;
	buttonSizeW = Screen.width/5;
	buttonPosY1 = topBannerH+200;
	buttonPosY2 = topBannerH+buttonSizeH+200;
	buttonPosY3 = topBannerH+buttonSizeH*2+200;
	buttonPosY4 = topBannerH+buttonSizeH*3+200;
	buttonPosY5 = topBannerH+buttonSizeH*4+200;
	buttonPosX = 0.5*Screen.width - 0.5 * buttonSizeW;
	bottomBannerH = Screen.height/4;
	bottomBannerW =  Screen.width;
	bottomBannerPos = topBannerH+buttonSizeH*5;	
	var1="Salvando os Animais";
}

function OnGUI() {
	GUI.skin = customSkin1;
	//Title Banner
	GUI.Box(Rect(0,0,topBannerW,topBannerH),var1);
	
	GUI.skin = customSkin2;
	//Button 1
	if (GUI.Button(Rect(buttonPosX,buttonPosY1,buttonSizeW,buttonSizeH),"New Game (A)")){
		//Application.LoadLevel("SALVANDO_level1");
	}
	//Button 2
	if (GUI.Button(Rect(buttonPosX,buttonPosY2,buttonSizeW,buttonSizeH),"Credits (B)")){
		//
	}
	//Button 3
	
	if (GUI.Button(Rect(buttonPosX,buttonPosY3,buttonSizeW,buttonSizeH),"Quit (START + MENU)")){
		GerenteArcade.i.TerminarJogo();
	}
	
	if(ArcadeFIAP.ApertouBotao(1, EBotao.A)){
		Application.LoadLevel("SALVANDO_level1");
	}
	
	if(ArcadeFIAP.ApertouBotao(1, EBotao.B)){
		Application.LoadLevel("SALVANDO_credits");
	}
	
	/*
	//Button 4
	if (GUI.Button(Rect(0,buttonPosY4,buttonSizeW,buttonSizeH),"History/Social Studies")){
		Debug.Log("Clicked the button History/Social Studiess");
	}
	//Button 5
	if (GUI.Button(Rect(0,buttonPosY5,buttonSizeW,buttonSizeH),"Science & Technical Subjects")){
		Debug.Log("Clicked the button Science & Technical Subjects");
	}
	*/
	//GUI.skin = customSkin3;
	//Bottom Banner
	//GUI.Box(Rect(0,bottomBannerPos,bottomBannerW,bottomBannerH),"we can place advertisements, links\nwhatever we want here.");
}