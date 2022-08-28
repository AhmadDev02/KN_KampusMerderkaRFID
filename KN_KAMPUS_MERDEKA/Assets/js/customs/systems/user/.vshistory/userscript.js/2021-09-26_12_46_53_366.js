//=======================
// INITIALIZE DATA
//=======================
var cari = '';
let pageUser = {};
pageUser.page = 1;
pageUser.hasContent = false;
pageUser.hasNext = false;
pageUser.hasPrevious = false;
let api = "/System/User";
let user = {};
let txtGUID = $("#txtGUID").val()
let __RequestVerificationToken = $('#frm input[name=__RequestVerificationToken]').val()
let headerData = {};
headerData.__RequestVerificationToken = __RequestVerificationToken;
let elementToSwitch = [$("#userFormRow"), $("#userTableRow")];
let $userFormTitle = $("#userFormTitle");
let $colUserRole= $("#colUserRole");
let $colUser = $("#colUser");
let $userRoleTitleForm = $("#userRoleTitleForm");


//=======================
// ALL BUTTON
//=======================
let $btnPrev = $("#btnPrev");
let $btnNext = $("#btnNext");
let $btnSave = $("#btnSave");
let $btnAddUser = $("#btnAddUser");
let $btnCancelAddUser = $("#btnCancelAddUser");
let $btnCloseUserRole = $("#btnCloseUserRole")
//=======================
// FORM USER
//=======================
let $txtUsername = $("#txtUsername");
let $txtFullname = $("#txtFullname");
let $txtNick = $("#txtNick");
let $txtEmployeeID = $("#txtEmployeeID");
let $txtEmail = $("#txtEmail");
let $txtPassword = $("#txtPassword");
let $bitUseActiveDirectory = $("#bitUseActiveDirectory");
let $bitActive = $("#bitActive");

function initializePage() {
    page = 1;
    cari = "";
    pageUser = {};
    pageUser.page = 1;
    pageUser.hasContent = false;
    pageUser.hasNext = false;
    pageUser.hasPrevious = false;
    api = "/System/User";
    user = {};
    txtGUID = $("#txtGUID").val()
    __RequestVerificationToken = $('#frm input[name=__RequestVerificationToken]').val()
    headerData = {};
    headerData.__RequestVerificationToken = __RequestVerificationToken;
    setButtonNextPrvVisibility();
    iniitializeData();
}
initializePage();
getAllUser(pageUser.page, cari);
function setButtonNextPrvVisibility() {
    if (pageUser.hasNext) {
        $btnNext.show();
    } else {
        $btnNext.hide();
    }
    if (pageUser.hasPrevious) {
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
        user = response.objData;
        setupAddUserForm();
        $userFormTitle.text = "Add User";
    }, errorHandle, headerData);
}

function setupAddUserForm() {
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
// AJAX REQUEST GET ALL USER
//=======================
function getAllUser(x, y) {
    $.postApi(api + "/getAllUser",
        {
            page: x,
            cari: y,
            size: 20
        },
        function (response) {
            pageUser = response.objData;
            fillTableData();
        },
        function (e) {
            $.errorMessage("Failed", e.responseJSON.txtMessage);
            $("#tbody").html("");
            $("#tbody").append("<tr><td colspan='10'><center><span class='text-muted'>No Data <a class='refresh' href=''>Refresh</a> </span></center></td></tr>");
        },
        headerData
    )
}
//=======================
// AJAX REQUEST SAVE USER
//=======================
function saveUser() {
    $.postApi(api + "/Save",
        user,
        function (response) {
            iniitializeData();
            $.switchElement(elementToSwitch, 1);
            $.successMessage("Sukses", "Berhasil menyimpan user");
            getAllUser(0, cari)
        },
        function (e) {
            $.errorMessage("Failed", e.responseJSON.txtMessage);
            $("#tbody").html("");
            $("#tbody").append("<tr><td colspan='10'><center><span class='text-muted'>No Data <a class='refresh' href=''>Refresh</a> </span></center></td></tr>");
        },
        headerData
    )
}
//=======================
// FILL TABLE DATA
//=======================
function fillTableData() {
    $("#tbody").html("");
    if (pageUser.hasContent) {
        for (let i = 0; i < pageUser.content.length; i++) {
            var u = pageUser.content[i];
            let $btnEdit = `<button class='btnEdit  btn btn-outline-warning float-right m-1' data-user='` + JSON.stringify(u) + `'> <i class='fa fa-edit'></i> Edit</button>`;
            let $btnUserRole = `<button class='btnUserRole  btn btn-outline-success float-right m-1' data-user='` + JSON.stringify(u) + `'> <i class='fa fa-keys'></i> Role</button>`;
            let row = "<tr id='idUser" + u.intUserID + "'>" +
                "<td class='text-center'>" + u.intUserID + "</td>" +
                "<td class='text-center'>" + u.txtUserName + "</td>" +
                "<td class='text-center'>" + u.txtFullName + "</td>" +
                "<td class='text-center'>" + u.txtNick + "</td>" +
                "<td class='text-center'>" + u.txtEmpID + "</td>" +
                "<td class='text-center'>" + u.txtEmail + "</td>" +
                "<td class='text-center'>" + u.bitActive + "</td>" +
                "<td class='text-center'>" + u.bitUseActiveDirectory + "</td>" +
                "<td class='text-center'>" + $.parseJsonDateAsPretty(u.dtmLastLogin) + "</td>" +
                "<td class='text-center'>" +
                $btnEdit +
                $btnUserRole+
                "</td>" +
                "</tr>";
            $("#tbody").append(row);
        }
        $(".btnEdit").on('click', function () {
            let u = $(this).data('user');
            setupDataUserEdit(u);
            setupDataUserEditForm();
            $.switchElement(elementToSwitch, 0);
            $userFormTitle.text = "Edit User";
        })
        $(".btnUserRole").on('click', function () {
            let u = $(this).data('user');
            if (!$colUserRole.is(':visible')) {
                $colUser.toggleClass('offset-md-3 col-sm-10 offset-sm-1', 200).promise().done(function () {
                    //$colRoleAccess.slideToggle()
                    $colRoleAccess.toggle('slide', { direction: 'right', duration: 200 })
                });

            }
            $userRoleFormTitle.text(u.txtUserName);
            //ROLEACCESS SCRIPT
            selectedUser = u;
            $userRoleTitleForm.text(u.txtUserName);
            getAllUserRoleByUser(1);
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
    user.txtGUID = u.txtGUID;
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
    if (pageUser.hasNext) {
        getAllUser(pageUser.page + 1, cari);
    }
})

$btnPrev.bind('click', () => {
    if (pageUser.hasPrevious) {
        getAllUser(pageUser.page - 1, cari);
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
$btnCloseUserRole.bind('click', () => {
    $colUserRole.toggle('slide', {
        complete: function () {

        },
        direction: 'right',
        duration: 200
    });
    $colUser.toggleClass('offset-md-3 col-sm-10 offset-sm-1', 200)
})
function searchUser() {
    pageUser.page = 1;
    getAllUser(pageUser.page, cari);
}

