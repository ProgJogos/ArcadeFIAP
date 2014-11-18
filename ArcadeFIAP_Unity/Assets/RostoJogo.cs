using UnityEngine;
using UnityEngine.UI;
using System.Collections;

public class RostoJogo : MonoBehaviour {

	public InfoJogo jogo;
	public Text nome;
	
	public void Iniciar (InfoJogo pJogo) {
		jogo = pJogo;
		nome.text = jogo.nome;
		GetComponentInChildren<Button>().onClick.AddListener( delegate () {
			MenuJogos.I.JogarJogo(jogo);
		});
	}
}
