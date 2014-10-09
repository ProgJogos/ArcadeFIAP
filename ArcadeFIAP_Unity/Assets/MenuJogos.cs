using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public static class Metricas {
	public static int VOTOS_TRASH;
	public static int PARTIDAS_TRASH;
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
	public List<InfoJogo> listaJogos;
	public List<Transform> posicoes;
	
	void Awake () {
		I = this;
		
		ResetarMetricas();
		
		int numJogos = listaJogos.Count;
		for (var i = 0; i < numJogos; i++) {
			int pos = Random.Range (0, posicoes.Count);
			RostoJogo rosto = Instantiate (prefabRosto, posicoes[pos].position, Quaternion.identity) as RostoJogo;
			rosto.transform.parent = this.transform;
			int ind = Random.Range (0, listaJogos.Count);
			rosto.Iniciar(listaJogos[ind]);
			listaJogos.RemoveAt (ind);			
		}
	}
	
	public void JogarJogo (string id) {
		print ("iniciou id: " + id);
		string cena = "";
		switch (id) {
			case "jogo-trash" :
				Metricas.PARTIDAS_TRASH++;
				cena = listaJogos.Find(j => j.id == id).cena;
				break;
		}
		print ("carregar cena: " + cena);
		if (cena != "") {
			Application.LoadLevel (cena);
		} 
	}
	
	// TODO puxar metricas de arq externo  
	void ResetarMetricas () {
		
	}
}
