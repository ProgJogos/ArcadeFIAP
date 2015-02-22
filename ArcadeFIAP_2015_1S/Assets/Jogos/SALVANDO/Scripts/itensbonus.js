#pragma strict
public var ibaloes: GameObject;
public var ividas: GameObject;
public static var g : gamevars;
function Start () {

}

function Update () {
	
}

function OnCollisionEnter(col:Collision){
	if(col.gameObject.CompareTag("barco")||col.gameObject.CompareTag("player2")||col.gameObject.CompareTag("player1")){
		Destroy(this.gameObject);
		if(this.gameObject.CompareTag("vida")){
			if(g.lifes<3){
				g.lifes +=1;
			}
			else g.lifes=3;
		}
		if(this.gameObject.CompareTag("balao")){
			g.p2balloons+=10;
		}
	}
}