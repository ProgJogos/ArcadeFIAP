using UnityEngine;
using System.Collections;

public enum EEixo
{
	VERTICAL,
	HORIZONTAL
}

public enum EBotao
{
	A,
	B,
	MENU,
	START,
	CIMA,
	BAIXO,
	DIREITA,
	ESQUERDA
}

public static class ArcadeFIAP
{
	private static bool[] cimaVelho;
	private static bool[] baixoVelho;
	private static bool[] esquerdaVelho;
	private static bool[] direitaVelho;
	
	#region Controles
	public static void InicializarInputs ()
	{
		cimaVelho = new bool[2];
		baixoVelho = new bool[2];
		esquerdaVelho = new bool[2];
		direitaVelho = new bool[2];
	}
	
	public static void AtualizarInputs ()
	{
		for (int i = 0; i < 2; i++) {
			cimaVelho [i] = BotaoApertado (i + 1, EBotao.CIMA);
			baixoVelho [i] = BotaoApertado (i + 1, EBotao.BAIXO);
			esquerdaVelho [i] = BotaoApertado (i + 1, EBotao.ESQUERDA);
			direitaVelho [i] = BotaoApertado (i + 1, EBotao.DIREITA);
		}
	}
	
	public static bool ApertouBotao (int jogador, EBotao botao)
	{
		if (jogador == 1 || jogador == 2) {
			switch (botao) {
			case EBotao.CIMA:
				return (Eixo (jogador, EEixo.VERTICAL) > 0 && !cimaVelho [jogador - 1]);
				break;
			case EBotao.BAIXO:
				return (Eixo (jogador, EEixo.VERTICAL) < 0 && !baixoVelho [jogador - 1]);
				break;
			case EBotao.ESQUERDA:
				return (Eixo (jogador, EEixo.HORIZONTAL) < 0 && !esquerdaVelho [jogador - 1]);
				break;
			case EBotao.DIREITA:
				return (Eixo (jogador, EEixo.HORIZONTAL) > 0 && !direitaVelho [jogador - 1]);
				break;	
			default:
				return Input.GetButtonDown (botao.ToString () + jogador);
				break;
			}
		} 
		
		throw new System.InvalidOperationException ("Indice de jogador invalido. Mude para jogador 1 ou 2.");
	}
	
	public static bool SoltouBotao (int jogador, EBotao botao)
	{
		if (jogador == 1 || jogador == 2) {
			switch (botao) {
			case EBotao.CIMA:
				return (Eixo (jogador, EEixo.VERTICAL) == 0 && cimaVelho [jogador - 1]);
				break;
			case EBotao.BAIXO:
				return (Eixo (jogador, EEixo.VERTICAL) == 0 && baixoVelho [jogador - 1]);
				break;
			case EBotao.ESQUERDA:
				return (Eixo (jogador, EEixo.HORIZONTAL) == 0 && esquerdaVelho [jogador - 1]);
				break;
			case EBotao.DIREITA:
				return (Eixo (jogador, EEixo.HORIZONTAL) == 0 && direitaVelho [jogador - 1]);
				break;	
			default:
				return Input.GetButtonUp (botao.ToString () + jogador);
				break;
			}
		}  
		
		throw new System.InvalidOperationException ("Indice de jogador invalido. Mude para jogador 1 ou 2.");
	}
	
	public static bool BotaoApertado (int jogador, EBotao botao)
	{
		if (jogador == 1 || jogador == 2) {
			switch (botao) {
			case EBotao.CIMA:
				return (Eixo (jogador, EEixo.VERTICAL) > 0);
				break;
			case EBotao.BAIXO:
				return (Eixo (jogador, EEixo.VERTICAL) < 0);
				break;
			case EBotao.ESQUERDA:
				return (Eixo (jogador, EEixo.HORIZONTAL) < 0);
				break;
			case EBotao.DIREITA:
				return (Eixo (jogador, EEixo.HORIZONTAL) > 0);
				break;	
			default:
				return Input.GetButton (botao.ToString () + jogador);
				break;
			}
		} 
		
		throw new System.InvalidOperationException ("Indice de jogador invalido. Mude para jogador 1 ou 2.");
	}
	
	public static float Eixo (int jogador, EEixo eixo)
	{
		if (jogador == 1 || jogador == 2) {
			return Input.GetAxis (eixo.ToString () + jogador);
		} 
		
		throw new System.InvalidOperationException ("Indice de jogador invalido. Mude para jogador 1 ou 2.");
	}
	#endregion
}


public class ArcadeFIAP_API : MonoBehaviour
{
	static ArcadeFIAP_API i;
	public string nomeCenaInicial;
	
	void Awake ()
	{
		if (i != null) {
			Destroy (this.gameObject);
			return;
		}
		i = this;
		DontDestroyOnLoad (this);
		ArcadeFIAP.InicializarInputs ();
		Screen.fullScreen = true;
		Application.runInBackground = true;
		Screen.showCursor = false;
	}
	
	void Update ()
	{
		if (ArcadeFIAP.BotaoApertado (1, EBotao.MENU) || ArcadeFIAP.BotaoApertado (2, EBotao.MENU)) {
			Application.Quit ();
		}
		
		if ((ArcadeFIAP.BotaoApertado (1, EBotao.START) || ArcadeFIAP.BotaoApertado (2, EBotao.START))) {
			Application.LoadLevel (nomeCenaInicial);
		}
	}
	
	void LateUpdate ()
	{
		ArcadeFIAP.AtualizarInputs ();
	}
}
