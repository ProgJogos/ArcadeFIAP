#pragma strict
public static var g : gamevars;
public var go1:maquinaLenhadora;
public var go2:moveLenhador;
function OnTriggerEnter(col:Collider){
	print(col.gameObject.name);
	if(col.gameObject.CompareTag("lenhador")){
		if(col.gameObject.name=="MaquinaLenhador"||col.gameObject.name=="maquina"){
			go1 = col.gameObject.GetComponent(maquinaLenhadora);
			go1.life1 -= 1;
			if(go1.life1<0){
				go1.anima.SetTrigger("morrendo");
				go1.rigidbody.velocity.x=0;
				Destroy(col.gameObject,1);
			}
			else{
				go1.anima.SetTrigger("hit");
			}
			g.recebeScore += 400;
		}
		else{
			go2 = col.gameObject.GetComponent(moveLenhador);
			go2.life2 -= 1;
			if(go2.life2==0){
				go2.anima.SetTrigger("morrendo");
				go2.rigidbody.velocity.x=0;
				Destroy(col.gameObject,1);
			}
			else{
				go2.anima.SetTrigger("hit");
			}
		}
		g.recebeScore += 400;
	}
	if(!col.gameObject.CompareTag("lago")){
		Destroy(this.gameObject);
	}
}