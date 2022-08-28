//=======================
// INITIALIZE DATA
//=======================
var cari = '';
let pageAuger = {};
pageAuger.page = 1;
pageAuger.hasContent = false;
pageAuger.hasNext = false;
pageAuger.hasPrevious = false;
let api = "/Master/Auger";
let auger = {};
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

getAllAuger(pageAuger.page, cari);
setButtonNextPrvVisibility();
function setButtonNextPrvVisibility() {
    if (pageAuger.hasNext) {
        $btnNext.show();
    } else {
        $btnNext.hide();
    }
    if (pageAuger.hasPrevious) {
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
function getAllAuger(x, y) {
    $.postApi(api + "/getAllAuger",
        {
            page: x,
            cari: y,
            size: 10
        },
        function (response) {
            pageAuger = response.objData;
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
    if (pageAuger.hasContent) {
        for (let i = 0; i < pageAuger.content.length; i++) {
            var m = pageAuger.content[i];
            let $btnSelect = `<button class=' btn btn-outline-success btnSelect' data-auger='` + JSON.stringify(m) + `'> <i class='fa fa-check'></i> Select</button>`;
            let row = "<tr id='intAugerID" + m.intAugerID + "'>" +
                "<td class='text-center'>" +
                $btnSelect +
                "</td>" +
                "<td class='text-center'>" + m.intAugerID + "</td>" +
                "<td class='text-center'>" + m.intAugerSize + "</td>" +
                "<td class='text-center'>" + m.txtAugerDescription + "</td>" +
                "</tr>";
            $("#tbodyLOV").append(row);
        }
        $(".btnSelect").bind('click', function () {
            selectData($(this).data('auger'));
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
    parent.getSelectedAuger(data); // pass it to parent page
    parent.$.fancybox.close();
}

//=======================
// EVENT LISTENER
//=======================
$btnNext.bind('click', () => {
    if (pageAuger.hasNext) {
        getAllAuger(pageAuger.page + 1, cari);
    }
})

$btnPrev.bind('click', () => {
    if (pageAuger.hasPrevious) {
        getAllAuger(pageAuger.page - 1, cari);
    }
})
$cariLOV.on('keyup', function () {
    if ($cariLOV.val().toString().length % 3 == 0 && $cariLOV.val().toString() != cari || (e.key == 'Enter')) {
        cari = $cariLOV.val();
        getAllAuger(0, cari);
    }
})