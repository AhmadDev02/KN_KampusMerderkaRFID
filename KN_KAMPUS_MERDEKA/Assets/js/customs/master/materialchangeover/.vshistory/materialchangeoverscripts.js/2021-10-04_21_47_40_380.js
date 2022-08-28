//=======================
// INITIALIZE DATA
//=======================
var cari = '';
let pageMaterialChangeOver = {};
pageMaterialChangeOver.page = 1;
pageMaterialChangeOver.hasContent = false;
pageMaterialChangeOver.hasNext = false;
pageMaterialChangeOver.hasPrevious = false;
let api = "/Master/MaterialChangeOver";
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
let $btnAddMaterialChangeOver = $("#btnAddMaterialChangeOver");
let $btnCancelAddMaterialChangeOver = $("#btnCancelAddMaterialChangeOver");
//=======================
// FORM 
//=======================
let $txtMaterialChangeOverCode = $("#txtMaterialChangeOverCode");
let $txtMaterialChangeOverDescription = $("#txtMaterialChangeOverDescription");
let $intLevel = $("#intLevel");

function initializePage() {
    page = 1;
    cari = "";
    pageMaterialChangeOver = {};
    pageMaterialChangeOver.page = 1;
    pageMaterialChangeOver.hasContent = false;
    pageMaterialChangeOver.hasNext = false;
    pageMaterialChangeOver.hasPrevious = false;
    api = "/Master/MaterialChangeOver";
    user = {};
    txtGUID = $("#txtGUID").val()
    __RequestVerificationToken = $('#frm input[name=__RequestVerificationToken]').val()
    headerData = {};
    headerData.__RequestVerificationToken = __RequestVerificationToken;
    setButtonNextPrvVisibility();
    iniitializeData();
}
initializePage();
getAllMaterialChangeOver(pageMaterialChangeOver.page, cari);
function setButtonNextPrvVisibility() {
    if (pageMaterialChangeOver.hasNext) {
        $btnNext.show();
    } else {
        $btnNext.hide();
    }
    if (pageMaterialChangeOver.hasPrevious) {
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
        setupAddMaterialChangeOverForm();
        $materialChangeOverFormTitle.text = "Add MaterialChangeOver";
    }, errorHandle, headerData);
}

function setupAddMaterialChangeOverForm() {
    $txtMaterialChangeOverCode.val(materialChangeOver.txtMaterialChangeOverCode);
    $txtMaterialChangeOverDescription.val(materialChangeOver.txtMaterialChangeOverDescription);
    $intLevel.val(materialChangeOver.intLevel);
}

//=======================
// AJAX REQUEST GET ALL PRODUCT
//=======================
function getAllMaterialChangeOver(x, y) {
    $.postApi(api + "/getAllMaterialChangeOver",
        {
            page: x,
            cari: y,
            size: 20
        },
        function (response) {
            pageMaterialChangeOver = response.objData;
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
function saveMaterialChangeOver() {
    $.postApi(api + "/Save",
        materialChangeOver,
        function (response) {
            iniitializeData();
            $.switchElement(elementToSwitch, 1);
            $.successMessage("Sukses", "Berhasil menyimpan materialChangeOver");
            getAllMaterialChangeOver(0, cari)
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
    if (pageMaterialChangeOver.hasContent) {
        for (let i = 0; i < pageMaterialChangeOver.content.length; i++) {
            var m = pageMaterialChangeOver.content[i];
            let $btnEdit = `<button class=' btn btn-outline-warning btnEdit ' data-materialchangeover='` + JSON.stringify(m) + `'> <i class='fa fa-edit'></i> Edit</button>`;
            let row = "<tr id='intMaterialChangeOverID" + m.intMaterialChangeOverID + "'>" +
                "<td class='text-center'>" + m.intMaterialChangeOverID + "</td>" +
                "<td class='text-center'>" + m.txtMaterialChangeOverCode + "</td>" +
                "<td class='text-center'>" + m.txtMaterialChangeOverDescription + "</td>" +
                "<td class='text-center'>" + m.intLevel + "</td>" +
                "<td class='text-center'>" +
                $btnEdit +
                "</td>" +
                "</tr>";
            $("#tbody").append(row);
        }
        $(".btnEdit").on('click', function () {
            let r = $(this).data('materialchangeover');
            setupDataMaterialChangeOverEdit(r);
            setupDataMaterialChangeOverEditForm();
            $.switchElement(elementToSwitch, 0);
            $materialChangeOverFormTitle.text = "Edit MaterialChangeOvers";
        })

    } else {
        $("#tbody").append("<tr><td colspan='5'><center><span class='text-muted'>No Data <a class='refresh' href=''>Refresh</a> </span></center></td></tr>");
    }
    setButtonNextPrvVisibility();
}
//=======================
// ASSIGN PRODUCT SAVE
//=======================
function setupDataMaterialChangeOver() {
    materialChangeOver.txtMaterialChangeOverCode = $txtMaterialChangeOverCode.val().toString();
    materialChangeOver.txtMaterialChangeOverDescription = $txtMaterialChangeOverDescription.val().toString();
    materialChangeOver.intLevel = parseInt($intLevel.val().toString());
}
//=======================
// ASSIGN EDIT PRODUCT
//=======================
function setupDataMaterialChangeOverEdit(r) {
    materialChangeOver.intMaterialChangeOverID = r.intMaterialChangeOverID;
    materialChangeOver.txtMaterialChangeOverCode = r.txtMaterialChangeOverCode;
    materialChangeOver.txtMaterialChangeOverDescription = r.txtMaterialChangeOverDescription;
    materialChangeOver.intLevel = r.intLevel;
    materialChangeOver.txtGUID = r.txtGUID;
}
//=======================
// ASSIGN EDIT PRODUCT FORM
//=======================
function setupDataMaterialChangeOverEditForm() {
    $txtMaterialChangeOverCode.val(materialChangeOver.txtMaterialChangeOverCode);
    $txtMaterialChangeOverDescription.val(materialChangeOver.txtMaterialChangeOverDescription);
    $intLevel.val(materialChangeOver.intLevel)
}

//=======================
// EVENT LISTENER
//=======================
$btnNext.bind('click', () => {
    if (pageMaterialChangeOver.hasNext) {
        getAllMaterialChangeOver(pageMaterialChangeOver.page + 1, cari);
    }
})

$btnPrev.bind('click', () => {
    if (pageMaterialChangeOver.hasPrevious) {
        getAllMaterialChangeOver(pageMaterialChangeOver.page - 1, cari);
    }
})
$btnAddMaterialChangeOver.bind('click', () => {
    $.switchElement(elementToSwitch, 0);
    iniitializeData();
})
$btnCancelAddMaterialChangeOver.bind('click', () => {
    $.switchElement(elementToSwitch, 1);
    $materialChangeOverFormTitle.text = "Add MaterialChangeOver";
})
$btnSave.bind('click', () => {
    setupDataMaterialChangeOver();
    $.confirmMessage("Confirm", "Save MaterialChangeOver?", "Ya Save", saveMaterialChangeOver);
})

function searchMaterialChangeOver() {
    pageMaterialChangeOver.page = 1;
    getAllMaterialChangeOver(pageMaterialChangeOver.page, cari);
}

