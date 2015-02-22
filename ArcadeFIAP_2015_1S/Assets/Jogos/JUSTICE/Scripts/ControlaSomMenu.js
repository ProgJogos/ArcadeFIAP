#pragma strict

public var somMudar:AudioClip;
public var somSelec:AudioClip;

function Start () {

}

function Update () {
	if (Input.GetKeyDown(KeyCode.UpArrow) || Input.GetKeyDown(KeyCode.DownArrow)) {
		audio.PlayOneShot(somMudar);
	}
	if (Input.GetKeyDown(KeyCode.KeypadEnter)) {
		audio.PlayOneShot(somSelec);
	}
}