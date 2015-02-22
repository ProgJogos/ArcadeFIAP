#pragma strict

@script RequireComponent(AudioSource)

//Variaveis
public var target : Transform; 
public var velocidade = 4;
public var velGiro : float = 5; 
public var distMin = 2;
public var distMax = 0; 
private var _sAnim : Animator;
public var saude : float;     
public var banana : int;
public var contador: float;
public var Heroi : JusticeMovimento;
public var particulaHit : ParticleSystem;
public var ataque2 : AudioClip;
public var ataque3 : AudioClip;
public var ataqueFinal : AudioClip;
public var numeroAtaque : float = 1;
public var hitbox : Transform;

//Componentes essenciais para executar a funcao  
function Start(){
	target = GameObject.FindGameObjectWithTag("Player").GetComponent.<Transform>();
     _sAnim = GetComponent.<Animator>();
     banana = Random.Range (0,3);
     Heroi = GameObject.Find("Jogador").GetComponent.<JusticeMovimento>();
     hitbox = transform.Find("HitBox").GetComponentInChildren.<Transform>();
}

//Movimento e ataque
function Update () {

	contador += Time.deltaTime;
	if(contador > 2){
    	banana = Random.Range (0,3);
    	contador = 0;
    }    	   	
	
	
	_sAnim.SetBool("ATK", false);
		
	//pega a posicao do jogador ignorando o y
    var lookDir = target.position - transform.position;
    lookDir.y = 0; 
	
	//roda o inimigo conforme a direcao do jogador            
    transform.rotation = Quaternion.Slerp(transform.rotation,
    Quaternion.LookRotation(lookDir), velGiro * Time.deltaTime);
    
    /*Movimento do inimigo, se > que a distancia maxima ela retorna, se > que distMin e <distMax
    ela move o inimigo, e se igual a distMin faz o inimigo atacar*/
    if (Vector3.Distance(transform.position,target.position) > distMax){
    	_sAnim.SetBool("AchouPersonagem", false);
    	return;
    }
    else if(Vector3.Distance(transform.position,target.position) > distMin && Vector3.Distance(transform.position,target.position) < distMax){
    	transform.position += transform.forward * velocidade * Time.deltaTime;
    	_sAnim.SetBool("AchouPersonagem", true);
    }
    else{
    	//Agora o inimigo ataca. Dependendo da animaçao, o dano e diferente.
    	if(Heroi.HP > 0){
	    	_sAnim.SetBool("AchouPersonagem", false);
	    	_sAnim.SetBool("ATK", true);
	    	_sAnim.SetInteger("Golpe", banana);
    	}   	 	
	}    
}

function DanoATK1(){
    	Heroi.HP -= 1;
    	Heroi._anim.SetTrigger("TomouDano");
    	Debug.Log("Heroi recebeu 1 de dano");
}

function DanoATK2(){
    	Heroi.HP -= 2;
	   	Heroi._anim.SetTrigger("TomouDano");
    	Debug.Log("Heroi recebeu 2 de dano");
}

function particulaAlert(){
	Debug.Log("Alerta");
}

function Hit(){
	print("CHEGOU");
	//instancia particula inimigo tomar hit
	Instantiate(particulaHit, hitbox.transform.position, hitbox.transform.rotation);
	
	//toca clip de ataque de acordo com o numero do ataque
	switch (numeroAtaque) {
		case 1:
			audio.Play();
			numeroAtaque++;
			break; 
		case 2:
			audio.clip = ataque2;
			audio.Play();
			numeroAtaque++;
			break; 
		case 3:
			audio.clip = ataque3;
			audio.Play();
			numeroAtaque = 1;
			break;
	}
}

function HitMorte(){
	Instantiate(particulaHit, hitbox.transform.position, hitbox.transform.rotation);
	//toca clip de ataque final
	audio.clip = ataqueFinal;
	audio.Play();
}