#pragma strict
var firesmoke:Transform;
public var smoke:Transform;
public static var g : gamevars;
public static var m : motor;
public static var barco : barco;
public var intervalo:float;
public var subtrairscore:float;
public var timer:float;

function Start () {
	subtrairscore=1;
	intervalo=1;
}

function Update(){
	//perde score
	timer += Time.deltaTime;
	if (timer > intervalo) {
		if(g.score > 0)g.score -= subtrairscore;
		timer = 0;
	}
}

function OnTriggerEnter(other:Collider){
	//SE COLIDIR COM AGUA TIPO 2 DO BALAO P2
	if(other.gameObject.CompareTag("agua2")){
		particleEmitter.maxEnergy*=0.5;
		particleEmitter.maxSize*=0.8;
		if(firesmoke.particleEmitter.maxEnergy>=0.9){
			firesmoke.particleEmitter.maxSize*=0.8;
			firesmoke.particleEmitter.maxEmission*=0.7;
			firesmoke.particleEmitter.maxEnergy*=0.99;
		}
		g.score+=100;
	}
	// SE COLIDIR COM AGUA TIPO 1 DO BARCO P1
	if(other.gameObject.CompareTag("agua")){
		g.score+=10;
		//other.particleEmitter.minEnergy*=0.99;
		particleEmitter.minEnergy*=0.969;
		particleEmitter.maxEnergy*=0.99;
		particleEmitter.maxSize*=0.999;
		particleEmitter.maxEmission*=1.015;
		particleEmitter.minEmission*=1.01;
		if(particleEmitter.maxEnergy>=0.6){
			var s : Transform = Instantiate(smoke, transform.position+Vector3(0,0.6,0), transform.rotation) as Transform;
			s.transform.parent = gameObject.transform.parent;
			s.transform.renderer.material.shader=Shader.Find("Particles/Additive");
			s.transform.particleEmitter.maxEmission=2;
			s.transform.particleEmitter.maxEnergy=2;
			s.transform.particleEmitter.maxSize=1;
			s.transform.particleEmitter.localVelocity.y=4;
			Destroy(s.gameObject,1.2);
		}
		else if(firesmoke.particleEmitter.maxEnergy>=0.9){
			firesmoke.particleEmitter.maxSize*=0.8;
			firesmoke.particleEmitter.maxEmission*=0.7;
			firesmoke.particleEmitter.maxEnergy*=0.99;
			particleEmitter.maxEmission*=0.8;
			particleEmitter.minEmission*=0.7;
		}
	}
}

function OnTriggerStay(other:Collider){
	//PERDE VIDA SE ENCOSTAR NO FOGO
	if(other.gameObject.CompareTag("player2")){
		if(m.vidaatual>0){
			m=other.gameObject.GetComponent("motor") as motor;
			m.vidaatual-= 0.5;
			m.anima.SetTrigger("hit");
			g.p2nobarco = false;
		}
	}
	if(other.gameObject.CompareTag("player1")||other.gameObject.CompareTag("barco")){
		if(barco.vidaatual>0){
			barco=other.gameObject.GetComponent("barco") as barco;
			barco.vidaatual-= 0.1;
			barco.animabarco.SetTrigger("hit");
		}
	}
}

function OnDestroy(){
	Destroy(this.transform.parent.gameObject,2);
}