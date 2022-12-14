//=======================
// INITIALIZE DATA
//=======================
$(() => {
    initializePage();
    getAllBo(pageBo.page, cari);
})
var cari = '';
let pageBo = {};
pageBo.page = 1;
pageBo.hasContent = false;
pageBo.hasNext = false;
pageBo.hasPrevious = false;
let api = "/Master/Bo";
let txtGUID = $("#txtGUID").val()
let __RequestVerificationToken = $('#frm input[name=__RequestVerificationToken]').val()
let headerData = {};
headerData.__RequestVerificationToken = __RequestVerificationToken;

//=======================
// ALL BUTTON
//=======================
let $btnPrev = $("#btnPrev");
let $btnNext = $("#btnNext");
let $btnSave = $("#btnSave");

//=======================
// FORM 
//=======================
function initializePage() {
    page = 1;
    cari = "";
    pageBo = {};
    pageBo.page = 1;
    pageBo.hasContent = false;
    pageBo.hasNext = false;
    pageBo.hasPrevious = false;
    api = "/Master/Bo";
    user = {};
    txtGUID = $("#txtGUID").val()
    __RequestVerificationToken = $('#frm input[name=__RequestVerificationToken]').val()
    headerData = {};
    headerData.__RequestVerificationToken = __RequestVerificationToken;
    setButtonNextPrvVisibility();
}

