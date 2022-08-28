//=======================
// INITIALIZE DATA
//=======================
var cari = '';
let pageRole = {};
pageRole.page = 1;
pageRole.hasContent = false;
pageRole.hasNext = false;
pageRole.hasPrevious = false;
let api = "/Systems/Role";
let role = {};
let __RequestVerificationToken = $('#frm input[name=__RequestVerificationToken]').val()
let headerData = {};
headerData.__RequestVerificationToken = __RequestVerificationToken;
let $cariLOV = $("#cariLOV");
cari = $cariLOV.val();
//=======================
// ALL BUTTON
//=======================
let $btnPrev = $("#btnPrevLOV");
let $btnNext = $("#btnNextLOV");

getAllRole(pageRole.page, cari);
setButtonNextPrvVisibility();
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

//=======================
// AJAX REQUEST GET ALL ROLE
//=======================
function getAllRole(x, y) {
    $.postApi(api + "/getAllRole",
        {
            page: x,
            cari: y,
            size: 10
        },
        function (response) {
            pageRole = response.objData;
            fillTableData();
        },
        function (e) {
            $.errorMessage("Failed", e.responseJSON.txtMessage);
            $("#tbodyLOV").html("");
            $("#tbodyLOV").append("<tr><td colspan='3'><center><span class='text-muted'>No Data <a class='refresh' href=''>Refresh</a> </span></center></td></tr>");
        },
        headerData
    )
}

//=======================
// FILL TABLE DATA
//=======================
function fillTableData() {
    $("#tbodyLOV").html("");
    if (pageRole.hasContent) {
        for (let i = 0; i < pageRole.content.length; i++) {
            var m = pageRole.content[i];
            let $btnSelect = `<button class=' btn btn-outline-success btnSelect' data-role='` + JSON.stringify(m) + `'> <i class='fa fa-check'></i> Select</button>`;
            let row = "<tr id='intRoleID" + m.intRoleID + "'>" +
                "<td class='text-center'>" +
                $btnSelect +
                "</td>" +
                "<td class='text-center'>" + m.intRoleID + "</td>" +
                "<td class='text-center'>" + m.txtRoleName + "</td>" +
                "</tr>";
            $("#tbodyLOV").append(row);
        }
        $(".btnSelect").bind('click', function () {
            selectData($(this).data('role'));
        });
    } else {
        $("#tbodyLOV").append("<tr><td colspan='4'><center><span class='text-muted'>No Data <a class='refresh' href=''>Refresh</a> </span></center></td></tr>");
    }
    setButtonNextPrvVisibility();
}


/*================================
SELECT DATA
================================== */
function selectData(data) {
    parent.getSelectedRole(data); // pass it to parent page
    parent.$.fancybox.close();
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
$cariLOV.on('keyup', function (e) {
    if ($cariLOV.val().toString().length % 3 == 0 && $cariLOV.val().toString() != cari || (e.key == 'Enter')) {
        cari = $cariLOV.val();
        getAllRole(0, cari);
    }
})