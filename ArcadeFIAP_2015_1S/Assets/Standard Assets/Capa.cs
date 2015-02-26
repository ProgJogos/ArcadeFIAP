using UnityEngine;
using UnityEngine.UI;
using System.Collections;

public class Capa : MonoBehaviour
{
	public string nomeJogo;
	public Text txtNome;
	public InfoJogo info;
	public int ordem;
	public Image imagem;
	
	void Start ()
	{
		info = new InfoJogo (nomeJogo);
		info = InfoJogo.infos [nomeJogo];
		// tween visual
		var tweenConf = new GoTweenConfig ()
			.localRotation (new Vector3 (0, 20f, 0))
				.setEaseType (GoEaseType.QuadInOut);
		tweenConf.loopType = GoLoopType.PingPong;
		tweenConf.iterations = -1;
		Go.to (transform, 3f, tweenConf);
	}
}