function setButtonNextPrvVisibility() {
    if (pageBo.hasNext) {
        $btnNext.show();
    } else {
        $btnNext.hide();
    }
    if (pageBo.hasPrevious) {
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

//=======================
// AJAX REQUEST GET ALL BO
//=======================
function getAllBo(x, y) {
    $.postApi(api + "/GetAllBo",
        {
            page: x,
            cari: y,
            size: 20
        },
        function (response) {
            pageBo = response.objData;
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
// AJAX REQUEST SAVE SHIFT
//=======================
//function saveShift() {
//    $.postApi(api + "/Save",
//        shift,
//        function (response) {
//            iniitializeData();
//            $.switchElement(elementToSwitch, 1);
//            $.successMessage("Sukses", "Berhasil menyimpan shift");
//            getAllShift(0, cari)
//        },
//        function (e) {
//            $.errorMessage("Failed", e.responseJSON.txtMessage);
//            $("#tbody").html("");
//            $("#tbody").append("<tr><td colspan='4'><center><span class='text-muted'>No Data <a class='refresh' href=''>Refresh</a> </span></center></td></tr>");
//        },
//        headerData
//    )
//}
//=======================
// FILL TABLE DATA
//=======================
function fillTableData() {
    $("#tbody").html("");
    if (pageBo.hasContent) {
        for (let i = 0; i < pageBo.content.length; i++) {
            var m = pageBo.content[i];
            let currentBitHold = m.bitHold;
            let currentBitPrioritas = m.bitHold;
            let idIntBo =  m.intBoID;
            let $badgeHold = currentBitHold ? "bg-red" : "bg-green";
            let $badgePrioritas = currentBitPrioritas ? "bg-red" : "bg-green";
            let $badgeTextHold = currentBitHold ? "Hold" : "No";
            let $badgeTextPrioritas = currentBitPrioritas ? "Priority" : "Normal";
            let $switcHold = fullacces ?
                `<div class="form-group">
                                <label class="switch">
                                    <input type="checkbox" class="bitTrial" id="bitTrial-`+ idIntBoUrtSpec + `" data-bo='` + JSON.stringify(response.objData.content[i]) + `' onchange="(function(e){ e.preventDefault(); setTrial(e); })(event)">
                                    <span class="slider"></span>
                                </label>
                            </div>` : '';
            let row = "<tr id='tr-" + response.objData.content[i].intBoUrtSpec + "' class='tr-class'> " +
                "<td>" + response.objData.content[i].txtBoNo + "</td>" +
                "<td>" + clsGlobal.parseJSONdate(response.objData.content[i].dtmPlanStartDate) + "</td>" +
                "<td>" + response.objData.content[i].txtProduct + "</td>" +
                "<td>" + response.objData.content[i].txtProdLine + "</td>" +
                "<td>" + response.objData.content[i].txtReceipeNumber + "</td>" +
                "<td>" + response.objData.content[i].intReceipeVersion + "</td>" +
                "<td><span class='badge " + $badge + "'>" + $badgeText + "</span></td> " +
                "<td>" + $switcTrial + "</td > " +
                "</tr>";
            $("#tbody").append(row);
            if (currentBitTrial) {
                $("#bitTrial-" + idIntBoUrtSpec).prop('checked', true);
            }
        }
    } else {
        $("#tbody").append("<tr><td colspan='5'><center><span class='text-muted'>No Data <a class='refresh' href=''>Refresh</a> </span></center></td></tr>");
    }
    setButtonNextPrvVisibility();
}

//=======================
// ASSIGN SHIFT SAVE
//=======================
function calculateKapasitas() {
    const stJam = parseInt($dtmStartTime.val().toString().substring(0, 2));
    const stMinute = parseInt($dtmStartTime.val().toString().substring(4, 6));
    const etJam = parseInt($dtmEndTime.val().toString().substring(0, 2));
    const etMinute = parseInt($dtmEndTime.val().toString().substring(4, 6));
    let dtNowST = new Date();
    let dtNowET = new Date();
    if (stJam > etJam) {
        dtNowET.setDate(dtNowET.getDate() + 1);
    }
    dtNowST.setHours(stJam, stMinute, 0, 0);
    dtNowET.setHours(etJam, etMinute, 0, 0);
    var selisih = (dtNowET.getTime() - dtNowST.getTime()) / 1000;
    selisih /= 60;
    var kpsts = Math.abs(Math.round(selisih));
    var kpstsJam = kpsts / 60;

    $intKapasitas.val(kpsts.toString());
    $intKapasitasJam.val(kpstsJam.toFixed(2).toString());
}
//=======================
// ASSIGN SHIFT SAVE
//=======================
function setupDataShift() {
    shift.txtShiftName = $txtShiftName.val().toString();
    shift.dtmStartTime = $dtmStartTime.val().toString()
    shift.dtmEndTime = $dtmEndTime.val().toString();
    shift.intKapasitas = parseInt($intKapasitas.val().toString()) | 0;
}
//=======================
// ASSIGN EDIT SHIFT
//=======================
function setupDataShiftEdit(r) {
    shift.txtShiftName = r.txtShiftName;
    shift.dtmStartTime = r.dtmStartTime;
    shift.dtmEndTime = r.dtmEndTime;
    shift.intKapasitas = r.intKapasitas;
    shift.intShiftID = r.intShiftID;
    shift.txtGUID = r.txtGUID;
}
//=======================
// ASSIGN EDIT SHIFT FORM
//=======================
function setupDataShiftEditForm() {
    $txtShiftName.val(shift.txtShiftName);
    $dtmStartTime.val(shift.dtmStartTime.substring(0, 5));
    $dtmEndTime.val(shift.dtmEndTime.substring(0, 5));
    $intKapasitas.val(shift.intKapasitas.toString());
    $intKapasitasJam.val((shift.intKapasitas / 60).toFixed(2).toString());
}

//=======================
// EVENT LISTENER
//=======================
$btnNext.bind('click', () => {
    if (pageBo.hasNext) {
        getAllShift(pageBo.page + 1, cari);
    }
})

$btnPrev.bind('click', () => {
    if (pageBo.hasPrevious) {
        getAllShift(pageBo.page - 1, cari);
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
$dtmEndTime.bind('change', () => {

    calculateKapasitas();
})
$dtmStartTime.bind('change', () => {

    calculateKapasitas();
})
function searchShift() {
    pageBo.page = 1;
    getAllShift(pageBo.page, cari);
}

