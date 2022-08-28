//=======================
// INITIALIZE DATA
//=======================
var cari = '';
let pageProductionLine = {};
pageProductionLine.page = 1;
pageProductionLine.hasContent = false;
pageProductionLine.hasNext = false;
pageProductionLine.hasPrevious = false;
let api = "/Master/ProductionLine";
let productionLine = {};
let __RequestVerificationToken = $('#frm input[name=__RequestVerificationToken]').val()
let headerData = {};
headerData.__RequestVerificationToken = __RequestVerificationToken;
let $cariLOV = $("#cariLOV");
//=======================
// ALL BUTTON
//=======================
let $btnPrev = $("#btnPrevLOV");
let $btnNext = $("#btnNextLOV");

getAllProductionLine(pageProductionLine.page, cari);
setButtonNextPrvVisibility();
function setButtonNextPrvVisibility() {
    if (pageProductionLine.hasNext) {
        $btnNext.show();
    } else {
        $btnNext.hide();
    }
    if (pageProductionLine.hasPrevious) {
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
function getAllProductionLine(x, y) {
    $.postApi(api + "/getAllProductionLine",
        {
            page: x,
            cari: y,
            size: 10
        },
        function (response) {
            pageProductionLine = response.objData;
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
    if (pageProductionLine.hasContent) {
        for (let i = 0; i < pageProductionLine.content.length; i++) {
            var m = pageProductionLine.content[i];
            let $btnSelect = `<button class=' btn btn-outline-success btnSelect' data-productionLine='` + JSON.stringify(m) + `'> <i class='fa fa-check'></i> Select</button>`;
            let row = "<tr id='intProductionLineID" + m.intProductionLineID + "'>" +
                "<td class='text-center'>" +
                $btnSelect +
                "</td>" +
                "<td class='text-center'>" + m.intProductionLineID + "</td>" +
                "<td class='text-center'>" + m.txtProductionLineCode + "</td>" +
                "<td class='text-center'>" + m.txtProductionLineDescription + "</td>" +
                "</tr>";
            $("#tbodyLOV").append(row);
        }
        $(".btnSelect").bind('click', function () {
            selectData($(this).data('productionLine'));
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
    parent.getSelectedProductionLine(data); // pass it to parent page
    parent.$.fancybox.close();
}

//=======================
// EVENT LISTENER
//=======================
$btnNext.bind('click', () => {
    if (pageProductionLine.hasNext) {
        getAllProductionLine(pageProductionLine.page + 1, cari);
    }
})

$btnPrev.bind('click', () => {
    if (pageProductionLine.hasPrevious) {
        getAllProductionLine(pageProductionLine.page - 1, cari);
    }
})
$cariLOV.on('keyup', function () {
    if ($cariLOV.val().toString().length % 3 == 0 && $cariLOV.val().toString() != cari || (e.key == 'Enter')) {
        cari = $cariLOV.val();
        getAllProductionLine(0, cari);
    }
})