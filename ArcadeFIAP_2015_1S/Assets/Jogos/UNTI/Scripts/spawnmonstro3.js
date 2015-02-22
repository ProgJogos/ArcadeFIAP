#pragma strict

public var prefabMonstro : Transform;
public var prefabMonstro2 : Transform;
public var segundos : float;
private var vetor : Array;
private var i : int;
public var timer : float;
public var tempodedificuldade : float;

static var pontuacao : int = 0;

function Start () {
	StartCoroutine("Cair");
	vetor = [prefabMonstro, prefabMonstro2];
}

function Update () {
if ( timer < tempodedificuldade){
timer += Time.deltaTime;
}
if ( timer > tempodedificuldade ){
segundos += -0.2;
timer += -timer;
}
}


function Cair () {
	for (;;) {
		yield WaitForSeconds(segundos);
		i = Random.Range(0, 2);
		Instantiate (vetor[i], transform.position, Quaternion.identity);
	
		}
	}

