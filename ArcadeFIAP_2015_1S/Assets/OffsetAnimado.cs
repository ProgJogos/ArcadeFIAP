using UnityEngine;
using System.Collections;

public class OffsetAnimado : MonoBehaviour
{

	public Vector2 velocidade;
	
	// Update is called once per frame
	void Update ()
	{
		renderer.material.SetTextureOffset ("_MainTex", 
			renderer.material.GetTextureOffset ("_MainTex") + velocidade * Time.deltaTime);
	}
}
