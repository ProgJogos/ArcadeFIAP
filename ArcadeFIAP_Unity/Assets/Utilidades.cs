using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using System;
using System.IO;

[System.Serializable]
public class InfoJogo {
	
	public string nome;
	public string id;
	public string cena;
	public int partidas; 
	public int votos;
	
	public InfoJogo (string nome, string id, string cena) {
		this.id = id;
		this.nome = nome;
		this.cena = cena;
	}
	
	public static void CarregarNomes () {
		string conteudo = GerenteArcade.I.arquivo.text;
		string[] linhas = conteudo.Split(
			new string[] { "\r\n","\n" }, 
		StringSplitOptions.None);
		GerenteArcade.I.listaJogos = new List<InfoJogo>();
		for (int i = 0; i < linhas.Length; i += 3) {
			InfoJogo jogo = new InfoJogo (linhas[i], linhas[i+1], linhas[i+2]);
			GerenteArcade.I.listaJogos.Add(jogo);
		}
	}
}

public static class Metricas {

	
	public static void CarregarLista () {
		foreach (InfoJogo jogo in GerenteArcade.I.listaJogos) {
			Metricas.CarregarJogo(jogo);
		}
	}
	
	public static void CarregarJogo (InfoJogo jogo) {
		jogo.partidas = PlayerPrefs.GetInt(jogo.id + "_partidas");
		jogo.votos = PlayerPrefs.GetInt(jogo.id + "_votos");
	}
	
	public static void SalvarLista () {
		string resumo = "Gerado em: ";
		resumo += DateTime.UtcNow.ToString() + "\r\n";
		foreach (InfoJogo jogo in GerenteArcade.I.listaJogos) {
			resumo += Metricas.SalvarJogo(jogo);
		}
		File.WriteAllText(
			Application.dataPath + @"\METRICAS_" +
				DateTime.UtcNow.ToOADate().ToString() + ".txt", 
			resumo);
	}
	
	// TODO salvar metricas em arq externo
	public static string SalvarJogo (InfoJogo jogo) {
		PlayerPrefs.SetInt(jogo.id + "_partidas", jogo.partidas);
		PlayerPrefs.SetInt(jogo.id + "_votos", jogo.votos);
		return "==================\r\n" + jogo.nome + 
			"\r\nPartidas: " + jogo.partidas + 
			"\r\nVotos: " + jogo.votos + "\n"; 
	}
	
	public static void Zerar (InfoJogo[] lista) {
		foreach (InfoJogo jogo in lista) {
			jogo.partidas = 0;
			PlayerPrefs.SetInt(jogo.id + "_partidas", 0);
			jogo.votos = 0;
			PlayerPrefs.SetInt(jogo.id + "_votos", 0);
		}
	}
}

