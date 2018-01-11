#pragma strict
import System.IO;

var Offer_AI : UnityEngine.UI.Text;
var Offer_Player : UnityEngine.UI.Text;
var AI_Mood : UnityEngine.UI.Text;
var Item_Description : UnityEngine.UI.Text;
var Player_Cash : UnityEngine.UI.Text;
var Player_Offer_Change : UnityEngine.UI.Text;
var End_Title : UnityEngine.UI.Text;

var Action_Menu : GameObject;
var Offer_Menu : GameObject;
var Purchase_Menu : GameObject;

var Item : TextAsset;
var Line_Value : String;

var AI_Offer : int;
var Player_Offer : int;
var Player_Cash_Value : int = 1000;
var Current_Offer : int;
var Difference : int; //Get it to change based off of mood?

function Start () {
	//Item = Resources.Load("Items", typeof(TextAsset));
	Item_Selection();
	Offer_Player.text = "Your Offer: ???";
	Player_Cash.text = "Your Cash : " + Player_Cash_Value;
	AI_Mood.text = "Their Mood: money hungry";
	Difference = Random.Range(1, 11);
}

function Update () {
	if (Purchase_Menu.active == false) {
		Offer_AI.text = "Their Offer: " + AI_Offer.ToString();
		if (Player_Offer == 0) {
			
		}else {
			Offer_Player.text = "Your Offer: " + Player_Offer.ToString();
		}
	}else if (Purchase_Menu.active == true) {
		//Do end shit
	}
}

function Leave () {
	Purchase_Menu.SetActive(true);
	End_Title.text = "You didnt buy the " + Line_Value + "!";
}

function Action () {
	if (Action_Menu.active == false) {
		Action_Menu.SetActive(true);
		Offer_Menu.SetActive(false);
	}else {
		Action_Menu.SetActive(false);
	}
}

function Offer () {
	if (Offer_Menu.active == false) {
		Offer_Menu.SetActive(true);
		Action_Menu.SetActive(false);
	}else {
		Offer_Menu.SetActive(false);
	}
}

function Purchase () {
	if (Player_Cash_Value >= Current_Offer) {
		Purchase_Menu.SetActive(true);
		Player_Cash_Value = Player_Cash_Value - Current_Offer;
		End_Title.text = "You purchased the " + Line_Value + " for " + Current_Offer + " dollars!";
	}
}

function Item_Selection () {
	var SR : StreamReader = new StreamReader(new MemoryStream(Item.bytes));
	var Number_Random : int = Random.Range(1, 41);
	while (Number_Random > 0) {
		Line_Value = SR.ReadLine();
		Number_Random--;
	}
	Item_Description.text = "The Item: " + Line_Value; //Maybe the lower the line is the more valuble it is?
	AI_Offer = Random.Range(100, 1000);
	Current_Offer = AI_Offer;
	SR.Close();
}

function AI_Selection () {
	yield WaitForSeconds (5);
	if (AI_Offer - Player_Offer <= AI_Offer / Difference) {
		Purchase_Menu.SetActive(true);
		Player_Cash_Value = Player_Cash_Value - Current_Offer;
		End_Title.text = "You purchased " + Line_Value + " for " + Current_Offer + " dollars!";
	}else {
		AI_Offer = AI_Offer - (AI_Offer / Random.Range(1, 26));
		while (AI_Offer <= Current_Offer) {
			AI_Offer = AI_Offer - (AI_Offer / Random.Range(1, 25));
		}
		Current_Offer = AI_Offer;
	}
}

function Offer_Submit () {
	if (Current_Offer != Player_Offer && int.Parse(Player_Offer_Change.text) <= Player_Cash_Value) {
		Player_Offer = int.Parse(Player_Offer_Change.text);
		Current_Offer = Player_Offer;
		Offer_Menu.SetActive(false);
		AI_Selection();
	}
}

function Slap () {
	AI_Mood.text = "Their Mood: Annoyed";
	Action_Menu.SetActive(false);
}

function Compliment () {
	if (Random.Range(1, 25) > 10) {
		AI_Mood.text = "Their Mood: happy";
	}
	Action_Menu.SetActive(false);
}

function Beg () {
	if (Random.Range(1, 25) > 20) {
		AI_Offer = AI_Offer - (AI_Offer / Random.Range(1, 26));
		Current_Offer = AI_Offer;
	}else {
		AI_Offer = AI_Offer + (AI_Offer / Random.Range(1, 11));
		Current_Offer = AI_Offer;
	}
	Action_Menu.SetActive(false);
}

function Threat () {
	if (Random.Range(1, 25) > 20) {
		Purchase_Menu.SetActive(true);
		End_Title.text = "You purchased the " + Line_Value + " for nothing!";
	}else {
		Purchase_Menu.SetActive(true);
		End_Title.text = "They left the discussion!";
	}
}

function Exit () {
	Application.LoadLevel("MainMenu");
}

function Replay () {
	Application.LoadLevel("Buy");
}