//=======================
// INITIALIZE DATA
//=======================
var cari = '';
let pageVariantCategory = {};
pageVariantCategory.page = 1;
pageVariantCategory.hasContent = false;
pageVariantCategory.hasNext = false;
pageVariantCategory.hasPrevious = false;
let api = "/Master/VariantCategory";
let variantCategory = {};
let txtGUID = $("#txtGUID").val()
let __RequestVerificationToken = $('#frm input[name=__RequestVerificationToken]').val()
let headerData = {};
headerData.__RequestVerificationToken = __RequestVerificationToken;
let elementToSwitch = [$("#variantCategoryFormRow"), $("#variantCategoryTableRow")];
let $variantCategoryFormTitle = $("#variantCategoryFormTitle");

//=======================
// ALL BUTTON
//=======================
let $btnPrev = $("#btnPrev");
let $btnNext = $("#btnNext");
let $btnSave = $("#btnSave");
let $btnAddVariantCategory = $("#btnAddVariantCategory");
let $btnCancelAddVariantCategory = $("#btnCancelAddVariantCategory");
//=======================
// FORM 
//=======================
let $txtVariantCategoryCode = $("#txtVariantCategoryCode");
let $txtVariantCategoryDescription = $("#txtVariantCategoryDescription");
let $intLevel = $("#intLevel");

function initializePage() {
    page = 1;
    cari = "";
    pageVariantCategory = {};
    pageVariantCategory.page = 1;
    pageVariantCategory.hasContent = false;
    pageVariantCategory.hasNext = false;
    pageVariantCategory.hasPrevious = false;
    api = "/Master/VariantCategory";
    user = {};
    txtGUID = $("#txtGUID").val()
    __RequestVerificationToken = $('#frm input[name=__RequestVerificationToken]').val()
    headerData = {};
    headerData.__RequestVerificationToken = __RequestVerificationToken;
    setButtonNextPrvVisibility();
    iniitializeData();
}
initializePage();
getAllVariantCategory(pageVariantCategory.page, cari);
function setButtonNextPrvVisibility() {
    if (pageVariantCategory.hasNext) {
        $btnNext.show();
    } else {
        $btnNext.hide();
    }
    if (pageVariantCategory.hasPrevious) {
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
        variantCategory = response.objData;
        setupAddVariantCategoryForm();
        $variantCategoryFormTitle.text = "Add VariantCategory";
    }, errorHandle, headerData);
}

function setupAddVariantCategoryForm() {
    $txtVariantCategoryCode.val(variantCategory.txtVariantCategoryCode);
    $txtVariantCategoryDescription.val(variantCategory.txtVariantCategoryDescription);
    $intLevel.val(variantCategory.intLevel);
}

//=======================
// AJAX REQUEST GET ALL PRODUCT
//=======================
function getAllVariantCategory(x, y) {
    $.postApi(api + "/getAllVariantCategory",
        {
            page: x,
            cari: y,
            size: 20
        },
        function (response) {
            pageVariantCategory = response.objData;
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
function saveVariantCategory() {
    $.postApi(api + "/Save",
        variantCategory,
        function (response) {
            iniitializeData();
            $.switchElement(elementToSwitch, 1);
            $.successMessage("Sukses", "Berhasil menyimpan variantCategory");
            getAllVariantCategory(0, cari)
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
    if (pageVariantCategory.hasContent) {
        for (let i = 0; i < pageVariantCategory.content.length; i++) {
            var m = pageVariantCategory.content[i];
            let $btnEdit = `<button class=' btn btn-outline-warning btnEdit ' data-variantCategory='` + JSON.stringify(m) + `'> <i class='fa fa-edit'></i> Edit</button>`;
            let row = "<tr id='intVariantCategoryID" + m.intVariantCategoryID + "'>" +
                "<td class='text-center'>" + m.intVariantCategoryID + "</td>" +
                "<td class='text-center'>" + m.txtVariantCategoryCode + "</td>" +
                "<td class='text-center'>" + m.txtVariantCategoryDescription + "</td>" +
                "<td class='text-center'>" + m.intLevel + "</td>" +
                "<td class='text-center'>" +
                $btnEdit +
                "</td>" +
                "</tr>";
            $("#tbody").append(row);
        }
        $(".btnEdit").on('click', function () {
            let r = $(this).data('variantCategory');
            setupDataVariantCategoryEdit(r);
            setupDataVariantCategoryEditForm();
            $.switchElement(elementToSwitch, 0);
            $variantCategoryFormTitle.text = "Edit VariantCategorys";
        })

    } else {
        $("#tbody").append("<tr><td colspan='5'><center><span class='text-muted'>No Data <a class='refresh' href=''>Refresh</a> </span></center></td></tr>");
    }
    setButtonNextPrvVisibility();
}
//=======================
// ASSIGN PRODUCT SAVE
//=======================
function setupDataVariantCategory() {
    variantCategory.txtVariantCategoryCode = $txtVariantCategoryCode.val().toString();
    variantCategory.txtVariantCategoryDescription = $txtVariantCategoryDescription.val().toString();
    variantCategory.intLevel = parseInt($intLevel.val().toString());
}
//=======================
// ASSIGN EDIT PRODUCT
//=======================
function setupDataVariantCategoryEdit(r) {
    variantCategory.intVariantCategoryID = r.intVariantCategoryID;
    variantCategory.txtVariantCategoryCode = r.txtVariantCategoryCode;
    variantCategory.txtVariantCategoryDescription = r.txtVariantCategoryDescription;
    variantCategory.intLevel = r.intLevel;
    variantCategory.txtGUID = r.txtGUID;
}
//=======================
// ASSIGN EDIT PRODUCT FORM
//=======================
function setupDataVariantCategoryEditForm() {
    $txtVariantCategoryCode.val(variantCategory.txtVariantCategoryCode);
    $txtVariantCategoryDescription.val(variantCategory.txtVariantCategoryDescription);
    $intLevel.val(variantCategory.intLevel)
}

//=======================
// EVENT LISTENER
//=======================
$btnNext.bind('click', () => {
    if (pageVariantCategory.hasNext) {
        getAllVariantCategory(pageVariantCategory.page + 1, cari);
    }
})

$btnPrev.bind('click', () => {
    if (pageVariantCategory.hasPrevious) {
        getAllVariantCategory(pageVariantCategory.page - 1, cari);
    }
})
$btnAddVariantCategory.bind('click', () => {
    $.switchElement(elementToSwitch, 0);
    iniitializeData();
})
$btnCancelAddVariantCategory.bind('click', () => {
    $.switchElement(elementToSwitch, 1);
    $variantCategoryFormTitle.text = "Add VariantCategory";
})
$btnSave.bind('click', () => {
    setupDataVariantCategory();
    $.confirmMessage("Confirm", "Save VariantCategory?", "Ya Save", saveVariantCategory);
})

function searchVariantCategory() {
    pageVariantCategory.page = 1;
    getAllVariantCategory(pageVariantCategory.page, cari);
}

