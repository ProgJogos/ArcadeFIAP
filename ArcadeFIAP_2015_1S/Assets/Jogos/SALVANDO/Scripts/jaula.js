#pragma strict
public static var g : gamevars;
public static var barco : barco;
public static var teste:boolean=false;
function OnCollisionEnter(col:Collision){
	//PERDE PONTOS SE A JAULA BATER FORTE
	if(this.rigidbody.velocity.x>3 ||this.rigidbody.velocity.y>0.5){
		if(g.score>100){
			g.score-=100;
		}
		else {
			g.score=0;
		}
	}
}
