#pragma strict

public var prefabFase1 : Transform;
public var prefabFase2 : Transform;
public var prefabFase3 : Transform;
public var prefabMenu : Transform;
public var prefabTextosFase1 : Transform;
public var prefabTextosFase2 : Transform;
public var prefabTextosFase3 : Transform;
public var prefabTransicao : Transform;
public var prefabGameOver : Transform;
public var prefabPontuacao : Transform;
public var prefabRodadas : Transform;

private var vetorFases : Array;
private var vetorTextos : Array;
private var fase : Transform;
private var texto : Transform;
private var menu : Transform;
private var transicao : Transform;
private var ponto : Transform;
private var rodada : Transform;
private var i : int;
private var j : int;

static var pontuacao : int;
static var tempo : int;
static var velocidadeInimigo : float;
static var intervalo : float;
static var statusMenu : boolean;

function Start () {
	pontuacao = 0;
	tempo = 20;
	velocidadeInimigo = 0.6;
	intervalo = 1.8;
	statusMenu = false;
	prefabRodadas.gameObject.guiText.text = "Rodada 1";

	vetorFases = [prefabFase1, prefabFase2, prefabFase3];
	vetorTextos = [prefabTextosFase1, prefabTextosFase2, prefabTextosFase3];
	
	menu = Instantiate (prefabMenu, transform.position, Quaternion.identity);
}

function Update () {
	if (statusMenu) {
		Destroy(menu.gameObject);
		StartCoroutine("Controlar");
		statusMenu = false;
	}
}

function Controlar () {
	ponto = Instantiate (prefabPontuacao, (prefabPontuacao as Transform).position, Quaternion.identity);
	
	for (j=0; j<=5; j++) {
		prefabRodadas.gameObject.guiText.text = "Rodada " + (j+1);
		
			for (i=0; i<=2; i++) {
				if (j == 5) {
					Destroy(ponto.gameObject);
					Destroy(rodada.gameObject);
					menu = Instantiate (prefabGameOver, (prefabGameOver as Transform).position, Quaternion.identity);
					return;
				}
				
				rodada = Instantiate (prefabRodadas, (prefabRodadas as Transform).position, Quaternion.identity);
				transicao = Instantiate (prefabTransicao, (prefabTransicao as Transform).position, Quaternion.identity);
				texto = Instantiate (vetorTextos[i], transform.position, Quaternion.identity);
				yield WaitForSeconds(5);
				Destroy(transicao.gameObject);
				Destroy(texto.gameObject);
				
				fase = Instantiate (vetorFases[i], (vetorFases[i] as Transform).position, Quaternion.identity);
				yield WaitForSeconds(tempo);
				Destroy(fase.gameObject);
				Destroy(rodada.gameObject);
			}
			tempo -= 2;
			velocidadeInimigo += 0.35;
			intervalo -= 0.25;
		}
}