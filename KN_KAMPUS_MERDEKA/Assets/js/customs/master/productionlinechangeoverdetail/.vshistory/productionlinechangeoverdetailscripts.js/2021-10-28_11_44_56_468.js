//=======================
// INITIALIZE DATA
//=======================
var cari = '';
let pageProductionLineChangeOverDetail = {};
pageProductionLineChangeOverDetail.page = 1;
pageProductionLineChangeOverDetail.hasContent = false;
pageProductionLineChangeOverDetail.hasNext = false;
pageProductionLineChangeOverDetail.hasPrevious = false;
let api = "/Master/ProductionLineChangeOverDetail";
let productionLineChangeOverDetail = {};
let txtGUID = $("#txtGUID").val()
let __RequestVerificationToken = $('#frm input[name=__RequestVerificationToken]').val()
let headerData = {};
headerData.__RequestVerificationToken = __RequestVerificationToken;
let elementToSwitch = [$("#productionLineChangeOverDetailFormRow"), $("#productionLineChangeOverDetailTableRow")];
let $productionLineChangeOverDetailFormTitle = $("#productionLineChangeOverDetailFormTitle");
$(() => {
    initializePage();
    getAllProductionLineChangeOverDetail(pageProductionLineChangeOverDetail.page, cari);
})

//=======================
// ALL BUTTON
//=======================
let $btnPrev = $("#btnPrev");
let $btnNext = $("#btnNext");
let $btnSave = $("#btnSave");
let $btnAddProductionLineChangeOverDetail = $("#btnAddProductionLineChangeOverDetail");
let $btnCancelProductionLineChangeOverDetail = $("#btnCancelProductionLineChangeOverDetail");
//=======================
// FORM 
//=======================
let $txtSelectedMetodeChangeOver = $("#txtSelectedMetodeChangeOver");
let $txtSelectedMaterialChangeOver = $("#txtSelectedMaterialChangeOver");
let $txtSelectedProductionLine = $("#txtSelectedProductionLine");
let $intQty = $("#intQty");
let $decCostWaktu = $("#decCostWaktu");
let $decCostMaterial = $("#decCostMaterial");


function initializePage() {
    page = 1;
    cari = "";
    pageProductionLineChangeOverDetail = {};
    pageProductionLineChangeOverDetail.page = 1;
    pageProductionLineChangeOverDetail.hasContent = false;
    pageProductionLineChangeOverDetail.hasNext = false;
    pageProductionLineChangeOverDetail.hasPrevious = false;
    __RequestVerificationToken = $('#frm input[name=__RequestVerificationToken]').val()
    headerData = {};
    headerData.__RequestVerificationToken = __RequestVerificationToken;
    setButtonNextPrvVisibility();
    $txtSelectedMetodeChangeOver.val("");
    $txtSelectedMaterialChangeOver.val("");
    $txtSelectedProductionLine.val("");
    $intQty.val("");
    $decCostWaktu.val("");
    let $decCostMaterial = $("#decCostMaterial");
    iniitializeData();
}

function setButtonNextPrvVisibility() {
    if (pageProductionLineChangeOverDetail.hasNext) {
        $btnNext.show();
    } else {
        $btnNext.hide();
    }
    if (pageProductionLineChangeOverDetail.hasPrevious) {
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
        productionLineChangeOverDetail = response.objData;
        $productionLineChangeOverDetailFormTitle.text = "Add Production Line Change Over Detail";
    }, errorHandle, headerData);
}


