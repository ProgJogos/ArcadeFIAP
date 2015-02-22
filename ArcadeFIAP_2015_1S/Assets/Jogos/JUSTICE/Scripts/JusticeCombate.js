#pragma strict

public var dano:int = 10;
public var distancia:float;
public var distanciaMax:float;
private var anim:Animator;
private var animInimigo:Animator;
private var inimigo:NewSkullCombate;
public var carregarDano:float;
public var timer:float;
public var chargeAtt:boolean;
public var basicAtt:boolean;

function Start() {
	anim = transform.parent.GetComponent.<Animator>();
	animInimigo = GameObject.Find("Inimigo").GetComponent.<Animator>();
	inimigo = GameObject.Find("Inimigo").GetComponent.<NewSkullCombate>();
	chargeAtt = false;
	basicAtt = false;
}

function Update() {
	if (ArcadeFIAP.BotaoApertado(1, EBotao.B)) {
		carregarDano += (Time.deltaTime * 10);
		timer += Time.deltaTime;
		if (carregarDano > 50) carregarDano = 50;
		if (timer > 0.5) {
			chargeAtt = true;
			anim.SetBool("Charge_Attack", chargeAtt);
			basicAtt = false;
		}
		if (timer < 0.5) {
			basicAtt = true;
			chargeAtt = false;
		}
	}
	if (ArcadeFIAP.SoltouBotao(1, EBotao.B) && chargeAtt) {
		var hit:RaycastHit;	
		timer = 0;
		if(Physics.Raycast(transform.position, transform.TransformDirection(Vector3.forward), hit)) {
			distancia = hit.distance;
			if (distancia < distanciaMax) {
				hit.transform.SendMessage("DarDano", (dano + carregarDano), SendMessageOptions.DontRequireReceiver);
				if (inimigo.saude > 0) {
					animInimigo.SetTrigger("InimigoDamage");
				}
			}
		}
		chargeAtt = false;
		anim.SetBool("Charge_Attack", chargeAtt);
		carregarDano = 0;
	}
	if (ArcadeFIAP.SoltouBotao(1, EBotao.B) && basicAtt) {
		carregarDano = 0;
		anim.SetBool("Combo", true);
		anim.SetTrigger("Basic_Attack");
		var hit2:RaycastHit;	
		timer = 0;
		if(Physics.Raycast(transform.position, transform.TransformDirection(Vector3.forward), hit2)) {
			distancia = hit2.distance;
			if (distancia < distanciaMax) {
				hit2.transform.SendMessage("DarDano", dano, SendMessageOptions.DontRequireReceiver);
				if (inimigo.saude > 0) {
					animInimigo.SetTrigger("InimigoDamage");
				}
			}
		}
		basicAtt = false;
	}
}

