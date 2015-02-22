#pragma strict

public static var b : buttonconfig;
public static var g : gamevars;
public static var barco : barco;

//Animaçao
public var anima:Animator;

public var prefmuni:Transform;
public var prefmira:Transform;
public var direcao : Vector3;
public var angulo : float;
public var colisor:String;
public static var forcatiro:float=0;//Forca atual do tiro nao modificar
public static var vidaatual:float=100;//vida atual
public static var vidamax:float=100;//vida maxima
var player:int;
public var mira:GameObject;
public var miras:GameObject[];
public var thisplayer:GameObject;
public var linhas:GameObject[];
public var linha:GameObject;
public var atirou:boolean;
public var timer:float;

function Start(){
	//o player eh a variavel com o nome do player atual
	
	player= (this.transform.name == "Player1")? 1 : 2;
	rigidbody.drag=g.drag;
	thisplayer=this.gameObject;
	rigidbody.velocity=Vector3.zero;
}
function FixedUpdate(){
	//delay pos tiro
	if (atirou){
		timer+=Time.deltaTime;
		rigidbody.velocity.x = 0;	
	}
	if(timer>0.5){
			atirou=false;
			timer = 0;
	}
}              
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
function Update () {
	linhas=GameObject.FindGameObjectsWithTag("linha");
	miras=GameObject.FindGameObjectsWithTag("mira");
	mira= GameObject.FindGameObjectWithTag("mira");
	linha=GameObject.FindGameObjectWithTag("linha");
	if(!g.p2nobarco && !atirou && vidaatual>0){
		moverPlayer();
	}
	if(vidaatual<0) vidaatual = 0;
	if(miras.Length>1) Destroy(mira.gameObject);//EVITA BUGS DE DUAS MIRAS
}

function OnCollisionEnter(col:Collision){
	//Tomar hit se colidir com lenhador
	var distancia = this.gameObject.transform.position - col.gameObject.transform.position;
		if(col.gameObject.CompareTag("lenhador")){
			if(!g.p2nobarco){
				this.gameObject.rigidbody.velocity.x=Mathf.Sign(distancia.x)*5;
				this.gameObject.rigidbody.velocity.y=Mathf.Sign(distancia.y)*2;
				//toma hit
				vidaatual -= 10;
				anima.SetTrigger("hit");
			}
		}
		
}

function OnCollisionStay(col:Collision){
	if(col.gameObject.CompareTag("barco")){
		if(!g.p2nobarco){
			colisor=col.gameObject.tag;
		}
	}
}
function OnCollisionExit(col:Collision){
	if(col.gameObject.CompareTag("barco")){
		colisor=null;
	}	
}
//verificar pulo
function verificarPulo(){
	var hitdown : RaycastHit;
	if (Physics.Raycast(transform.position, Vector3.down, hitdown, transform.localScale.y*0.6)){
		anima.SetBool("nochao",true);
		return true;
	}
	else{
		anima.SetBool("nochao",false);
		return false;
	}
}
//fim verificar pulo

