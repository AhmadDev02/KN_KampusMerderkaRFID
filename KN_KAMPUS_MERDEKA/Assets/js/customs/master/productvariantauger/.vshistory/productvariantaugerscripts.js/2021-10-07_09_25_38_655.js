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
let $txtProductVariantAugerDescription = $("#txtProductVariantAugerDescription");
let $intLevel = $("#intLevel");

function initializePage() {
    page = 1;
    cari = "";
    pageProductVariantAuger = {};
    pageProductVariantAuger.page = 1;
    pageProductVariantAuger.hasContent = false;
    pageProductVariantAuger.hasNext = false;
    pageProductVariantAuger.hasPrevious = false;
    api = "/Master/ProductVariantAuger";
    user = {};
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
        setupAddProductVariantAugerForm();
        $productVariantAugerFormTitle.text = "Add ProductVariantAuger";
    }, errorHandle, headerData);
}

function setupAddProductVariantAugerForm() {
    $txtProductVariantAugerCode.val(productVariantAuger.txtProductVariantAugerCode);
    $txtProductVariantAugerDescription.val(productVariantAuger.txtProductVariantAugerDescription);
    $intLevel.val(productVariantAuger.intLevel);
}

//=======================
// AJAX REQUEST GET ALL PRODUCT
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
// AJAX REQUEST SAVE PRODUCT
//=======================
function saveProductVariantAuger() {
    $.postApi(api + "/Save",
        productVariantAuger,
        function (response) {
            iniitializeData();
            $.switchElement(elementToSwitch, 1);
            $.successMessage("Sukses", "Berhasil menyimpan productVariantAuger");
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
            let $btnEdit = `<button class=' btn btn-outline-warning btnEdit ' data-productVariantAuger='` + JSON.stringify(m) + `'> <i class='fa fa-edit'></i> Edit</button>`;
            let row = "<tr id='intProductVariantAugerID" + m.intProductVariantAugerID + "'>" +
                "<td class='text-center'>" + m.intProductVariantAugerID + "</td>" +
                "<td class='text-center'>" + m.txtProductVariantAugerCode + "</td>" +
                "<td class='text-center'>" + m.txtProductVariantAugerDescription + "</td>" +
                "<td class='text-center'>" + m.intLevel + "</td>" +
                "<td class='text-center'>" +
                $btnEdit +
                "</td>" +
                "</tr>";
            $("#tbody").append(row);
        }
        $(".btnEdit").on('click', function () {
            let r = $(this).data('productVariantAuger');
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
    productVariantAuger.txtProductVariantAugerCode = $txtProductVariantAugerCode.val().toString();
    productVariantAuger.txtProductVariantAugerDescription = $txtProductVariantAugerDescription.val().toString();
    productVariantAuger.intLevel = parseInt($intLevel.val().toString());
}
//=======================
// ASSIGN EDIT PRODUCT
//=======================
function setupDataProductVariantAugerEdit(r) {
    productVariantAuger.intProductVariantAugerID = r.intProductVariantAugerID;
    productVariantAuger.txtProductVariantAugerCode = r.txtProductVariantAugerCode;
    productVariantAuger.txtProductVariantAugerDescription = r.txtProductVariantAugerDescription;
    productVariantAuger.intLevel = r.intLevel;
    productVariantAuger.txtGUID = r.txtGUID;
}
//=======================
// ASSIGN EDIT PRODUCT FORM
//=======================
function setupDataProductVariantAugerEditForm() {
    $txtProductVariantAugerCode.val(productVariantAuger.txtProductVariantAugerCode);
    $txtProductVariantAugerDescription.val(productVariantAuger.txtProductVariantAugerDescription);
    $intLevel.val(productVariantAuger.intLevel)
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
    $productVariantAugerFormTitle.text = "Add ProductVariantAuger";
})
$btnSave.bind('click', () => {
    setupDataProductVariantAuger();
    $.confirmMessage("Confirm", "Save ProductVariantAuger?", "Ya Save", saveProductVariantAuger);
})

function searchProductVariantAuger() {
    pageProductVariantAuger.page = 1;
    getAllProductVariantAuger(pageProductVariantAuger.page, cari);
}

