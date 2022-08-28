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
let $cariLOV = $("#cariLOV");
cari = $cariLOV.val();
//=======================
// ALL BUTTON
//=======================
let $btnPrev = $("#btnPrevLOV");
let $btnNext = $("#btnNextLOV");


function initializePage() {
    page = 1;
    cari = "";
    pageMetodeChangeOver = {};
    pageMetodeChangeOver.page = 1;
    pageMetodeChangeOver.hasContent = false;
    pageMetodeChangeOver.hasNext = false;
    pageMetodeChangeOver.hasPrevious = false;
    api = "/Master/MetodeChangeOver";
    metodeChangeOver = {};
    txtGUID = $("#txtGUID").val()
    __RequestVerificationToken = $('#frm input[name=__RequestVerificationToken]').val()
    headerData = {};
    headerData.__RequestVerificationToken = __RequestVerificationToken;
    setButtonNextPrvVisibility();
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

//=======================
// AJAX REQUEST GET ALL MENU
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
    if (pageMetodeChangeOver.hasContent) {
        for (let i = 0; i < pageMetodeChangeOver.content.length; i++) {
            var m = pageMetodeChangeOver.content[i];
            let $btnSelect = `<button class=' btn btn-outline-success btnSelect ' data-category='` + JSON.stringify(m) + `'> <i class='fa fa-check'></i> Select</button>`;
            let row = "<tr id='intMetodeChangeOverID" + m.intMetodeChangeOverID + "'>" +
                "<td class='text-center'>" +
                $btnSelect +
                "</td>" +
                "<td class='text-center'>" + m.intMetodeChangeOverID + "</td>" +
                "<td class='text-center'>" + m.txtMetodeChangeOverCode + "</td>" +
                "<td class='text-center'>" + m.txtMetodeChangeOverDescription + "</td>" +
                "</tr>";
            $("#tbodyLOV").append(row);
        }
        $(".btnSelect").on('click', function () {
            selectData($(this).data('category'));
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
    if (pageMetodeChangeOver.hasNext) {
        getAllMetodeChangeOver(pageMetodeChangeOver.page + 1, cari);
    }
})

$btnPrev.bind('click', () => {
    if (pageMetodeChangeOver.hasPrevious) {
        getAllMetodeChangeOver(pageMetodeChangeOver.page - 1, cari);
    }
})

$cariLOV.on('keyup', function () {
    if ($cariLOV.val().toString().length % 3 == 0 && $cariLOV.val().toString() != cari || (e.key == 'Enter')) {
        cari = $cariLOV.val();
        getAllMetodeChangeOver(0, cari);
    }
})

/*================================
SELECT DATA
================================== */
function selectData(data) {
    console.log(data);
    parent.getSelectedMetodeChangeOver(data); // pass it to parent page
    parent.$.fancybox.close();
}