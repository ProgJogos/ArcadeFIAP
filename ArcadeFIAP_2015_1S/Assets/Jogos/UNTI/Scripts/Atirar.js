#pragma strict
public var tiro : Transform;
public var sons : AudioClip[];

function Start () {

}

function Update () {
	if(Input.GetKeyDown(KeyCode.Space)){
		audio.PlayOneShot (sons [Random.Range (0, sons.Length)]);
		
		var prefabTiro : Transform;
		prefabTiro = Instantiate (
			tiro,
			transform.position,
			transform.rotation);
	}

}
