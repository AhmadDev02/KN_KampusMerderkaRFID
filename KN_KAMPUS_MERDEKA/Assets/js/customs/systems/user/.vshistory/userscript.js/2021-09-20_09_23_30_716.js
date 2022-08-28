//=======================
// INITIALIZE DATA
//=======================
function initializeData() {
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
    let postData = {};
    postData.__RequestVerificationToken = __RequestVerificationToken;
}
initializeData();

function errorHandle(error) {
    console.log(error);
}



$.postApi(api + "/InitiateData", postData, function (response) { }, function (error) { });





