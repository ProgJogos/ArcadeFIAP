#pragma strict

public var btnNovoJogo : Transform; // 0
public var btnEstatistica : Transform; // 1
public var btnCreditos : Transform; // 2
public var btnSelecionado : int; //guarda qual eh o botao atual

private var podeMudar : boolean;

public var ani_btn_NovoJogo : Animator;
public var ani_btn_Estatistica : Animator;
public var ani_btn_Creditos : Animator;

function Start () {
	btnSelecionado = 0;
	podeMudar = true;
	ani_btn_NovoJogo.SetBool("Idle", false);
	ani_btn_Estatistica.SetBool("btn_Rec_Sel", false);
	ani_btn_Creditos.SetBool("btn_Cred_Sel", false);
}

function Update () {
	
	var botaoAtual : Transform;

	switch (btnSelecionado){
		case 0:
			
			botaoAtual = btnNovoJogo;
			
			transform.position.y = -0.5143363;
							
			ani_btn_NovoJogo.SetBool("Idle", false);
			ani_btn_Estatistica.SetBool("btn_Rec_Sel", false);
			ani_btn_Creditos.SetBool("btn_Cred_Sel", false);
			
			if (ArcadeFIAP.SoltouBotao(1, EBotao.A)){
				Application.LoadLevel("REPLANTE_Historia");
				CalcularPontuacao.pontosParciais = 0;
				CalcularPontuacao.qtdDesmatamentoEvitadoParcial = 0;
				CalcularPontuacao.qtdMudaPlantadaParcial = 0;
			}
			break;
			
		case 1:
			
			botaoAtual = btnEstatistica;
			
			transform.position.y = -1.500662;
			
			ani_btn_NovoJogo.SetBool("Idle", true);
			ani_btn_Estatistica.SetBool("btn_Rec_Sel", true);
			ani_btn_Creditos.SetBool("btn_Cred_Sel", false);
			
			//checa se o botao de acao for solto
			if (ArcadeFIAP.SoltouBotao(1, EBotao.A)){
				Application.LoadLevel("REPLANTE_Estatisticas");
			}
			break;
			
		case 2:
		
			botaoAtual = btnCreditos;
			
			transform.position.y = -2.314954;
			
			ani_btn_NovoJogo.SetBool("Idle", true);
			ani_btn_Estatistica.SetBool("btn_Rec_Sel", false);
			ani_btn_Creditos.SetBool("btn_Cred_Sel", true);
		
			//checa se o botao de acao for solto
			if (ArcadeFIAP.SoltouBotao(1, EBotao.A)){
				Application.LoadLevel("REPLANTE_Creditos");
			}
			break;
	}
	
	//MUDAR ENTRE BOTOES PELO INPUT
	var direcao = ArcadeFIAP.Eixo(1, EEixo.VERTICAL);
	//quero diminuir o btnSelecionado
	if (direcao > 0 && podeMudar){
		btnSelecionado--;
		podeMudar = false;
		if (btnSelecionado < 0) btnSelecionado = 0;
	}
	//quer aumentar o btnSelecionado
	if (direcao < 0 && podeMudar){
		btnSelecionado++;
		podeMudar = false;
		if (btnSelecionado > 2) btnSelecionado = 2;
	}
	//destrava mudanca de botao
	if (direcao == 0){
		podeMudar = true;
	}
	
}