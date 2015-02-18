using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using System;
using System.IO;

[System.Serializable]
public class InfoJogo
{
	public static Dictionary<string, InfoJogo> infos;
	
	public int partidas; 
	public int votosPositivos;
	public int votosNegativos;
	
	public InfoJogo (string nome)
	{
		if (infos == null) {
			infos = new Dictionary<string, InfoJogo> ();
		}
		partidas = 0;		
		votosNegativos = 0;
		votosPositivos = 0;
		if (!infos.ContainsKey (nome))
			infos.Add (nome, this);
		Metricas.CarregarJogo (nome);
	}
}

public static class Metricas
{
	public static bool mudou = false;
	public static bool zerado = false;

	public static void CarregarLista ()
	{
		foreach (var jogo in InfoJogo.infos) {
			Metricas.CarregarJogo (jogo.Key);
		}
	}
	
	public static void CarregarJogo (string nome)
	{
		
		InfoJogo.infos [nome].partidas = PlayerPrefs.GetInt (nome + "_Partidas");
		InfoJogo.infos [nome].votosPositivos = PlayerPrefs.GetInt (nome + "_VotosPositivos");
		InfoJogo.infos [nome].votosNegativos = PlayerPrefs.GetInt (nome + "_VotosNegativos");
	}
	
	public static void SalvarLista ()
	{
		string resumo = "";
		if (File.Exists (Application.dataPath + @"\METRICAS.tsv")) {
			resumo = File.ReadAllText (Application.dataPath + @"\METRICAS.tsv");
		} else {
			resumo = "Jogo\tPartidas\tVotos positivos\tVotos negativos\tTimestamp\r\n";
		}
		
		if (zerado) {
			resumo = "Jogo\tPartidas\tVotos positivos\tVotos negativos\tTimestamp\r\n";
		}
		
		foreach (var jogo in InfoJogo.infos) {
			resumo += Metricas.SalvarJogo (jogo.Key);
		}
		Debug.Log (Application.dataPath);
		File.WriteAllText (
			Application.dataPath + @"\METRICAS.tsv", 
			resumo);
	}
	
	// TODO salvar metricas em arq externo
	public static string SalvarJogo (string nome)
	{
		zerado = false;
		mudou = true;
		PlayerPrefs.SetInt (nome + "_Partidas", InfoJogo.infos [nome].partidas);
		PlayerPrefs.SetInt (nome + "_VotosPositivos", InfoJogo.infos [nome].votosPositivos);
		PlayerPrefs.SetInt (nome + "_VotosNegativos", InfoJogo.infos [nome].votosNegativos);
		return nome + "\t" + InfoJogo.infos [nome].partidas + "\t" + 
			InfoJogo.infos [nome].votosPositivos + "\t" + InfoJogo.infos [nome].votosNegativos + 
			"\t" + DateTime.Now.ToString () + "\r\n";
	}
	
	public static void Zerar ()
	{
		if (!zerado) {
			foreach (var jogo in InfoJogo.infos) {
				jogo.Value.partidas = 0;
				jogo.Value.votosNegativos = 0;
				jogo.Value.votosPositivos = 0;
				PlayerPrefs.SetInt (jogo.Key + "_Partidas", jogo.Value.partidas);
				PlayerPrefs.SetInt (jogo.Key + "_VotosPositivos", jogo.Value.votosPositivos);
				PlayerPrefs.SetInt (jogo.Key + "_VotosNegativos", jogo.Value.votosNegativos);
			}
			zerado = true;
			Metricas.SalvarLista ();
			zerado = true;
		}
		
	}
}

