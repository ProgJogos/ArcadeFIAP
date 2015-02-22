#pragma strict

 public var velocidade : float; 
 public var vPulo : float;
 static var noChao: boolean;
 private var animator : Animator;
 public var limiteMaxY : float;
 public var limiteMinY : float;
 public var morte : Transform;
 public var ajudante1 : Transform;
 public var ajudante2 : Transform;
 public var ajudantes : float;
 public var seletorajudante : int;
 public var ajudante3 : Transform;
 public var somlixo : AudioClip;
 public var sommorte : AudioClip;
 

function Start () {
	
	animator = GetComponent("Animator");
}

function Update () {
	
	
	
		
	if(ArcadeFIAP.Eixo(1, EEixo.VERTICAL) > 0 && transform.position.y < limiteMaxY)
	{
		transform.Translate(0,velocidade * Time.fixedDeltaTime,0);
		
	}
	
	if(ArcadeFIAP.Eixo(1, EEixo.VERTICAL) < 0 && transform.position.y > limiteMinY)
	{
		transform.Translate(0,-velocidade * Time.fixedDeltaTime,0);
		
	}
	
	
	
}

function OnTriggerEnter2D(coll: Collider2D) 
{
	if(coll.gameObject.tag == "minion"){
		var prefabmorte : Transform;
		prefabmorte = Instantiate (
			morte,
			transform.position,
			transform.rotation);
				audio.PlayOneShot (sommorte);

Destroy(gameObject);
	
	}
	if(coll.gameObject.tag == "lixo" && ajudantes == 0){
	seletorajudante = Random.Range(1, 4);
	if (seletorajudante == 2){
	audio.PlayOneShot (somlixo);
		var prefabajudante1 : Transform;
		prefabajudante1 = Instantiate (
			ajudante1,
			transform.position + new Vector3(1f,-1.5f, 0),
			transform.rotation);
			
		prefabajudante1.parent = transform;
		ajudantes ++;}
			
			if (seletorajudante == 1){
				audio.PlayOneShot (somlixo);
		var prefabajudante2 : Transform;
		prefabajudante2 = Instantiate (
			ajudante2,
			transform.position + new Vector3(1f,-1.5f, 0),
			transform.rotation);
			
		prefabajudante2.parent = transform;
		ajudantes ++;}
		
			if (seletorajudante == 3){
				audio.PlayOneShot (somlixo);
		var prefabajudante3 : Transform;
		prefabajudante3 = Instantiate (
			ajudante3,
			transform.position + new Vector3(0.15f,0.5f, 0),
			transform.rotation);
			
		prefabajudante3.parent = transform;
		ajudantes ++;}
		
	
	
		}
	}