//=======================
// INITIALIZE DATA
//=======================
var cari = '';
let pageRole = {};
pageRole.page = 1;
pageRole.hasContent = false;
pageRole.hasNext = false;
pageRole.hasPrevious = false;
let api = "/System/Role";
let role = {};
let txtGUID = $("#txtGUID").val()
let __RequestVerificationToken = $('#frm input[name=__RequestVerificationToken]').val()
let headerData = {};
headerData.__RequestVerificationToken = __RequestVerificationToken;
let elementToSwitch = [$("#roleFormRow"), $("#roleTableRow")];
let $userFormTitle = $("#roleFormTitle");

//=======================
// ALL BUTTON
//=======================
let $btnPrev = $("#btnPrev");
let $btnNext = $("#btnNext");
let $btnSave = $("#btnSave");
let $btnAddRole = $("#btnAddRole");
let $btnCancelAddUser = $("#btnCancelAddRole");
//=======================
// FORM ROLE
//=======================
let $txtRoleName = $("#txtUsername");
let $bitSuperuser = $("#bitSuperuser");

function initializePage() {
    page = 1;
    cari = "";
    pageRole = {};
    pageRole.page = 1;
    pageRole.hasContent = false;
    pageRole.hasNext = false;
    pageRole.hasPrevious = false;
    api = "/System/Role";
    user = {};
    txtGUID = $("#txtGUID").val()
    __RequestVerificationToken = $('#frm input[name=__RequestVerificationToken]').val()
    headerData = {};
    headerData.__RequestVerificationToken = __RequestVerificationToken;
    setButtonNextPrvVisibility();
    iniitializeData();
}
initializePage();
getAllRole(pageRole.page, cari);
function setButtonNextPrvVisibility() {
    if (pageRole.hasNext) {
        $btnNext.show();
    } else {
        $btnNext.hide();
    }
    if (pageRole.hasPrevious) {
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
        role = response.objData;
        setupAddRoleForm();
        $roleFormTitle.text = "Add Role";
    }, errorHandle, headerData);
}

function setupAddRoleForm() {
    $txtUsername.val(role.$txtRoleName);
    $bitSuperuser.prop('checked', role.bitSuperuser);
}

//=======================
// AJAX REQUEST GET ALL ROLE
//=======================
function getAllRole(x, y) {
    $.postApi(api + "/getAllRole",
        {
            page: x,
            cari: y,
            size: 20
        },
        function (response) {
            pageRole = response.objData;
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
function saveRole() {
    $.postApi(api + "/Save",
        user,
        function (response) {
            iniitializeData();
            $.switchElement(elementToSwitch, 1);
            $.successMessage("Sukses", "Berhasil menyimpan role");
            getAllRole(0, cari)
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
    if (pageRole.hasContent) {
        for (let i = 0; i < pageRole.content.length; i++) {
            var r = pageRole.content[i];
            let $btnEdit = `<button class='btnEdit  btn btn-outline-warning float-right m-1' data-role='` + JSON.stringify(r) + `'> <i class='fa fa-edit'></i> Edit</button>`;
            let row = "<tr id='intRoleID" + r.intRoleID + "'>" +
                "<td class='text-center'>" + r.txtRoleName + "</td>" +
                "<td class='text-center'>" + r.bitSuperuser + "</td>" +
                "<td class='text-center'>" +
                $btnEdit +
                "</td>" +
                "</tr>";
            $("#tbody").append(row);
        }
        $(".btnEdit").on('click', function () {
            let r = $(this).data('role');
            setupDataRoleEdit(u);
            setupDataRoleEditForm();
            $.switchElement(elementToSwitch, 0);
            $userFormTitle.text = "Edit User";
        })

    } else {
        $("#tbody").append("<tr><td colspan='10'><center><span class='text-muted'>No Data <a class='refresh' href=''>Refresh</a> </span></center></td></tr>");
    }
    setButtonNextPrvVisibility();
}
//=======================
// ASSIGN USER SAVE
//=======================
function setupDataUser() {
    user.txtUserName = $txtUsername.val().toString();
    user.txtFullName = $txtFullname.val().toString();
    user.txtNick = $txtNick.val().toString();
    user.txtEmpID = $txtEmployeeID.val().toString();
    user.txtEmail = $txtEmail.val().toString();
    user.txtPassword = $txtPassword.val().toString();
    user.bitActive = $bitActive.is(":checked");
    user.bitUseActiveDirectory = $bitUseActiveDirectory.is(":checked");
}
//=======================
// ASSIGN EDIT USER
//=======================
function setupDataUserEdit(u) {
    user.intUserID = u.intUserID;
    user.txtUserName = u.txtUserName;
    user.txtFullName = u.txtFullName;
    user.txtNick = u.txtNick;
    user.txtEmpID = u.txtEmpID;
    user.txtEmail = u.txtEmail;
    user.txtPassword = u.txtPassword;
    user.bitActive = u.bitActive;
    user.bitUseActiveDirectory = u.bitUseActiveDirectory;
}
//=======================
// ASSIGN EDIT USER FORM
//=======================
function setupDataUserEditForm() {
    $txtUsername.val(user.txtUserName);
    $txtFullname.val(user.txtFullName);
    $txtNick.val(user.txtNick);
    $txtEmployeeID.val(user.txtEmpID);
    $txtEmail.val(user.txtEmail);
    $txtPassword.val('unchanged');
    $bitActive.prop('checked', user.bitActive);
    $bitUseActiveDirectory.prop('checked', user.bitUseActiveDirectory);
}

//=======================
// EVENT LISTENER
//=======================
$btnNext.bind('click', () => {
    if (pageRole.hasNext) {
        getAllUser(pageRole.page + 1, cari);
    }
})

$btnPrev.bind('click', () => {
    if (pageRole.hasPrevious) {
        getAllUser(pageRole.page - 1, cari);
    }
})
$btnAddUser.bind('click', () => {
    $.switchElement(elementToSwitch, 0);
    iniitializeData();
})
$btnCancelAddUser.bind('click', () => {
    $.switchElement(elementToSwitch, 1);
    $userFormTitle.text = "Add User";
})
$btnSave.bind('click', () => {
    setupDataUser();
    $.confirmMessage("Confirm", "Save User?", "Ya Save", saveUser);
})

function searchUser() {
    pageRole.page = 1;
    getAllUser(pageRole.page, cari);
}

