//=======================
// INITIALIZE DATA
//=======================
var cari = '';
let pageGramasi = {};
pageGramasi.page = 1;
pageGramasi.hasContent = false;
pageGramasi.hasNext = false;
pageGramasi.hasPrevious = false;
let api = "/Master/Gramasi";
let gramasi = {};
let txtGUID = $("#txtGUID").val()
let __RequestVerificationToken = $('#frm input[name=__RequestVerificationToken]').val()
let headerData = {};
headerData.__RequestVerificationToken = __RequestVerificationToken;
let elementToSwitch = [$("#gramasiFormRow"), $("#gramasiTableRow")];
let $gramasiFormTitle = $("#gramasiFormTitle");

//=======================
// ALL BUTTON
//=======================
let $btnPrev = $("#btnPrev");
let $btnNext = $("#btnNext");
let $btnSave = $("#btnSave");
let $btnAddGramasi = $("#btnAddGramasi");
let $btnCancelAddGramasi = $("#btnCancelAddGramasi");
//=======================
// FORM 
//=======================
let $decGramasi = $("#decGramasi");

function initializePage() {
    page = 1;
    cari = "";
    pageGramasi = {};
    pageGramasi.page = 1;
    pageGramasi.hasContent = false;
    pageGramasi.hasNext = false;
    pageGramasi.hasPrevious = false;
    api = "/Master/Gramasi";
    user = {};
    txtGUID = $("#txtGUID").val()
    __RequestVerificationToken = $('#frm input[name=__RequestVerificationToken]').val()
    headerData = {};
    headerData.__RequestVerificationToken = __RequestVerificationToken;
    setButtonNextPrvVisibility();
    iniitializeData();
}
initializePage();
getAllGramasi(pageGramasi.page, cari);
function setButtonNextPrvVisibility() {
    if (pageGramasi.hasNext) {
        $btnNext.show();
    } else {
        $btnNext.hide();
    }
    if (pageGramasi.hasPrevious) {
        $btnPrev.show()
    } else {
        $btnPrev.hide();
    }
}


function errorHandle(error) {
    $.errorMessage("Error", error.responseJSON.txtMessage)
}

function iniitializeData() {
    $.postApi(api + "/InitiateData", null, function (response) {
        gramasi = response.objData;
        setupAddGramasiForm();
        $gramasiFormTitle.text = "Add Gramasi";
        $decGramasi.val("0";)
    }, errorHandle, headerData);
}

function setupAddGramasiForm() {

}

//=======================
// AJAX REQUEST GET ALL PRODUCT
//=======================
function getAllGramasi(x, y) {
    $.postApi(api + "/getAllGramasi",
        {
            page: x,
            cari: y,
            size: 20
        },
        function (response) {
            pageGramasi = response.objData;
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
// AJAX REQUEST SAVE PRODUCT
//=======================
function saveGramasi() {
    $.postApi(api + "/Save",
        gramasi,
        function (response) {
            iniitializeData();
            $.switchElement(elementToSwitch, 1);
            $.successMessage("Sukses", "Berhasil menyimpan gramasi");
            getAllGramasi(0, cari)
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
    if (pageGramasi.hasContent) {
        for (let i = 0; i < pageGramasi.content.length; i++) {
            var m = pageGramasi.content[i];
            let $btnEdit = `<button class=' btn btn-outline-warning btnEdit ' data-gramasi='` + JSON.stringify(m) + `'> <i class='fa fa-edit'></i> Edit</button>`;
            let row = "<tr id='intGramasiID" + m.intGramasiID + "'>" +
                "<td class='text-center'>" + m.intGramasiID + "</td>" +
                "<td class='text-center'>" + m.txtGramasiCode + "</td>" +
                "<td class='text-center'>" + m.txtGramasiDescription + "</td>" +
                "<td class='text-center'>" + m.intLevel + "</td>" +
                "<td class='text-center'>" +
                $btnEdit +
                "</td>" +
                "</tr>";
            $("#tbody").append(row);
        }
        $(".btnEdit").on('click', function () {
            let r = $(this).data('gramasi');
            setupDataGramasiEdit(r);
            setupDataGramasiEditForm();
            $.switchElement(elementToSwitch, 0);
            $gramasiFormTitle.text = "Edit Gramasis";
        })

    } else {
        $("#tbody").append("<tr><td colspan='5'><center><span class='text-muted'>No Data <a class='refresh' href=''>Refresh</a> </span></center></td></tr>");
    }
    setButtonNextPrvVisibility();
}
//=======================
// ASSIGN PRODUCT SAVE
//=======================
function setupDataGramasi() {
    gramasi.txtGramasiCode = $txtGramasiCode.val().toString();
    gramasi.txtGramasiDescription = $txtGramasiDescription.val().toString();
    gramasi.intLevel = parseInt($intLevel.val().toString());
}
//=======================
// ASSIGN EDIT PRODUCT
//=======================
function setupDataGramasiEdit(r) {
    gramasi.intGramasiID = r.intGramasiID;
    gramasi.txtGramasiCode = r.txtGramasiCode;
    gramasi.txtGramasiDescription = r.txtGramasiDescription;
    gramasi.intLevel = r.intLevel;
    gramasi.txtGUID = r.txtGUID;
}
//=======================
// ASSIGN EDIT PRODUCT FORM
//=======================
function setupDataGramasiEditForm() {
    $txtGramasiCode.val(gramasi.txtGramasiCode);
    $txtGramasiDescription.val(gramasi.txtGramasiDescription);
    $intLevel.val(gramasi.intLevel)
}

//=======================
// EVENT LISTENER
//=======================
$btnNext.bind('click', () => {
    if (pageGramasi.hasNext) {
        getAllGramasi(pageGramasi.page + 1, cari);
    }
})

$btnPrev.bind('click', () => {
    if (pageGramasi.hasPrevious) {
        getAllGramasi(pageGramasi.page - 1, cari);
    }
})
$btnAddGramasi.bind('click', () => {
    $.switchElement(elementToSwitch, 0);
    iniitializeData();
})
$btnCancelAddGramasi.bind('click', () => {
    $.switchElement(elementToSwitch, 1);
    $gramasiFormTitle.text = "Add Gramasi";
})
$btnSave.bind('click', () => {
    setupDataGramasi();
    $.confirmMessage("Confirm", "Save Gramasi?", "Ya Save", saveGramasi);
})

function searchGramasi() {
    pageGramasi.page = 1;
    getAllGramasi(pageGramasi.page, cari);
}

