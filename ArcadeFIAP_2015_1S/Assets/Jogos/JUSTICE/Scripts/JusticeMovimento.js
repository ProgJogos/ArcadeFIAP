#pragma strict

@script RequireComponent(AudioSource)

public var velocidade : float; //Velocidade
public var forcaPulo:float; //Força do Pulo
public var HP : float =  10; // HP do personagem
public var particula: ParticleSystem; //Sistema de particulas
public var posicaoParticula : Transform; //Posicao da particula
public var vida : int; // Vidas do jogador
public var _anim : Animator; //Animator
private var _input : float; //Input
private var _posicao : Vector3; //Posiçao do heroi
private var _velocidadeInicial : float = 0; // Variavel de velocidade
private var _damp : float = 0.5; //Freio
private var _direcao : float; //direçao pra onde o heroi deve se mover
private var _detectaChao : TaNoChao;
public var _pulou : boolean;

function Start () {
	_anim = GetComponent.<Animator>();
	_detectaChao = GetComponentInChildren.<TaNoChao>();	
}

function Update () {
	// pega o valor do input e toca a animaçao de corrida
	_input = ArcadeFIAP.Eixo(1,EEixo.HORIZONTAL);
		if (_input > 0) {
			_anim.SetBool("Correndo", true);
			transform.forward = Vector3.right;
		}
		else if (_input < 0) {
			_anim.SetBool("Correndo", true);
			transform.forward = -Vector3.right;
		}
		else {
			_anim.SetBool("Correndo", false);
		} 
	//transforma o input numa direçao		  
	_direcao = Mathf.SmoothDamp(_velocidadeInicial, velocidade * _input, _damp, Time.deltaTime);
	//aplica a direcao num vetor
	_posicao = Vector3(_direcao, 0, 0);	
	_pulou =(ArcadeFIAP.ApertouBotao(1, EBotao.A)) ? true : false;

	//Pulo	
	if (_pulou && _detectaChao._podePular){
		_anim.SetTrigger("Pulou");
		rigidbody.drag = 0;
		rigidbody.AddForce(Vector3.up * rigidbody.mass * 12.5f, ForceMode.Impulse);
		_detectaChao._podePular = false;
		Debug.Log("Pulou!");
	}
	
	if (HP < 1){
		Debug.Log("Heroi Morreu!");
		vida -= 1;
		WASTED();
	}
}

//Fixed Update
//------------
function FixedUpdate(){
	//Move o personagem
	//-----------------
	rigidbody.MovePosition(rigidbody.position + _posicao * Time.deltaTime);	
}

//Particulas
//----------
function particulaChao(){
	Instantiate(particula, posicaoParticula.transform.position, posicaoParticula.transform.rotation);
	audio.Play();
	
}

//Funcao que gerencia a vida do personagem
//----------------------------------------
function WASTED(){
	if(vida < 0){ //-- Se a vida for menor que 0, mostra a tela de Game Over(pendente) e retorna pro menu inicial --
		Debug.Log("Heroi Morreu!");
		_anim.SetBool("Morreu", true);
		yield WaitForSeconds(3);
		Application.LoadLevel("MenuTeste");
		
	}else{ //-- Do contrario, apenas reinicia a fase --
		Debug.Log("Heroi Morreu!");
		_anim.SetBool("Morreu", true);
		yield WaitForSeconds(3);
		Application.LoadLevel("Cena1");
	}
}

