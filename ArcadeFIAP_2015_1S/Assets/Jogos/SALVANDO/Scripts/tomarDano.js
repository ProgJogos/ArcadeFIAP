#pragma strict
public static var b : buttonconfig;
public static var g : gamevars;
public static var barco : barco;

function OnCollisionEnter(col:Collision) {
	var distancia = col.gameObject.transform.position - this.gameObject.transform.position;
	//SE O BARCO COLIDIR
		if(this.transform.CompareTag("barco")){
			if(Mathf.Abs(barco.velocidadeatual.x)>2||Mathf.Abs(barco.velocidadeatual.y)>1){ //VERIFICA VELOCIDADE MAIOR
				if (!col.gameObject.CompareTag("player2")&&!col.gameObject.CompareTag("agua")&&col.gameObject.name!="Jaula"&&!col.gameObject.CompareTag("agua2")){ //SE NAO FOR
					this.rigidbody.velocity.x=Mathf.Sign(distancia.x)*3;
					this.rigidbody.velocity.y=-Mathf.Sign(distancia.y)*2;
					//toma hit
					barco=this.gameObject.GetComponent("barco") as barco;
					barco.vidaatual -= 10;
					barco.animabarco.SetTrigger("hit");
				}
			}
		}	
}