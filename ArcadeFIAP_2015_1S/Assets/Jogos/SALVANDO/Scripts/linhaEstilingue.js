#pragma strict

public static var m:motor;

function Update () {
	//MODIFICA AS PARTICULAS DA LINHA CONFORME A FORÇA DO TIRO
	this.transform.particleSystem.startLifetime = 0.05 * m.forcatiro ;
	this.transform.particleSystem.startSpeed = 0.2 * m.forcatiro ;
}