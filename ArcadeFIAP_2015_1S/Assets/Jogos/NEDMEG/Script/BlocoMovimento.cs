using UnityEngine;
using System.Collections;

public class BlocoMovimento : MonoBehaviour
{

	public float speed;
	public GameObject bloco;


	private Controle player;

	private bool Points;
	private Spawn spawn;

	// Use this for initialization
	void Start ()
	{
		spawn = FindObjectOfType (typeof(Spawn)) as Spawn;
		player = FindObjectOfType (typeof(Controle)) as Controle;
	}



	void OnEnable ()
	{

		Points = false;
	}


	// Update is called once per frame
	void Update ()
	{
		if (player.Score >= 10000) {
			speed = -12;
			spawn.rateSpawn = 0.3f;

		} else if (player.Score >= 5000) {
			speed = -10;
			spawn.rateSpawn = 0.4f;
		
		} else if (player.Score >= 3500) {
			speed = -8.5f;
			spawn.rateSpawn = 0.6f;

		} else if (player.Score >= 2000) {
			speed = -6;
			spawn.rateSpawn = 0.8f;

		}	

		transform.position += new Vector3 (0, speed, 0) * Time.deltaTime;

		if (transform.position.y < player.transform.position.y && !Points) {
							
						
		}

		if (transform.position.y <= -9) {
			bloco.SetActive (false);
		}
	}
}
