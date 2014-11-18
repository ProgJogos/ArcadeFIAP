using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class GerenteArcade : MonoBehaviour {

	public static GerenteArcade I;
	
	public TextAsset arquivo;
	public List<InfoJogo> listaJogos;
	public bool estaEmJogo;
	public float intervaloVoto = 60f;
	public float timerVoto;
	public bool mostrarTelaVoto;
	
	void Awake () {
		// singleton que permanece entre telas
		if (I == null) {
			I = this;
			DontDestroyOnLoad(this);
		}
		else {
			Destroy(gameObject);
		}
		// setup quando o jogo comeca
		InfoJogo.CarregarNomes();
		Metricas.CarregarLista();
		Metricas.SalvarLista();
	}
	
	
	void Update () {
		if (estaEmJogo) {
			// habilita voto depois de intervaloVoto
			timerVoto += Time.deltaTime;
			if (timerVoto > intervaloVoto) {
				mostrarTelaVoto = true;
			}
			// volta para menu
			if (Input.GetKeyDown(KeyCode.Escape)) {
				if (mostrarTelaVoto) {
					// TODO carregar tela para votar
					Application.LoadLevel("Cena_MenuJogos");
				}
				else {
					// TODO carregar o menu do jogo
					Application.LoadLevel("Cena_MenuJogos");
				}
			}
		}
		else {
			timerVoto = 0;
			// FIXME Escolher teclas mais obscuras para zerar dados
			if (Input.GetKey(KeyCode.R) && Input.GetKey(KeyCode.LeftShift)) {
				print("zerar dados");
				Metricas.Zerar(listaJogos.ToArray());
			}
		}
	}
	
	public void ComecarTimerVoto (InfoJogo jogo) {
		jogo.partidas++;
		Metricas.SalvarLista();
		// zerar variaveis de controle
		estaEmJogo = true;
		mostrarTelaVoto = false;
		timerVoto = 0;
	}
}
