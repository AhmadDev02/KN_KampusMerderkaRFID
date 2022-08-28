//=======================
// INITIALIZE DATA
//=======================
var cariUserRole = '';
let pageUserRole = {};
pageUserRole.page = 1;
pageUserRole.hasContent = false;
pageUserRole.hasNext = false;
pageUserRole.hasPrevious = false;
let apiUserRole = "/System/UserRole";
let __RequestVerificationTokenUserRole = $('#frm input[name=__RequestVerificationToken]').val()
let headerDataUserRole = {};
headerDataUserRole.__RequestVerificationToken = __RequestVerificationTokenUserRole;
let elementToSwitchUserRole = [$("#userRoleFormRow"), $("#userRoleTableRow")];
let $userRoleFormTitle = $("#roleAccessTitleFormAdd");
let intRoleIDUserRole = 0;
let userSelected = null;
let userRoleData = null;
let $txtSelectedRoleName = $("#txtSelectedRoleName")
let selectedRole = null;
$(function () {
    initilizePageUserRole();
})
//=======================
// ALL BUTTON
//=======================
let $btnPrevUserRole = $("#btnPrevUserRole");
let $btnNextUserRole = $("#btnNextUserRole");
let $btnCancelAddUserRole = $("#btnCancelAddUserRole");
let $btnAddUserRole = $("#btnAddUserRole");
let $btnClearSelectRole = $("#btnClearSelectRole");
let $btnSelectRole = $("#btnSelectRole");
let $btnSaveUserRole = $("#btnSaveUserRole");
//=======================
// INITIALIZE PAGE
//=======================
function initilizePageUserRole() {
    cariUserRole = '';
    pageUserRole = {};
    pageUserRole.page = 1;
    pageUserRole.hasContent = false;
    pageUserRole.hasNext = false;
    pageUserRole.hasPrevious = false;
    __RequestVerificationTokenUserRole = $('#frm input[name=__RequestVerificationToken]').val()
    headerDataUserRole = {};
    headerDataUserRole.__RequestVerificationToken = __RequestVerificationTokenUserRole;
    elementToSwitchUserRole = [$("#userRoleFormRow"), $("#userRoleTableRow")];
    $userRoleFormTitle = $("#roleAccessTitleFormAdd");
    intRoleIDUserRole = 0;
    userRole = null;
    iniitializeDataUserRole();
    setupAddUserRoleForm();
}

//=======================
// AJAX ERROR HANDLER
//=======================
function errorHandleUserRole(error) {
    $.errorMessage("Error", error.responseJSON.txtMessage)
}
//=======================
// INITIALIZE DATA USER ROLE
//=======================
function iniitializeDataUserRole() {
    $.postApi(apiUserRole + "/InitiateData", null, function (response) {
        userRoleData = response.objData;
        setupAddUserRoleForm();
    }, errorHandleUserRole, headerDataUserRole);
}
//=======================
// INITIALIZE DATA USER ROLE
//=======================
function setupAddUserRoleForm() {
    if (selectedRole != null) {
        $txtSelectedRoleName.val(selectedRole.txtRoleName)
    } else {
        $txtSelectedRoleName.val("Select  Role")
    }

}

