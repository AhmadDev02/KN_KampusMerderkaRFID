//=======================
// INITIALIZE DATA
//=======================
var cari = '';
let pageAlergenMetodeChangeOver = {};
pageAlergenMetodeChangeOver.page = 1;
pageAlergenMetodeChangeOver.hasContent = false;
pageAlergenMetodeChangeOver.hasNext = false;
pageAlergenMetodeChangeOver.hasPrevious = false;
let api = "/Master/AlergenMetodeChangeOver";
let alergenMetodeChangeOver = {};
let txtGUID = $("#txtGUID").val()
let __RequestVerificationToken = $('#frm input[name=__RequestVerificationToken]').val()
let headerData = {};
headerData.__RequestVerificationToken = __RequestVerificationToken;
let elementToSwitch = [$("#alergenMetodeChangeOverFormRow"), $("#alergenMetodeChangeOverTableRow")];
let $alergenMetodeChangeOverFormTitle = $("#alergenMetodeChangeOverFormTitle");
let selectedAlergenFrom = null;
let selectedAlergenTo = null;
let selectedMetodeChageOver = null;
let typeAlergenSelect = 0;
$(() => {
    initializePage();
    getAllAlergenMetodeChangeOver(pageAlergenMetodeChangeOver.page, cari);
})

//=======================
// ALL BUTTON
//=======================
let $btnPrev = $("#btnPrev");
let $btnNext = $("#btnNext");
let $btnSave = $("#btnSave");
let $btnAddAlergenMetodeChangeOver = $("#btnAddAlergenMetodeChangeOver");
let $btnCancelAlergenMetodeChangeOver = $("#btnCancelAlergenMetodeChangeOver");
let $btnSelectAlergenFrom = $("#btnSelectAlergenFrom");
let $btnSelectAlergenTo = $("#btnSelectAlergenTo");
let $btnSelectMetodeChangeOver = $("#btnSelectMetodeChangeOver");
//=======================
// FORM 
//=======================
let $txtSelectedAlergenFrom = $("#txtSelectedAlergenFrom");
let $txtSelectedAlergenTo = $("#txtSelectedAlergenTo");
let $txtSelectedMetodeChangeOver = $("#txtSelectedMetodeChangeOver");


function initializePage() {
    page = 1;
    cari = "";
    pageAlergenMetodeChangeOver = {};
    pageAlergenMetodeChangeOver.page = 1;
    pageAlergenMetodeChangeOver.hasContent = false;
    pageAlergenMetodeChangeOver.hasNext = false;
    pageAlergenMetodeChangeOver.hasPrevious = false;
    __RequestVerificationToken = $('#frm input[name=__RequestVerificationToken]').val()
    headerData = {};
    headerData.__RequestVerificationToken = __RequestVerificationToken;
    setButtonNextPrvVisibility();
    $txtSelectedAlergenFrom.val("");
    $txtSelectedAlergenTo.val("");
    $txtSelectedMetodeChangeOver.val("");
    selectedAlergenFrom = null;
    selectedAlergenTo = null;
    selectedMetodeChageOver = null;
    iniitializeData();
}

function setButtonNextPrvVisibility() {
    if (pageAlergenMetodeChangeOver.hasNext) {
        $btnNext.show();
    } else {
        $btnNext.hide();
    }
    if (pageAlergenMetodeChangeOver.hasPrevious) {
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
        alergenMetodeChangeOver = response.objData;
        $alergenMetodeChangeOverFormTitle.text = "Add Product Variant Metode Change Over";
    }, errorHandle, headerData);
}


