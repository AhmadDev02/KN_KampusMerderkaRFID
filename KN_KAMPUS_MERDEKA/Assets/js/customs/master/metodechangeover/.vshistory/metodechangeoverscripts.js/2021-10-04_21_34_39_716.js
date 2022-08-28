//=======================
// INITIALIZE DATA
//=======================
var cari = '';
let pageMetodeChangeOver = {};
pageMetodeChangeOver.page = 1;
pageMetodeChangeOver.hasContent = false;
pageMetodeChangeOver.hasNext = false;
pageMetodeChangeOver.hasPrevious = false;
let api = "/Master/MetodeChangeOver";
let metodeChangeOver = {};
let txtGUID = $("#txtGUID").val()
let __RequestVerificationToken = $('#frm input[name=__RequestVerificationToken]').val()
let headerData = {};
headerData.__RequestVerificationToken = __RequestVerificationToken;
let elementToSwitch = [$("#metodeChangeOverFormRow"), $("#metodeChangeOverTableRow")];
let $metodeChangeOverFormTitle = $("#metodeChangeOverFormTitle");

//=======================
// ALL BUTTON
//=======================
let $btnPrev = $("#btnPrev");
let $btnNext = $("#btnNext");
let $btnSave = $("#btnSave");
let $btnAddMetodeChangeOver = $("#btnAddMetodeChangeOver");
let $btnCancelAddMetodeChangeOver = $("#btnCancelAddMetodeChangeOver");
//=======================
// FORM 
//=======================
let $txtMetodeChangeOverCode = $("#txtMetodeChangeOverCode");
let $txtMetodeChangeOverDescription = $("#txtMetodeChangeOverDescription");
let $intLevel = $("#intLevel");

function initializePage() {
    page = 1;
    cari = "";
    pageMetodeChangeOver = {};
    pageMetodeChangeOver.page = 1;
    pageMetodeChangeOver.hasContent = false;
    pageMetodeChangeOver.hasNext = false;
    pageMetodeChangeOver.hasPrevious = false;
    api = "/Master/MetodeChangeOver";
    user = {};
    txtGUID = $("#txtGUID").val()
    __RequestVerificationToken = $('#frm input[name=__RequestVerificationToken]').val()
    headerData = {};
    headerData.__RequestVerificationToken = __RequestVerificationToken;
    setButtonNextPrvVisibility();
    iniitializeData();
}
initializePage();
getAllMetodeChangeOver(pageMetodeChangeOver.page, cari);
function setButtonNextPrvVisibility() {
    if (pageMetodeChangeOver.hasNext) {
        $btnNext.show();
    } else {
        $btnNext.hide();
    }
    if (pageMetodeChangeOver.hasPrevious) {
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
        metodeChangeOver = response.objData;
        setupAddMetodeChangeOverForm();
        $metodeChangeOverFormTitle.text = "Add Metode ChangeOver";
    }, errorHandle, headerData);
}

function setupAddMetodeChangeOverForm() {
    $txtMetodeChangeOverCode.val(metodeChangeOver.txtMetodeChangeOverCode);
    $txtMetodeChangeOverDescription.val(metodeChangeOver.txtMetodeChangeOverDescription);
    $intLevel.val(metodeChangeOver.intLevel);
}

