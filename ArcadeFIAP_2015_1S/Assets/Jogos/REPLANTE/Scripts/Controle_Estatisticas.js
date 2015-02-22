#pragma strict


function Update (){
	if (ArcadeFIAP.SoltouBotao(1, EBotao.A) || ArcadeFIAP.SoltouBotao(1, EBotao.B)){
		Application.LoadLevel ("REPLANTE_Menu");
	}
}