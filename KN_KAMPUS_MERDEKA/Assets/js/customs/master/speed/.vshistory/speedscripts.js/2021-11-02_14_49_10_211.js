//=======================
// INITIALIZE DATA
//=======================
var cari = '';
let pageSpeed = {};
pageSpeed.page = 1;
pageSpeed.hasContent = false;
pageSpeed.hasNext = false;
pageSpeed.hasPrevious = false;
let api = "/Master/Speed";
let speed = {};
let txtGUID = $("#txtGUID").val()
let __RequestVerificationToken = $('#frm input[name=__RequestVerificationToken]').val()
let headerData = {};
headerData.__RequestVerificationToken = __RequestVerificationToken;
let elementToSwitch = [$("#speedFormRow"), $("#speedTableRow")];
let $speedFormTitle = $("#speedFormTitle");

//=======================
// ALL BUTTON
//=======================
let $btnPrev = $("#btnPrev");
let $btnNext = $("#btnNext");
let $btnSave = $("#btnSave");
let $btnAddSpeed = $("#btnAddSpeed");
let $btnCancelAddSpeed = $("#btnCancelAddSpeed");
//=======================
// FORM 
//=======================
let $intSpeedSize = $("#intSpeedSize");
let $txtSpeedDescription = $("#txtSpeedDescription");

function initializePage() {
    page = 1;
    cari = "";
    pageSpeed = {};
    pageSpeed.page = 1;
    pageSpeed.hasContent = false;
    pageSpeed.hasNext = false;
    pageSpeed.hasPrevious = false;
    api = "/Master/Speed";
    user = {};
    txtGUID = $("#txtGUID").val()
    __RequestVerificationToken = $('#frm input[name=__RequestVerificationToken]').val()
    headerData = {};
    headerData.__RequestVerificationToken = __RequestVerificationToken;
    setButtonNextPrvVisibility();
    iniitializeData();
}
//initializePage();
getAllSpeed(pageSpeed.page, cari);
function setButtonNextPrvVisibility() {
    if (pageSpeed.hasNext) {
        $btnNext.show();
    } else {
        $btnNext.hide();
    }
    if (pageSpeed.hasPrevious) {
        $btnPrev.show()
    } else {
        $btnPrev.hide();
    }
}


function errorHandle(error) {
    $.errorMessage("Error", error.responseJSON.txtMessage)
}

function iniitializeData() {
    $.postApi(api + "/InitiateData", null, function (response) {
        speed = response.objData;
        setupAddSpeedForm();
        $speedFormTitle.text = "Add Speed";
    }, errorHandle, headerData);
}

function setupAddSpeedForm() {
    $intSpeedSize.val(speed.intSpeedSize);
    $txtSpeedDescription.val(speed.txtSpeedDescription);
}

//=======================
// AJAX REQUEST GET ALL SPEED
//=======================
function getAllSpeed(x, y) {
    $.postApi(api + "/getAllSpeed",
        {
            page: x,
            cari: y,
            size: 20
        },
        function (response) {
            pageSpeed = response.objData;
            fillTableData();
        },
        function (e) {
            $.errorMessage("Failed", e.responseJSON.txtMessage);
            $("#tbody").html("");
            $("#tbody").append("<tr><td colspan='6'><center><span class='text-muted'>No Data <a class='refresh' href=''>Refresh</a> </span></center></td></tr>");
        },
        headerData
    )
}
//=======================
// AJAX REQUEST SAVE SPEED
//=======================
//function saveSpeed() {
//    $.postApi(api + "/Save",
//        speed,
//        function (response) {
//            iniitializeData();
//            $.switchElement(elementToSwitch, 1);
//            $.successMessage("Sukses", "Berhasil menyimpan speed");
//            getAllSpeed(0, cari)
//        },
//        function (e) {
//            $.errorMessage("Failed", e.responseJSON.txtMessage);
//            $("#tbody").html("");
//            $("#tbody").append("<tr><td colspan='6'><center><span class='text-muted'>No Data <a class='refresh' href=''>Refresh</a> </span></center></td></tr>");
//        },
//        headerData
//    )
//}
//=======================
// FILL TABLE DATA
//=======================
function fillTableData() {
    $("#tbody").html("");
    if (pageSpeed.hasContent) {
        for (let i = 0; i < pageSpeed.content.length; i++) {
            var m = pageSpeed.content[i];
            let $btnEdit = `<button class=' btn btn-outline-warning btnEdit ' data-speed='` + JSON.stringify(m) + `'> <i class='fa fa-edit'></i> Edit</button>`;
            let row = "<tr id='intSpeedID" + m.intSpeedID + "'>" +
                "<td class='text-center'>" + m.txtProductionLineItemCode + "</td>" +
                "<td class='text-center'>" + m.intSpeedSize + "</td>" +
                "<td class='text-center'>" + m.txtSpeedDescription + "</td>" +
                "<td class='text-center'>" +
                'No Action' +
                "</td>" +
                "</tr>";
            $("#tbody").append(row);
        }
        //$(".btnEdit").on('click', function () {
        //    let r = $(this).data('speed');
        //    setupDataSpeedEdit(r);
        //    setupDataSpeedEditForm();
        //    $.switchElement(elementToSwitch, 0);
        //    $speedFormTitle.text = "Edit Speeds";
        //})

    } else {
        $("#tbody").append("<tr><td colspan='4'><center><span class='text-muted'>No Data <a class='refresh' href=''>Refresh</a> </span></center></td></tr>");
    }
    setButtonNextPrvVisibility();
}
//=======================
// ASSIGN SPEED SAVE
//=======================
function setupDataSpeed() {
    //speed.intSpeedSize = parseInt($intSpeedSize.val().toString());
    //speed.txtSpeedDescription = $txtSpeedDescription.val().toString();
}
//=======================
// ASSIGN EDIT SPEED
//=======================
function setupDataSpeedEdit(r) {
    //speed.intSpeedID = r.intSpeedID;
    //speed.intSpeedSize = r.intSpeedSize;
    //speed.txtSpeedDescription = r.txtSpeedDescription;
    //speed.txtGUID = r.txtGUID;
}
//=======================
// ASSIGN EDIT SPEED FORM
//=======================
function setupDataSpeedEditForm() {
    //$intSpeedSize.val(speed.intSpeedSize);
    //$txtSpeedDescription.val(speed.txtSpeedDescription);
}

//=======================
// EVENT LISTENER
//=======================
$btnNext.bind('click', () => {
    if (pageSpeed.hasNext) {
        getAllSpeed(pageSpeed.page + 1, cari);
    }
})

$btnPrev.bind('click', () => {
    if (pageSpeed.hasPrevious) {
        getAllSpeed(pageSpeed.page - 1, cari);
    }
})
//$btnAddSpeed.bind('click', () => {
//    $.switchElement(elementToSwitch, 0);
//    iniitializeData();
//})
//$btnCancelAddSpeed.bind('click', () => {
//    $.switchElement(elementToSwitch, 1);
//    $speedFormTitle.text = "Add Speed";
//})
//$btnSave.bind('click', () => {
//    setupDataSpeed();
//    $.confirmMessage("Confirm", "Save Speed?", "Ya Save", saveSpeed);
//})

function searchSpeed() {
    pageSpeed.page = 1;
    getAllSpeed(pageSpeed.page, cari);
}

