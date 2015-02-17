using UnityEngine;
using System.Collections;

public class usghuadf : MonoBehaviour
{
		
	// Use this for initialization
	void Start ()
	{
	
	}
	
	// Update is called once per frame
	void Update ()
	{
	
	}
	void OnTriggerEnter2D (Collider2D coli)
	{ 
		Application.LoadLevel ("NEDMEG_GameOver");
	} 
}