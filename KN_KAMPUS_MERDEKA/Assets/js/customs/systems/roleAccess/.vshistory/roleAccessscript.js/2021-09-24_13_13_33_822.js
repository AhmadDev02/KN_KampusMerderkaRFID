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
let headerDataRoleAccess = {};
headerData.__RequestVerificationToken = __RequestVerificationToken;
let elementToSwitchRoleAccess = [$("#roleAccessFormRow"), $("#roleAccessTableRow")];
let $roleAccessFormTitle = $("#roleAccessFormTitle");


//=======================
// AJAX REQUEST GET ALL ROLE ACCESS BY ROLE
//=======================
function getAllRoleAccessByRole(w, x, y) {
    $.postApi(apiRoleAccess + "/getAllByRole",
        {
            intRoleID: w,
            page: x,
            cari: y,
            size: 20
        },
        function (response) {
            console.log(response)
        },
        function (e) {
            $.errorMessage("Failed", e.responseJSON.txtMessage);
        },
        headerData
    )
}

