
//player1
public static var p1nobarco:boolean;//se o p1 ta no barco

//player2
public static var p2nobarco:boolean;//se o p2 ta no barco

//motor
public static var p2balloons:int=20;
public static var velocidadePulo : float = 25; // força padrao do pulo
public static var drag:float;//atrito apos o pulo
public static var vmax : float = 4;
public static var horizontaltime:float=3;//suaviza o inicio da corrida do player
public static var pulotime:float=0.15f;//suaviza o inicio do pulo
public static var forcamaxima:float=10;//força do tiro do estilingue

//barco
public static var distima:float=2.5;
public static var velocidadev:float=1.5;//velocidade vertical do barco
public static var velocidadeh:float=4;//velocidade horizontal do barco
public static var score:int;
public static var recebeScore:int;
public static var lifes:int;

//posicoes
public static var p1pos:Vector3; //posicao do player1
public static var p2pos:Vector3; //posicao do player2
public static var barcopos:Vector3; // posicao do barco

//timer
var timer:float;

function Update(){
	if(score<0){
		score=0;
	}
	if(recebeScore>0){
		score += 5;
		recebeScore -= 5;
	}
}