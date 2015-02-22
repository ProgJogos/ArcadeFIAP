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
	if (Input.GetButtonDown("Jump") && estaNoChao) {
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
	
	if (Input.GetButton("Jump") && estaNoChao && timer < tempoSubida) {
		rigidbody2D.velocity.y = velocidadePulo;
		timer += Time.fixedDeltaTime;
	}
	

	if (Mathf.Abs (rigidbody2D.velocity.x) < velocidadeMaximaX ) {
		rigidbody2D.velocity.x += Input.GetAxis ("Horizontal") * aceleracaoReal * Time.fixedDeltaTime;
	}
	
	if (Input.GetAxis ("Horizontal") != 0) {
		transform.localScale.x = Mathf.Sign (Input.GetAxis ("Horizontal"));
	}
	
	
	var coeficiente = Mathf.Abs (rigidbody2D.velocity.x) / velocidadeMaximaX;
	animator.SetFloat ("VelocidadeUnti", 1); 
}