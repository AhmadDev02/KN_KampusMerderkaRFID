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
let $roleFormTitle = $("#roleFormTitle");
let $colRoleAccess = $("#colRoleAccess")
let $colRole = $("#colRole")
//=======================
// ALL BUTTON
//=======================
let $btnPrev = $("#btnPrev");
let $btnNext = $("#btnNext");
let $btnSave = $("#btnSave");
let $btnAddRole = $("#btnAddRole");
let $btnCancelAddRole = $("#btnCancelAddRole");
//=======================
// FORM ROLE
//=======================
let $txtRoleName = $("#txtRoleName");
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
    $txtRoleName.val(role.txtRoleName);
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
// AJAX REQUEST SAVE ROLE
//=======================
function saveRole() {
    $.postApi(api + "/Save",
        role,
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
            let $btnRoleAccess = `<button class='btnRoleAccess  btn btn-outline-success float-right m-1' data-role='` + JSON.stringify(r) + `'> <i class='fa fa-keys'></i> Access</button>`;
            let row = "<tr id='intRoleID" + r.intRoleID + "'>" +
                "<td class='text-center'>" + r.intRoleID + "</td>" +
                "<td class='text-center'>" + r.txtRoleName + "</td>" +
                "<td class='text-center'>" + r.bitSuperuser + "</td>" +
                "<td class='text-center'>" +
                $btnEdit +
                $btnRoleAccess +
                "</td>" +
                "</tr>";
            $("#tbody").append(row);
        }
        $(".btnEdit").on('click', function () {
            let r = $(this).data('role');
            setupDataRoleEdit(r);
            setupDataRoleEditForm();
            $.switchElement(elementToSwitch, 0);
            $roleFormTitle.text = "Edit Roles";
        })
        $(".btnRoleAccess ").on('click', function () {
            $colRoleAccess.toggleClass('col-md-6')
            $colRole.toggleClass('col-md-6');
        })
    } else {
        $("#tbody").append("<tr><td colspan='4'><center><span class='text-muted'>No Data <a class='refresh' href=''>Refresh</a> </span></center></td></tr>");
    }
    setButtonNextPrvVisibility();
}
//=======================
// ASSIGN ROLE SAVE
//=======================
function setupDataRole() {
    role.txtRoleName = $txtRoleName.val().toString();
    role.bitSuperuser = $bitSuperuser.is(":checked");
}
//=======================
// ASSIGN EDIT ROLE
//=======================
function setupDataRoleEdit(r) {
    role.intRoleID = r.intRoleID;
    role.txtRoleName = r.txtRoleName;
    role.bitSuperuser = r.bitSuperuser;
    role.txtGUID = r.txtGUID;
}
//=======================
// ASSIGN EDIT ROLE FORM
//=======================
function setupDataRoleEditForm() {
    $txtRoleName.val(role.txtRoleName);
    $bitSuperuser.prop('checked', role.bitSuperuser);
}

//=======================
// EVENT LISTENER
//=======================
$btnNext.bind('click', () => {
    if (pageRole.hasNext) {
        getAllRole(pageRole.page + 1, cari);
    }
})

$btnPrev.bind('click', () => {
    if (pageRole.hasPrevious) {
        getAllRole(pageRole.page - 1, cari);
    }
})
$btnAddRole.bind('click', () => {
    $.switchElement(elementToSwitch, 0);
    iniitializeData();
})
$btnCancelAddRole.bind('click', () => {
    $.switchElement(elementToSwitch, 1);
    $roleFormTitle.text = "Add Role";
})
$btnSave.bind('click', () => {
    setupDataRole();
    $.confirmMessage("Confirm", "Save Role?", "Ya Save", saveRole);
})

function searchRole() {
    pageRole.page = 1;
    getAllRole(pageRole.page, cari);
}

