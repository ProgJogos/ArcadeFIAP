#pragma strict

public var btnSair : Transform; //0
public var btnPontos : Transform;//1

public var btnSelecionado : int;

public var suavizacao : float = 2f;
public var podeMudar : boolean;

var somConfirma : AudioSource;

function Start () {
	btnSelecionado = 0;
	podeMudar = true;
}

function Update () {

	var botaoAtual : Transform;
	
	switch (btnSelecionado) {
	
	case 0 :
		botaoAtual = btnSair;
		
		if (Input.GetKeyDown(KeyCode.V) ||
			Input.GetKeyDown (KeyCode.Return)) {
			somConfirma.Play ();
			Application.LoadLevel("TRASH_Inicio");
		}
	break;
		
	case 1 :
			botaoAtual = btnPontos;
	break;
	
	}


if (podeMudar == true) {
	transform.forward =
		Vector3.Slerp(
			transform.forward,
			botaoAtual.position - transform.position,
			Time.deltaTime * suavizacao);
	botaoAtual.forward = transform.forward;
}

//mudar entre botoes pelo input
	var direcao = ArcadeFIAP.Eixo(1, EEixo.VERTICAL);
	//quer diminuir o btnSelecionado
	if (direcao > 0 && podeMudar) {
		btnSelecionado--;
		podeMudar = false;
		if (btnSelecionado < 0) btnSelecionado = 0;
	}
	//quer aumentar o btnSelecionado
	if (direcao < 0 && podeMudar) {
		btnSelecionado++;
		podeMudar = false;
		if (btnSelecionado > 1) btnSelecionado = 1;
	}
		
	
	//destrava mudança de botao
	if (direcao == 0){
		podeMudar = true;
	}
}