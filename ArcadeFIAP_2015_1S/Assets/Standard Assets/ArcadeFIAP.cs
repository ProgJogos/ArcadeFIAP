using UnityEngine;
using System.Collections;
using System.Collections.Generic;

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
	START
}
	
public static class ArcadeFIAP
{
	public static List<string> jogos;

	#region Controles
	public static bool ApertouBotao (int jogador, EBotao botao)
	{
		if (jogador == 1 || jogador == 2) {
			return Input.GetButtonDown (botao.ToString () + jogador);
		} 
			
		throw new System.InvalidOperationException ("Indice de jogador invalido. Mude para jogador 1 ou 2.");
	}
		
	public static bool SoltouBotao (int jogador, EBotao botao)
	{
		if (jogador == 1 || jogador == 2) {
			return Input.GetButtonUp (botao.ToString () + jogador);
		} 
			
		throw new System.InvalidOperationException ("Indice de jogador invalido. Mude para jogador 1 ou 2.");
	}
		
	public static bool BotaoApertado (int jogador, EBotao botao)
	{
		if (jogador == 1 || jogador == 2) {
			return Input.GetButton (botao.ToString () + jogador);
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
	
	public static void Inicializar ()
	{
		// TODO carregar nomes de arquivo?
		// jogos = new List<string> ();

	}
	
	public static void CarregarJogo (string nome)
	{
		Application.LoadLevel (nome + "_Inicio");
		GerenteArcade.i.ingame = true;
	}
}


