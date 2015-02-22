#pragma strict

public var _podePular : boolean; //Booleana pra saber se ele esta no chao ou nao
private var _anim : Animator; //Animator
private var _rigidPai : Rigidbody;
public var distancia : float;
public var distanciaMax : float;



function Start () {
	_anim = GetComponentInParent.<Animator>();
	_rigidPai = GetComponentInParent.<Rigidbody>();
}

function Update () {
	var detector : RaycastHit;
	//condicional pra lançar o Raycast
	if (Physics.Raycast(transform.position, transform.TransformDirection(Vector3.forward), detector)) {
		distancia = detector.distance;
		//Se o Raycast acertar um alvo com a Tag chao, o personagem podera pular, do contrario, nao.
		if (distancia < distanciaMax && detector.collider.CompareTag("Plataforma")) {
			_podePular = true;
			_rigidPai.drag = 100;
			_anim.SetBool("NoChao", true);
		}
		else {		
			_podePular = false;
			_rigidPai.drag = 0;	
			_anim.SetBool("NoChao", false);
		}
	}
}
