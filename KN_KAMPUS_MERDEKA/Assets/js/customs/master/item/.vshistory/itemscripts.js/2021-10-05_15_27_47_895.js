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

//=======================
// ALL BUTTON
//=======================
let $btnPrev = $("#btnPrev");
let $btnNext = $("#btnNext");
//=======================
// FORM 
//=======================

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
            $("#tbody").append("<tr><td colspan='5'><center><span class='text-muted'>No Data <a class='refresh' href=''>Refresh</a> </span></center></td></tr>");
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
            let $btnEdit = `<button class=' btn btn-outline-warning btnEdit ' data-item='` + JSON.stringify(m) + `'> <i class='fa fa-edit'></i> Edit</button>`;
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
                "No Action" +
                "</td>" +
                "</tr>";
            $("#tbody").append(row);
        }
        $(".btnEdit").on('click', function () {
            let r = $(this).data('item');
        })

    } else {
        $("#tbody").append("<tr><td colspan='9'><center><span class='text-muted'>No Data <a class='refresh' href=''>Refresh</a> </span></center></td></tr>");
    }
    setButtonNextPrvVisibility();
}
//=======================
// ASSIGN PRODUCT SAVE
//=======================
function setupDataItem() {
    item.txtItemCode = $txtItemCode.val().toString();
    item.txtItemDescription = $txtItemDescription.val().toString();
    item.intLevel = parseInt($intLevel.val().toString());
}
//=======================
// ASSIGN EDIT PRODUCT
//=======================
function setupDataItemEdit(r) {
    item.intItemID = r.intItemID;
    item.txtItemCode = r.txtItemCode;
    item.txtItemDescription = r.txtItemDescription;
    item.intLevel = r.intLevel;
    item.txtGUID = r.txtGUID;
}
//=======================
// ASSIGN EDIT PRODUCT FORM
//=======================
function setupDataItemEditForm() {
    $txtItemCode.val(item.txtItemCode);
    $txtItemDescription.val(item.txtItemDescription);
    $intLevel.val(item.intLevel)
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
$btnAddItem.bind('click', () => {
    $.switchElement(elementToSwitch, 0);
    iniitializeData();
})
$btnCancelAddItem.bind('click', () => {
    $.switchElement(elementToSwitch, 1);
    $itemFormTitle.text = "Add Item";
})
$btnSave.bind('click', () => {
    setupDataItem();
    $.confirmMessage("Confirm", "Save Item?", "Ya Save", saveItem);
})

function searchItem() {
    pageItem.page = 1;
    getAllItem(pageItem.page, cari);
}

