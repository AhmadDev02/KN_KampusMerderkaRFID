//=======================
// INITIALIZE DATA
//=======================
var cari = '';
let pageProductVariant  = {};
pageProductVariant .page = 1;
pageProductVariant .hasContent = false;
pageProductVariant .hasNext = false;
pageProductVariant .hasPrevious = false;
let api = "/Master/ProductVariant ";
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
let $btnaddProductVariant  = $("#btnAddVariant");
let $btnCancelProductVariant  = $("#btnCancelAddVariant");
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
getAllProductVariant(pageProductVariant .page, cari);
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
    $intLevel.val(productVariant .intLevel);
}

//=======================
// AJAX REQUEST GET ALL VARIANT
//=======================
function getAllVariant(x, y) {
    $.postApi(api + "/getAllProductVariant",
        {
            page: x,
            cari: y,
            size: 20
        },
        function (response) {
            pageProductVariant  = response.objData;
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
// AJAX REQUEST SAVE VARIANT
//=======================
function saveVariant() {
    $.postApi(api + "/Save",
        productVariant ,
        function (response) {
            iniitializeData();
            $.switchElement(elementToSwitch, 1);
            $.successMessage("Sukses", "Berhasil menyimpan productVariant ");
            getAllVariant(0, cari)
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
            let $btnEdit = `<button class=' btn btn-outline-warning btnEdit ' data-productVariant ='` + JSON.stringify(m) + `'> <i class='fa fa-edit'></i> Edit</button>`;
            let row = "<tr id='intVariantID" + m.intVariantID + "'>" +
                "<td class='text-center'>" + m.intVariantID + "</td>" +
                "<td class='text-center'>" + m.txtVariantCode + "</td>" +
                "<td class='text-center'>" + m.txtVariantDescription + "</td>" +
                "<td class='text-center'>" + m.category.txtVariantCategoryDescription + "</td>" +
                "<td class='text-center'>" + m.intLevel + "</td>" +
                "<td class='text-center'>" +
                $btnEdit +
                "</td>" +
                "</tr>";
            $("#tbody").append(row);
        }
        $(".btnEdit").on('click', function () {
            let r = $(this).data('productVariant ');
            setupDataVariantEdit(r);
            setupDataVariantEditForm();
            $.switchElement(elementToSwitch, 0);
            $productVariant FormTitle.text = "Edit Variants";
        })

    } else {
        $("#tbody").append("<tr><td colspan='6'><center><span class='text-muted'>No Data <a class='refresh' href=''>Refresh</a> </span></center></td></tr>");
    }
    setButtonNextPrvVisibility();
}
//=======================
// ASSIGN VARIANT SAVE
//=======================
function setupDataVariant() {
    productVariant .txtVariantCode = $txtVariantCode.val().toString();
    productVariant .txtVariantDescription = $txtVariantDescription.val().toString();
    productVariant .intLevel = parseInt($intLevel.val().toString());
    productVariant .intVariantCategoryID = selectedVariantCategory.intVariantCategoryID;
}
//=======================
// ASSIGN EDIT VARIANT
//=======================
function setupDataVariantEdit(r) {
    selectedVariantCategory = {}
    selectedVariantCategory.intVariantCategoryID = r.category.intVariantCategoryID;
    selectedVariantCategory.txtVariantCategoryDescription = r.category.txtVariantCategoryDescription;
    productVariant .intVariantID = r.intVariantID;
    productVariant .txtVariantCode = r.txtVariantCode;
    productVariant .txtVariantDescription = r.txtVariantDescription;
    productVariant .intLevel = r.intLevel;
    productVariant .txtGUID = r.txtGUID;
}
//=======================
// ASSIGN EDIT VARIANT FORM
//=======================
function setupDataVariantEditForm() {
    $txtVariantCode.val(productVariant .txtVariantCode);
    $txtVariantDescription.val(productVariant .txtVariantDescription);
    $intLevel.val(productVariant .intLevel)
    $txtSelectedVariantCategoryDescription.val(selectedVariantCategory.txtVariantCategoryDescription);
}
/*================================
GET SELECTED VARIANT CATEGORY
================================== */
function getSelectedVariantCategory(x) {
    selectedVariantCategory = x;
    $txtSelectedVariantCategoryDescription.val(x.txtVariantCategoryDescription);

}
//=======================
// EVENT LISTENER
//=======================
$btnNext.bind('click', () => {
    if (pageProductVariant .hasNext) {
        getAllVariant(pageProductVariant .page + 1, cari);
    }
})

$btnPrev.bind('click', () => {
    if (pageProductVariant .hasPrevious) {
        getAllVariant(pageProductVariant .page - 1, cari);
    }
})
$btnaddProductVariant .bind('click', () => {
    $.switchElement(elementToSwitch, 0);
    iniitializeData();
})
$btnCancelProductVariant .bind('click', () => {
    $.switchElement(elementToSwitch, 1);
    $productVariant FormTitle.text = "Add Variant";
})
$btnSave.bind('click', () => {
    if (selectedVariantCategory != null) {
        setupDataVariant();
        $.confirmMessage("Confirm", "Save Variant?", "Ya Save", saveVariant);
    }
})
$btnSelectVariant.bind('click', () => {
    $.showLOV('VariantCategory')
})

function searchVariant() {
    pageProductVariant .page = 1;
    getAllVariant(pageProductVariant .page, cari);
}

