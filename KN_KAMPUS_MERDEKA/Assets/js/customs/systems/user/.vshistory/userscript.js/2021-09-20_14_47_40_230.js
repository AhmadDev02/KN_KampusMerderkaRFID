//=======================
// INITIALIZE DATA
//=======================
let cari = "";
let pageUser = {};
pageUser.page = 1;
pageUser.hasContent = false;
pageUser.hasNext = false;
pageUser.hasPrevious = false;
let api = "/System/User";
let user = {};
let txtGUID = $("#txtGUID").val()
let __RequestVerificationToken = $('#frm input[name=__RequestVerificationToken]').val()
let headerData = {};
headerData.__RequestVerificationToken = __RequestVerificationToken;
let $btnPrev = $("#btnPrev");
let $btnNext = $("#btnNext");

function initializePage() {
    page = 1;
    cari = "";
    pageUser = {};
    pageUser.page = 1;
    pageUser.hasContent = false;
    pageUser.hasNext = false;
    pageUser.hasPrevious = false;
    api = "/System/User";
    user = {};
    txtGUID = $("#txtGUID").val()
    __RequestVerificationToken = $('#frm input[name=__RequestVerificationToken]').val()
    headerData = {};
    headerData.__RequestVerificationToken = __RequestVerificationToken;
    setButtonNextPrvVisibility();
    iniitializeData();
}   
initializePage();
getAllUser(pageUser.page, cari);

function setButtonNextPrvVisibility() {
    if (pageUser.hasNext) {
        $btnNext.show();
    } else {
        $btnNext.hide();
    }
    if (pageUser.hasPrevious) {
        $btnPrev.show()
    } else {
        $btnPrev.hide();
    }
}


function errorHandle(error) {
    console.log(error);
}

function iniitializeData() {
    $.postApi(api + "/InitiateData", null, function (response) {
        console.log(response);
    }, errorHandle, headerData);
}


//=======================
// AJAX REQUEST GET ALL USER
//=======================

function getAllUser(x,y) {
    $.postApi(api + "/getAllUser",
        {
            page: x,
            cari: y,
            size: 20
        },
        function (response) {
            var test = response.objData.content[0].dtmInsertedDate;
            var pesan = $.parseJsonDate(test, "dd/MM/yyyy");
            $.successMessage("Sukses", pesan);
        },
        errorHandle,
        headerData
    )
}



