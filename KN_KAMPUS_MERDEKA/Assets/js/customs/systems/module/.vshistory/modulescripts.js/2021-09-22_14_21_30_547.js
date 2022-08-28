//=======================
// INITIALIZE DATA
//=======================
var cari = '';
let pageModule = {};
pageModule.page = 1;
pageModule.hasContent = false;
pageModule.hasNext = false;
pageModule.hasPrevious = false;
let api = "/System/Module";
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
let $btnAddModule = $("#btnAddModule");
let $btnCancelAddModule = $("#btnCancelAddModule");
//=======================
// FORM ROLE
//=======================
let $txtModuleName = $("#txtModuleName");
let $txtDescription = $("#txtDescription");

function initializePage() {
    page = 1;
    cari = "";
    pageModule = {};
    pageModule.page = 1;
    pageModule.hasContent = false;
    pageModule.hasNext = false;
    pageModule.hasPrevious = false;
    api = "/System/Module";
    user = {};
    txtGUID = $("#txtGUID").val()
    __RequestVerificationToken = $('#frm input[name=__RequestVerificationToken]').val()
    headerData = {};
    headerData.__RequestVerificationToken = __RequestVerificationToken;
    setButtonNextPrvVisibility();
    iniitializeData();
}
initializePage();
getAllModule(pageModule.page, cari);
function setButtonNextPrvVisibility() {
    if (pageModule.hasNext) {
        $btnNext.show();
    } else {
        $btnNext.hide();
    }
    if (pageModule.hasPrevious) {
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
        setupAddModuleForm();
        $moduleFormTitle.text = "Add Module";
    }, errorHandle, headerData);
}

function setupAddModuleForm() {
    $txtModuleName.val(module.txtModuleName);
    $txtDescription.val(module.txtDescription);
}

//=======================
// AJAX REQUEST GET ALL MODULE
//=======================
function getAllModule(x, y) {
    $.postApi(api + "/getAllModule",
        {
            page: x,
            cari: y,
            size: 20
        },
        function (response) {
            pageModule = response.objData;
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
function saveModule() {
    $.postApi(api + "/Save",
        module,
        function (response) {
            iniitializeData();
            $.switchElement(elementToSwitch, 1);
            $.successMessage("Sukses", "Berhasil menyimpan module");
            getAllModule(0, cari)
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
    if (pageModule.hasContent) {
        for (let i = 0; i < pageModule.content.length; i++) {
            var m = pageModule.content[i];
            let $btnEdit = `<button class=' btn btn-outline-warning btnEdit ' data-module='` + JSON.stringify(m) + `'> <i class='fa fa-edit'></i> Edit</button>`;
            let row = "<tr id='intModuleID" + m.intModuleID + "'>" +
                "<td class='text-center'>" + m.intModuleID + "</td>" +
                "<td class='text-center'>" + m.txtModuleName + "</td>" +
                "<td class='text-center'>" + m.txtDescription + "</td>" +
                "<td class='text-center'>" +
                $btnEdit +
                "</td>" +
                "</tr>";
            $("#tbody").append(row);
        }
        $(".btnEdit").on('click', function () {
            let r = $(this).data('module');
            setupDataModuleEdit(r);
            setupDataModuleEditForm();
            $.switchElement(elementToSwitch, 0);
            $moduleFormTitle.text = "Edit Modules";
        })

    } else {
        $("#tbody").append("<tr><td colspan='4'><center><span class='text-muted'>No Data <a class='refresh' href=''>Refresh</a> </span></center></td></tr>");
    }
    setButtonNextPrvVisibility();
}
//=======================
// ASSIGN ROLE SAVE
//=======================
function setupDataModule() {
    module.txtModuleName = $txtModuleName.val().toString();
    module.txtDescription = $txtDescription.val().toString();
}
//=======================
// ASSIGN EDIT MODULE
//=======================
function setupDataModuleEdit(r) {
    module.intModuleID = r.intModuleID;
    module.txtModuleName = r.txtModuleName;
    module.txtDescription = r.txtDescription;
    module.txtGUID = r.txtGUID;
}
//=======================
// ASSIGN EDIT MODULE FORM
//=======================
function setupDataModuleEditForm() {
    $txtModuleName.val(module.txtModuleName);
    $txtDescription.val(module.txtDescription);
}

//=======================
// EVENT LISTENER
//=======================
$btnNext.bind('click', () => {
    if (pageModule.hasNext) {
        getAllModule(pageModule.page + 1, cari);
    }
})

$btnPrev.bind('click', () => {
    if (pageModule.hasPrevious) {
        getAllModule(pageModule.page - 1, cari);
    }
})
$btnAddModule.bind('click', () => {
    $.switchElement(elementToSwitch, 0);
    iniitializeData();
})
$btnCancelAddModule.bind('click', () => {
    $.switchElement(elementToSwitch, 1);
    $moduleFormTitle.text = "Add Module";
})
$btnSave.bind('click', () => {
    setupDataModule();
    $.confirmMessage("Confirm", "Save Module?", "Ya Save", saveModule);
})

function searchModule() {
    pageModule.page = 1;
    getAllModule(pageModule.page, cari);
}

