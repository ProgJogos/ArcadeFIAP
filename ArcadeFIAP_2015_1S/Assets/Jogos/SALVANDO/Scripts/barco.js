#pragma strict
//statics
public static var g : gamevars;
public static var b : buttonconfig;
public static var j : jaula;
public static var velocidadeatual:Vector3;//velocidade atual

	//Animaçao
public var anima:Animator;
public var animabarco:Animator;

//Transforms
public var agua: Transform;
public var p2prefballoon: Transform;
public var prefondas: Transform;
public var explosao:Transform;
//vars
public static var imaligado:boolean;
public static var hit : RaycastHit;
private var horizontal:float;
private var vertical:float;
public static var litrosmax:float;
public static var litros:float;
public static var vidaatual:float=100;//vida atual
public static var vidamax:float=100;//vida maxima
public var dano : tomarDano;
public var player1 : GameObject;
public var barco : GameObject;
public var player2 : GameObject;
public var timer:float;
public var flutuando:boolean;

function Start(){
	player1= GameObject.Find("Player1");
	barco = GameObject.Find("barco");
	player2 = GameObject.Find("Player2");
	litrosmax=10;
	g.p1nobarco=true;
	g.p2nobarco=true;
	litros=litrosmax;
	g.score=0;
	dano = GetComponent("tomarDano") as tomarDano;
	flutuando=true;
}

function Update(){
	velocidadeatual = this.rigidbody.velocity;
	if(vidaatual>0){
		moverBarco();
	}
	else{
		g.p2nobarco=false;
		Posicoes();
		this.renderer.enabled=false;
	}
	if(vidaatual<0) vidaatual = 0;
}

function FixedUpdate(){
}

//Colisoes
function OnCollisionEnter(col:Collision){
	var distancia = this.gameObject.transform.position - col.gameObject.transform.position;
	if(col.gameObject.CompareTag("lenhador")){
			this.gameObject.rigidbody.velocity.x=Mathf.Sign(distancia.x)*5;
			this.gameObject.rigidbody.velocity.y=Mathf.Sign(distancia.y)*2;
			//toma hit
			vidaatual -= 10;
			animabarco.SetTrigger("hit");
	}
}
function OnCollisionStay(col:Collision){
	if(col.gameObject.CompareTag("chao")){
		flutuando=false;	
	}
}
function OnCollisionExit(col:Collision){
	if(col.gameObject.CompareTag("chao")){
		flutuando=true;	
	}
}

function moverBarco(){
	//Direcional
	flutuarBarco();
	//ATIRAR AGUA (P1)
	if (Input.GetKey(b.barco_p1b1)){
		atirarAgua("player1");
	}
	//IMA (P1)
	if (Input.GetKeyDown(b.barco_p1b2)){
		if(!imaligado) imaligado = true;
		else imaligado = false;
	}
	if(imaligado){
		ligarIma();
	}
	else{
		Destroy(GameObject.FindGameObjectWithTag("ondas"));
	}
	if(g.p2nobarco==true){ //Se o p2 tiver no barco
		//ATIRAR (P2)
		if (Input.GetKeyDown(b.barco_p2b2) && g.p2balloons>0){
			atirarAgua("player2");
		}
		else{
			anima.SetFloat("balao",0);
		}
		//PULAR DO BARCO (P2)
		if(Input.GetKeyDown(b.barco_p2b1)){
			g.p2nobarco=false;
			player2.rigidbody.velocity*=0;
		}
	}
	Posicoes();
}

function flutuarBarco(){
	//FLIP HORIZONTAL DA ANIMACAO
	if(ArcadeFIAP.Eixo(1, EEixo.HORIZONTAL)>0){
		transform.localScale.x = Mathf.Abs(transform.localScale.x);
	}
	else if(Mathf.Sign(ArcadeFIAP.Eixo(1, EEixo.HORIZONTAL))<0){
		transform.localScale.x = -Mathf.Abs(transform.localScale.x);
	}
	//APENAS CONTROLA A DIREÇAO DO BARCO
	this.rigidbody.velocity.x =  Vector3.Lerp(rigidbody.velocity,transform.right * ArcadeFIAP.Eixo(1, EEixo.HORIZONTAL)*g.velocidadeh, 0.03f).x;
	this.rigidbody.velocity.y = Vector3.Lerp(rigidbody.velocity,transform.up * ArcadeFIAP.Eixo(1, EEixo.HORIZONTAL)*g.velocidadev, 1f).y;
	if(flutuando){
		timer+=Time.deltaTime;
		if(timer<1){
			rigidbody.velocity.y += timer*0.3;
		}
		else if(timer>=1){
			timer=-1;
		}
	}
}

public function ligarIma(){
	var o:Transform;
	if(!GameObject.FindGameObjectWithTag("ondas")){
		o = Instantiate(prefondas,transform.position,prefondas.rotation) as Transform;
	}
	else{
		GameObject.FindGameObjectWithTag("ondas").transform.position = transform.position+Vector3(transform.localScale.x*0,-transform.localScale.y*0.55,0);
	}
	if (Physics.Raycast(transform.position, Vector3.down, hit,g.distima)) {
		var distanceToGround = hit.distance;
		var obj = hit.collider;
		if(hit.collider.tag=="ferro"){
			hit.collider.rigidbody.velocity.y=2;			
		}
	}
}

public function atirarAgua(p){
	switch(p){
		case "player1":
			if(litros>0){
				var p1jato : Transform = Instantiate(agua,transform.position + Vector3(-transform.localScale.x*0.74,-transform.localScale.y*0.61,0), agua.rotation) as Transform;
				p1jato.transform.parent = this.transform;	
				litros = litros - 0.01;
				}
			else litros=0;
			break;
		case "player2":
			if(!GameObject.FindWithTag("bexiga")){
				var p2b : Transform = Instantiate(p2prefballoon,transform.position+Vector3(-transform.localScale.x*1.4,-transform.localScale.y*0.2,0), p2prefballoon.rotation) as Transform;
				p2b.rigidbody.velocity.y=-3;
				g.p2balloons -= 1;
				anima.SetFloat("balao",1);
			}
		break;
		default:
		break;
	}
}

public function Explodir(){
	var particulas: Transform = Instantiate(explosao,transform.position,transform.rotation) as Transform;
	Destroy(transform.gameObject);
	Destroy(particulas.gameObject,5);
	if(g.p2nobarco){
		g.p2nobarco=false;
		player2.rigidbody.velocity*=0;
	}
	if(g.p1nobarco){
		g.p1nobarco=false;
		player1.rigidbody.velocity*=0;
	}
}

public function Posicoes(){
	if(g.p1nobarco){
		player1.transform.position=barco.transform.position+Vector3(-barco.transform.localScale.x*0.16,-barco.transform.localScale.y*0.13,-0.01);
		player1.transform.parent = this.transform;
	}
	else{
		player1.transform.parent = null;
		g.p1nobarco=false;
	}
	if(g.p2nobarco){
		anima.SetBool("pendurado",true);
		anima.SetFloat("pulando",0);
		anima.SetFloat("correndo",0);
		player2.transform.localScale.x = Mathf.Abs(player2.transform.localScale.x);
		player2.transform.position = barco.transform.position+Vector3(-barco.transform.localScale.x*1.18,-barco.transform.localScale.y*0.15,-0.01);
		player2.transform.parent = this.transform;
	}
	else{
		anima.SetBool("pendurado",false);
		g.p2nobarco=false;
		player2.transform.parent = null;
	}
}