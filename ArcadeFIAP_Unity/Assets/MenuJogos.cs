using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class MenuJogos : MonoBehaviour {

	public static MenuJogos I;
	public RostoJogo prefabRosto;
	private List<InfoJogo> listaJogosSemUsar;
	public List<Transform> posicoes;
	
	void Start () {
		// singleton
		if (I == null) {
			I = this;
		}
		else {
			Destroy(gameObject);
		}
		// criacao de prefabs de thumbs em posicoes aleatorias
		listaJogosSemUsar = new List<InfoJogo>(GerenteArcade.I.listaJogos.ToArray());
		int numJogos = GerenteArcade.I.listaJogos.Count;
		for (var i = 0; i < numJogos; i++) {
			int pos = Random.Range(0, posicoes.Count);
			RostoJogo rosto = Instantiate(
				prefabRosto, 
				posicoes[pos].position, 
				Quaternion.identity) as RostoJogo;
			posicoes.RemoveAt(pos);
			int ind = Random.Range(0, listaJogosSemUsar.Count);
			rosto.transform.parent = this.transform;
			rosto.Iniciar(listaJogosSemUsar[ind]);
			listaJogosSemUsar.RemoveAt(ind);			
		}
	}
	
	public void JogarJogo (InfoJogo jogo) {
		print ("iniciou id: " + jogo.id);
		print ("carregar cena: " + jogo.cena);
		if (jogo.cena != "") {
			GerenteArcade.I.ComecarTimerVoto(jogo);
			Application.LoadLevel (jogo.cena);
		} 
	}
}
