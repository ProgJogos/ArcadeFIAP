using System.IO;
using UnityEngine;
using System.Collections.Generic;
using System;
using System.Text;

[System.Serializable]
public class InfoExe
{
	public string id;
	public string titulo;
	public string imagem;
	
	public InfoExe (string i, string exe, string img)
	{
		id = i;
		titulo = exe;
		imagem = img;
	}
}

public static class Config
{
	public static List<InfoExe> jogos;
	
	public static void CarregarJogos ()
	{
		#if UNITY_EDITOR
		string path = Application.dataPath + "/Infos.txt";
		#else
		string path = Environment.CurrentDirectory + "/Infos.txt";
		#endif
		string cont = File.ReadAllText (path, Encoding.GetEncoding ("utf-8"));
		string[] linhas = cont.Split (new string[]{"\n", "\r"}, System.StringSplitOptions.RemoveEmptyEntries);
		jogos = new List<InfoExe> ();
		for (int l = 0; l < linhas.Length; l+=3) {
			jogos.Add (new InfoExe (linhas [l], linhas [l + 1], linhas [l + 2]));
		}
	}
}
