using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public static class Metricas {
	public static int VOTOS_TRASH;
	public static int PARTIDAS_TRASH;
	
	// TODO puxar metricas de arq externo  
	public static void ResetarMetricas() {
	
	}
	
}

[System.Serializable]
public class InfoJogo {
	
	public string nome;
	public string id;
	public string cena;

	public InfoJogo (string id, string nome, string cena) {
		this.id = id;
		this.nome = nome;
		this.cena = cena;
	}
}


public class MenuJogos : MonoBehaviour {

	public static MenuJogos I;

	public RostoJogo prefabRosto;
	private List<InfoJogo> listaJogosSemUsar;
	public List<InfoJogo> listaJogos;
	public List<Transform> posicoes;
	
	void Awake () {
		// singleton
		if (I == null) {
			I = this;
		}
		else {
			Destroy(gameObject);
		}
		// criacao de prefabs de thumbs em posicoes aleatorias
		listaJogosSemUsar = new List<InfoJogo>(listaJogos.ToArray());
		int numJogos = listaJogos.Count;
		for (var i = 0; i < numJogos; i++) {
			int pos = Random.Range (0, posicoes.Count);
			RostoJogo rosto = Instantiate (prefabRosto, posicoes[pos].position, Quaternion.identity) as RostoJogo;
			posicoes.RemoveAt(pos);
			int ind = Random.Range (0, listaJogosSemUsar.Count);
			rosto.transform.parent = this.transform;
			rosto.Iniciar (listaJogosSemUsar[ind]);
			listaJogosSemUsar.RemoveAt (ind);			
		}
	}
	
	public void JogarJogo (string id) {
		print ("iniciou id: " + id);
		string cena = "";
		// TODO adicionar cada jogo aqui
		switch (id) {
			case "jogo-trash" :
				cena = listaJogos.Find(j => j.id == id).cena;
				break;
		}
		print ("carregar cena: " + cena);
		if (cena != "") {
			GerenteArcade.I.ComecarTimerVoto(id);
			Application.LoadLevel (cena);
		} 
	}
	
	
}
