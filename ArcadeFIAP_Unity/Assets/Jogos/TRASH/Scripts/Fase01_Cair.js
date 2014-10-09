#pragma strict

public var prefabPlastico : Transform;
public var prefabVidro : Transform;
public var prefabPapel : Transform;
private var intervaloQueda : float;
private var vetor : Array;
private var i : int;

function Start () {
	intervaloQueda = Principal.intervalo;
	StartCoroutine("Cair");
	vetor = [prefabPlastico, prefabVidro, prefabPapel];
}

function Cair () {
	for (;;) {
		yield WaitForSeconds(intervaloQueda);
		i = Random.Range(0, 3);
		Instantiate (vetor[i], transform.position, (vetor[i] as Transform).transform.rotation);
	}
}