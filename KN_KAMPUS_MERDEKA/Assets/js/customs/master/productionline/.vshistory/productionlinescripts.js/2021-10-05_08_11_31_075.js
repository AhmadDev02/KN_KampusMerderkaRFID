//=======================
// INITIALIZE DATA
//=======================
var cari = '';
let pageProductionLine = {};
pageProductionLine.page = 1;
pageProductionLine.hasContent = false;
pageProductionLine.hasNext = false;
pageProductionLine.hasPrevious = false;
let api = "/Master/ProductionLine";
let productionLine = {};
let txtGUID = $("#txtGUID").val()
let __RequestVerificationToken = $('#frm input[name=__RequestVerificationToken]').val()
let headerData = {};
headerData.__RequestVerificationToken = __RequestVerificationToken;
let elementToSwitch = [$("#productionLineFormRow"), $("#productionLineTableRow")];
let $productionLineFormTitle = $("#productionLineFormTitle");

//=======================
// ALL BUTTON
//=======================
let $btnPrev = $("#btnPrev");
let $btnNext = $("#btnNext");
let $btnSave = $("#btnSave");
let $btnAddProductionLine = $("#btnAddProductionLine");
let $btnCancelAddProductionLine = $("#btnCancelAddProductionLine");
//=======================
// FORM 
//=======================
let $txtProductionLineCode = $("#txtProductionLineCode");
let $txtProductionLineDescription = $("#txtProductionLineDescription");
let $intLevel = $("#intLevel");

function initializePage() {
    page = 1;
    cari = "";
    pageProductionLine = {};
    pageProductionLine.page = 1;
    pageProductionLine.hasContent = false;
    pageProductionLine.hasNext = false;
    pageProductionLine.hasPrevious = false;
    api = "/Master/ProductionLine";
    user = {};
    txtGUID = $("#txtGUID").val()
    __RequestVerificationToken = $('#frm input[name=__RequestVerificationToken]').val()
    headerData = {};
    headerData.__RequestVerificationToken = __RequestVerificationToken;
    setButtonNextPrvVisibility();
    iniitializeData();
}
initializePage();
getAllProductionLine(pageProductionLine.page, cari);
function setButtonNextPrvVisibility() {
    if (pageProductionLine.hasNext) {
        $btnNext.show();
    } else {
        $btnNext.hide();
    }
    if (pageProductionLine.hasPrevious) {
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
        productionLine = response.objData;
        setupAddProductionLineForm();
        $productionLineFormTitle.text = "Add ProductionLine";
    }, errorHandle, headerData);
}

function setupAddProductionLineForm() {
    $txtProductionLineCode.val(productionLine.txtProductionLineCode);
    $txtProductionLineDescription.val(productionLine.txtProductionLineDescription);
    $intLevel.val(productionLine.intLevel);
}

//=======================
// AJAX REQUEST GET ALL PRODUCT
//=======================
function getAllProductionLine(x, y) {
    $.postApi(api + "/getAllProductionLine",
        {
            page: x,
            cari: y,
            size: 20
        },
        function (response) {
            pageProductionLine = response.objData;
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
function saveProductionLine() {
    $.postApi(api + "/Save",
        productionLine,
        function (response) {
            iniitializeData();
            $.switchElement(elementToSwitch, 1);
            $.successMessage("Sukses", "Berhasil menyimpan production Line");
            getAllProductionLine(0, cari)
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
    if (pageProductionLine.hasContent) {
        for (let i = 0; i < pageProductionLine.content.length; i++) {
            var m = pageProductionLine.content[i];
            let $btnEdit = `<button class=' btn btn-outline-warning btnEdit ' data-productionLine='` + JSON.stringify(m) + `'> <i class='fa fa-edit'></i> Edit</button>`;
            let row = "<tr id='intProductionLineID" + m.intProductionLineID + "'>" +
                "<td class='text-center'>" + m.intProductionLineID + "</td>" +
                "<td class='text-center'>" + m.txtProductionLineCode + "</td>" +
                "<td class='text-center'>" + m.txtProductionLineDescription + "</td>" +
                "<td class='text-center'>" + m.intLevel + "</td>" +
                "<td class='text-center'>" +
                $btnEdit +
                "</td>" +
                "</tr>";
            $("#tbody").append(row);
        }
        $(".btnEdit").on('click', function () {
            let r = $(this).data('productionline');
            setupDataProductionLineEdit(r);
            setupDataProductionLineEditForm();
            $.switchElement(elementToSwitch, 0);
            $productionLineFormTitle.text = "Edit ProductionLines";
        })

    } else {
        $("#tbody").append("<tr><td colspan='5'><center><span class='text-muted'>No Data <a class='refresh' href=''>Refresh</a> </span></center></td></tr>");
    }
    setButtonNextPrvVisibility();
}
//=======================
// ASSIGN PRODUCT SAVE
//=======================
function setupDataProductionLine() {
    productionLine.txtProductionLineCode = $txtProductionLineCode.val().toString();
    productionLine.txtProductionLineDescription = $txtProductionLineDescription.val().toString();
    productionLine.intLevel = parseInt($intLevel.val().toString());
}
//=======================
// ASSIGN EDIT PRODUCT
//=======================
function setupDataProductionLineEdit(r) {
    productionLine.intProductionLineID = r.intProductionLineID;
    productionLine.txtProductionLineCode = r.txtProductionLineCode;
    productionLine.txtProductionLineDescription = r.txtProductionLineDescription;
    productionLine.intLevel = r.intLevel;
    productionLine.txtGUID = r.txtGUID;
}
//=======================
// ASSIGN EDIT PRODUCT FORM
//=======================
function setupDataProductionLineEditForm() {
    $txtProductionLineCode.val(productionLine.txtProductionLineCode);
    $txtProductionLineDescription.val(productionLine.txtProductionLineDescription);
    $intLevel.val(productionLine.intLevel)
}

//=======================
// EVENT LISTENER
//=======================
$btnNext.bind('click', () => {
    if (pageProductionLine.hasNext) {
        getAllProductionLine(pageProductionLine.page + 1, cari);
    }
})

$btnPrev.bind('click', () => {
    if (pageProductionLine.hasPrevious) {
        getAllProductionLine(pageProductionLine.page - 1, cari);
    }
})
$btnAddProductionLine.bind('click', () => {
    $.switchElement(elementToSwitch, 0);
    iniitializeData();
})
$btnCancelAddProductionLine.bind('click', () => {
    $.switchElement(elementToSwitch, 1);
    $productionLineFormTitle.text = "Add ProductionLine";
})
$btnSave.bind('click', () => {
    setupDataProductionLine();
    $.confirmMessage("Confirm", "Save Production Line?", "Ya Save", saveProductionLine);
})

function searchProductionLine() {
    pageProductionLine.page = 1;
    getAllProductionLine(pageProductionLine.page, cari);
}

