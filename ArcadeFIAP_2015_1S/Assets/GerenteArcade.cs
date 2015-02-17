using UnityEngine;
using System.Collections;

public class GerenteArcade : MonoBehaviour
{
	public static GerenteArcade i;
	public static string cenaInicialJogo;
	public static float timerJogo;
	public static bool votacaoPermitida = false;
	
	void Awake ()
	{
		timerJogo = 0;
		if (i != null) {
			DestroyImmediate (this.gameObject);
			return;
		}
		i = this;
		DontDestroyOnLoad (this.gameObject);
		IniciarJogo ();
	}
	
	void Update ()
	{
		timerJogo += Time.deltaTime;
		if (timerJogo >= 60) {
			votacaoPermitida = true;
		}
		
		if (ArcadeFIAP.BotaoApertado (1, EBotao.MENU) && ArcadeFIAP.BotaoApertado (2, EBotao.MENU) &&
			timerJogo > 1) {
			ReiniciarJogo ();
		}
		
		if ((ArcadeFIAP.BotaoApertado (1, EBotao.MENU) && ArcadeFIAP.BotaoApertado (1, EBotao.START)) ||
			(ArcadeFIAP.BotaoApertado (2, EBotao.MENU) && ArcadeFIAP.BotaoApertado (2, EBotao.START))) {
			TerminarJogo ();
		}
	}
	
	void IniciarJogo ()
	{
		votacaoPermitida = false;
		cenaInicialJogo = Application.loadedLevelName;
		print ("IniciarJogo: " + cenaInicialJogo);
	}
	
	void TerminarJogo ()
	{
		print ("TerminarJogo");
	}
	
	void ReiniciarJogo ()
	{
		print ("ReiniciarJogo");
		Application.LoadLevel (cenaInicialJogo);
	}
}
