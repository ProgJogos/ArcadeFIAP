#pragma strict

public var prefabPlastico : Transform;
public var prefabVidro : Transform;
public var prefabPapel : Transform;
public var lixeira11 : Transform;
public var lixeira12 : Transform;
public var lixeira13 : Transform;
public var lixeira21 : Transform;
public var lixeira22 : Transform;
public var lixeira23 : Transform;
public var lixeira31 : Transform;
public var lixeira32 : Transform;
public var lixeira33 : Transform;
public var mira : Transform;

private var alvo : Transform;
private var segundos : float = 1.5;
private var forca : float = 30;
private var item : Transform;
private var vetor : Array;
private var vetorLixeiras : Array;
private var vetorPosicoes : Array;
private var tHorizontal : float;
private var tVertical : float;
private var tAtirar1 : float;
private var tAtirar2 : float;
private var indice : int;
private var tempoIntervaloMover : float = 0.2;
private var tempoIntervaloAtirar : float = 0.5;
private var timestamp : float;

function Start () {
	indice = 4;
	
	vetor = [prefabPlastico, prefabVidro, prefabPapel];
	vetorLixeiras = [lixeira11, lixeira12, lixeira13, 
					lixeira21, lixeira22, lixeira23, 
					lixeira31, lixeira32, lixeira33];
	
	mira.gameObject.transform.position = lixeira22.gameObject.transform.position + Vector3(2,1,0);
}

function Update () {
	tHorizontal = Input.GetAxis ("TRASH_Horizontal");
	tVertical = Input.GetAxis ("TRASH_Vertical");
	tAtirar1 = Input.GetAxis ("TRASH_Atirar1");
	tAtirar2 = Input.GetAxis ("TRASH_Atirar2");
	
	if ((tHorizontal == -1) && (indice > 0) && (Time.time >= timestamp)) {
		indice -= 1;
		timestamp = Time.time + tempoIntervaloMover;
	}
	if ((tHorizontal == 1) && (indice < 8) && (Time.time >= timestamp)) {
		indice += 1;
		timestamp = Time.time + tempoIntervaloMover;
	}
	
	if ((tVertical == -1) && (indice < 6) && (Time.time >= timestamp)) {
		indice += 3;
		timestamp = Time.time + tempoIntervaloMover;
	}
	if ((tVertical == 1) && (indice > 2) && (Time.time >= timestamp)) {
		indice -= 3;
		timestamp = Time.time + tempoIntervaloMover;
	}
	
	mira.gameObject.transform.position = (vetorLixeiras[indice] as Transform).gameObject.transform.position + Vector3(2,1,0);
	alvo = vetorLixeiras[indice];
	transform.LookAt(alvo);
	
	if ((tAtirar1 == 1) && (tAtirar2 == 1) && (Time.time >= timestamp)) {
		item = Instantiate (vetor[2], transform.position, (vetor[2] as Transform).transform.rotation);
		item.rigidbody.AddForce (transform.forward * forca, ForceMode.VelocityChange);
		timestamp = Time.time + tempoIntervaloAtirar;
	}
	if ((tAtirar1 == 1) && (Time.time >= timestamp)) {
		item = Instantiate (vetor[0], transform.position, (vetor[0] as Transform).transform.rotation);
		item.rigidbody.AddForce (transform.forward * forca, ForceMode.VelocityChange);
		timestamp = Time.time + tempoIntervaloAtirar;
	}
	if ((tAtirar2 == 1) && (Time.time >= timestamp)) {
		item = Instantiate (vetor[1], transform.position, (vetor[1] as Transform).transform.rotation);
		item.rigidbody.AddForce (transform.forward * forca, ForceMode.VelocityChange);
		timestamp = Time.time + tempoIntervaloAtirar;
	}
}