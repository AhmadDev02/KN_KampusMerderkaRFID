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
let materialChangeOver = {};
let txtGUID = $("#txtGUID").val()
let __RequestVerificationToken = $('#frm input[name=__RequestVerificationToken]').val()
let headerData = {};
headerData.__RequestVerificationToken = __RequestVerificationToken;
let elementToSwitch = [$("#materialChangeOverFormRow"), $("#materialChangeOverTableRow")];
let $materialChangeOverFormTitle = $("#materialChangeOverFormTitle");

//=======================
// ALL BUTTON
//=======================
let $btnPrev = $("#btnPrev");
let $btnNext = $("#btnNext");
let $btnSave = $("#btnSave");
let $btnAddProductionLineChangeOverDetail = $("#btnAddProductionLineChangeOverDetail");
let $btnCancelAddProductionLineChangeOverDetail = $("#btnCancelAddProductionLineChangeOverDetail");
//=======================
// FORM 
//=======================
let $txtProductionLineChangeOverDetailCode = $("#txtProductionLineChangeOverDetailCode");
let $txtProductionLineChangeOverDetailDescription = $("#txtProductionLineChangeOverDetailDescription");
let $intLevel = $("#intLevel");

function initializePage() {
    page = 1;
    cari = "";
    pageProductionLineChangeOverDetail = {};
    pageProductionLineChangeOverDetail.page = 1;
    pageProductionLineChangeOverDetail.hasContent = false;
    pageProductionLineChangeOverDetail.hasNext = false;
    pageProductionLineChangeOverDetail.hasPrevious = false;
    api = "/Master/ProductionLineChangeOverDetail";
    user = {};
    txtGUID = $("#txtGUID").val()
    __RequestVerificationToken = $('#frm input[name=__RequestVerificationToken]').val()
    headerData = {};
    headerData.__RequestVerificationToken = __RequestVerificationToken;
    setButtonNextPrvVisibility();
    iniitializeData();
}
initializePage();
getAllProductionLineChangeOverDetail(pageProductionLineChangeOverDetail.page, cari);
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
        materialChangeOver = response.objData;
        setupAddProductionLineChangeOverDetailForm();
        $materialChangeOverFormTitle.text = "Add ProductionLineChangeOverDetail";
    }, errorHandle, headerData);
}

function setupAddProductionLineChangeOverDetailForm() {
    $txtProductionLineChangeOverDetailCode.val(materialChangeOver.txtProductionLineChangeOverDetailCode);
    $txtProductionLineChangeOverDetailDescription.val(materialChangeOver.txtProductionLineChangeOverDetailDescription);
    $intLevel.val(materialChangeOver.intLevel);
}

//=======================
// AJAX REQUEST GET ALL PRODUCT
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
            $("#tbody").append("<tr><td colspan='5'><center><span class='text-muted'>No Data <a class='refresh' href=''>Refresh</a> </span></center></td></tr>");
        },
        headerData
    )
}
//=======================
// AJAX REQUEST SAVE PRODUCT
//=======================
function saveProductionLineChangeOverDetail() {
    $.postApi(api + "/Save",
        materialChangeOver,
        function (response) {
            iniitializeData();
            $.switchElement(elementToSwitch, 1);
            $.successMessage("Sukses", "Berhasil menyimpan materialChangeOver");
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
            let $btnEdit = `<button class=' btn btn-outline-warning btnEdit ' data-materialchangeover='` + JSON.stringify(m) + `'> <i class='fa fa-edit'></i> Edit</button>`;
            let row = "<tr id='intProductionLineChangeOverDetailID" + m.intProductionLineChangeOverDetailID + "'>" +
                "<td class='text-center'>" + m.intProductionLineChangeOverDetailID + "</td>" +
                "<td class='text-center'>" + m.txtProductionLineChangeOverDetailCode + "</td>" +
                "<td class='text-center'>" + m.txtProductionLineChangeOverDetailDescription + "</td>" +
                "<td class='text-center'>" + m.intLevel + "</td>" +
                "<td class='text-center'>" +
                $btnEdit +
                "</td>" +
                "</tr>";
            $("#tbody").append(row);
        }
        $(".btnEdit").on('click', function () {
            let r = $(this).data('materialchangeover');
            setupDataProductionLineChangeOverDetailEdit(r);
            setupDataProductionLineChangeOverDetailEditForm();
            $.switchElement(elementToSwitch, 0);
            $materialChangeOverFormTitle.text = "Edit Material Change Over";
        })

    } else {
        $("#tbody").append("<tr><td colspan='5'><center><span class='text-muted'>No Data <a class='refresh' href=''>Refresh</a> </span></center></td></tr>");
    }
    setButtonNextPrvVisibility();
}
//=======================
// ASSIGN PRODUCT SAVE
//=======================
function setupDataProductionLineChangeOverDetail() {
    materialChangeOver.txtProductionLineChangeOverDetailCode = $txtProductionLineChangeOverDetailCode.val().toString();
    materialChangeOver.txtProductionLineChangeOverDetailDescription = $txtProductionLineChangeOverDetailDescription.val().toString();
    materialChangeOver.intLevel = parseInt($intLevel.val().toString());
}
//=======================
// ASSIGN EDIT PRODUCT
//=======================
function setupDataProductionLineChangeOverDetailEdit(r) {
    materialChangeOver.intProductionLineChangeOverDetailID = r.intProductionLineChangeOverDetailID;
    materialChangeOver.txtProductionLineChangeOverDetailCode = r.txtProductionLineChangeOverDetailCode;
    materialChangeOver.txtProductionLineChangeOverDetailDescription = r.txtProductionLineChangeOverDetailDescription;
    materialChangeOver.intLevel = r.intLevel;
    materialChangeOver.txtGUID = r.txtGUID;
}
//=======================
// ASSIGN EDIT PRODUCT FORM
//=======================
function setupDataProductionLineChangeOverDetailEditForm() {
    $txtProductionLineChangeOverDetailCode.val(materialChangeOver.txtProductionLineChangeOverDetailCode);
    $txtProductionLineChangeOverDetailDescription.val(materialChangeOver.txtProductionLineChangeOverDetailDescription);
    $intLevel.val(materialChangeOver.intLevel)
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
    $materialChangeOverFormTitle.text = "Add Material Change Over";
})
$btnSave.bind('click', () => {
    setupDataProductionLineChangeOverDetail();
    $.confirmMessage("Confirm", "Save Material Change Over?", "Ya Save", saveProductionLineChangeOverDetail);
})

function searchProductionLineChangeOverDetail() {
    pageProductionLineChangeOverDetail.page = 1;
    getAllProductionLineChangeOverDetail(pageProductionLineChangeOverDetail.page, cari);
}

