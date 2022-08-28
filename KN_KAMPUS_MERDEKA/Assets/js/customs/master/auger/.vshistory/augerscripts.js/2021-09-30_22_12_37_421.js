//=======================
// INITIALIZE DATA
//=======================
var cari = '';
let pageAuger = {};
pageAuger.page = 1;
pageAuger.hasContent = false;
pageAuger.hasNext = false;
pageAuger.hasPrevious = false;
let api = "/Master/Auger";
let auger = {};
let txtGUID = $("#txtGUID").val()
let __RequestVerificationToken = $('#frm input[name=__RequestVerificationToken]').val()
let headerData = {};
headerData.__RequestVerificationToken = __RequestVerificationToken;
let elementToSwitch = [$("#augerFormRow"), $("#augerTableRow")];
let $augerFormTitle = $("#augerFormTitle");

//=======================
// ALL BUTTON
//=======================
let $btnPrev = $("#btnPrev");
let $btnNext = $("#btnNext");
let $btnSave = $("#btnSave");
let $btnAddAuger = $("#btnAddAuger");
let $btnCancelAddAuger = $("#btnCancelAddAuger");
//=======================
// FORM 
//=======================
let $intAugerSize = $("#intAugerSize");
let $txtAugerDescription = $("#txtAugerDescription");

function initializePage() {
    page = 1;
    cari = "";
    pageAuger = {};
    pageAuger.page = 1;
    pageAuger.hasContent = false;
    pageAuger.hasNext = false;
    pageAuger.hasPrevious = false;
    api = "/Master/Auger";
    user = {};
    txtGUID = $("#txtGUID").val()
    __RequestVerificationToken = $('#frm input[name=__RequestVerificationToken]').val()
    headerData = {};
    headerData.__RequestVerificationToken = __RequestVerificationToken;
    setButtonNextPrvVisibility();
    iniitializeData();
}
initializePage();
getAllAuger(pageAuger.page, cari);
function setButtonNextPrvVisibility() {
    if (pageAuger.hasNext) {
        $btnNext.show();
    } else {
        $btnNext.hide();
    }
    if (pageAuger.hasPrevious) {
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
        auger = response.objData;
        setupAddAugerForm();
        $augerFormTitle.text = "Add Auger";
    }, errorHandle, headerData);
}

function setupAddAugerForm() {
    $intAugerSize.val(auger.intAugerSize);
    $txtAugerDescription.val(auger.txtAugerDescription);
}

//=======================
// AJAX REQUEST GET ALL AUGER
//=======================
function getAllAuger(x, y) {
    $.postApi(api + "/getAllAuger",
        {
            page: x,
            cari: y,
            size: 20
        },
        function (response) {
            pageAuger = response.objData;
            fillTableData();
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
// AJAX REQUEST SAVE AUGER
//=======================
function saveAuger() {
    $.postApi(api + "/Save",
        product,
        function (response) {
            iniitializeData();
            $.switchElement(elementToSwitch, 1);
            $.successMessage("Sukses", "Berhasil menyimpan product");
            getAllAuger(0, cari)
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
// FILL TABLE DATA
//=======================
function fillTableData() {
    $("#tbody").html("");
    if (pageAuger.hasContent) {
        for (let i = 0; i < pageAuger.content.length; i++) {
            var m = pageAuger.content[i];
            let $btnEdit = `<button class=' btn btn-outline-warning btnEdit ' data-product='` + JSON.stringify(m) + `'> <i class='fa fa-edit'></i> Edit</button>`;
            let row = "<tr id='intAugerID" + m.intAugerID + "'>" +
                "<td class='text-center'>" + m.intAugerID + "</td>" +
                "<td class='text-center'>" + m.txtAugerCode + "</td>" +
                "<td class='text-center'>" + m.txtAugerDescription + "</td>" +
                "<td class='text-center'>" + m.intLevel + "</td>" +
                "<td class='text-center'>" +
                $btnEdit +
                "</td>" +
                "</tr>";
            $("#tbody").append(row);
        }
        $(".btnEdit").on('click', function () {
            let r = $(this).data('product');
            setupDataAugerEdit(r);
            setupDataAugerEditForm();
            $.switchElement(elementToSwitch, 0);
            $augerFormTitle.text = "Edit Augers";
        })

    } else {
        $("#tbody").append("<tr><td colspan='5'><center><span class='text-muted'>No Data <a class='refresh' href=''>Refresh</a> </span></center></td></tr>");
    }
    setButtonNextPrvVisibility();
}
//=======================
// ASSIGN AUGER SAVE
//=======================
function setupDataAuger() {
    auger.txtAugerCode = $intAugerSize.val().toString();
    auger.txtAugerDescription = $txtAugerDescription.val().toString();
    auger.intLevel = parseInt($intLevel.val().toString());
}
//=======================
// ASSIGN EDIT AUGER
//=======================
function setupDataAugerEdit(r) {
    auger.intAugerID = r.intAugerID;
    auger.txtAugerCode = r.txtAugerCode;
    auger.txtAugerDescription = r.txtAugerDescription;
    auger.intLevel = r.intLevel;
    auger.txtGUID = r.txtGUID;
}
//=======================
// ASSIGN EDIT AUGER FORM
//=======================
function setupDataAugerEditForm() {
    $intAugerSize.val(auger.txtAugerCode);
    $txtAugerDescription.val(auger.txtAugerDescription);
    $intLevel.val(auger.intLevel)
}

//=======================
// EVENT LISTENER
//=======================
$btnNext.bind('click', () => {
    if (pageAuger.hasNext) {
        getAllAuger(pageAuger.page + 1, cari);
    }
})

$btnPrev.bind('click', () => {
    if (pageAuger.hasPrevious) {
        getAllAuger(pageAuger.page - 1, cari);
    }
})
$btnAddAuger.bind('click', () => {
    $.switchElement(elementToSwitch, 0);
    iniitializeData();
})
$btnCancelAddAuger.bind('click', () => {
    $.switchElement(elementToSwitch, 1);
    $augerFormTitle.text = "Add Auger";
})
$btnSave.bind('click', () => {
    setupDataAuger();
    $.confirmMessage("Confirm", "Save Auger?", "Ya Save", saveAuger);
})

function searchAuger() {
    pageAuger.page = 1;
    getAllAuger(pageAuger.page, cari);
}

