//=======================
// VARIABLE GLOBAL
//=======================
$(document).ready(function () {
	var d = new Date();
	var n = d.getHours();
	console.log(n);
	if (n >= 6 && n <= 10)
		$("body").addClass("pagi");
	else if (n >= 10 && n <= 15 )
		$("body").addClass("siang");
	else if (n >= 15 && n <= 18)
		$("body").addClass("sore");
	else if(n >= 18)
		$("body").addClass("malam");
	else
		$("body").addClass("malam");
});