//=======================
// AJAX REQUEST SAVE USER ROLE
//=======================
function saveUserRole() {
    $.postApi(apiUserRole + "/Save",
        userRoleData,
        function (response) {
            iniitializeData();
            $.switchElement(elementToSwitchUserRole, 1);
            $.successMessage("Sukses", "Berhasil menyimpan role access");
            getAllUserRoleByUser(pageUserRole.page)
        },
        function (e) {
            $.errorMessage("Failed", e.responseJSON.txtMessage);
        },
        headerDataUserRole
    )
}
//=======================
// AJAX REQUEST GET ALL USER ROLE BY ROLE
//=======================
function getAllUserRoleByUser(x) {
    $.postApi(apiUserRole + "/getAllByUser",
        {
            intUserId: userSelected.intUserID,
            page: x,
            cari: cariUserRole,
            size: 5
        },
        function (response) {
            pageUserRole = response.objData;
            fillTableDataUserRole();
        },
        function (e) {
            $.errorMessage("Failed", e.responseJSON.txtMessage);
        },
        headerDataUserRole
    )
}
//=======================
// AJAX REQUEST DELETE USER ROLE
//=======================
function deleteUserRole(x) {
    $.postApi(apiUserRole + "/Delete",
        {
            id: x.intUserRoleID
        }
        ,
        function (response) {
            getAllUserRoleByUser(pageUserRole.page)
        },
        function (e) {
            $.errorMessage("Failed", e.responseJSON.txtMessage);
        },
        headerDataUserRole
    )
}
//=======================
// FILL TABLE DATA
//=======================
function fillTableDataUserRole() {
    $("#tbodyUserRole").html("");
    if (pageUserRole.hasContent) {
        for (let i = 0; i < pageUserRole.content.length; i++) {
            var r = pageUserRole.content[i];
            let $btnDeleteUserRole = `<button class='btnDeleteUserRole  btn btn-outline-danger float-right m-1' data-user-role='` + JSON.stringify(r) + `'> <i class='fa fa-trash'></i> Delete</button>`;
            let row = "<tr id='intUserRoleID" + r.intUserRoleID + "'>" +
                "<td class='text-center'>" + r.intUserRoleID + "</td>" +
                "<td class='text-center'>" + r.role.txtRoleName + "</td>" +
                "<td class='text-center'>" +
                $btnDeleteUserRole
            "</td>" +
                "</tr>";
            $("#tbodyUserRole").append(row);
        }
        $(".btnDeleteUserRole").on('click', function () {
            var r = $(this).data('user-role');
            $.confirmMessage('Delete', 'Apakah anda yakin', 'Ya, Delete', function () {
                deleteUserRole(r)
            });
        })
    } else {
        $("#tbodyUserRole").append("<tr><td colspan='3'><center><span class='text-muted'>No Data <a class='refresh' href=''>Refresh</a> </span></center></td></tr>");
    }
    setButtonNextPrvVisibilityUserRole();
}

function setButtonNextPrvVisibilityUserRole() {
    if (pageUserRole.hasNext) {
        $btnNextUserRole.show();
    } else {
        $btnNextUserRole.hide();
    }
    if (pageUserRole.hasPrevious) {
        $btnPrevUserRole.show()
    } else {
        $btnPrevUserRole.hide();
    }
}
//=======================
// GET SELECTED MODULE
//=======================
function getSelectedUser(x) {
    selectedRole = x;
    setupAddUserRoleForm();
}
//=======================
// ASSIGN USER ROLE SAVE
//=======================
function setupDataUserRole() {
    userRoleData.intRoleID = selectedRole.intRoleID;
    userRoleData.intUserID = userSelected.intUserID;
}
//=======================
// EVENT LISTENER
//=======================
$btnNextUserRole.bind('click', () => {
    if (pageUserRole.hasNext) {
        getAllUserRoleByUser(pageUserRole.page + 1);
    }
})

$btnPrevUserRole.bind('click', () => {
    if (pageUserRole.hasPrevious) {
        getAllUserRoleByUser(pageUserRole.page - 1);
    }
})
$btnCancelAddUserRole.bind('click', () => {
    $.switchElement(elementToSwitchUserRole, 1);
    $userRoleFormTitle.text("");
    selectedRole = null;
    initilizePageUserRole();
    getAllUserRoleByUser(pageUserRole.page);
})
$btnAddUserRole.bind('click', () => {
    $.switchElement(elementToSwitchUserRole, 0);
    $userRoleFormTitle.text(userSelected.txtRoleName);
    iniitializeDataUserRole();
})
$btnSelectRole.bind('click', () => {
    $.showLOV("Role");
})
$btnSaveUserRole.bind('click', function () {
    if (userRoleData != null && selectedRole != null) {
        setupDataUserRole();
        console.log(userRoleData)
        $.confirmMessage("Save", "Apakah anda yakin", "Ya", saveUserRole)
    }
})