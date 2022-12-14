//=======================
// INITIALIZE DATA
//=======================
var cariRoleAccess = '';
let pageRoleAccess = {};
pageRoleAccess.page = 1;
pageRoleAccess.hasContent = false;
pageRoleAccess.hasNext = false;
pageRoleAccess.hasPrevious = false;
let apiRoleAccess = "/System/RoleAccess";
let __RequestVerificationTokenRoleAccess = $('#frm input[name=__RequestVerificationToken]').val()
let headerDataRoleAccess = {};
headerDataRoleAccess.__RequestVerificationToken = __RequestVerificationTokenRoleAccess;
let elementToSwitchRoleAccess = [$("#roleAccessFormRow"), $("#roleAccessTableRow")];
let $roleAccessFormTitle = $("#roleAccessTitleFormAdd");
let intRoleIDRoleAccess = 0;
let roleParent = null;
let roleAccess = {};
let $txtSelectedModuleName = $("#txtSelectedModuleName")
let selectedModule = null;
$(function () {
    initilizePageRoleAccess();
})
//=======================
// ALL BUTTON
//=======================
let $btnPrevRoleAccess = $("#btnPrevRoleAccess");
let $btnNextRoleAccess = $("#btnNextRoleAccess");
let $btnCancelAddRoleAccess = $("#btnCancelAddRoleAccess");
let $btnAddRoleAccess = $("#btnAddRoleAccess");
let $btnClearSelectModule = $("#btnClearSelectModule");
let $btnSelectModule = $("#btnSelectModule");
let $btnSaveRoleAccess = $("#btnSaveRoleAccess");
//=======================
// INITIALIZE PAGE
//=======================
function initilizePageRoleAccess() {
    cariRoleAccess = '';
    pageRoleAccess = {};
    pageRoleAccess.page = 1;
    pageRoleAccess.hasContent = false;
    pageRoleAccess.hasNext = false;
    pageRoleAccess.hasPrevious = false;
    __RequestVerificationTokenRoleAccess = $('#frm input[name=__RequestVerificationToken]').val()
    headerDataRoleAccess = {};
    headerDataRoleAccess.__RequestVerificationToken = __RequestVerificationTokenRoleAccess;
    elementToSwitchRoleAccess = [$("#roleAccessFormRow"), $("#roleAccessTableRow")];
    $roleAccessFormTitle = $("#roleAccessTitleFormAdd");
    intRoleIDRoleAccess = 0;
    roleAccess = {};
    iniitializeDataRoleAccess();
    setupAddRoleAccessForm();
}

//=======================
// AJAX ERROR HANDLER
//=======================
function errorHandleRoleAccess(error) {
    $.errorMessage("Error", error.responseJSON.txtMessage)
}
//=======================
// INITIALIZE DATA ROLE ACCESS
//=======================
function iniitializeDataRoleAccess() {
    $.postApi(apiRoleAccess + "/InitiateData", null, function (response) {
        roleAccess = response.objData;
        setupAddRoleForm();
    }, errorHandleRoleAccess, headerDataRoleAccess);
}
//=======================
// INITIALIZE DATA ROLE ACCESS
//=======================
function setupAddRoleAccessForm() {
    if (selectedModule != null) {
        $txtSelectedModuleName.val(selectedModule.txtModuleName)
    } else {
        $txtSelectedModuleName.val("Select  Module")
    }
    
}

//=======================
// AJAX REQUEST SAVE ROLE ACCESS
//=======================
function saveRole() {
    $.postApi(apiRoleAccess + "/Save",
        role,
        function (response) {
            iniitializeData();
            $.switchElement(elementToSwitchRoleAccess, 1);
            $.successMessage("Sukses", "Berhasil menyimpan role access");
            getAllRoleAccessByRole(pageRoleAccess.page)
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
// AJAX REQUEST GET ALL ROLE ACCESS BY ROLE
//=======================
function getAllRoleAccessByRole(x) {
    $.postApi(apiRoleAccess + "/getAllByRole",
        {
            intRoleID: roleParent.intRoleID,
            page: x,
            cari: cariRoleAccess,
            size: 5
        },
        function (response) {
            pageRoleAccess = response.objData;
            fillTableDataRoleAccess();
        },
        function (e) {
            $.errorMessage("Failed", e.responseJSON.txtMessage);
        },
        headerDataRoleAccess
    )
}

//=======================
// FILL TABLE DATA
//=======================
function fillTableDataRoleAccess() {
    $("#tbodyRoleAccess").html("");
    if (pageRoleAccess.hasContent) {
        for (let i = 0; i < pageRoleAccess.content.length; i++) {
            var r = pageRoleAccess.content[i];
            let row = "<tr id='intRoleAccessID" + r.intRoleAccessID + "'>" +
                "<td class='text-center'>" + r.intRoleAccessID + "</td>" +
                "<td class='text-center'>" + r.module.txtModuleName + "</td>" +
                "<td class='text-center'>" +

                "</td>" +
                "</tr>";
            $("#tbodyRoleAccess").append(row);
        }
    } else {
        $("#tbodyRoleAccess").append("<tr><td colspan='3'><center><span class='text-muted'>No Data <a class='refresh' href=''>Refresh</a> </span></center></td></tr>");
    }
    setButtonNextPrvVisibilityRoleAccess();
}

function setButtonNextPrvVisibilityRoleAccess() {
    if (pageRoleAccess.hasNext) {
        $btnNextRoleAccess.show();
    } else {
        $btnNextRoleAccess.hide();
    }
    if (pageRoleAccess.hasPrevious) {
        $btnPrevRoleAccess.show()
    } else {
        $btnPrevRoleAccess.hide();
    }
}
//=======================
// GET SELECTED MODULE
//=======================
function getSelectedModule(x) {
    selectedModule = x;
    setupAddRoleAccessForm();
}
//=======================
// EVENT LISTENER
//=======================
$btnNextRoleAccess.bind('click', () => {
    if (pageRoleAccess.hasNext) {
        getAllRoleAccessByRole( pageRoleAccess.page + 1);
    }
})

$btnPrevRoleAccess.bind('click', () => {
    if (pageRoleAccess.hasPrevious) {
        getAllRoleAccessByRole(pageRoleAccess.page - 1);
    }
})
$btnCancelAddRoleAccess.bind('click', () => {
    $.switchElement(elementToSwitchRoleAccess, 1);
    $roleAccessFormTitle.text("");
    selectedModule = null;
    initilizePageRoleAccess();
})
$btnAddRoleAccess.bind('click', () => {
    $.switchElement(elementToSwitchRoleAccess, 0);
    console.log(roleParent.txtRoleName)
    $roleAccessFormTitle.text(roleParent.txtRoleName);
})
$btnSelectModule.bind('click', () => {
    $.showLOV("Module");
})
$btnSaveRoleAccess.bind('click', function () {

})