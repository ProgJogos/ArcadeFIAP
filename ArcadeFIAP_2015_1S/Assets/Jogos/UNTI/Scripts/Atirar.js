#pragma strict
public var tiro : Transform;
public var sons : AudioClip[];

function Start () {

}

function Update () {
	if(ArcadeFIAP.ApertouBotao(1, EBotao.A)){
		audio.PlayOneShot (sons [Random.Range (0, sons.Length)]);
		
		var prefabTiro : Transform;
		prefabTiro = Instantiate (
			tiro,
			transform.position,
			transform.rotation);
	}

}
