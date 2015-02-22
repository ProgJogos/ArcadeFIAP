#pragma strict


function Update (){
	if (ArcadeFIAP.ApertouBotao(1, EBotao.A) || ArcadeFIAP.ApertouBotao(1, EBotao.B)){
		Application.LoadLevel("REPLANTE_Inicio");
	}
}