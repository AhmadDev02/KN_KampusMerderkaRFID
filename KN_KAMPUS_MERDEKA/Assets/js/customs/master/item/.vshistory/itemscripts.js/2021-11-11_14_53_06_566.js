//=======================
// INITIALIZE DATA
//=======================
var cari = '';
let pageItem = {};
pageItem.page = 1;
pageItem.hasContent = false;
pageItem.hasNext = false;
pageItem.hasPrevious = false;
let api = "/Master/Item";
let item = {};
let txtGUID = $("#txtGUID").val()
let __RequestVerificationToken = $('#frm input[name=__RequestVerificationToken]').val()
let headerData = {};
headerData.__RequestVerificationToken = __RequestVerificationToken;
let elementToSwitch = [$("#setupRow"), $("#itemTableRow")];
let selectedSetupItem = null;
let selectedAlergen = null;
//=======================
// ALL BUTTON
//=======================
let $btnPrev = $("#btnPrev");
let $btnNext = $("#btnNext");
let $btnCancel = $("#btnCancelSetup");
//=======================
// FORM 
//=======================
let $txtSelectedAlergen = $("#txtSelectedAlergen");
let $txtSelectedGramasi = $("#txtSelectedGramasi");
let $intRevit = $("#intRevit");

function initializePage() {
    page = 1;
    cari = "";
    pageItem = {};
    pageItem.page = 1;
    pageItem.hasContent = false;
    pageItem.hasNext = false;
    pageItem.hasPrevious = false;
    api = "/Master/Item";
    user = {};
    txtGUID = $("#txtGUID").val()
    __RequestVerificationToken = $('#frm input[name=__RequestVerificationToken]').val()
    headerData = {};
    headerData.__RequestVerificationToken = __RequestVerificationToken;
    setButtonNextPrvVisibility();
}
initializePage();
getAllItem(pageItem.page, cari);
function setButtonNextPrvVisibility() {
    if (pageItem.hasNext) {
        $btnNext.show();
    } else {
        $btnNext.hide();
    }
    if (pageItem.hasPrevious) {
        $btnPrev.show()
    } else {
        $btnPrev.hide();
    }
}


function errorHandle(error) {
    $.errorMessage("Error", error.responseJSON.txtMessage)
}


//=======================
// AJAX REQUEST GET ALL PRODUCT
//=======================
function getAllItem(x, y) {
    $.postApi(api + "/getAllItem",
        {
            page: x,
            cari: y,
            size: 20
        },
        function (response) {
            pageItem = response.objData;
            fillTableData();
        },
        function (e) {
            $.errorMessage("Failed", e.responseJSON.txtMessage);
            $("#tbody").html("");
            $("#tbody").append("<tr><td colspan='9'><center><span class='text-muted'>No Data <a class='refresh' href=''>Refresh</a> </span></center></td></tr>");
        },
        headerData
    )
}
//=======================
// AJAX REQUEST GET ONE ALEREGEN
//=======================
function getOneAlergen(x) {
    $.postApi("/Master/Alergen/getByKode",
        {
            kode: x
        },
        function (response) {
            selectedAlergen = response.objData;
            console.log(selectedAlergen);
        },
        function (e) {
            $.errorMessage("Failed", e.responseJSON.txtMessage);
            $("#tbody").html("");
            $("#tbody").append("<tr><td colspan='9'><center><span class='text-muted'>No Data <a class='refresh' href=''>Refresh</a> </span></center></td></tr>");
        },
        headerData
    )
}

//=======================
// FILL TABLE DATA
//=======================
function fillTableData() {
    $("#tbody").html("");
    if (pageItem.hasContent) {
        for (let i = 0; i < pageItem.content.length; i++) {
            var m = pageItem.content[i];
            let $btnSetup = !m.bitSetup ? `<button class=' btn btn-outline-warning btn-setup' data-item='` + JSON.stringify(m) + `'> <i class='fa fa-edit'></i> Setup</button>` :'No Action Required';
            let row = "<tr id='intItemID" + m.intItemID + "'>" +
                "<td class='text-center'>" + m.intItemID + "</td>" +
                "<td class='text-center'>" + m.intInventoyItemID + "</td>" +
                "<td class='text-center'>" + m.txtItemCode + "</td>" +
                "<td class='text-center'>" + m.txtItemDescription + "</td>" +
                "<td class='text-center'>" + m.txtPrimaryUom + "</td>" +
                "<td class='text-center'>" + m.txtType + "</td>" +
                "<td class='text-center'>" + m.txtCategory + "</td>" +
                "<td class='text-center'>" + m.txtAttribute + "</td>" +
                "<td class='text-center'>" +
                $btnSetup +
                "</td>" +
                "</tr>";
            $("#tbody").append(row);
        }
        $(".btn-setup").on('click', function () {
            let r = $(this).data('item');
            selectedSetupItem = r;
            $.switchElement(elementToSwitch, 0);
        })

    } else {
        $("#tbody").append("<tr><td colspan='9'><center><span class='text-muted'>No Data <a class='refresh' href=''>Refresh</a> </span></center></td></tr>");
    }
    setButtonNextPrvVisibility();
}

function setupItemForm() {
    if (selectedSetupItem != null) {
        if (selectedSetupItem.txtAlergenCode.length > 0) {
            getOneAlergen(selectedAlergen)
        }
    }
}





//=======================
// EVENT LISTENER
//=======================
$btnNext.bind('click', () => {
    if (pageItem.hasNext) {
        getAllItem(pageItem.page + 1, cari);
    }
})

$btnPrev.bind('click', () => {
    if (pageItem.hasPrevious) {
        getAllItem(pageItem.page - 1, cari);
    }
})
$btnCancel.bind('click', () => {
    $.switchElement(elementToSwitch, 1);
    selectedSetupItem = null;

});
function searchItem() {
    pageItem.page = 1;
    getAllItem(pageItem.page, cari);
}

