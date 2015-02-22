#pragma strict
 /*// Algoritmo Teste 2, funciona +/- como eu gostaria
public var Player : Transform;
public var velocidade = 4;
public var distMin = 2;

function Update (){
    transform.LookAt(Player);
 
    if(Vector3.Distance(transform.position,Player.position) >= distMin){
          transform.position += transform.forward*velocidade*Time.deltaTime;
    }
}*/

public var target : Transform; 
public var velocidade = 4;
public var velGiro : float = 5; 
public var distMin = 2; 
private var _sAnim : Animator;
public var saude : float;
  
function Start(){
     target = GameObject.FindWithTag("Player").transform;
     _sAnim = GetComponent.<Animator>(); 
}

function Update () {
    var lookDir = target.position - transform.position;
    lookDir.y = 0; 
            
    transform.rotation = Quaternion.Slerp(transform.rotation,
    Quaternion.LookRotation(lookDir), velGiro * Time.deltaTime);
    
    if(Vector3.Distance(transform.position,target.position) > distMin){
    	transform.position += transform.forward * velocidade * Time.deltaTime;
    	_sAnim.SetBool("AchouPersonagem", true);    	
    }else{
    	_sAnim.SetBool("AchouPersonagem", false);
    }
}