//=======================
// INITIALIZE DATA
//=======================
var cari = '';
let pageProductVariantAuger = {};
pageProductVariantAuger.page = 1;
pageProductVariantAuger.hasContent = false;
pageProductVariantAuger.hasNext = false;
pageProductVariantAuger.hasPrevious = false;
let api = "/Master/ProductVariantAuger";
let productVariantAuger = {};
let txtGUID = $("#txtGUID").val()
let __RequestVerificationToken = $('#frm input[name=__RequestVerificationToken]').val()
let headerData = {};
headerData.__RequestVerificationToken = __RequestVerificationToken;
let elementToSwitch = [$("#productVariantAugerFormRow"), $("#productVariantAugerTableRow")];
let $productVariantAugerFormTitle = $("#productVariantAugerFormTitle");
let selectedProductVariant = null;
let selectedAuger = null;
//=======================
// ALL BUTTON
//=======================
let $btnPrev = $("#btnPrev");
let $btnNext = $("#btnNext");
let $btnSave = $("#btnSave");
let $btnAddProductVariantAuger = $("#btnAddProductVariantAuger");
let $btnCancelAddProductVariantAuger = $("#btnCancelAddProductVariantAuger");
//=======================
// FORM 
//=======================
let $txtSelectedProductVariant = $("#txtSelectedProductVariant");
let $txtSelectedAuger = $("#txtSelectedAuger");

function initializePage() {
    page = 1;
    cari = "";
    pageProductVariantAuger = {};
    pageProductVariantAuger.page = 1;
    pageProductVariantAuger.hasContent = false;
    pageProductVariantAuger.hasNext = false;
    pageProductVariantAuger.hasPrevious = false;
    selectedProductVariant = null;
    selectedAuger = null;
    productVariantAuger = {};
    txtGUID = $("#txtGUID").val()
    __RequestVerificationToken = $('#frm input[name=__RequestVerificationToken]').val()
    headerData = {};
    headerData.__RequestVerificationToken = __RequestVerificationToken;
    setButtonNextPrvVisibility();
    iniitializeData();
}
initializePage();
getAllProductVariantAuger(pageProductVariantAuger.page, cari);
function setButtonNextPrvVisibility() {
    if (pageProductVariantAuger.hasNext) {
        $btnNext.show();
    } else {
        $btnNext.hide();
    }
    if (pageProductVariantAuger.hasPrevious) {
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
        productVariantAuger = response.objData;
        $productVariantAugerFormTitle.text = "Add Product Variant Auger";
    }, errorHandle, headerData);
}



//=======================
// AJAX REQUEST GET ALL PRODUCT VARIANT AUGER
//=======================
function getAllProductVariantAuger(x, y) {
    $.postApi(api + "/getAllProductVariantAuger",
        {
            page: x,
            cari: y,
            size: 20
        },
        function (response) {
            pageProductVariantAuger = response.objData;
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
// AJAX REQUEST SAVE PRODUCT VARIANT AUGER
//=======================
function saveProductVariantAuger() {
    $.postApi(api + "/Save",
        productVariantAuger,
        function (response) {
            iniitializeData();
            $.switchElement(elementToSwitch, 1);
            $.successMessage("Sukses", "Berhasil menyimpan Product Variant Auger");
            getAllProductVariantAuger(0, cari)
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
    if (pageProductVariantAuger.hasContent) {
        for (let i = 0; i < pageProductVariantAuger.content.length; i++) {
            var m = pageProductVariantAuger.content[i];
            let $btnEdit = `<button class=' btn btn-outline-warning btnEdit ' data-productvariantauger='` + JSON.stringify(m) + `'> <i class='fa fa-edit'></i> Edit</button>`;
            let row = "<tr id='intProductVariantAugerID" + m.intProductVariantAugerID + "'>" +
                "<td class='text-center'>" + m.intProductVariantAugerID + "</td>" +
                "<td class='text-center'>" + m.productVariant.txtProductVariantDescription + "</td>" +
                "<td class='text-center'>" + m.auger.intAugerSize + "</td>" +
                "<td class='text-center'>" +
                $btnEdit +
                "</td>" +
                "</tr>";
            $("#tbody").append(row);
        }
        $(".btnEdit").on('click', function () {
            let r = $(this).data('productvariantauger');
            setupDataProductVariantAugerEdit(r);
            setupDataProductVariantAugerEditForm();
            $.switchElement(elementToSwitch, 0);
            $productVariantAugerFormTitle.text = "Edit ProductVariantAugers";
        })

    } else {
        $("#tbody").append("<tr><td colspan='5'><center><span class='text-muted'>No Data <a class='refresh' href=''>Refresh</a> </span></center></td></tr>");
    }
    setButtonNextPrvVisibility();
}
//=======================
// ASSIGN PRODUCT SAVE
//=======================
function setupDataProductVariantAuger() {
    productVariantAuger.intAugerID = selectedAuger.intAugerID
    productVariantAuger.intProductVariantID = selectedProductVariant.intProductVariantID;
}
//=======================
// ASSIGN EDIT PRODUCT
//=======================
function setupDataProductVariantAugerEdit(r) {
    productVariantAuger.txtGUID = r.txtGUID;
    productVariantAuger.bitActive = r.bitActive;
    productVariantAuger.intProductVariantID = r.productVariant.intProductVariantID;
    productVariantAuger.intAugerID = r.auger.intAugerID;
    productVariantAuger.intProductVariantAugerID = r.intProductVariantAugerID;

    selectedProductVariant = r.productVariant;
    selectedAuger = r.auger;
}
//=======================
// ASSIGN EDIT PRODUCT FORM
//=======================
function setupDataProductVariantAugerEditForm() {
    $txtSelectedProductVariant.val(selectedProductVariant.txtProductVariantDescription);
    $txtSelectedAuger.val(selectedAuger.intAugerSize);
}

//=======================
// EVENT LISTENER
//=======================
$btnNext.bind('click', () => {
    if (pageProductVariantAuger.hasNext) {
        getAllProductVariantAuger(pageProductVariantAuger.page + 1, cari);
    }
})

$btnPrev.bind('click', () => {
    if (pageProductVariantAuger.hasPrevious) {
        getAllProductVariantAuger(pageProductVariantAuger.page - 1, cari);
    }
})
$btnAddProductVariantAuger.bind('click', () => {
    $.switchElement(elementToSwitch, 0);
    iniitializeData();
})
$btnCancelAddProductVariantAuger.bind('click', () => {
    $.switchElement(elementToSwitch, 1);
    $productVariantAugerFormTitle.text = "Add Product Variant Auger";
})
$btnSave.bind('click', () => {
    setupDataProductVariantAuger();
    $.confirmMessage("Confirm", "Save Product Variant Auger?", "Ya Save", saveProductVariantAuger);
})

function searchProductVariantAuger() {
    pageProductVariantAuger.page = 1;
    getAllProductVariantAuger(pageProductVariantAuger.page, cari);
}

