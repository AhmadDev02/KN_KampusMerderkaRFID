//=======================
// INITIALIZE DATA
//=======================
var cari = '';
let pageVariant = {};
pageVariant.page = 1;
pageVariant.hasContent = false;
pageVariant.hasNext = false;
pageVariant.hasPrevious = false;
let api = "/Master/Variant";
let module = {};
let __RequestVerificationToken = $('#frm input[name=__RequestVerificationToken]').val()
let headerData = {};
headerData.__RequestVerificationToken = __RequestVerificationToken;
let $cariLOV = $("#cariLOV");
//=======================
// ALL BUTTON
//=======================
let $btnPrev = $("#btnPrevLOV");
let $btnNext = $("#btnNextLOV");

getAllModule(pageVariant.page, cari);
setButtonNextPrvVisibility();
function setButtonNextPrvVisibility() {
    if (pageVariant.hasNext) {
        $btnNext.show();
    } else {
        $btnNext.hide();
    }
    if (pageVariant.hasPrevious) {
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
            pageVariant = response.objData;
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
    if (pageVariant.hasContent) {
        for (let i = 0; i < pageVariant.content.length; i++) {
            var m = pageVariant.content[i];
            let $btnSelect = `<button class=' btn btn-outline-success btnSelect' data-module='` + JSON.stringify(m) + `'> <i class='fa fa-check'></i> Select</button>`;
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
        $(".btnSelect").bind('click', function () {
            selectData($(this).data('module'));
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
    parent.getSelectedModule(data); // pass it to parent page
    parent.$.fancybox.close();
}

//=======================
// EVENT LISTENER
//=======================
$btnNext.bind('click', () => {
    if (pageVariant.hasNext) {
        getAllModule(pageVariant.page + 1, cari);
    }
})

$btnPrev.bind('click', () => {
    if (pageVariant.hasPrevious) {
        getAllModule(pageVariant.page - 1, cari);
    }
})
$cariLOV.on('keyup', function () {
    if ($cariLOV.val().toString().length % 3 == 0 && $cariLOV.val().toString() != cari || (e.key == 'Enter')) {
        cari = $cariLOV.val();
        getAllModule(0, cari);
    }
})