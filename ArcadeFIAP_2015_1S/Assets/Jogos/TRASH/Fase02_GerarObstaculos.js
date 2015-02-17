#pragma strict

public var prefabCone : Transform;
public var prefabCavaletePequeno : Transform;
public var prefabCavaleteGrande : Transform;
private var intervaloGerar : float;
private var vetor : Array;
private var i : int;

function Start () {
	intervaloGerar = Principal.intervalo;
	StartCoroutine("Gerar");
	vetor = [prefabCone, prefabCavaletePequeno, prefabCavaleteGrande];
}

function Gerar () {
	for (;;) {
		yield WaitForSeconds(intervaloGerar);
		i = Random.Range(0, 3);
		Instantiate (vetor[i], transform.position, (vetor[i] as Transform).transform.rotation);
	}
}