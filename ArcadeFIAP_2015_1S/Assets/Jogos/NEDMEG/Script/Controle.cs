using UnityEngine;
using System.Collections;

public class Controle : MonoBehaviour
{
	
	public GameObject player;

	public float maximo;
	public float minimo;
	
	public float speed;

	public TextMesh Pontos;

	public int Score;




	// Use this for initialization
	void Start ()
	{


	
	}
	
	// Update is called once per frame
	void Update ()
	{


		float translation = ArcadeFIAP.Eixo (1, EEixo.HORIZONTAL) * speed;
		
		player.transform.Translate (translation, 0, 0);
		player.transform.localScale = new Vector3 (-1 * Mathf.Sign (translation), 1, 1);
		
		if (player.transform.position.x < maximo) {
			
			player.transform.position = new Vector2 (maximo, 0);	
			
			
		}

		if (player.transform.position.x > minimo) {
			player.transform.position = new Vector2 (minimo, 0);	
				
		}

		Pontos.text = Score.ToString ();


	}

	void OnTriggerEnter2D (Collider2D col)
	{
		if (col.gameObject) {
			col.gameObject.SetActive (false); 
			Score = Score + 100;

		} 
		if (Score > PlayerPrefs.GetInt ("NEDMEG_recorde")) {
			PlayerPrefs.SetInt ("NEDMEG_recorde", Score);		
		}
		PlayerPrefs.SetInt ("NEDMEG_score", Score);
	
	}
}