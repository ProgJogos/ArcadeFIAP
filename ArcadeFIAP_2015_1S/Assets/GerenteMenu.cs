using UnityEngine;
using System.Collections;

public enum EEtapa
{
	MENU_JOGOS,
	JOGO,
	VOTACAO
}

public class GerenteMenu : MonoBehaviour
{
	public static EEtapa etapa;

	void Awake ()
	{
		if (GerenteArcade.votacaoPermitida) {
			etapa = EEtapa.VOTACAO;
		}
	}
	
	void Update ()
	{
	
	}
}
