using UnityEngine;
using System.Collections;

public class seila : MonoBehaviour
{

	private Animator animator;
	// Use this for initialization
	void Start ()
	{
		animator = GetComponent<Animator> ();

	}
	
	// Update is called once per frame
	void Update ()
	{
		if (ArcadeFIAP.Eixo (1, EEixo.HORIZONTAL) != 0) {
			
			animator.SetBool ("parado", true);
		
		} else {
			animator.SetBool ("parado", false);
		}

	}
}
