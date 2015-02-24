using UnityEngine;
using System.Collections;

public class EfeitosMenu : MonoBehaviour
{
	public Material skybox;
	public Color corInicial;
	public Color corFinal;
	public AudioClip[] nomesA;
	public AudioClip[] nomesG;

	// Use this for initialization
	void Start ()
	{
		skybox.SetColor ("_Color1", corInicial);
		var tweenCor = new GoTweenConfig ().materialColor (corFinal, "_Color1").setEaseType (GoEaseType.ExpoInOut);
		tweenCor.loopType = GoLoopType.PingPong;
		tweenCor.iterations = -1;
		Go.to (skybox, 10, tweenCor);
	}
	
	public void TocarNome (int ind)
	{
		audio.Stop ();
		if (nomesA.Length > ind) {
			if (Random.value <= 0.5f)
				audio.PlayOneShot (nomesA [ind]);
			else 
				audio.PlayOneShot (nomesG [ind]);
		}
	}
}