//=======================
// AJAX REQUEST GET ALL PRODUCTION LINE CHANGE OVER DETAIL
//=======================
function getAllProductionLineChangeOverDetail(x, y) {
    $.postApi(api + "/getAllProductionLineChangeOverDetail",
        {
            page: x,
            cari: y,
            size: 20
        },
        function (response) {
            pageProductionLineChangeOverDetail = response.objData;
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
function saveProductionLineChangeOverDetail() {
    $.postApi(api + "/Save",
        productionLineChangeOverDetail,
        function (response) {
            iniitializeData();
            $.switchElement(elementToSwitch, 1);
            $.successMessage("Sukses", "Berhasil menyimpan productionLineChangeOverDetail");
            getAllProductionLineChangeOverDetail(0, cari)
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
    if (pageProductionLineChangeOverDetail.hasContent) {
        for (let i = 0; i < pageProductionLineChangeOverDetail.content.length; i++) {
            var m = pageProductionLineChangeOverDetail.content[i];
            let $btnEdit = `<button class=' btn btn-outline-warning btnEdit ' data-productionlinechangeoverdetail='` + JSON.stringify(m) + `'> <i class='fa fa-edit'></i> Edit</button>`;
            let row = "<tr id='intProductionLineChangeOverDetailID" + m.intLineChangeOverID + "'>" +
                "<td class='text-center'>" + m.metode.txtMetodeChangeOverCode + "</td>" +
                "<td class='text-center'>" + m.material.txtMaterialChangeOverCode + "</td>" +
                "<td class='text-center'>" + m.productionLine.txtProductionLineCode + "</td>" +
                "<td class='text-center'>" + m.intQty + "</td>" +
                "<td class='text-center'>" + m.decCostWaktu + "</td>" +
                "<td class='text-center'>" + m.decCostMaterial + "</td>" +
                "<td class='text-center'>" +
                $btnEdit +
                "</td>" +
                "</tr>";
            $("#tbody").append(row);
        }
        $(".btnEdit").on('click', function () {
            let r = $(this).data('productionlinechangeoverdetail');
            setupDataProductionLineChangeOverDetailEdit(r);
            setupDataProductionLineChangeOverDetailEditForm();
            $.switchElement(elementToSwitch, 0);
            $productionLineChangeOverDetailFormTitle.text = "Edit Production Line Change Over Detail";
        })

    } else {
        $("#tbody").append("<tr><td colspan='9'><center><span class='text-muted'>No Data <a class='refresh' href=''>Refresh</a> </span></center></td></tr>");
    }
    setButtonNextPrvVisibility();
}
//=======================
// ASSIGN PRODUCTION CHANGE OVER DETAIL SAVE
//=======================
function setupDataProductionLineChangeOverDetail() {
    productionLineChangeOverDetail.txtProductionLineChangeOverDetailCode = $txtProductionLineChangeOverDetailCode.val().toString();
    productionLineChangeOverDetail.txtProductionLineChangeOverDetailDescription = $txtProductionLineChangeOverDetailDescription.val().toString();
    productionLineChangeOverDetail.intLevel = parseInt($intLevel.val().toString());
}
//=======================
// ASSIGN EDIT PRODUCTION LINE CHANGE OVER DETAIL
//=======================
function setupDataProductionLineChangeOverDetailEdit(r) {
    productionLineChangeOverDetail.intLineChangeOverID = r.intLineChangeOverID;
    productionLineChangeOverDetail.intMetodeChangeOverID = r.metode.intMetodeChangeOverID;
    productionLineChangeOverDetail.intMaterialChangeOverID = r.material.intMetodeChangeOverID;
    productionLineChangeOverDetail.intProductionLineID = r.productionLine.intProductionLineID;
    productionLineChangeOverDetail.intQty = r.intQty;
    productionLineChangeOverDetail.decCostWaktu = r.decCostWaktu;
    productionLineChangeOverDetail.decCostMaterial = r.decCostMaterial;
    productionLineChangeOverDetail.txtGUID = r.txtGUID;

}
//=======================
// ASSIGN EDIT PRODUCTION LINE CHANGE OVER DETAIL FORM
//=======================
function setupDataProductionLineChangeOverDetailEditForm() {
    $txtProductionLineChangeOverDetailCode.val(productionLineChangeOverDetail.txtProductionLineChangeOverDetailCode);
    $txtProductionLineChangeOverDetailDescription.val(productionLineChangeOverDetail.txtProductionLineChangeOverDetailDescription);
    $intLevel.val(productionLineChangeOverDetail.intLevel)
}

//=======================
// EVENT LISTENER
//=======================
$btnNext.bind('click', () => {
    if (pageProductionLineChangeOverDetail.hasNext) {
        getAllProductionLineChangeOverDetail(pageProductionLineChangeOverDetail.page + 1, cari);
    }
})

$btnPrev.bind('click', () => {
    if (pageProductionLineChangeOverDetail.hasPrevious) {
        getAllProductionLineChangeOverDetail(pageProductionLineChangeOverDetail.page - 1, cari);
    }
})
$btnAddProductionLineChangeOverDetail.bind('click', () => {
    $.switchElement(elementToSwitch, 0);
    iniitializeData();
})
$btnCancelAddProductionLineChangeOverDetail.bind('click', () => {
    $.switchElement(elementToSwitch, 1);
    $productionLineChangeOverDetailFormTitle.text = "Add Material Change Over";
})
$btnSave.bind('click', () => {
    setupDataProductionLineChangeOverDetail();
    $.confirmMessage("Confirm", "Save Material Change Over?", "Ya Save", saveProductionLineChangeOverDetail);
})

function searchProductionLineChangeOverDetail() {
    pageProductionLineChangeOverDetail.page = 1;
    getAllProductionLineChangeOverDetail(pageProductionLineChangeOverDetail.page, cari);
}

