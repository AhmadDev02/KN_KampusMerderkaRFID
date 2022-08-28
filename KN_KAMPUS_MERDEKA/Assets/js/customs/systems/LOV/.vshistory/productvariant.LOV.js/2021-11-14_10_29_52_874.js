//=======================
// INITIALIZE DATA
//=======================
var cari = '';
let pageProductVariant = {};
pageProductVariant.page = 1;
pageProductVariant.hasContent = false;
pageProductVariant.hasNext = false;
pageProductVariant.hasPrevious = false;
let api = "/Master/ProductVariant";
let productVariant = {};
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

getAllProductVariant(pageProductVariant.page, cari);
setButtonNextPrvVisibility();
function setButtonNextPrvVisibility() {
    if (pageProductVariant.hasNext) {
        $btnNext.show();
    } else {
        $btnNext.hide();
    }
    if (pageProductVariant.hasPrevious) {
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
function getAllProductVariant(x, y) {
    $.postApi(api + "/getAllProductVariant",
        {
            page: x,
            cari: y,
            size: 10
        },
        function (response) {
            pageProductVariant = response.objData;
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
    if (pageProductVariant.hasContent) {
        for (let i = 0; i < pageProductVariant.content.length; i++) {
            var m = pageProductVariant.content[i];
            let $btnSelect = `<button class=' btn btn-outline-success btnSelect' data-productvariant='` + JSON.stringify(m) + `'> <i class='fa fa-check'></i> Select</button>`;
            let row = "<tr id='intProductVariantID" + m.intProductVariantID + "'>" +
                "<td class='text-center'>" +
                $btnSelect +
                "</td>" +
                "<td class='text-center'>" + m.intProductVariantID + "</td>" +
                "<td class='text-center'>" + m.txtProductVariantCode + "</td>" +
                "<td class='text-center'>" + m.txtProductVariantDescription + "</td>" +
                "</tr>";
            $("#tbodyLOV").append(row);
        }
        $(".btnSelect").bind('click', function () {
            selectData($(this).data('productvariant'));
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
    parent.getSelectedProductVariant(data); // pass it to parent page
    parent.$.fancybox.close();
}

//=======================
// EVENT LISTENER
//=======================
$btnNext.bind('click', () => {
    if (pageProductVariant.hasNext) {
        getAllProductVariant(pageProductVariant.page + 1, cari);
    }
})

$btnPrev.bind('click', () => {
    if (pageProductVariant.hasPrevious) {
        getAllProductVariant(pageProductVariant.page - 1, cari);
    }
})
$cariLOV.on('keyup', function () {
    if ($cariLOV.val().toString().length % 3 == 0 && $cariLOV.val().toString() != cari || (e.key == 'Enter')) {
        cari = $cariLOV.val();
        getAllProductVariant(0, cari);
    }
})