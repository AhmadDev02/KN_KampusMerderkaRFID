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
let __RequestVerificationToken = $('#frm input[name=__RequestVerificationToken]').val()
let headerData = {};
headerData.__RequestVerificationToken = __RequestVerificationToken;


function initializePage() {
    page = 1;
    cari = "";
    pageUser = {};
    pageUser.hasContent = false;
    pageUser.hasNext = false;
    pageUser.hasPrevious = false;
    api = "/System/User";
    user = {};
    txtGUID = $("#txtGUID").val()
    __RequestVerificationToken = $('#frm input[name=__RequestVerificationToken]').val()
    headerData = {};
    headerData.__RequestVerificationToken = __RequestVerificationToken;
    iniitializeData();
}   
initializePage();

function errorHandle(error) {
    console.log(error);
}

function iniitializeData() {
    $.postApi(api + "/InitiateData", null, function (response) {
        console.log(response);
    }, errorHandle, headerData);
}

function







