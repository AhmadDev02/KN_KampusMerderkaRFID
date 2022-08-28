//=======================
// INITIALIZE DATA
//=======================
var cari = '';
let pageProductVariantMetodeChangeOver = {};
pageProductVariantMetodeChangeOver.page = 1;
pageProductVariantMetodeChangeOver.hasContent = false;
pageProductVariantMetodeChangeOver.hasNext = false;
pageProductVariantMetodeChangeOver.hasPrevious = false;
let api = "/Master/ProductVariantMetodeChangeOver";
let productVariantMetodeChangeOver = {};
let txtGUID = $("#txtGUID").val()
let __RequestVerificationToken = $('#frm input[name=__RequestVerificationToken]').val()
let headerData = {};
headerData.__RequestVerificationToken = __RequestVerificationToken;
let elementToSwitch = [$("#productVariantMetodeChangeOverFormRow"), $("#ProductVariantMetodeChangeOverTableRow")];
let $productVariantMetodeChangeOverFormTitle = $("#productVariantMetodeChangeOverFormTitle");
let selectedProductVariantFrom = null;
let selectedProductVariantTo = null;
let selectedMetodeChageOver = null;
let typeProductVariantSelect = 0;
$(() => {
    initializePage();
    getAllProductVariantMetodeChangeOver(pageProductVariantMetodeChangeOver.page, cari);
})

//=======================
// ALL BUTTON
//=======================
let $btnPrev = $("#btnPrev");
let $btnNext = $("#btnNext");
let $btnSave = $("#btnSave");
let $btnAddProductVariantMetodeChangeOver = $("#btnAddProductVariantMetodeChangeOver");
let $btnCancelProductVariantMetodeChangeOver = $("#btnCancelProductVariantMetodeChangeOver");
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
    pageProductVariantMetodeChangeOver = {};
    pageProductVariantMetodeChangeOver.page = 1;
    pageProductVariantMetodeChangeOver.hasContent = false;
    pageProductVariantMetodeChangeOver.hasNext = false;
    pageProductVariantMetodeChangeOver.hasPrevious = false;
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
    if (pageProductVariantMetodeChangeOver.hasNext) {
        $btnNext.show();
    } else {
        $btnNext.hide();
    }
    if (pageProductVariantMetodeChangeOver.hasPrevious) {
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
        productVariantMetodeChangeOver = response.objData;
        $productVariantMetodeChangeOverFormTitle.text = "Add Product Variant Metode Change Over";
    }, errorHandle, headerData);
}


