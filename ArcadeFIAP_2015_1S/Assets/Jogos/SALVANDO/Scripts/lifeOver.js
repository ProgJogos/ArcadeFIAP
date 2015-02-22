#pragma strict
public static var g : gamevars;
public static var b : barco;
public static var motor : motor;
public var anima : Animator;
var timer:float;
var timer2:float;
var timer3:float;
public var barco : GameObject;
public var player2 : GameObject;

function Start () {
	g.lifes = 3;
	barco = GameObject.Find("barco");
	player2 = GameObject.Find("Player2");
}

function Update () {
	if(b.vidaatual<=0){
		// se acabar o sangue e ainda tiver vida
		if(g.lifes>0){
			barco.SetActive(false);
			timer+=Time.deltaTime;
			barco.rigidbody.velocity *= 0;
			if(timer>3){ // dois segundos
				barco.SetActive(true);
				b.vidaatual = b.vidamax;
				barco.transform.position = Vector3(0,8,0);
				g.lifes -= 1;
				timer=0;
			}
		}
	}
	//player2 spawn
	if(motor.vidaatual<=0){
		anima.SetTrigger("morrendo");
		if(g.lifes>0){
			timer2+=Time.deltaTime;
			if(timer2>1){
				player2.SetActive(false);
			}
			if(timer2>3){ // dois segundos
				player2.SetActive(true);
				player2.transform.position=Vector3(0,10,0);//spawn
				g.lifes -= 1;
				motor.vidaatual = motor.vidamax;
				timer2=0;
			}
		}
	}
	if(g.lifes==0){
		if(motor.vidaatual<=0 || b.vidaatual <=0){
			timer3+=Time.deltaTime;
			if(timer3>3){
				Application.LoadLevel("SALVANDO_gameover");
				timer3 = 0;
			}
		}
	}
}