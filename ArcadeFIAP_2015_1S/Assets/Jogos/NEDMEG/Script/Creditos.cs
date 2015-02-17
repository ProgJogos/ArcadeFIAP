using UnityEngine;
using System.Collections;

public class Creditos : MonoBehaviour
{

	public TextMesh recorde;
	// Use this for initialization
	void Start ()
	{
		recorde.text = PlayerPrefs.GetInt ("NEDMEG_recorde").ToString ();

	}
	
	// Update is called once per frame
	void Update ()
	{
	
		if (ArcadeFIAP.ApertouBotao (1, EBotao.A)) {
			Application.LoadLevel ("NEDMEG_Inicio");	
		
		}

	}
}
