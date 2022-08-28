//=======================
// VARIABLE GLOBAL
//=======================
$(document).ready(function () {
	var d = new Date();
	var n = d.getHours();
	if (n > 19 || n < 6)
		$("body").addClass("malam");
	else if (n > 15 && n < 19)
		$("body").addClass("sore");
	else if (n > 10 && n < 15)
		$("body").addClass("siang");
	else
		$("body").addClass("pagi");
});