//=======================
// AJAX REQUEST GET ALL PRODUCT
//=======================
function getAllMetodeChangeOver(x, y) {
    $.postApi(api + "/getAllMetodeChangeOver",
        {
            page: x,
            cari: y,
            size: 20
        },
        function (response) {
            pageMetodeChangeOver = response.objData;
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
function saveMetodeChangeOver() {
    $.postApi(api + "/Save",
        metodeChangeOver,
        function (response) {
            iniitializeData();
            $.switchElement(elementToSwitch, 1);
            $.successMessage("Sukses", "Berhasil menyimpan metodeChangeOver");
            getAllMetodeChangeOver(0, cari)
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
    if (pageMetodeChangeOver.hasContent) {
        for (let i = 0; i < pageMetodeChangeOver.content.length; i++) {
            var m = pageMetodeChangeOver.content[i];
            let $btnEdit = `<button class=' btn btn-outline-warning btnEdit ' data-metodeChangeOver='` + JSON.stringify(m) + `'> <i class='fa fa-edit'></i> Edit</button>`;
            let row = "<tr id='intMetodeChangeOverID" + m.intMetodeChangeOverID + "'>" +
                "<td class='text-center'>" + m.intMetodeChangeOverID + "</td>" +
                "<td class='text-center'>" + m.txtMetodeChangeOverCode + "</td>" +
                "<td class='text-center'>" + m.txtMetodeChangeOverDescription + "</td>" +
                "<td class='text-center'>" + m.intLevel + "</td>" +
                "<td class='text-center'>" +
                $btnEdit +
                "</td>" +
                "</tr>";
            $("#tbody").append(row);
        }
        $(".btnEdit").on('click', function () {
            let r = $(this).data('metodeChangeOver');
            setupDataMetodeChangeOverEdit(r);
            setupDataMetodeChangeOverEditForm();
            $.switchElement(elementToSwitch, 0);
            $metodeChangeOverFormTitle.text = "Edit MetodeChangeOvers";
        })

    } else {
        $("#tbody").append("<tr><td colspan='5'><center><span class='text-muted'>No Data <a class='refresh' href=''>Refresh</a> </span></center></td></tr>");
    }
    setButtonNextPrvVisibility();
}
//=======================
// ASSIGN PRODUCT SAVE
//=======================
function setupDataMetodeChangeOver() {
    metodeChangeOver.txtMetodeChangeOverCode = $txtMetodeChangeOverCode.val().toString();
    metodeChangeOver.txtMetodeChangeOverDescription = $txtMetodeChangeOverDescription.val().toString();
    metodeChangeOver.intLevel = parseInt($intLevel.val().toString());
}
//=======================
// ASSIGN EDIT PRODUCT
//=======================
function setupDataMetodeChangeOverEdit(r) {
    metodeChangeOver.intMetodeChangeOverID = r.intMetodeChangeOverID;
    metodeChangeOver.txtMetodeChangeOverCode = r.txtMetodeChangeOverCode;
    metodeChangeOver.txtMetodeChangeOverDescription = r.txtMetodeChangeOverDescription;
    metodeChangeOver.intLevel = r.intLevel;
    metodeChangeOver.txtGUID = r.txtGUID;
}
//=======================
// ASSIGN EDIT PRODUCT FORM
//=======================
function setupDataMetodeChangeOverEditForm() {
    $txtMetodeChangeOverCode.val(metodeChangeOver.txtMetodeChangeOverCode);
    $txtMetodeChangeOverDescription.val(metodeChangeOver.txtMetodeChangeOverDescription);
    $intLevel.val(metodeChangeOver.intLevel)
}

//=======================
// EVENT LISTENER
//=======================
$btnNext.bind('click', () => {
    if (pageMetodeChangeOver.hasNext) {
        getAllMetodeChangeOver(pageMetodeChangeOver.page + 1, cari);
    }
})

$btnPrev.bind('click', () => {
    if (pageMetodeChangeOver.hasPrevious) {
        getAllMetodeChangeOver(pageMetodeChangeOver.page - 1, cari);
    }
})
$btnAddMetodeChangeOver.bind('click', () => {
    $.switchElement(elementToSwitch, 0);
    iniitializeData();
})
$btnCancelAddMetodeChangeOver.bind('click', () => {
    $.switchElement(elementToSwitch, 1);
    $metodeChangeOverFormTitle.text = "Add MetodeChangeOver";
})
$btnSave.bind('click', () => {
    setupDataMetodeChangeOver();
    $.confirmMessage("Confirm", "Save MetodeChangeOver?", "Ya Save", saveMetodeChangeOver);
})

function searchMetodeChangeOver() {
    pageMetodeChangeOver.page = 1;
    getAllMetodeChangeOver(pageMetodeChangeOver.page, cari);
}