//=======================
// AJAX REQUEST GET ALL PRODUCTION LINE CHANGE OVER DETAIL
//=======================
function getAllProductVariantMetodeChangeOver(x, y) {
    $.postApi(api + "/getAllProductVariantMetodeChangeOver",
        {
            page: x,
            cari: y,
            size: 20
        },
        function (response) {
            pageProductVariantMetodeChangeOver = response.objData;
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
function saveProductVariantMetodeChangeOver() {
    $.postApi(api + "/Save",
        productVariantMetodeChangeOver,
        function (response) {
            iniitializeData();
            $.switchElement(elementToSwitch, 1);
            $.successMessage("Sukses", "Berhasil menyimpan product Variant Metode Change Over");
            getAllProductVariantMetodeChangeOver(0, cari)
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
    if (pageProductVariantMetodeChangeOver.hasContent) {
        for (let i = 0; i < pageProductVariantMetodeChangeOver.content.length; i++) {
            var m = pageProductVariantMetodeChangeOver.content[i];
            let $btnEdit = `<button class=' btn btn-outline-warning btnEdit ' data-productvariantmetodecshangeover='` + JSON.stringify(m) + `'> <i class='fa fa-edit'></i> Edit</button>`;
            let row = "<tr id='intProductVariantMetodeChangeOverID" + m.intProductVariantMethodeChangeOverID + "'>" +
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
            let r = $(this).data('productionlinechangeoverdetail');
            setupDataProductVariantMetodeChangeOverEdit(r);
            $.switchElement(elementToSwitch, 0);
            $productVariantMetodeChangeOverFormTitle.text = "Edit Product Variant Metode Change Over";
        })

    } else {
        $("#tbody").append("<tr><td colspan='5'><center><span class='text-muted'>No Data <a class='refresh' href=''>Refresh</a> </span></center></td></tr>");
    }
    setButtonNextPrvVisibility();
}
//=======================
// ASSIGN PRODUCT VARIANT METODE CHANGE OVER
//=======================
function setupDataProductVariantMetodeChangeOver() {
    productVariantMetodeChangeOver.intProductVariantIDFrom = parseInt(selectedProductVariantFrom.intProductVariantID);
    productVariantMetodeChangeOver.intProductVariantIDTo = parseInt(selectedProductVariantTo.intProductVariantID);
    productVariantMetodeChangeOver.intMetodeChangeOverID = parseInt(selectedMetodeChageOver.intMetodeChangeOverID);
}
//=======================
// ASSIGN EDIT PRODUCT VARIANT METODE CHANGE OVER
//=======================
function setupDataProductVariantMetodeChangeOverEdit(r) {
    productVariantMetodeChangeOver.intProductVariantMethodeChangeOverID = r.intProductVariantMethodeChangeOverID;
    productVariantMetodeChangeOver.intProductVariantIDFrom = r.intProductVariantIDFrom;
    productVariantMetodeChangeOver.intProductVariantIDTo = r.intProductVariantIDTo;
    productVariantMetodeChangeOver.intMetodeChangeOverID = r.intMetodeChangeOverID;
    productVariantMetodeChangeOver.txtGUID = r.txtGUID;
    productVariantMetodeChangeOver.bitActive = r.bitActive;
    //===========================
    $txtSelectedProductVariantFrom.val(r.txtProductVariantFrom);
    $txtSelectedProductVariantTo.val(r.txtProductVariantTo);
    $txtSelectedMetodeChangeOver.val(r.txtMetodeChangeOver);
}
// =====================    
// GET SELETED DATA LOV
// =====================
function getSelectedProductionLine(x) {
    if (typeProductVariantSelect == 0) {
        selectedProductVariantFrom = x;
        $txtSelectedProductVariantFrom.val(x.txtProductVariantCode + x.txtProductVariantDescription)
    } else {
        selectedProductVariantTo = x;
        $txtSelectedProductVariantTo.val(x.txtProductVariantCode + x.txtProductVariantDescription)
    }
}
function getSelectedMetodeChangeOver(x) {
    selectedMetodeChageOver = x;
    $txtSelectedMetodeChangeOver.val(x.txtMetodeChangeOverCode);
}
//=======================
// EVENT LISTENER
//=======================
$btnNext.bind('click', () => {
    if (pageProductVariantMetodeChangeOver.hasNext) {
        getAllProductVariantMetodeChangeOver(pageProductVariantMetodeChangeOver.page + 1, cari);
    }
})

$btnPrev.bind('click', () => {
    if (pageProductVariantMetodeChangeOver.hasPrevious) {
        getAllProductVariantMetodeChangeOver(pageProductVariantMetodeChangeOver.page - 1, cari);
    }
})
$btnAddProductVariantMetodeChangeOver.bind('click', () => {
    $.switchElement(elementToSwitch, 0);
    initializePage();
})
$btnCancelProductVariantMetodeChangeOver.bind('click', () => {
    $.switchElement(elementToSwitch, 1);
    $productVariantMetodeChangeOverFormTitle.text = "Add Producti Variant Metode Change Over";
})
$btnSave.bind('click', () => {
    setupDataProductVariantMetodeChangeOver();
    $.confirmMessage("Confirm", "Save Product Variant MEtode Change over", "Ya Save", saveProductVariantMetodeChangeOver);
})
$btnSelectProductVariantFrom.bind('click', () => {
    typeProductVariantSelect = 0;
    $.showLOV('ProductVariant');
})
$btnSelectProductVariantTo.bind('click', () => {
    typeProductVariantSelect = 0;
    $.showLOV('ProductVariant');
})
$btnSelectMetodeChangeOver.bind('click', () => {
    $.showLOV('MetodeChangeOver');
})


function searchProductVariantMetodeChangeOver() {
    pageProductVariantMetodeChangeOver.page = 1;
    getAllProductVariantMetodeChangeOver(pageProductVariantMetodeChangeOver.page, cari);
}

