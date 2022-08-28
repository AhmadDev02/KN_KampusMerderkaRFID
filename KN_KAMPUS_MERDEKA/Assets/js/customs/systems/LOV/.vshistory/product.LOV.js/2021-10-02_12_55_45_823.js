//=======================
// INITIALIZE DATA
//=======================
var cari = '';
let pageProduct = {};
pageProduct.page = 1;
pageProduct.hasContent = false;
pageProduct.hasNext = false;
pageProduct.hasPrevious = false;
let api = "/Master/Product";
let product = {};
let __RequestVerificationToken = $('#frm input[name=__RequestVerificationToken]').val()
let headerData = {};
headerData.__RequestVerificationToken = __RequestVerificationToken;
let $cariLOV = $("#cariLOV");
//=======================
// ALL BUTTON
//=======================
let $btnPrev = $("#btnPrevLOV");
let $btnNext = $("#btnNextLOV");

getAllProduct(pageProduct.page, cari);
setButtonNextPrvVisibility();
function setButtonNextPrvVisibility() {
    if (pageProduct.hasNext) {
        $btnNext.show();
    } else {
        $btnNext.hide();
    }
    if (pageProduct.hasPrevious) {
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
function getAllProduct(x, y) {
    $.postApi(api + "/getAllProduct",
        {
            page: x,
            cari: y,
            size: 10
        },
        function (response) {
            pageProduct = response.objData;
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
    if (pageProduct.hasContent) {
        for (let i = 0; i < pageProduct.content.length; i++) {
            var m = pageProduct.content[i];
            let $btnSelect = `<button class=' btn btn-outline-success btnSelect' data-product='` + JSON.stringify(m) + `'> <i class='fa fa-check'></i> Select</button>`;
            let row = "<tr id='intProductID" + m.intProductID + "'>" +
                "<td class='text-center'>" +
                $btnSelect +
                "</td>" +
                "<td class='text-center'>" + m.intProductID + "</td>" +
                "<td class='text-center'>" + m.txtProductCode + "</td>" +
                "<td class='text-center'>" + m.txtDescription + "</td>" +
                "</tr>";
            $("#tbodyLOV").append(row);
        }
        $(".btnSelect").bind('click', function () {
            selectData($(this).data('product'));
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
    parent.getSelectedProduct(data); // pass it to parent page
    parent.$.fancybox.close();
}

//=======================
// EVENT LISTENER
//=======================
$btnNext.bind('click', () => {
    if (pageProduct.hasNext) {
        getAllProduct(pageProduct.page + 1, cari);
    }
})

$btnPrev.bind('click', () => {
    if (pageProduct.hasPrevious) {
        getAllProduct(pageProduct.page - 1, cari);
    }
})
$cariLOV.on('keyup', function () {
    if ($cariLOV.val().toString().length % 3 == 0 && $cariLOV.val().toString() != cari || (e.key == 'Enter')) {
        cari = $cariLOV.val();
        getAllProduct(0, cari);
    }
})