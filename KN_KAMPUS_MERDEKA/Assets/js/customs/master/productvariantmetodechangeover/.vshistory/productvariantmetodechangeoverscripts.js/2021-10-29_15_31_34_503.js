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
    $btnSelectProductVariantTo.val("");
    $btnSelectMetodeChangeOver.val("");
    $intQty.val("0");
    $decCostWaktu.val("0");
    $decCostMaterial.val("0");
    selectedMaterialChangeOver = null;
    selectedMetodeChageOver = null;
    selectedProductionLine = null;
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
        $productVariantMetodeChangeOverFormTitle.text = "Add Production Line Change Over Detail";
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
            $("#tbody").append("<tr><td colspan='9'><center><span class='text-muted'>No Data <a class='refresh' href=''>Refresh</a> </span></center></td></tr>");
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
            $.successMessage("Sukses", "Berhasil menyimpan productVariantMetodeChangeOver");
            getAllProductVariantMetodeChangeOver(0, cari)
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
    if (pageProductVariantMetodeChangeOver.hasContent) {
        for (let i = 0; i < pageProductVariantMetodeChangeOver.content.length; i++) {
            var m = pageProductVariantMetodeChangeOver.content[i];
            let $btnEdit = `<button class=' btn btn-outline-warning btnEdit ' data-productionlinechangeoverdetail='` + JSON.stringify(m) + `'> <i class='fa fa-edit'></i> Edit</button>`;
            let row = "<tr id='intProductVariantMetodeChangeOverID" + m.intLineChangeOverID + "'>" +
                "<td class='text-center'>" + m.intLineChangeOverID + "</td>" +
                "<td class='text-center'>" + m.metode.txtMetodeChangeOverCode + "</td>" +
                "<td class='text-center'>" + m.material.txtMaterialChangeOverCode + "</td>" +
                "<td class='text-center'>" + m.productionLine.txtProductionLineCode + "</td>" +
                "<td class='text-center'>" + m.intQty + "</td>" +
                "<td class='text-center'>" + $.formatRupiah(m.decCostWaktu) + "</td>" +
                "<td class='text-center'>" + $.formatRupiah(m.decCostMaterial) + "</td>" +
                "<td class='text-center'>" + $.formatRupiah(m.decCostWaktu+m.decCostMaterial) + "</td>" +
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
            $productVariantMetodeChangeOverFormTitle.text = "Edit Production Line Change Over Detail";
        })

    } else {
        $("#tbody").append("<tr><td colspan='9'><center><span class='text-muted'>No Data <a class='refresh' href=''>Refresh</a> </span></center></td></tr>");
    }
    setButtonNextPrvVisibility();
}
//=======================
// ASSIGN PRODUCTION CHANGE OVER DETAIL SAVE
//=======================
function setupDataProductVariantMetodeChangeOver() {
    productVariantMetodeChangeOver.intProductionLineID = selectedProductionLine.intProductionLineID;
    productVariantMetodeChangeOver.intMaterialChangeOverID = selectedMaterialChangeOver.intMaterialChangeOverID;
    productVariantMetodeChangeOver.intMetodeChangeOverID = selectedMetodeChageOver.intMetodeChangeOverID;
    productVariantMetodeChangeOver.intQty = parseInt($intQty.val().toString());
    productVariantMetodeChangeOver.decCostMaterial = parseFloat($decCostMaterial.val().toString());
    productVariantMetodeChangeOver.decCostWaktu = parseFloat($decCostWaktu.val().toString());
}
//=======================
// ASSIGN EDIT PRODUCTION LINE CHANGE OVER DETAIL
//=======================
function setupDataProductVariantMetodeChangeOverEdit(r) {
    productVariantMetodeChangeOver.intLineChangeOverID = r.intLineChangeOverID;
    productVariantMetodeChangeOver.intMetodeChangeOverID = r.metode.intMetodeChangeOverID;
    productVariantMetodeChangeOver.intMaterialChangeOverID = r.material.intMetodeChangeOverID;
    productVariantMetodeChangeOver.intProductionLineID = r.productionLine.intProductionLineID;
    productVariantMetodeChangeOver.intQty = r.intQty;
    productVariantMetodeChangeOver.decCostWaktu = r.decCostWaktu;
    productVariantMetodeChangeOver.decCostMaterial = r.decCostMaterial;
    productVariantMetodeChangeOver.txtGUID = r.txtGUID;
    //===========================
    $txtSelectedMetodeChangeOver.val(r.metode.txtMetodeChangeOverCode);
    $txtSelectedMaterialChangeOver.val(r.material.txtMaterialChangeOverCode);
    $txtSelectedProductionLine.val(r.productionLine.txtProductionLineCode);
    $intQty.val(r.intQty.toString());
    $decCostWaktu.val(r.decCostWaktu.toString());
    $decCostMaterial.val(r.decCostMaterial.toString());
}
// =====================
// GET SELETED DATA LOV
// =====================
function getSelectedProductionLine(x) {
    selectedProductionLine = x;
    $txtSelectedProductionLine.val(x.txtProductionLineCode)
}
function getSelectedMaterialChangeOver(x) {
    selectedMaterialChangeOver = x;
    $txtSelectedMaterialChangeOver.val(x.txtMaterialChangeOverCode);
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
    $productVariantMetodeChangeOverFormTitle.text = "Add Production Line Change Over Detail";
})
$btnSave.bind('click', () => {
    setupDataProductVariantMetodeChangeOver();
    $.confirmMessage("Confirm", "Save Production Line Change Over Detail", "Ya Save", saveProductVariantMetodeChangeOver);
})
$btnSelectProductionLine.bind('click', () => {
    $.showLOV('ProductionLine');
})
$btnSelectMaterialChangeOver.bind('click', () => {
    $.showLOV('MaterialChangeOver');
})
$btnSelectMetodeChangeOver.bind('click', () => {
    $.showLOV('MetodeChangeOver');
})


function searchProductVariantMetodeChangeOver() {
    pageProductVariantMetodeChangeOver.page = 1;
    getAllProductVariantMetodeChangeOver(pageProductVariantMetodeChangeOver.page, cari);
}

