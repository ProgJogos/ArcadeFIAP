using UnityEngine;
using System.Collections;

public class GerenteArcade : MonoBehaviour {

	public static GerenteArcade I;
	
	public bool estaEmJogo;
	public float intervaloVoto = 60f;
	public float timerVoto;
	public bool mostrarTelaVoto;
	
	void Awake () {
		if (I == null) {
			I = this;
			DontDestroyOnLoad(this);
		}
		else {
			Destroy(gameObject);
		}
	}
	
	
	void Update () {
		if (estaEmJogo) {
			timerVoto += Time.deltaTime;
			if (timerVoto > intervaloVoto) {
				mostrarTelaVoto = true;
			}
		}
	}
	
	public void ComecarTimerVoto (string id) {
		
		// TODO adicionar cada jogo aqui
		switch (id) {
		case "jogo-trash" :
			Metricas.PARTIDAS_TRASH++;
			break;
		}
		// zerar variavies de controle
		estaEmJogo = true;
		mostrarTelaVoto = false;
		timerVoto = 0;
	}
}
