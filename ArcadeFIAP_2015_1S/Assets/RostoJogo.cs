using UnityEngine;
using System.Collections;

public class RostoJogo : MonoBehaviour
{
	public string jogoAtual;
	
	void Start ()
	{
		// tween visual
		var tweenConf = new GoTweenConfig ()
			.localRotation (new Vector3 (0, 20f, 0))
				.setEaseType (GoEaseType.QuadInOut);
		tweenConf.loopType = GoLoopType.PingPong;
		tweenConf.iterations = -1;
		Go.to (transform, 3f, tweenConf);
	}
}
