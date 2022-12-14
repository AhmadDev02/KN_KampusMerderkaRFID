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
let intRoleIDRoleAccess = 0;
//=======================
// ALL BUTTON
//=======================
let $btnPrevRoleAccess = $("#btnPrevRoleAccess");
let $btnNextRoleAccess = $("#btnNextRoleAccess");

//=======================
// AJAX REQUEST GET ALL ROLE ACCESS BY ROLE
//=======================
function getAllRoleAccessByRole(w, x, y) {
    intRoleIDRoleAccess = w;
    $.postApi(apiRoleAccess + "/getAllByRole",
        {
            intRoleID: w,
            page: x,
            cari: y,
            size: 20
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
        $btnPrevRoelAccess.show()
    } else {
        $btnPrevRoleAccess.hide();
    }
}
//=======================
// EVENT LISTENER
//=======================
$btnNextRoleAccess.bind('click', () => {
    if (pageRoleAccess.hasNext) {
        getAllRole(pageRole.page + 1, cari);
    }
})

$btnPrevRoleAccess.bind('click', () => {
    if (pageRoleAccess.hasPrevious) {
        getAllRoleAccessByRole(pageRole.page - 1, cari);
    }
})
