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


//=======================
// ALL BUTTON
//=======================
let $btnPrevRoleAccess = $("#btnPrevRoleAccess");
let $btnNextRoleAccess = $("#btnNextRoleAccess");
let $btnCancelAddRoleAccess = $("#btnCancelAddRoleAccess");
let $btnAddRoleAccess = $("#btnAddRoleAccess");
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
    roleParent = null;
    roleAccess = {};
}

//=======================
// AJAX ERROR HANDLER
//=======================
function errorHandle(error) {
    $.errorMessage("Error", error.responseJSON.txtMessage)
}
//=======================
// INITIALIZE DATA ROLE ACCESS
//=======================
function iniitializeDataRoleAccess() {
    $.postApi(apiRoleAccess + "/InitiateData", null, function (response) {
        roleAccess = response.objData;
        setupAddRoleForm();
    }, function(, headerDataRoleAccess);
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

})
$btnAddRoleAccess.bind('click', () => {
    $.switchElement(elementToSwitchRoleAccess, 0);
    console.log(roleParent.txtRoleName)
    $roleAccessFormTitle.text(roleParent.txtRoleName);
})
