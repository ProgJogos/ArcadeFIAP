using UnityEngine;
using System.Collections;

public class NextCena : MonoBehaviour {

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}
	void OnCollisionEnter(Collision objeto) {
		if (objeto.gameObject.CompareTag ("Player")) {
			Application.LoadLevel("Cena2");
		}
	}
}
