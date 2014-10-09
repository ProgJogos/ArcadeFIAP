var target : Transform;
var distance = 10.0;

var xSpeed = 100.0;
var ySpeed = 80.0;

var xMinLimit = -30;
var xMaxLimit = 30;

var yMinLimit = -5;
var yMaxLimit = 10;

private var x = 0.0;
private var y = 0.0;

@script AddComponentMenu("Camera-Control/Mouse Orbit")

function Start () {
    var angles = transform.eulerAngles;
    x = angles.y;
    y = angles.x;
}

function LateUpdate () {
    if (target) {
        x += Input.GetAxis("Horizontal") * xSpeed * 0.02;
        y -= Input.GetAxis("Vertical") * ySpeed * 0.02;
 		
 		x = ClampAngle(x, xMinLimit, xMaxLimit);
 		y = ClampAngle(y, yMinLimit, yMaxLimit);
 		       
        var rotation = Quaternion.Euler(y, x, 0);
        var position = rotation * Vector3(0.0, 0.0, -distance) + target.position;
        
        transform.rotation = rotation;
        transform.position = position;
    }
}

static function ClampAngle (angle : float, min : float, max : float) {
	if (angle < -360)
		angle += 360;
	if (angle > 360)
		angle -= 360;
	return Mathf.Clamp (angle, min, max);
}