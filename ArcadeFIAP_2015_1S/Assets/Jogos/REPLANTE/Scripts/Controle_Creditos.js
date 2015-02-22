#pragma strict

function Update () {
	if (Input.GetKeyDown(KeyCode.K) || Input.GetKeyDown(KeyCode.J)){
		Application.LoadLevel("Menu");
	}
}