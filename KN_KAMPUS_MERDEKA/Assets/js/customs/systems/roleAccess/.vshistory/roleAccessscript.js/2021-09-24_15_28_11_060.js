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


//=======================
// ALL BUTTON
//=======================
let $btnPrevRoleAccess = $("#btnPrevRoleAccess");
let $btnNextRoleAccess = $("#btnNextRoleAccess");
let $btnCancelAddRoleAccess = $("#btnCancelAddRoleAccess");
let $btnAddRoleAccess = $("#btnAddRoleAccess");

//=======================
// INITIALIZE DATA ROLE ACCESS
//=======================
function iniitializeData() {
    $.postApi(api + "/InitiateData", null, function (response) {
        role = response.objData;
        setupAddRoleForm();
        $roleFormTitle.text = "Add Role";
    }, errorHandle, headerData);
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
