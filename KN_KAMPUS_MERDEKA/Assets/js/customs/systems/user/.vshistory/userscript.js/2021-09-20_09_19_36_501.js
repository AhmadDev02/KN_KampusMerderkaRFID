//=======================
// INITIALIZE DATA
//=======================
let page = 1;
let cari = "";
let pageUser = {};
pageUser.hasContent = false;
pageUser.hasNext = false;
pageUser.hasPrevious = false;
let api = "/System/User";
let user = {};
let txtGUID = $("#txtGUID").val()
let __RequestVerificationToken =  $('#frm1 input[name=__RequestVerificationToken]').val()

$.postApi(api +"/InitiateData");





