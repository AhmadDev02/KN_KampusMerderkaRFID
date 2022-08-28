//=======================
// INITIALIZE DATA
//=======================
var cari = '';
let pageAlergen = {};
pageAlergen.page = 1;
pageAlergen.hasContent = false;
pageAlergen.hasNext = false;
pageAlergen.hasPrevious = false;
let api = "/Master/Alergen";
let alergen = {};
let __RequestVerificationToken = $('#frm input[name=__RequestVerificationToken]').val()
let headerData = {};
headerData.__RequestVerificationToken = __RequestVerificationToken;
let $cariLOV = $("#cariLOV");
//=======================
// ALL BUTTON
//=======================
let $btnPrev = $("#btnPrevLOV");
let $btnNext = $("#btnNextLOV");

getAllAlergen(pageAlergen.page, cari);
setButtonNextPrvVisibility();
function setButtonNextPrvVisibility() {
    if (pageAlergen.hasNext) {
        $btnNext.show();
    } else {
        $btnNext.hide();
    }
    if (pageAlergen.hasPrevious) {
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
function getAllAlergen(x, y) {
    $.postApi(api + "/getAllAlergen",
        {
            page: x,
            cari: y,
            size: 10
        },
        function (response) {
            pageAlergen = response.objData;
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
    if (pageAlergen.hasContent) {
        for (let i = 0; i < pageAlergen.content.length; i++) {
            var m = pageAlergen.content[i];
            let $btnSelect = `<button class=' btn btn-outline-success btnSelect' data-alergen='` + JSON.stringify(m) + `'> <i class='fa fa-check'></i> Select</button>`;
            let row = "<tr id='intAlergenID" + m.intAlergenID + "'>" +
                "<td class='text-center'>" +
                $btnSelect +
                "</td>" +
                "<td class='text-center'>" + m.intAlergenID + "</td>" +
                "<td class='text-center'>" + m.intAlergenCode + "</td>" +
                "<td class='text-center'>" + m.txtAlergenDescription + "</td>" +
                "</tr>";
            $("#tbodyLOV").append(row);
        }
        $(".btnSelect").bind('click', function () {
            selectData($(this).data('alergen'));
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
    parent.getSelectedAlergen(data); // pass it to parent page
    parent.$.fancybox.close();
}

//=======================
// EVENT LISTENER
//=======================
$btnNext.bind('click', () => {
    if (pageAlergen.hasNext) {
        getAllAlergen(pageAlergen.page + 1, cari);
    }
})

$btnPrev.bind('click', () => {
    if (pageAlergen.hasPrevious) {
        getAllAlergen(pageAlergen.page - 1, cari);
    }
})
$cariLOV.on('keyup', function () {
    if ($cariLOV.val().toString().length % 3 == 0 && $cariLOV.val().toString() != cari || (e.key == 'Enter')) {
        cari = $cariLOV.val();
        getAllAlergen(0, cari);
    }
})