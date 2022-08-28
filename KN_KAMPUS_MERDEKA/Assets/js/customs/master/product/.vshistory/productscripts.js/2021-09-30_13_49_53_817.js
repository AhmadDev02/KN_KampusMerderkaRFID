//=======================
// INITIALIZE DATA
//=======================
var cari = '';
let pageProduct = {};
pageProduct.page = 1;
pageProduct.hasContent = false;
pageProduct.hasNext = false;
pageProduct.hasPrevious = false;
let api = "/Master/Product";
let module = {};
let txtGUID = $("#txtGUID").val()
let __RequestVerificationToken = $('#frm input[name=__RequestVerificationToken]').val()
let headerData = {};
headerData.__RequestVerificationToken = __RequestVerificationToken;
let elementToSwitch = [$("#moduleFormRow"), $("#moduleTableRow")];
let $moduleFormTitle = $("#moduleFormTitle");

//=======================
// ALL BUTTON
//=======================
let $btnPrev = $("#btnPrev");
let $btnNext = $("#btnNext");
let $btnSave = $("#btnSave");
let $btnAddProduct = $("#btnAddProduct");
let $btnCancelAddProduct = $("#btnCancelAddProduct");
//=======================
// FORM ROLE
//=======================
let $txtProductName = $("#txtProductName");
let $txtDescription = $("#txtDescription");

function initializePage() {
    page = 1;
    cari = "";
    pageProduct = {};
    pageProduct.page = 1;
    pageProduct.hasContent = false;
    pageProduct.hasNext = false;
    pageProduct.hasPrevious = false;
    api = "/System/Product";
    user = {};
    txtGUID = $("#txtGUID").val()
    __RequestVerificationToken = $('#frm input[name=__RequestVerificationToken]').val()
    headerData = {};
    headerData.__RequestVerificationToken = __RequestVerificationToken;
    setButtonNextPrvVisibility();
    iniitializeData();
}
initializePage();
getAllProduct(pageProduct.page, cari);
function setButtonNextPrvVisibility() {
    if (pageProduct.hasNext) {
        $btnNext.show();
    } else {
        $btnNext.hide();
    }
    if (pageProduct.hasPrevious) {
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
        module = response.objData;
        setupAddProductForm();
        $moduleFormTitle.text = "Add Product";
    }, errorHandle, headerData);
}

function setupAddProductForm() {
    $txtProductName.val(module.txtProductName);
    $txtDescription.val(module.txtDescription);
}

//=======================
// AJAX REQUEST GET ALL MODULE
//=======================
function getAllProduct(x, y) {
    $.postApi(api + "/getAllProduct",
        {
            page: x,
            cari: y,
            size: 20
        },
        function (response) {
            pageProduct = response.objData;
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
// AJAX REQUEST SAVE MODULE
//=======================
function saveProduct() {
    $.postApi(api + "/Save",
        module,
        function (response) {
            iniitializeData();
            $.switchElement(elementToSwitch, 1);
            $.successMessage("Sukses", "Berhasil menyimpan module");
            getAllProduct(0, cari)
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
// FILL TABLE DATA
//=======================
function fillTableData() {
    $("#tbody").html("");
    if (pageProduct.hasContent) {
        for (let i = 0; i < pageProduct.content.length; i++) {
            var m = pageProduct.content[i];
            let $btnEdit = `<button class=' btn btn-outline-warning btnEdit ' data-module='` + JSON.stringify(m) + `'> <i class='fa fa-edit'></i> Edit</button>`;
            let row = "<tr id='intProductID" + m.intProductID + "'>" +
                "<td class='text-center'>" + m.intProductID + "</td>" +
                "<td class='text-center'>" + m.txtProductName + "</td>" +
                "<td class='text-center'>" + m.txtDescription + "</td>" +
                "<td class='text-center'>" +
                $btnEdit +
                "</td>" +
                "</tr>";
            $("#tbody").append(row);
        }
        $(".btnEdit").on('click', function () {
            let r = $(this).data('module');
            setupDataProductEdit(r);
            setupDataProductEditForm();
            $.switchElement(elementToSwitch, 0);
            $moduleFormTitle.text = "Edit Products";
        })

    } else {
        $("#tbody").append("<tr><td colspan='4'><center><span class='text-muted'>No Data <a class='refresh' href=''>Refresh</a> </span></center></td></tr>");
    }
    setButtonNextPrvVisibility();
}
//=======================
// ASSIGN ROLE SAVE
//=======================
function setupDataProduct() {
    module.txtProductName = $txtProductName.val().toString();
    module.txtDescription = $txtDescription.val().toString();
}
//=======================
// ASSIGN EDIT MODULE
//=======================
function setupDataProductEdit(r) {
    module.intProductID = r.intProductID;
    module.txtProductName = r.txtProductName;
    module.txtDescription = r.txtDescription;
    module.txtGUID = r.txtGUID;
}
//=======================
// ASSIGN EDIT MODULE FORM
//=======================
function setupDataProductEditForm() {
    $txtProductName.val(module.txtProductName);
    $txtDescription.val(module.txtDescription);
}

//=======================
// EVENT LISTENER
//=======================
$btnNext.bind('click', () => {
    if (pageProduct.hasNext) {
        getAllProduct(pageProduct.page + 1, cari);
    }
})

$btnPrev.bind('click', () => {
    if (pageProduct.hasPrevious) {
        getAllProduct(pageProduct.page - 1, cari);
    }
})
$btnAddProduct.bind('click', () => {
    $.switchElement(elementToSwitch, 0);
    iniitializeData();
})
$btnCancelAddProduct.bind('click', () => {
    $.switchElement(elementToSwitch, 1);
    $moduleFormTitle.text = "Add Product";
})
$btnSave.bind('click', () => {
    setupDataProduct();
    $.confirmMessage("Confirm", "Save Product?", "Ya Save", saveProduct);
})

function searchProduct() {
    pageProduct.page = 1;
    getAllProduct(pageProduct.page, cari);
}

