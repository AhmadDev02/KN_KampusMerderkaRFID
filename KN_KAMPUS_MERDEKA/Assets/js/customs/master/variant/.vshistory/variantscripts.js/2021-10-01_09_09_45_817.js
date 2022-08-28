//=======================
// INITIALIZE DATA
//=======================
var cari = '';
let pageVariant = {};
pageVariant.page = 1;
pageVariant.hasContent = false;
pageVariant.hasNext = false;
pageVariant.hasPrevious = false;
let api = "/Master/Variant";
let variant = {};
let txtGUID = $("#txtGUID").val()
let __RequestVerificationToken = $('#frm input[name=__RequestVerificationToken]').val()
let headerData = {};
headerData.__RequestVerificationToken = __RequestVerificationToken;
let elementToSwitch = [$("#variantFormRow"), $("#variantTableRow")];
let $variantFormTitle = $("#variantFormTitle");
let selectedVariantCategory = null;
//=======================
// ALL BUTTON
//=======================
let $btnPrev = $("#btnPrev");
let $btnNext = $("#btnNext");
let $btnSave = $("#btnSave");
let $btnAddVariant = $("#btnAddVariant");
let $btnCancelAddVariant = $("#btnCancelAddVariant");
let txtSelectedVariantCategoryDescription = $("#txtSelectedVariantCategoryDescription");
//=======================
// FORM 
//=======================
let $txtSelectedVariantCategoryDescription = $("#txtSelectedVariantCategoryDescription");
let $txtVariantCode = $("#txtVariantCode");
let $txtVariantDescription = $("#txtVariantDescription");
let $intLevel = $("#intLevel");

function initializePage() {
    page = 1;
    cari = "";
    pageVariant = {};
    pageVariant.page = 1;
    pageVariant.hasContent = false;
    pageVariant.hasNext = false;
    pageVariant.hasPrevious = false;
    api = "/Master/Variant";
    user = {};
    txtGUID = $("#txtGUID").val()
    __RequestVerificationToken = $('#frm input[name=__RequestVerificationToken]').val()
    headerData = {};
    headerData.__RequestVerificationToken = __RequestVerificationToken;
    setButtonNextPrvVisibility();
    selectedVariantCategory = null;
    iniitializeData();
}
initializePage();
getAllVariant(pageVariant.page, cari);
function setButtonNextPrvVisibility() {
    if (pageVariant.hasNext) {
        $btnNext.show();
    } else {
        $btnNext.hide();
    }
    if (pageVariant.hasPrevious) {
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
        variant = response.objData;
        setupAddVariantForm();
        $variantFormTitle.text = "Add Variant";
    }, errorHandle, headerData);
}

function setupAddVariantForm() {
    $txtVariantCode.val(variant.txtVariantCode);
    $txtVariantDescription.val(variant.txtVariantDescription);
    $intLevel.val(variant.intLevel);
}

//=======================
// AJAX REQUEST GET ALL VARIANT
//=======================
function getAllVariant(x, y) {
    $.postApi(api + "/getAllVariant",
        {
            page: x,
            cari: y,
            size: 20
        },
        function (response) {
            pageVariant = response.objData;
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
// AJAX REQUEST SAVE VARIANT
//=======================
function saveVariant() {
    $.postApi(api + "/Save",
        variant,
        function (response) {
            iniitializeData();
            $.switchElement(elementToSwitch, 1);
            $.successMessage("Sukses", "Berhasil menyimpan variant");
            getAllVariant(0, cari)
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
    if (pageVariant.hasContent) {
        for (let i = 0; i < pageVariant.content.length; i++) {
            var m = pageVariant.content[i];
            let $btnEdit = `<button class=' btn btn-outline-warning btnEdit ' data-variant='` + JSON.stringify(m) + `'> <i class='fa fa-edit'></i> Edit</button>`;
            let row = "<tr id='intVariantID" + m.intVariantID + "'>" +
                "<td class='text-center'>" + m.intVariantID + "</td>" +
                "<td class='text-center'>" + m.txtVariantCode + "</td>" +
                "<td class='text-center'>" + m.txtVariantDescription + "</td>" +
                "<td class='text-center'>" + m.intLevel + "</td>" +
                "<td class='text-center'>" +
                $btnEdit +
                "</td>" +
                "</tr>";
            $("#tbody").append(row);
        }
        $(".btnEdit").on('click', function () {
            let r = $(this).data('variant');
            setupDataVariantEdit(r);
            setupDataVariantEditForm();
            $.switchElement(elementToSwitch, 0);
            $variantFormTitle.text = "Edit Variants";
        })

    } else {
        $("#tbody").append("<tr><td colspan='5'><center><span class='text-muted'>No Data <a class='refresh' href=''>Refresh</a> </span></center></td></tr>");
    }
    setButtonNextPrvVisibility();
}
//=======================
// ASSIGN VARIANT SAVE
//=======================
function setupDataVariant() {
    variant.txtVariantCode = $txtVariantCode.val().toString();
    variant.txtVariantDescription = $txtVariantDescription.val().toString();
    variant.intLevel = parseInt($intLevel.val().toString());
}
//=======================
// ASSIGN EDIT VARIANT
//=======================
function setupDataVariantEdit(r) {
    variant.intVariantID = r.intVariantID;
    variant.txtVariantCode = r.txtVariantCode;
    variant.txtVariantDescription = r.txtVariantDescription;
    variant.intLevel = r.intLevel;
    variant.txtGUID = r.txtGUID;
}
//=======================
// ASSIGN EDIT VARIANT FORM
//=======================
function setupDataVariantEditForm() {
    $txtVariantCode.val(variant.txtVariantCode);
    $txtVariantDescription.val(variant.txtVariantDescription);
    $intLevel.val(variant.intLevel)
}

//=======================
// EVENT LISTENER
//=======================
$btnNext.bind('click', () => {
    if (pageVariant.hasNext) {
        getAllVariant(pageVariant.page + 1, cari);
    }
})

$btnPrev.bind('click', () => {
    if (pageVariant.hasPrevious) {
        getAllVariant(pageVariant.page - 1, cari);
    }
})
$btnAddVariant.bind('click', () => {
    $.switchElement(elementToSwitch, 0);
    iniitializeData();
})
$btnCancelAddVariant.bind('click', () => {
    $.switchElement(elementToSwitch, 1);
    $variantFormTitle.text = "Add Variant";
})
$btnSave.bind('click', () => {
    setupDataVariant();
    $.confirmMessage("Confirm", "Save Variant?", "Ya Save", saveVariant);
})

function searchVariant() {
    pageVariant.page = 1;
    getAllVariant(pageVariant.page, cari);
}

