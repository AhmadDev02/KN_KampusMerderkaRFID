//=======================
// INITIALIZE DATA
//=======================
var cari = '';
let pageModule = {};
pageModule.page = 1;
pageModule.hasContent = false;
pageModule.hasNext = false;
pageModule.hasPrevious = false;
let api = "/System/Module";
let module = {};
let __RequestVerificationToken = $('#frm input[name=__RequestVerificationToken]').val()
let headerData = {};
headerData.__RequestVerificationToken = __RequestVerificationToken;

//=======================
// ALL BUTTON
//=======================
let $btnPrev = $("#btnPrevLOV");
let $btnNext = $("#btnNextLOV");

getAllModule(pageModule.page, cari);
setButtonNextPrvVisibility();
function setButtonNextPrvVisibility() {
    if (pageModule.hasNext) {
        $btnNext.show();
    } else {
        $btnNext.hide();
    }
    if (pageModule.hasPrevious) {
        $btnPrev.show()
    } else {
        $btnPrev.hide();
    }
}


function errorHandle(error) {
    $.errorMessage("Error", error.responseJSON.txtMessage)
}

//=======================
// AJAX REQUEST GET ALL MODULE
//=======================
function getAllModule(x, y) {
    $.postApi(api + "/getAllModule",
        {
            page: x,
            cari: y,
            size: 10
        },
        function (response) {
            pageModule = response.objData;
            fillTableData();
        },
        function (e) {
            $.errorMessage("Failed", e.responseJSON.txtMessage);
            $("#tbodyLOV").html("");
            $("#tbodyLOV").append("<tr><td colspan='4'><center><span class='text-muted'>No Data <a class='refresh' href=''>Refresh</a> </span></center></td></tr>");
        },
        headerData
    )
}

//=======================
// FILL TABLE DATA
//=======================
function fillTableData() {
    $("#tbodyLOV").html("");
    if (pageModule.hasContent) {
        for (let i = 0; i < pageModule.content.length; i++) {
            var m = pageModule.content[i];
            let $btnSelect = `<button class=' btn btn-outline-success btnSelect' onclick='selectData("`+JSON.stringify(m)+`")'> <i class='fa fa-check'></i> Select</button>`;
            let row = "<tr id='intModuleID" + m.intModuleID + "'>" +
                "<td class='text-center'>" +
                $btnSelect +
                "</td>" +
                "<td class='text-center'>" + m.intModuleID + "</td>" +
                "<td class='text-center'>" + m.txtModuleName + "</td>" +
                "<td class='text-center'>" + m.txtDescription + "</td>" +
                "</tr>";
            $("#tbodyLOV").append(row);
        }

    } else {
        $("#tbodyLOV").append("<tr><td colspan='4'><center><span class='text-muted'>No Data <a class='refresh' href=''>Refresh</a> </span></center></td></tr>");
    }
    setButtonNextPrvVisibility();
}


/*================================
SELECT DATA
================================== */
function selectData(data) {
    parent.getSelectedModule(JSON.parse(data)); // pass it to parent page
    parent.$.fancybox.close();
}

//=======================
// EVENT LISTENER
//=======================
$btnNext.bind('click', () => {
    if (pageModule.hasNext) {
        getAllModule(pageModule.page + 1, cari);
    }
})

$btnPrev.bind('click', () => {
    if (pageModule.hasPrevious) {
        getAllModule(pageModule.page - 1, cari);
    }
})

function searchModule() {
    pageModule.page = 1;
    getAllModule(pageModule.page, cari);
}

