//=======================
// INITIALIZE DATA
//=======================
$(() => {

})
var cari = '';
let pageShift = {};
pageShift.page = 1;
pageShift.hasContent = false;
pageShift.hasNext = false;
pageShift.hasPrevious = false;
let api = "/Master/Shift";
let shift = {};
let txtGUID = $("#txtGUID").val()
let __RequestVerificationToken = $('#frm input[name=__RequestVerificationToken]').val()
let headerData = {};
headerData.__RequestVerificationToken = __RequestVerificationToken;
let elementToSwitch = [$("#shiftFormRow"), $("#shiftTableRow")];
let $shiftFormTitle = $("#shiftFormTitle");

//=======================
// ALL BUTTON
//=======================
let $btnPrev = $("#btnPrev");
let $btnNext = $("#btnNext");
let $btnSave = $("#btnSave");
let $btnAddShift = $("#btnAddShift");
let $btnCancelAddShift = $("#btnCancelAddShift");
//=======================
// FORM 
//=======================
let $txtShiftName = $("#txtShiftName");
let $dtmStartTime = $("#dtmStartTime");
let $dtmEndTime = $("#dtmEndTime");
let $intKapasitas = $("#intKapasitas");

function initializePage() {
    page = 1;
    cari = "";
    pageShift = {};
    pageShift.page = 1;
    pageShift.hasContent = false;
    pageShift.hasNext = false;
    pageShift.hasPrevious = false;
    api = "/Master/Shift";
    user = {};
    txtGUID = $("#txtGUID").val()
    __RequestVerificationToken = $('#frm input[name=__RequestVerificationToken]').val()
    headerData = {};
    headerData.__RequestVerificationToken = __RequestVerificationToken;
    setButtonNextPrvVisibility();
    iniitializeData();
}
initializePage();
getAllShift(pageShift.page, cari);
function setButtonNextPrvVisibility() {
    if (pageShift.hasNext) {
        $btnNext.show();
    } else {
        $btnNext.hide();
    }
    if (pageShift.hasPrevious) {
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
        shift = response.objData;
        setupAddShiftForm();
        $shiftFormTitle.text = "Add Shift";
    }, errorHandle, headerData);
}

function setupAddShiftForm() {
    $txtShiftName.val(shift.txtShiftName);
    $dtmStartTime.val(shift.dtmStartTime);
    $dtmEndTime.val(shift.dtmEndTime);
    $intKapasitas.val(shift.intKapasitas);
}

//=======================
// AJAX REQUEST GET ALL AUGER
//=======================
function getAllShift(x, y) {
    $.postApi(api + "/getAllShift",
        {
            page: x,
            cari: y,
            size: 20
        },
        function (response) {
            pageShift = response.objData;
            fillTableData();
        },
        function (e) {
            $.errorMessage("Failed", e.responseJSON.txtMessage);
            $("#tbody").html("");
            $("#tbody").append("<tr><td colspan='5'><center><span class='text-muted'>No Data <a class='refresh' href=''>Refresh</a> </span></center></td></tr>");
        },
        headerData
    )
}
//=======================
// AJAX REQUEST SAVE AUGER
//=======================
function saveShift() {
    $.postApi(api + "/Save",
        shift,
        function (response) {
            iniitializeData();
            $.switchElement(elementToSwitch, 1);
            $.successMessage("Sukses", "Berhasil menyimpan shift");
            getAllShift(0, cari)
        },
        function (e) {
            $.errorMessage("Failed", e.responseJSON.txtMessage);
            $("#tbody").html("");
            $("#tbody").append("<tr><td colspan='4'><center><span class='text-muted'>No Data <a class='refresh' href=''>Refresh</a> </span></center></td></tr>");
        },
        headerData
    )
}
//=======================
// FILL TABLE DATA
//=======================
function fillTableData() {
    $("#tbody").html("");
    if (pageShift.hasContent) {
        for (let i = 0; i < pageShift.content.length; i++) {
            var m = pageShift.content[i];
            let $btnEdit = `<button class=' btn btn-outline-warning btnEdit ' data-shift='` + JSON.stringify(m) + `'> <i class='fa fa-edit'></i> Edit</button>`;
            let row = "<tr id='intShiftID" + m.intShiftID + "'>" +
                "<td class='text-center'>" + m.intShiftID + "</td>" +
                "<td class='text-center'>" + m.intShiftSize + "</td>" +
                "<td class='text-center'>" + m.txtShiftDescription + "</td>" +
                "<td class='text-center'>" +
                $btnEdit +
                "</td>" +
                "</tr>";
            $("#tbody").append(row);
        }
        $(".btnEdit").on('click', function () {
            let r = $(this).data('shift');
            setupDataShiftEdit(r);
            setupDataShiftEditForm();
            $.switchElement(elementToSwitch, 0);
            $shiftFormTitle.text = "Edit Shifts";
        })

    } else {
        $("#tbody").append("<tr><td colspan='5'><center><span class='text-muted'>No Data <a class='refresh' href=''>Refresh</a> </span></center></td></tr>");
    }
    setButtonNextPrvVisibility();
}
//=======================
// ASSIGN AUGER SAVE
//=======================
function setupDataShift() {
    shift.intShiftSize = parseInt($intShiftSize.val().toString());
    shift.txtShiftDescription = $txtShiftDescription.val().toString();
}
//=======================
// ASSIGN EDIT AUGER
//=======================
function setupDataShiftEdit(r) {
    shift.intShiftID = r.intShiftID;
    shift.intShiftSize = r.intShiftSize;
    shift.txtShiftDescription = r.txtShiftDescription;
    shift.txtGUID = r.txtGUID;
}
//=======================
// ASSIGN EDIT AUGER FORM
//=======================
function setupDataShiftEditForm() {
    $intShiftSize.val(shift.intShiftSize);
    $txtShiftDescription.val(shift.txtShiftDescription);
}

//=======================
// EVENT LISTENER
//=======================
$btnNext.bind('click', () => {
    if (pageShift.hasNext) {
        getAllShift(pageShift.page + 1, cari);
    }
})

$btnPrev.bind('click', () => {
    if (pageShift.hasPrevious) {
        getAllShift(pageShift.page - 1, cari);
    }
})
$btnAddShift.bind('click', () => {
    $.switchElement(elementToSwitch, 0);
    iniitializeData();
})
$btnCancelAddShift.bind('click', () => {
    $.switchElement(elementToSwitch, 1);
    $shiftFormTitle.text = "Add Shift";
})
$btnSave.bind('click', () => {
    setupDataShift();
    $.confirmMessage("Confirm", "Save Shift?", "Ya Save", saveShift);
})

function searchShift() {
    pageShift.page = 1;
    getAllShift(pageShift.page, cari);
}

