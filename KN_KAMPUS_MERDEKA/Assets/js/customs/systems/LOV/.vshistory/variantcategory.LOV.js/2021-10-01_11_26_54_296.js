//=======================
// INITIALIZE DATA
//=======================
var cari = '';
let pageVariantCategory = {};
pageVariantCategory.page = 1;
pageVariantCategory.hasContent = false;
pageVariantCategory.hasNext = false;
pageVariantCategory.hasPrevious = false;
let api = "/Master/VariantCategory";
let variantCategory = {};
let txtGUID = $("#txtGUID").val()
let __RequestVerificationToken = $('#frm input[name=__RequestVerificationToken]').val()
let headerData = {};
headerData.__RequestVerificationToken = __RequestVerificationToken;
let $cariLOV = $("#cariLOV");

//=======================
// ALL BUTTON
//=======================
let $btnPrev = $("#btnPrevLOV");
let $btnNext = $("#btnNextLOV");


function initializePage() {
    page = 1;
    cari = "";
    pageVariantCategory = {};
    pageVariantCategory.page = 1;
    pageVariantCategory.hasContent = false;
    pageVariantCategory.hasNext = false;
    pageVariantCategory.hasPrevious = false;
    api = "/Master/VariantCategory";
    variantCategory = {};
    txtGUID = $("#txtGUID").val()
    __RequestVerificationToken = $('#frm input[name=__RequestVerificationToken]').val()
    headerData = {};
    headerData.__RequestVerificationToken = __RequestVerificationToken;
    setButtonNextPrvVisibility();
}
initializePage();
getAllVariantCategory(pageVariantCategory.page, cari);
function setButtonNextPrvVisibility() {
    if (pageVariantCategory.hasNext) {
        $btnNext.show();
    } else {
        $btnNext.hide();
    }
    if (pageVariantCategory.hasPrevious) {
        $btnPrev.show()
    } else {
        $btnPrev.hide();
    }
}


function errorHandle(error) {
    $.errorMessage("Error", error.responseJSON.txtMessage)
}

//=======================
// AJAX REQUEST GET ALL MENU
//=======================
function getAllVariantCategory(x, y) {
    $.postApi(api + "/getAllVariantCategory",
        {
            page: x,
            cari: y,
            size: 20
        },
        function (response) {
            pageVariantCategory = response.objData;
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
    if (pageVariantCategory.hasContent) {
        for (let i = 0; i < pageVariantCategory.content.length; i++) {
            var m = pageVariantCategory.content[i];
            let $btnSelect = `<button class=' btn btn-outline-success btnSelect ' data-variantCategory='` + JSON.stringify(m) + `'> <i class='fa fa-check'></i> Select</button>`;
            let row = "<tr id='intVariantCategoryID" + m.intVariantCategoryID + "'>" +
                "<td class='text-center'>" +
                $btnSelect +
                "</td>" +
                "<td class='text-center'>" + m.intVariantID + "</td>" +
                "<td class='text-center'>" + m.txtVariantCode + "</td>" +
                "<td class='text-center'>" + m.txtVariantDescription + "</td>" +
                "</tr>";
            $("#tbodyLOV").append(row);
        }
        $(".btnSelect").on('click', function () {
            selectData($(this).data('variantCategory'));
        })

    } else {
        $("#tbodyLOV").append("<tr><td colspan='3'><center><span class='text-muted'>No Data <a class='refresh' href=''>Refresh</a> </span></center></td></tr>");
    }
    setButtonNextPrvVisibility();
}


//=======================
// EVENT LISTENER
//=======================
$btnNext.bind('click', () => {
    if (pageVariantCategory.hasNext) {
        getAllVariantCategory(pageVariantCategory.page + 1, cari);
    }
})

$btnPrev.bind('click', () => {
    if (pageVariantCategory.hasPrevious) {
        getAllVariantCategory(pageVariantCategory.page - 1, cari);
    }
})

$cariLOV.on('keyup', function () {
    if ($cariLOV.val().toString().length % 3 == 0 && $cariLOV.val().toString() != cari || (e.key == 'Enter')) {
        cari = $cariLOV.val();
        getAllVariantCategory(0, cari);
    }
})

/*================================
SELECT DATA
================================== */
function selectData(data) {
    parent.getSelectedVariantCategory(data); // pass it to parent page
    parent.$.fancybox.close();
}