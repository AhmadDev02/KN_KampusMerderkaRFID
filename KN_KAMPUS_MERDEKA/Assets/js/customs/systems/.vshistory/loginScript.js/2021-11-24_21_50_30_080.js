//=======================
// VARIABLE GLOBAL
//=======================
$(document).ready(function () {
	var d = new Date();
	var n = d.getHours();
	if (n > 19 || n < 6)
		document.body.className = "malam";
	else if (n > 15 && n < 19)
		document.body.className = "sore";
	else if (n > 10 && n < 15)
		document.body.className = "siang";
	else
		// Else use ‘day’ theme
		document.body.className = "pagi";
});