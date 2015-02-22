#pragma strict

public static var tutorialFinalizou : boolean;
public static var tutorial1 : boolean;
public static var tutorial2 : boolean;
public static var tutorial3 : boolean;
public static var tutorial4 : boolean;
public static var tutorial5 : boolean;
public static var tutorial6 : boolean;
public static var tutorial7 : boolean;
public static var tutorial8 : boolean;
public static var g_SementeTut : boolean;
public static var g_ArbustoTut : boolean;

public var animadorArbusto : Animator;
public var animadorBotao1 : Animator;
public var animadorBotao2 : Animator;
public var animadorManche : Animator;
public var animadorSemente : Animator;
public var animadorCacador : Animator;
public var animadorSetaCacador: Animator;
public var animadorSetaLenhador : Animator;
public var animadorSetaSemente : Animator;
public var animadorSetaArbusto : Animator;

public var alvo : Transform;                                                                                                                                                                                                                                                                                                                  
public var animadorAtual : int;

function Start () {

	tutorialFinalizou = false;
	tutorial1 = true;
	tutorial2 = false;
	tutorial3 = false;
	tutorial4 = false;
	tutorial5 = false;
	tutorial6 = false;
	tutorial7 = false;
	tutorial8 = false;
	
	g_SementeTut = true;
	g_ArbustoTut = true;
	
	animadorArbusto.SetBool("Arbusto", false);
	animadorBotao1.SetBool("Botao1", false);
	animadorBotao2.SetBool("Botao2", false);
	animadorManche.SetBool("MancheDir", false);
	animadorManche.SetBool("MancheBaixo", false);
	animadorSemente.SetBool("Semente", false);
	animadorCacador.SetInteger("VidaCacador", 2);
	animadorSetaLenhador.SetBool("SetaLenhador", false);
	animadorSetaSemente.SetBool("SetaSemente", false);
	animadorSetaArbusto.SetBool("SetaArbusto", false);
}

function Update () {
	
	alvo = GameObject.Find("Jogador").transform;

	if((animadorBotao1.GetBool("Botao1"))){
		animadorBotao1.transform.position.y = alvo.position.y + 1;
		animadorBotao1.transform.position.x = alvo.position.x;
	}
	else if((animadorBotao2.GetBool("Botao2"))){
		animadorBotao2.transform.position.y = alvo.position.y + 1;
		animadorBotao2.transform.position.x = alvo.position.x;
	}
	else if((animadorManche.GetBool("MancheDir")) || (animadorManche.GetBool("MancheBaixo"))){
		animadorManche.transform.position.y = alvo.position.y + 1;
		animadorManche.transform.position.x = alvo.position.x;
	}
	
	if(tutorial1 == true){
		g_SementeTut = false;
		g_ArbustoTut = false;
		animadorManche.SetBool("MancheDir", true);
		Jogador_Mover.controleTut2 = true;
		
		if(Jogador_Mover.chegouTut1 == true){
			animadorManche.SetBool("MancheDir", false);
			tutorial1 = false;
			tutorial2 = true;
		}
	}
	
	else if(tutorial2 == true){
		animadorBotao1.SetBool("Botao1", true);
		animadorSetaLenhador.SetBool("SetaLenhador", true);
		
		if(Lenhador_hp.acertou == true){
			animadorBotao1.SetBool("Botao1", false);
			animadorSetaLenhador.SetBool("SetaLenhador", false);
			tutorial2 = false;
			tutorial3 = true;
			Jogador_Mover.controleTut2 = false;
		}
	}
	
	else if(tutorial3 == true){
		Jogador_Mover.controleTut4 = true;
		animadorManche.SetBool("MancheDir", true);
		
		if(Jogador_Mover.chegouTut3 == true){
			animadorManche.SetBool("MancheDir", false);
			tutorial3 = false;
			tutorial4 = true;
			g_SementeTut = true;
		}
	}
	
	else if(tutorial4 == true){
		animadorManche.SetBool("MancheBaixo", true);
		animadorSetaSemente.SetBool("SetaSemente", true);
	
		if(Jogador_Fruta.coletou == true){
			animadorManche.SetBool("MancheBaixo", false);
			animadorSetaSemente.SetBool("SetaSemente", false);
			Jogador_Mover.controleTut4 = false;
			tutorial4 = false;
			tutorial5 = true;
			g_SementeTut = false;
		}
	}
	
	else if(tutorial5 == true){
		Jogador_Mover.controleTut6 = true;
		animadorManche.SetBool("MancheDir", true);
		
		if(Jogador_Mover.chegouTut5 == true){
			animadorManche.SetBool("MancheDir", false);
			tutorial5 = false;
			tutorial6 = true;
			g_ArbustoTut = true;
		}
	}
	
	else if(tutorial6 == true){
		animadorBotao2.SetBool("Botao2", true);
		animadorArbusto.SetBool("Arbusto", true);
		animadorSetaArbusto.SetBool("SetaArbusto", true);
		
		if(Crescer.cresceu == true){
			animadorSetaArbusto.SetBool("SetaArbusto", false);
			animadorArbusto.SetBool("Arbusto", false);
			animadorBotao2.SetBool("Botao2", false);
			tutorial6 = false;
			tutorial7 = true;
			g_ArbustoTut = false;
		}
	}
	
	else if(tutorial7 == true){
		Jogador_Mover.controleTut8 = true;
		animadorManche.SetBool("MancheDir", true);
		
		if(Jogador_Mover.chegouTut7 == true){
			animadorManche.SetBool("MancheDir", false);
			tutorial7 = false;
			tutorial8 = true;
		}
	}
	
	else if(tutorial8 == true){
		animadorBotao1.SetBool("Botao1", true);
		animadorSetaCacador.SetBool("SetaCacador", true);
		
		if(Cacador_hp.hp_1de2 == true){
			animadorCacador.SetInteger("VidaCacador", 1);
		}
		
		if(Cacador_hp.hp_0de2 == true){
			Cacador_hp.hp_1de2 = false;
			animadorCacador.SetInteger("VidaCacador", 0);
			animadorBotao1.SetBool("Botao1", false);
			animadorSetaCacador.SetBool("SetaCacador", false);
		}
	}
	
	else if(
	(tutorial1 == false) && (tutorial2 == false) && (tutorial3 == false) && 
	(tutorial4 == false) && (tutorial5 == false) && (tutorial6 == false) &&
	(tutorial7 == false) && (tutorial8 == false)){
		tutorialFinalizou = true;
		this.gameObject.SetActive(false);
	}
}