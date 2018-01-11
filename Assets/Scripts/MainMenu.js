#pragma strict

function QuitGame () {
	Debug.Log ("Game is exiting...");
	Application.Quit ();
}

function StartGame () {
	Application.LoadLevel("Buy");
}
