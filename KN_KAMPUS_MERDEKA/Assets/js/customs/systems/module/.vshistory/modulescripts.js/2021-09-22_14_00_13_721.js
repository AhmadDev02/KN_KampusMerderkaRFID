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
let $bitSuperuser = $("#bitSuperuser");

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
    $txtModuleName.val(module.$txtModuleName);
    $bitSuperuser.prop('checked', module.bitSuperuser);
}

//=======================
// AJAX REQUEST GET ALL ROLE
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
// AJAX REQUEST SAVE USER
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
            var r = pageModule.content[i];
            let $btnEdit = `<button class='btnEdit  btn btn-outline-warning float-right m-1' data-module='` + JSON.stringify(r) + `'> <i class='fa fa-edit'></i> Edit</button>`;
            let row = "<tr id='intModuleID" + r.intModuleID + "'>" +
                "<td class='text-center'>" + r.intModuleID + "</td>" +
                "<td class='text-center'>" + r.txtModuleName + "</td>" +
                "<td class='text-center'>" + r.bitSuperuser + "</td>" +
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
    module.bitSuperuser = $bitSuperuser.is(":checked");
}
//=======================
// ASSIGN EDIT ROLE
//=======================
function setupDataModuleEdit(r) {
    module.intModuleID = r.intModuleID;
    module.txtModuleName = r.txtModuleName;
    module.bitSuperuser = r.bitSuperuser;
}
//=======================
// ASSIGN EDIT ROLE FORM
//=======================
function setupDataModuleEditForm() {
    $txtModuleName.val(module.txtModuleName);
    $bitSuperuser.prop('checked', module.bitSuperuser);
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