//=======================
// AJAX REQUEST GET ALL PRODUCTION LINE CHANGE OVER DETAIL
//=======================
function getAllAlergenMetodeChangeOver(x, y) {
    $.postApi(api + "/getAllAlergenMetodeChangeOver",
        {
            page: x,
            cari: y,
            size: 20
        },
        function (response) {
            pageAlergenMetodeChangeOver = response.objData;
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
// AJAX REQUEST SAVE PRODUCT
//=======================
function saveAlergenMetodeChangeOver() {
    $.postApi(api + "/Save",
        alergenMetodeChangeOver,
        function (response) {
            iniitializeData();
            $.switchElement(elementToSwitch, 1);
            $.successMessage("Sukses", "Berhasil menyimpan  Metode Change Over Alergen");
            getAllAlergenMetodeChangeOver(0, cari)
        },
        function (e) {
            $.errorMessage("Failed", e.responseJSON.txtMessage);
        },
        headerData
    )
}
//=======================
// FILL TABLE DATA
//=======================
function fillTableData() {
    $("#tbody").html("");
    if (pageAlergenMetodeChangeOver.hasContent) {
        for (let i = 0; i < pageAlergenMetodeChangeOver.content.length; i++) {
            var m = pageAlergenMetodeChangeOver.content[i];
            let $btnEdit = `<button class=' btn btn-outline-warning btnEdit ' data-alergenmetodechangeover='` + JSON.stringify(m) + `'> <i class='fa fa-edit'></i> Edit</button>`;
            let row = "<tr id='intAlergenMetodeChangeOverID" + m.intAlergenMetodeChangeOverID + "'>" +
                "<td class='text-center'>" + m.intAlergenMetodeChangeOverID + "</td>" +
                "<td class='text-center'>" + m.txtAlergenFrom + "</td>" +
                "<td class='text-center'>" + m.txtAlergenTo + "</td>" +
                "<td class='text-center'>" + m.txtMetode + "</td>" +
                "<td class='text-center'>" +
                $btnEdit +
                "</td>" +
                "</tr>";
            $("#tbody").append(row);
        }
        $(".btnEdit").on('click', function () {
            let r = $(this).data('alergenmetodechangeover');
            setupDataAlergenMetodeChangeOverEdit(r);
            $.switchElement(elementToSwitch, 0);
            $alergenMetodeChangeOverFormTitle.text = "Edit Product Variant Metode Change Over";
        })

    } else {
        $("#tbody").append("<tr><td colspan='5'><center><span class='text-muted'>No Data <a class='refresh' href=''>Refresh</a> </span></center></td></tr>");
    }
    setButtonNextPrvVisibility();
}
//=======================
// ASSIGN PRODUCT VARIANT METODE CHANGE OVER
//=======================
function setupDataAlergenMetodeChangeOver() {
    alergenMetodeChangeOver.intAlergenIDFrom = parseInt(selectedAlergenFrom.intAlergenID);
    alergenMetodeChangeOver.intAlergenIDTo = parseInt(selectedAlergenTo.intAlergenID);
    alergenMetodeChangeOver.intMetodeChangeOverID = parseInt(selectedMetodeChageOver.intMetodeChangeOverID);
}
//=======================
// ASSIGN EDIT PRODUCT VARIANT METODE CHANGE OVER
//=======================
function setupDataAlergenMetodeChangeOverEdit(r) {
    alergenMetodeChangeOver.intAlergenMetodeChangeOverID = r.intAlergenMetodeChangeOverID;
    alergenMetodeChangeOver.intAlergenIDFrom = r.intAlergenIDFrom;
    alergenMetodeChangeOver.intAlergenIDTo = r.intAlergenIDTo;
    alergenMetodeChangeOver.intMetodeChangeOverID = r.intMetodeChangeOverID;
    alergenMetodeChangeOver.txtGUID = r.txtGUID;
    alergenMetodeChangeOver.bitActive = r.bitActive;
    //===========================
    $txtSelectedAlergenFrom.val(r.txtAlergenFrom);
    $txtSelectedAlergenTo.val(r.txtAlergenTo);
    $txtSelectedMetodeChangeOver.val(r.txtMetode);
}
// =====================    
// GET SELETED DATA LOV
// =====================
function getSelectedAlergen(x) {
    if (typeAlergenSelect == 0) {
        selectedAlergenFrom = x;
        $txtSelectedAlergenFrom.val(x.txtAlergenCode + " " + x.txtAlergenDescription)
    } else {
        selectedAlergenTo = x;
        $txtSelectedAlergenTo.val(x.txtAlergenCode + " " + x.txtAlergenDescription)
    }
    typeAlergenSelect = 0;
}
function getSelectedMetodeChangeOver(x) {
    selectedMetodeChageOver = x;
    $txtSelectedMetodeChangeOver.val(x.txtMetodeChangeOverCode);
}
//=======================
// EVENT LISTENER
//=======================
$btnNext.bind('click', () => {
    if (pageAlergenMetodeChangeOver.hasNext) {
        getAllAlergenMetodeChangeOver(pageAlergenMetodeChangeOver.page + 1, cari);
    }
})

$btnPrev.bind('click', () => {
    if (pageAlergenMetodeChangeOver.hasPrevious) {
        getAllAlergenMetodeChangeOver(pageAlergenMetodeChangeOver.page - 1, cari);
    }
})
$btnAddAlergenMetodeChangeOver.bind('click', () => {
    $.switchElement(elementToSwitch, 0);
    initializePage();
})
$btnCancelAlergenMetodeChangeOver.bind('click', () => {
    $.switchElement(elementToSwitch, 1);
    $alergenMetodeChangeOverFormTitle.text = "Add Producti Variant Metode Change Over";
})
$btnSave.bind('click', () => {
    setupDataAlergenMetodeChangeOver();
    $.confirmMessage("Confirm", "Save Product Variant MEtode Change over", "Ya Save", saveAlergenMetodeChangeOver);
})
$btnSelectProductVariantFrom.bind('click', () => {
    typeProductVariantSelect = 0;
    $.showLOV('ProductVariant');
})
$btnSelectProductVariantTo.bind('click', () => {
    typeProductVariantSelect =1;
    $.showLOV('ProductVariant');
})
$btnSelectMetodeChangeOver.bind('click', () => {
    $.showLOV('MetodeChangeOver');
})


function searchAlergenMetodeChangeOver() {
    pageAlergenMetodeChangeOver.page = 1;
    getAllAlergenMetodeChangeOver(pageAlergenMetodeChangeOver.page, cari);
}

