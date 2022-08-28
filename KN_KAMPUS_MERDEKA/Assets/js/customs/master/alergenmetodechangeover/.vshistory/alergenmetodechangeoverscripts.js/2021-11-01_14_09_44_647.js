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
let elementToSwitch = [$("#alergenMetodeChangeOverFormRow"), $("#AlergenMetodeChangeOverTableRow")];
let $alergenMetodeChangeOverFormTitle = $("#alergenMetodeChangeOverFormTitle");
let selectedProductVariantFrom = null;
let selectedProductVariantTo = null;
let selectedMetodeChageOver = null;
let typeProductVariantSelect = 0;
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
let $btnSelectProductVariantFrom = $("#btnSelectProductVariantFrom");
let $btnSelectProductVariantTo = $("#btnSelectProductVariantTo");
let $btnSelectMetodeChangeOver = $("#btnSelectMetodeChangeOver");
//=======================
// FORM 
//=======================
let $txtSelectedProductVariantFrom = $("#txtSelectedProductVariantFrom");
let $txtSelectedProductVariantTo= $("#txtSelectedProductVariantTo");
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
    $txtSelectedProductVariantFrom.val("");
    $txtSelectedProductVariantTo.val("");
    $txtSelectedMetodeChangeOver.val("");
    selectedProductVariantFrom = null;
    selectedProductVariantTo = null;
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
            $.successMessage("Sukses", "Berhasil menyimpan product Variant Metode Change Over");
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
            let $btnEdit = `<button class=' btn btn-outline-warning btnEdit ' data-productvariantmetodecshangeover='` + JSON.stringify(m) + `'> <i class='fa fa-edit'></i> Edit</button>`;
            let row = "<tr id='intAlergenMetodeChangeOverID" + m.intProductVariantMethodeChangeOverID + "'>" +
                "<td class='text-center'>" + m.intProductVariantMethodeChangeOverID + "</td>" +
                "<td class='text-center'>" + m.txtProductVariantFrom + "</td>" +
                "<td class='text-center'>" + m.txtProductVariantTo + "</td>" +
                "<td class='text-center'>" + m.txtMetodeChangeOver + "</td>" +
                "<td class='text-center'>" +
                $btnEdit +
                "</td>" +
                "</tr>";
            $("#tbody").append(row);
        }
        $(".btnEdit").on('click', function () {
            let r = $(this).data('productvariantmetodecshangeover');
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
    alergenMetodeChangeOver.intProductVariantIDFrom = parseInt(selectedProductVariantFrom.intProductVariantID);
    alergenMetodeChangeOver.intProductVariantIDTo = parseInt(selectedProductVariantTo.intProductVariantID);
    alergenMetodeChangeOver.intMetodeChangeOverID = parseInt(selectedMetodeChageOver.intMetodeChangeOverID);
}
//=======================
// ASSIGN EDIT PRODUCT VARIANT METODE CHANGE OVER
//=======================
function setupDataAlergenMetodeChangeOverEdit(r) {
    alergenMetodeChangeOver.intProductVariantMethodeChangeOverID = r.intProductVariantMethodeChangeOverID;
    alergenMetodeChangeOver.intProductVariantIDFrom = r.intProductVariantIDFrom;
    alergenMetodeChangeOver.intProductVariantIDTo = r.intProductVariantIDTo;
    alergenMetodeChangeOver.intMetodeChangeOverID = r.intMetodeChangeOverID;
    alergenMetodeChangeOver.txtGUID = r.txtGUID;
    alergenMetodeChangeOver.bitActive = r.bitActive;
    //===========================
    $txtSelectedProductVariantFrom.val(r.txtProductVariantFrom);
    $txtSelectedProductVariantTo.val(r.txtProductVariantTo);
    $txtSelectedMetodeChangeOver.val(r.txtMetodeChangeOver);
}
// =====================    
// GET SELETED DATA LOV
// =====================
function getSelectedProductVariant (x) {
    if (typeProductVariantSelect == 0) {
        selectedProductVariantFrom = x;
        $txtSelectedProductVariantFrom.val(x.txtProductVariantCode + " " + x.txtProductVariantDescription)
    } else {
        selectedProductVariantTo = x;
        $txtSelectedProductVariantTo.val(x.txtProductVariantCode + " " +  x.txtProductVariantDescription)
    }
    typeProductVariantSelect = 0;
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

