#pragma strict

var andar:float;
public var anima:Animator;
public static var life2:int;
public static var g : gamevars;
public var left:GameObject;
public var right:GameObject;
public var prefmuni:GameObject;
public var forcatiro:float;
public var player:GameObject;
public var player2:GameObject;
public var direcao:Vector3;
public var distmax:float;
var tempoandar:float;
var timer :float;
var timer2 :float;
var tempoatirar:float;

function Start () {
	left = GameObject.Find("left");
	right = GameObject.Find("right");
	player = GameObject.Find("Player1");
	player2 = GameObject.Find("Player2");
	life2=3;
	forcatiro=2;
	tempoatirar=3;
	distmax=7;
}

function OnCollisionEnter(col:Collision){
	andar = -andar;
}

function Update () {
	if(life2>0){
		if(andar==0){
			Atirar();
		}
		limitarMapa();
	}
	if(!Atirar()){
		Defensivo();
	}
}

function Defensivo(){
	timer += Time.deltaTime;
	animarLenhador();
	if(timer<tempoandar && timer>0){
		rigidbody.velocity.x = andar; //velocidade de andar
	}
	if(timer>tempoandar){
		timer = -tempoandar/3; // tempo para ficar parado
		tempoandar = parseFloat(Random.Range(1,3))*5; //tempo de andar sorteado e multiplicado
		andar = parseFloat(Random.Range(0,3))-1;//valor sorteado e subtraido 1 velocidade de andar
	}
}
function animarLenhador(){
	//variavel da animaçao
	anima.SetFloat("andando", Mathf.Abs(rigidbody.velocity.x));
	//FLIP HORIZONTAL
	if(this.rigidbody.velocity.x>0){
		transform.localScale.x=Mathf.Abs(transform.localScale.x);
	}
	if(this.rigidbody.velocity.x<0){
		transform.localScale.x=-Mathf.Abs(transform.localScale.x);
	}
	if(this.rigidbody.velocity==0){
		anima.SetFloat("andando", 0);
	}
}

function limitarMapa(){
	transform.position = Vector3(Mathf.Clamp(transform.position.x,left.transform.position.x-10,right.transform.position.x+10),
	transform.position.y,
	transform.position.z);
}

function Atirar(){
	direcao=player2.transform.position-this.transform.position;
	if((direcao.x<distmax && direcao.y <distmax)){
		timer2+=Time.deltaTime;
		if(direcao.x>0){
			transform.localScale.x = Mathf.Abs(transform.localScale.x);
		}
		else{
			transform.localScale.x = -Mathf.Abs(transform.localScale.x);
		}
		if(timer2>tempoatirar){
			anima.SetTrigger("atirando");
		}
		if(timer2>tempoatirar+1){
			var municao = Instantiate(prefmuni,transform.position + Vector3(transform.localScale.x*0.5,transform.localScale.y*0.5,0),transform.rotation);
			municao.rigidbody.AddForce(direcao*forcatiro,ForceMode.VelocityChange);
			timer2=0;
		}
	}
	return true;
}