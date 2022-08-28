//=======================
// INITIALIZE DATA

import { error } from "console";

//=======================
function initializePage() {
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
    postData.__RequestVerificationToken = __RequestVerificationToken; '
    iniitializeData();
}
initializePage();

function errorHandle(error) {
    console.log(error);
}

function iniitializeData() {
    $.postApi(api + "/InitiateData", postData, function (response) {
        console.log(response);

    }, errorHandle);

}






