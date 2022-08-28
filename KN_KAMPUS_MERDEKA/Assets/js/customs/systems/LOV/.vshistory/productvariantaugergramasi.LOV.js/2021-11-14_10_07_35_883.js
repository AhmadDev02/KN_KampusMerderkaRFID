//=======================
// INITIALIZE DATA
//=======================
var cari = '';
let pageProductVariantAugerGramasi = {};
pageProductVariantAugerGramasi.page = 1;
pageProductVariantAugerGramasi.hasContent = false;
pageProductVariantAugerGramasi.hasNext = false;
pageProductVariantAugerGramasi.hasPrevious = false;
let api = "/Master/Gramasi";
let productVariantAugerGramasi = {};
let __RequestVerificationToken = $('#frm input[name=__RequestVerificationToken]').val()
let headerData = {};
headerData.__RequestVerificationToken = __RequestVerificationToken;
let $cariLOV = $("#cariLOV");
//=======================
// ALL BUTTON
//=======================
let $btnPrev = $("#btnPrevLOV");
let $btnNext = $("#btnNextLOV");

getAllProductVariantAugerGramasi(pageProductVariantAugerGramasi.page, cari);
setButtonNextPrvVisibility();
function setButtonNextPrvVisibility() {
    if (pageProductVariantAugerGramasi.hasNext) {
        $btnNext.show();
    } else {
        $btnNext.hide();
    }
    if (pageProductVariantAugerGramasi.hasPrevious) {
        $btnPrev.show()
    } else {
        $btnPrev.hide();
    }
}


function errorHandle(error) {
    $.errorMessage("Error", error.responseJSON.txtMessage)
}

//=======================
// AJAX REQUEST GET ALL productvariantaugergramasi
//=======================
function getAllProductVariantAugerGramasi(x, y) {
    $.postApi(api + "/getAllGramasi",
        {
            page: x,
            cari: y,
            size: 10
        },
        function (response) {
            pageProductVariantAugerGramasi = response.objData;
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
    if (pageProductVariantAugerGramasi.hasContent) {
        for (let i = 0; i < pageProductVariantAugerGramasi.content.length; i++) {
            var m = pageProductVariantAugerGramasi.content[i];
            let $btnSelect = `<button class=' btn btn-outline-success btnSelect' data-productvariantaugergramasi='` + JSON.stringify(m) + `'> <i class='fa fa-check'></i> Select</button>`;
            let row = "<tr id='intProductVariantAugerGramasiID" + m.intProductVariantAugerGramasiID + "'>" +
                "<td class='text-center'>" +
                $btnSelect +
                "</td>" +
                "<td class='text-center'>" + m.intProductVariantAugerGramasiID + "</td>" +
                "<td class='text-center'>" + m.txtProductVariantDescription + "</td>" +
                "<td class='text-center'>" + m.decGramasi + "</td>" +
                "</tr>";
            $("#tbodyLOV").append(row);
        }
        $(".btnSelect").bind('click', function () {
            selectData($(this).data('productvariantaugergramasi'));
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
    parent.getSelectedProductVariantAugerGramasi(data); // pass it to parent page
    parent.$.fancybox.close();
}

//=======================
// EVENT LISTENER
//=======================
$btnNext.bind('click', () => {
    if (pageProductVariantAugerGramasi.hasNext) {
        getAllProductVariantAugerGramasi(pageProductVariantAugerGramasi.page + 1, cari);
    }
})

$btnPrev.bind('click', () => {
    if (pageProductVariantAugerGramasi.hasPrevious) {
        getAllProductVariantAugerGramasi(pageProductVariantAugerGramasi.page - 1, cari);
    }
})
$cariLOV.on('keyup', function () {
    if ($cariLOV.val().toString().length % 3 == 0 && $cariLOV.val().toString() != cari || (e.key == 'Enter')) {
        cari = $cariLOV.val();
        getAllProductVariantAugerGramasi(0, cari);
    }
})