#pragma strict

public var prefabPlastico : Transform;
public var prefabVidro : Transform;
public var prefabPapel : Transform;
private var intervaloAtirar : float;
private var forca : float = 22.0;
private var item : Transform;
private var vetor : Array;
private var i : int;

function Start () {
	intervaloAtirar = Principal.intervalo;
	StartCoroutine("Atirar");
	vetor = [prefabPlastico, prefabVidro, prefabPapel];
}

function Atirar () {
	for (;;) {
		yield WaitForSeconds(intervaloAtirar);
		i = Random.Range(0, 3);
		item = Instantiate (vetor[i], transform.position, (vetor[i] as Transform).transform.rotation);
		item.rigidbody.AddForce (transform.forward * forca, ForceMode.VelocityChange);
	}
}