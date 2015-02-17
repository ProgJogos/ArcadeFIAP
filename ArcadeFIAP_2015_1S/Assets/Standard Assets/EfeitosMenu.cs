using UnityEngine;
using System.Collections;

public class EfeitosMenu : MonoBehaviour
{
	public Material skybox;
	public Color corInicial;
	public Color corFinal;

	// Use this for initialization
	void Start ()
	{
		skybox.SetColor ("_Color1", corInicial);
		var tweenCor = new GoTweenConfig ().materialColor (corFinal, "_Color1").setEaseType (GoEaseType.ExpoInOut);
		tweenCor.loopType = GoLoopType.PingPong;
		tweenCor.iterations = -1;
		Go.to (skybox, 10, tweenCor);
	}
	
	// Update is called once per frame
	void Update ()
	{
	
	}
}
