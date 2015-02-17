using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class Spawn : MonoBehaviour {
	
	public float maxHeight;
	public float minHeight;

	public float rateSpawn;

	private float currentRateSpawn;

	public int maxBloco;
	public GameObject prefab;

	public List<GameObject> relogio;

	// Use this for initialization
	void Start () {

		for (int i=0; i < maxBloco; i++) {
			GameObject tempBloco = Instantiate(prefab) as GameObject;
			relogio.Add(tempBloco);
			tempBloco.SetActive(false);

		}


	}
	
	// Update is called once per frame
	void Update () {

		currentRateSpawn += Time.deltaTime;

		if (currentRateSpawn > rateSpawn) {
			currentRateSpawn = 0;
			Spawnn();
		}

	}

	private void Spawnn(){

		float randPosition = Random.Range(minHeight, maxHeight);
		GameObject tempBloco = null;
		for (int i=0; i < maxBloco; i++) {
			if(relogio[i].activeSelf == false){
				tempBloco = relogio[i];
				break;
			}
		}
		if(tempBloco != null){
			tempBloco.transform.position = new Vector3(randPosition,transform.position.y,transform.position.z);
			tempBloco.SetActive(true);	
		}
	
	}
	
}
