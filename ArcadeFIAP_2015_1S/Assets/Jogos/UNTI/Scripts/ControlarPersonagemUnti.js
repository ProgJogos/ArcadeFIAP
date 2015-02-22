#pragma strict

public var aceleracaoX : float;
public var velocidadeMaximaX : float;
public var arrastoChao : float;
public var animator : Animator;
public var estaNoChao : boolean;
public var velocidadePulo : float;
public var tempoSubida : float;
public var pulando : boolean;
public var timer : float;
public var modificadorAr : float;

function Start () {
	animator = GetComponentInChildren.<Animator>();
}

function Update () {
	if (ArcadeFIAP.ApertouBotao(1, EBotao.B) && estaNoChao) {
		estaNoChao = false;
		timer = 0;
		animator.SetFloat ("PulandoUnti", 1);
		
	}
}

function FixedUpdate () {
	
	var aceleracaoReal = aceleracaoX;
	
	if (estaNoChao) {
		rigidbody2D.drag = arrastoChao;
	}
	else {
		rigidbody2D.drag = 0;
		aceleracaoReal *= modificadorAr;
	}
	
	if (ArcadeFIAP.BotaoApertado(1, EBotao.B) && estaNoChao && timer < tempoSubida) {
		rigidbody2D.velocity.y = velocidadePulo;
		timer += Time.fixedDeltaTime;
	}
	

	if (Mathf.Abs (rigidbody2D.velocity.x) < velocidadeMaximaX ) {
		rigidbody2D.velocity.x += ArcadeFIAP.Eixo(1, EEixo.HORIZONTAL) * aceleracaoReal * Time.fixedDeltaTime;
	}
	
	if (ArcadeFIAP.Eixo(1, EEixo.HORIZONTAL) != 0) {
		transform.localScale.x = Mathf.Sign (ArcadeFIAP.Eixo(1, EEixo.HORIZONTAL));
	}
	
	
	var coeficiente = Mathf.Abs (rigidbody2D.velocity.x) / velocidadeMaximaX;
	animator.SetFloat ("VelocidadeUnti", 1); 
}