function moverPlayer(){
	verificarPulo();
	//Animaçao de pulo e queda em relaçao ao eixo y
	anima.SetFloat("pulando",rigidbody.velocity.y);
	//B1
	//ENTRAR NO BARCO
	if(ArcadeFIAP.ApertouBotao(2, EBotao.A)){
		if(colisor=="barco"&& g.p2nobarco==false){
			g.p2nobarco = true;
		}
		else{
			g.p2nobarco=false;
		}
	}
	//B2
	//QUANDO SOLTAR O BOTAO E ESTIVER NO CHAO A PEDRA DO ESTILINGUE E LANCADA
	if(ArcadeFIAP.SoltouBotao(2, EBotao.B)&&verificarPulo()){
		//SE EXISTIR ALGUMA MIRA DESTRUIRA
		if(miras.Length>0)Destroy(mira.gameObject);
		//SE EXISTIR UM VALOR DE ANGULO NO AXIS IRA INSTANCIAR E ATIRAR UMA PEDRA NA DIRECAO CONTRARIA AO AXIS
		if((Mathf.Abs(ArcadeFIAP.Eixo(player, EEixo.VERTICAL))>0) || (Mathf.Abs(ArcadeFIAP.Eixo(player, EEixo.HORIZONTAL))>0)){
			var municao = Instantiate(prefmuni,transform.position + Vector3(transform.localScale.x*0.5,transform.localScale.y*0.3,0),transform.rotation);
			anima.SetFloat("forcatiro",-forcatiro);
			municao.rigidbody.AddForce(-direcao*forcatiro,ForceMode.VelocityChange);
		}
		if(forcatiro!=0)forcatiro=0;
		anima.SetBool("mirabaixo",false);
		anima.SetBool("miracima",false);
		angulo=0;
		atirou = true;
	}
	//VERIFICAR ANIMAÇAO
	anima.SetFloat("forcatiro",forcatiro);
	//B2 nao apertado
	if(!ArcadeFIAP.BotaoApertado(2, EBotao.B) && !atirou){ //SE ESTA MIRANDO NAO PODER PULAR NEM ANDAR
		//animacao de correr e flip
		anima.SetFloat("correndo",Mathf.Abs(ArcadeFIAP.Eixo(player, EEixo.HORIZONTAL)));
		if(ArcadeFIAP.Eixo(player, EEixo.HORIZONTAL)>0){
			transform.localScale.x = Mathf.Abs(transform.localScale.x);
		}
		else if(Mathf.Sign(ArcadeFIAP.Eixo(player, EEixo.HORIZONTAL))<0){
			transform.localScale.x = -Mathf.Abs(transform.localScale.x);
		}
		//SE ESTA NO CHAO E PODE PULAR
		//CIMA PULO
		if(ArcadeFIAP.Eixo(player, EEixo.VERTICAL)>0 && verificarPulo() && ArcadeFIAP.ApertouBotao(player, EBotao.A)){
			thisplayer.rigidbody.velocity.y= Vector3.Lerp(rigidbody.velocity,transform.up *g.velocidadePulo, g.pulotime).y;
		}
		//MOVIMENTACAO HORIZONTAL
		thisplayer.rigidbody.velocity.x = Vector3.Lerp(rigidbody.velocity,transform.right * ArcadeFIAP.Eixo(player, EEixo.HORIZONTAL) * g.vmax, g.horizontaltime).x;
		anima.SetBool("atirando",false);
	}
	else{ // FICA PARADO
		thisplayer.rigidbody.velocity.x = Vector3.Lerp(rigidbody.velocity,transform.right * ArcadeFIAP.Eixo(player, EEixo.HORIZONTAL) * 0, g.horizontaltime).x;
		anima.SetFloat("correndo",0);
		anima.SetBool("atirando",true);
		if(ArcadeFIAP.Eixo(player, EEixo.HORIZONTAL)>0){
			transform.localScale.x = -Mathf.Abs(transform.localScale.x);
		}
		else if(Mathf.Sign(ArcadeFIAP.Eixo(player, EEixo.HORIZONTAL))<0){
			transform.localScale.x = Mathf.Abs(transform.localScale.x);
		}
	}	
	//ESTILINGUE
	if(ArcadeFIAP.ApertouBotao(2, EBotao.B)&&verificarPulo()){ //SE APERTAR E ESTIVER NO CHAO CRIA MIRA E PARENTEIA
		var tmira = Instantiate (prefmira,transform.position + Vector3(transform.localScale.x*0.23,transform.localScale.y*0.22,0),Quaternion.identity);
		tmira.transform.parent = this.transform;
	}
	//SE ESTIVER NO CHAO E ESTIVER SEGURANDO O BOTAO DE FORÇA DO ESTILINGUE
	if(ArcadeFIAP.BotaoApertado(2, EBotao.B)&&verificarPulo()){
	 	direcao = Vector3(ArcadeFIAP.Eixo(player, EEixo.HORIZONTAL),ArcadeFIAP.Eixo(player, EEixo.VERTICAL),0);//DIRECAO E O VALOR DO AXIS
		if(float.IsNaN(direcao.x)&&float.IsNaN(direcao.y)){//EVITA ERROS COM NAN
			direcao=direcao*0;
		}
		if(direcao==direcao*0){//A MIRA FICA INVISIVEL SE NAO TIVER UM AXIS DIFERENTE DE 0
			if(linhas.Length>0)linha.gameObject.transform.renderer.enabled=false;
		}
		else{
			if(linhas.Length>0)linha.gameObject.transform.renderer.enabled=true;
		}
		angulo = Mathf.Atan(ArcadeFIAP.Eixo(player, EEixo.VERTICAL)/ArcadeFIAP.Eixo(player, EEixo.HORIZONTAL))*57.3;//VALOR DO ANGULO DA MIRA
		if(float.IsNaN(angulo)){ //NAO DEIXA O ANGULO SER NAN
			angulo=0;
		}
		if(ArcadeFIAP.Eixo(player, EEixo.HORIZONTAL)<0){ //FAZ ELA GIRAR 360 GRAUS
				angulo=180 + angulo;
		}
		//mira.transform.position = transform.position - direcao * 1 ;
		if(miras.Length>0){
			//GIRA A MIRA
			mira.transform.rotation = Quaternion.Euler(0,0,angulo+180);
		}
		if(forcatiro<g.forcamaxima && ((Mathf.Abs(ArcadeFIAP.Eixo(player, EEixo.VERTICAL))>0) || (Mathf.Abs(ArcadeFIAP.Eixo(player, EEixo.HORIZONTAL))>0))){
			forcatiro+=0.1; //FORCA TIRO AUMENTA GRADUALMENTE CONFORME SEGURA O MOTAO DE TIRO E POSSUI UMA DIRECAO
		}
		else if ((Mathf.Abs(ArcadeFIAP.Eixo(player, EEixo.VERTICAL))==0) && (Mathf.Abs(ArcadeFIAP.Eixo(player, EEixo.HORIZONTAL))==0)){
			if(forcatiro!=0)forcatiro=0;//FORCA DO TIRO ZERA SE NAO TIVER DIRECAO
		}
		//ANIMA ANGULO
		//define a animaçao referente ao angulo
		//o angulo varia de -90 a 270 de cima sentido antihorario
		//miracima
		if(angulo>220 || angulo <-45){
			anima.SetBool("miracima",true);
		}
		else {
			anima.SetBool("miracima",false);
		}
		//mirabaixo
		if(angulo>40 && angulo <135){
			anima.SetBool("mirabaixo",true);
		}
		else {
			anima.SetBool("mirabaixo",false);
		}
		//print(angulo);
	}
}
