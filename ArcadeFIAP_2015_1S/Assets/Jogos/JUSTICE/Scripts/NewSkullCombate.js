#pragma strict

public var saude:int = 100;
public var anim:Animator;
public var timer:float;
public var intervalo:float;
private var _movSkull:NewSkullMoviment;


function Start() {
	anim = GetComponent.<Animator>();
	_movSkull = GetComponent.<NewSkullMoviment>();
	
}

function DarDano (dano:int) {
	saude -= dano;
	print(saude);
}

function Update () {
	if (saude < 1) {
		_movSkull.enabled = false;
		anim.SetTrigger("Morreu");
		timer += Time.deltaTime;
		if (timer > intervalo) {
			Destroy(gameObject);
		}	
	}
	
}