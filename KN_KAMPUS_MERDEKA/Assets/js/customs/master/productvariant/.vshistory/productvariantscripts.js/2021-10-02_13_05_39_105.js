//=======================
// INITIALIZE DATA
//=======================
var cari = '';
let pageProductVariant  = {};
pageProductVariant .page = 1;
pageProductVariant .hasContent = false;
pageProductVariant .hasNext = false;
pageProductVariant .hasPrevious = false;
let api = "/Master/ProductVariant";
let productVariant  = {};
let txtGUID = $("#txtGUID").val()
let __RequestVerificationToken = $('#frm input[name=__RequestVerificationToken]').val()
let headerData = {};
headerData.__RequestVerificationToken = __RequestVerificationToken;
let elementToSwitch = [$("#productVariantFormRow"), $("#productVariantTableRow")];
let $productVariantFormTitle = $("#productVariantFormTitle");
let selectedVariant = null;
let selectedProduct = null;
//=======================
// ALL BUTTON
//=======================
let $btnPrev = $("#btnPrev");
let $btnNext = $("#btnNext");
let $btnSave = $("#btnSave");
let $btnAddProductVariant  = $("#btnAddProductVariant");
let $btnCancelProductVariant  = $("#btnCancelAddProductVariant");
let $btnSelectVariant = $("#btnSelectVariant");
let $btnSelectProduct = $("#btnSelectProduct");
//=======================
// FORM 
//=======================
let $txtSelectedProductDescription = $("#txtSelectedProductDescription");
let $txtSelectedVariantDescription= $("#txtSelectedVariantDescription");
let $txtProductVariantCode = $("#txtProductVariantCode");
let $txtProductVariantDescription = $("#txtProductVariantDescription");
let $intLevel = $("#intLevel");

function initializePage() {
    pageProductVariant = {};
    pageProductVariant.page = 1;
    pageProductVariant.hasContent = false;
    pageProductVariant.hasNext = false;
    pageProductVariant.hasPrevious = false;
    productVariant = {};
    txtGUID = $("#txtGUID").val()
     __RequestVerificationToken = $('#frm input[name=__RequestVerificationToken]').val()
    headerData = {};
    headerData.__RequestVerificationToken = __RequestVerificationToken;
    selectedVariant = null;
    selectedProduct = null;
    setButtonNextPrvVisibility();
    iniitializeData();
}
initializePage();
getAllProductVariant(pageProductVariant.page, cari);
function setButtonNextPrvVisibility() {
    if (pageProductVariant.hasNext) {
        $btnNext.show();
    } else {
        $btnNext.hide();
    }
    if (pageProductVariant.hasPrevious) {
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
        productVariant = response.objData;
        setupAddProductVariantForm();
        $productVariantFormTitle.text = "Add Product Variant";
    }, errorHandle, headerData);
}

function setupAddProductVariantForm() {
    $txtProductVariantCode.val(productVariant.txtProductVariantCode);
    $txtProductVariantDescription.val(productVariant.txtProductVariantDescription);
    $txtSelectedProductDescription.val("Select Product");
    $txtSelectedVariantDescription.val("Select Variant");
    $intLevel.val(productVariant.intLevel);
}

