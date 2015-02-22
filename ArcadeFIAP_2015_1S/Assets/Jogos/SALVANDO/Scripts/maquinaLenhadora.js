#pragma strict
public static var life1:int;
public static var g : gamevars;
public var anima:Animator;
public var timer2:float;
public var player:GameObject;
public var player2:GameObject;
public var direcao:Vector3;
public var distmax:float;
var tempoatirar:float;
public var prefmuni:GameObject;
public var forcatiro:float;

function Start(){
	life1=5;
	player = GameObject.Find("Player1");
	player2 = GameObject.Find("Player2");
	forcatiro=2;
	tempoatirar=1.75;
	distmax=13;
}

function Update () {
	Atirar();
}

function Atirar(){
	direcao=player.transform.position-this.transform.position;
	if((direcao.x<distmax && direcao.y <distmax)){
		timer2+=Time.deltaTime;
		if(direcao.x>=0){
			transform.localScale.x = -Mathf.Abs(transform.localScale.x);
		}
		else{
			transform.localScale.x = Mathf.Abs(transform.localScale.x);
		}
		if(timer2>tempoatirar){
			var municao = Instantiate(prefmuni,transform.position + Vector3(-transform.localScale.x*3,transform.localScale.y*1,0),transform.rotation);
			municao.rigidbody.AddForce(direcao*forcatiro*1,ForceMode.VelocityChange);
			var municao2 = Instantiate(prefmuni,transform.position + Vector3(-transform.localScale.x*3.4,transform.localScale.y*0.7,0),transform.rotation);
			//anima.SetFloat("forcatiro",forcatiro);
			municao2.rigidbody.AddForce(direcao*forcatiro*0.8,ForceMode.VelocityChange);
			timer2=0;
		}
	}
}