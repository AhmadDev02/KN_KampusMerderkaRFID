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
// ALL BUTTON
//=======================
let $btnPrevRoleAccess = $("#btnPrevRoleAccess");
let $btnNextRoleAccess = $("#btnNextRoleAccess");

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
            let row = "<tr id='intRoleID" + r.intRoleID + "'>" +
                "<td class='text-center'>" + r.intRoleID + "</td>" +
                "<td class='text-center'>" + r.txtRoleName + "</td>" +
                "<td class='text-center'>" + r.bitSuperuser + "</td>" +
                "<td class='text-center'>" +
                $btnEdit +
                $btnRoleAccess +
                "</td>" +
                "</tr>";
            $("#tbodyRoleAccess").append(row);
        }
        $(".btnEdit").on('click', function () {
            let r = $(this).data('role');
            setupDataRoleEdit(r);
            setupDataRoleEditForm();
            $.switchElement(elementToSwitch, 0);
            $roleFormTitle.text = "Edit Roles";
        })
        $(".btnRoleAccess ").on('click', function () {
            let r = $(this).data('role');
            if (!$colRoleAccess.is(':visible')) {
                $colRole.toggleClass('offset-md-3 col-sm-10 offset-sm-1', 200).promise().done(function () {
                    //$colRoleAccess.slideToggle()
                    $colRoleAccess.toggle('slide', { direction: 'right', duration: 200 })
                });

            }
            $roleAccessTitleForm.text(r.txtRoleName);
            getAllRoleAccessByRole(r.intRoleID, 1, "");
        })
    } else {
        $("#tbodyRoleAccess").append("<tr><td colspan='4'><center><span class='text-muted'>No Data <a class='refresh' href=''>Refresh</a> </span></center></td></tr>");
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

