#pragma strict

private var tHorizontal : float;
private var tPulo : float;
private var velocidade : float = 8.0;
private var gravidade : float = 25.0;
private var deslocamento : Vector3;

function Update () {
	tHorizontal = ArcadeFIAP.Eixo (1, EEixo.HORIZONTAL);
	tPulo = (ArcadeFIAP.BotaoApertado(1, EBotao.A)) ? 1 : 0;
	deslocamento = Vector3.zero;

	if (tHorizontal == -1) {
		deslocamento.x += -1 * velocidade;
	}
	
	if (tHorizontal == 1) {
		deslocamento.x += 1 * velocidade;
	}
	
	if (tPulo == 1) {
		deslocamento.y = velocidade * 1.5;
	}
	deslocamento.y -= gravidade * Time.deltaTime;
}

function FixedUpdate () {
	rigidbody.MovePosition (rigidbody.position + deslocamento * Time.fixedDeltaTime);
}