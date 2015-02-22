#pragma strict
public static var g : gamevars;
public var left : GameObject;
public var right : GameObject;
public var top : GameObject;
public var bottom : GameObject;
public var player : GameObject;
public var player2 : GameObject;
public var cam : GameObject;
var novaPosicao : Vector3;

function Start(){
	player = GameObject.Find("barco");
	player2 = GameObject.Find("Player2");
	cam = GameObject.Find("Camera");
}

function Update () {
	if(g.p2nobarco){
		novaPosicao = Vector3(player.transform.position.x,player.transform.position.y, cam.transform.position.z); 
	}
	else{
		novaPosicao = Vector3((player.transform.position.x+player2.transform.position.x)/2,(player.transform.position.y+player2.transform.position.y)/2, cam.transform.position.z); 	
	}
	cam.transform.position = Vector3.Lerp (cam.transform.position, novaPosicao, 2f);
	this.transform.position = (Vector3 (
    Mathf.Clamp (transform.position.x, left.transform.position.x, right.transform.position.x),
    Mathf.Clamp (transform.position.y, bottom.transform.position.y, top.transform.position.y),
    transform.position.z));
}

function FixedUpdate () {
	
}