//=======================
// AJAX REQUEST GET ALL PRODUCT VARIANT
//=======================
function getAllProductVariant(x, y) {
    $.postApi(api + "/getAllProductVariant",
        {
            page: x,
            cari: y,
            size: 20
        },
        function (response) {
            pageProductVariant = response.objData;
            fillTableData();
        },
        function (e) {
            $.errorMessage("Failed", e.responseJSON.txtMessage);
            $("#tbody").html("");
            $("#tbody").append("<tr><td colspan='6'><center><span class='text-muted'>No Data <a class='refresh' href=''>Refresh</a> </span></center></td></tr>");
        },
        headerData
    )
}
//=======================
// AJAX REQUEST SAVE PRODUCT VARIANT
//=======================
function saveVariant() {
    $.postApi(api + "/Save",
        productVariant ,
        function (response) {
            iniitializeData();
            $.switchElement(elementToSwitch, 1);
            $.successMessage("Sukses", "Berhasil menyimpan Product Variant ");
            getAllProductVariant(0, cari)
        },
        function (e) {
            $.errorMessage("Failed", e.responseJSON.txtMessage);
            $("#tbody").html("");
            $("#tbody").append("<tr><td colspan='6'><center><span class='text-muted'>No Data <a class='refresh' href=''>Refresh</a> </span></center></td></tr>");
        },
        headerData
    )
}
//=======================
// FILL TABLE DATA
//=======================
function fillTableData() {
    $("#tbody").html("");
    if (pageProductVariant .hasContent) {
        for (let i = 0; i < pageProductVariant .content.length; i++) {
            var m = pageProductVariant .content[i];
            let $btnEdit = `<button class=' btn btn-outline-warning btnEdit ' data-productvariant ='` + JSON.stringify(m) + `'> <i class='fa fa-edit'></i> Edit</button>`;
            let row = "<tr id='intProductVariantID" + m.intProductVariantID + "'>" +
                "<td class='text-center'>" + m.intProductVariantID + "</td>" +
                "<td class='text-center'>" + m.txtProductVariantCode + "</td>" +
                "<td class='text-center'>" + m.txtVariantDescription + "</td>" +
                "<td class='text-center'>" + m.txtProductVariantDescription + "</td>" +
                "<td class='text-center'>" + m.intLevel + "</td>" +
                "<td class='text-center'>" +
                $btnEdit +
                "</td>" +
                "</tr>";
            $("#tbody").append(row);
        }
        $(".btnEdit").on('click', function () {
            let r = $(this).data('productvariant');
            setupDataProductVariantEdit(r);
            setupDataProductVariantEditForm();
            $.switchElement(elementToSwitch, 0);
            $productVariantFormTitle.text = "Edit Product Variants " + r.txtProductVariantCode;
        })

    } else {
        $("#tbody").append("<tr><td colspan='6'><center><span class='text-muted'>No Data <a class='refresh' href=''>Refresh</a> </span></center></td></tr>");
    }
    setButtonNextPrvVisibility();
}
//=======================
// ASSIGN PRODUCT VARIANT SAVE
//=======================
function setupDataProductVariant() {
    productVariant.txtProductVariantCode = $txtProductVariantCode.val().toString();
    productVariant.txtProductVariantDescription = $txtProductVariantDescription.val().toString();
    productVariant.intLevel = parseInt($intLevel.val().toString());
    productVariant.intProductID = selectedProduct.intProductID;
    productVariant.intVariantID = selectedVariant.intVariantID;
}
//=======================
// ASSIGN EDIT PRODUCT VARIANT
//=======================
function setupDataVariantEdit(r) {
    selectedProduct = {}
    selectedProduct.intProductID = r.product.intProductID;
    selectedProduct.txtProductDescription = r.product.txtProductDescription

    selectedVariant = {}
    selectedVariant.intVariantID = r.variant.intVariantID;
    selectedVariant.txtVariantDescription = r.variant.txtVariantDescription;

    productVariant.intProductVariantID = r.intProductVariantID;
    productVariant.txtProductVariantCode = r.txtProductVariantCode;
    productVariant.txtProductVariantDescription = r.txtProductVariantDescription;
    productVariant.intLevel = r.intLevel;
    productVariant.txtGUID = r.txtGUID;
}
//=======================
// ASSIGN EDIT PRODUCT VARIANT FORM
//=======================
function setupDataProductVariantEditForm() {
    $txtProductVariantCode.val(productVariant.txtProductVariantCode);
    $txtProductVariantDescription.val(productVariant.txtProductVariantDescription);
    $txtSelectedProductDescription.val(selectedProduct.txtProductDescription);
    $txtSelectedVariantDescription.val(selectedVariant.txtVariantDescription);
    $intLevel.val(productVariant.intLevel);
}
/*================================
GET SELECTED VARIANT
================================== */
function getSelectedVariant(x) {
    selectedVariant = x;
    $txtSelectedVariantDescription.val(x.txtVariantDescription);
    if (selectedProduct != null) {
        $txtProductVariantCode.val(selectedProduct.txtProductCode + selectedVariant.txtVariantCode)
        $txtProductVariantDescription.val(selectedProduct.txtProductDescription + " " + selectedVariant.txtVariantDescription)
    } else {
        $txtProductVariantCode.val(selectedVariant.txtVariantCode)
        $txtProductVariantDescription.val(selectedVariant.txtVariantDescription)
    }
}
/*================================
GET SELECTED PRODUCT
================================== */
function getSelectedProduct(x) {
    selectedProduct = x;
    $txtSelectedProductDescription.val(x.txtProductDescription);
    if (selectedVariant != null) {
        $txtProductVariantCode.val(selectedProduct.txtProductCode + selectedVariant.txtVariantCode)
        $txtProductVariantDescription.val(x.txtProductDescription + " " + selectedVariant.txtVariantDescription)
    } else {
        $txtProductVariantDescription.val(x.txtProductDescription)
        $txtProductVariantCode.val(selectedProduct.txtProductCode)
    }

}
//=======================
// EVENT LISTENER
//=======================
$btnNext.bind('click', () => {
    if (pageProductVariant.hasNext) {
        getAllProductVariant(pageProductVariant.page + 1, cari);
    }
})

$btnPrev.bind('click', () => {
    if (pageProductVariant.hasPrevious) {
        getAllProductVariant(pageProductVariant.page - 1, cari);
    }
})
$btnAddProductVariant.bind('click', () => {
    $.switchElement(elementToSwitch, 0);
    iniitializeData();
})
$btnCancelProductVariant.bind('click', () => {
    $.switchElement(elementToSwitch, 1);
    $productVariantFormTitle.text = "Add Variant";
})
$btnSave.bind('click', () => {
    if (selectedVariant != null && selectedProduct != null) {
        setupDataProductVariant();
        $.confirmMessage("Confirm", "Save Product Variant?", "Ya Save", saveProductVariant);
    }
})
$btnSelectVariant.bind('click', () => {
    $.showLOV('Variant')
})
$btnSelectProduct.bind('click', () => {
    $.showLOV('Product')
})
function searchVariant() {
    pageProductVariant.page = 1;
    getAllProductVariant(pageProductVariant.page, cari);
}

