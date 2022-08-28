//=======================
// INITIALIZE DATA
//=======================
var cari = '';
let pageMaterialChangeOver = {};
pageMaterialChangeOver.page = 1;
pageMaterialChangeOver.hasContent = false;
pageMaterialChangeOver.hasNext = false;
pageMaterialChangeOver.hasPrevious = false;
let api = "/Master/MaterialChangeOver";
let materialChangeOver = {};
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
    pageMaterialChangeOver = {};
    pageMaterialChangeOver.page = 1;
    pageMaterialChangeOver.hasContent = false;
    pageMaterialChangeOver.hasNext = false;
    pageMaterialChangeOver.hasPrevious = false;
    api = "/Master/MaterialChangeOver";
    materialChangeOver = {};
    txtGUID = $("#txtGUID").val()
    __RequestVerificationToken = $('#frm input[name=__RequestVerificationToken]').val()
    headerData = {};
    headerData.__RequestVerificationToken = __RequestVerificationToken;
    setButtonNextPrvVisibility();
}
initializePage();
getAllMaterialChangeOver(pageMaterialChangeOver.page, cari);
function setButtonNextPrvVisibility() {
    if (pageMaterialChangeOver.hasNext) {
        $btnNext.show();
    } else {
        $btnNext.hide();
    }
    if (pageMaterialChangeOver.hasPrevious) {
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
function getAllMaterialChangeOver(x, y) {
    $.postApi(api + "/getAllMaterialChangeOver",
        {
            page: x,
            cari: y,
            size: 20
        },
        function (response) {
            pageMaterialChangeOver = response.objData;
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
    if (pageMaterialChangeOver.hasContent) {
        for (let i = 0; i < pageMaterialChangeOver.content.length; i++) {
            var m = pageMaterialChangeOver.content[i];
            let $btnSelect = `<button class=' btn btn-outline-success btnSelect ' data-category='` + JSON.stringify(m) + `'> <i class='fa fa-check'></i> Select</button>`;
            let row = "<tr id='intMaterialChangeOverID" + m.intMaterialChangeOverID + "'>" +
                "<td class='text-center'>" +
                $btnSelect +
                "</td>" +
                "<td class='text-center'>" + m.intMaterialChangeOverID + "</td>" +
                "<td class='text-center'>" + m.txtMaterialChangeOverCode + "</td>" +
                "<td class='text-center'>" + m.txtMaterialChangeOverDescription + "</td>" +
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
    if (pageMaterialChangeOver.hasNext) {
        getAllMaterialChangeOver(pageMaterialChangeOver.page + 1, cari);
    }
})

$btnPrev.bind('click', () => {
    if (pageMaterialChangeOver.hasPrevious) {
        getAllMaterialChangeOver(pageMaterialChangeOver.page - 1, cari);
    }
})

$cariLOV.on('keyup', function () {
    if ($cariLOV.val().toString().length % 3 == 0 && $cariLOV.val().toString() != cari || (e.key == 'Enter')) {
        cari = $cariLOV.val();
        getAllMaterialChangeOver(0, cari);
    }
})

/*================================
SELECT DATA
================================== */
function selectData(data) {
    console.log(data);
    parent.getSelectedMaterialChangeOver(data); // pass it to parent page
    parent.$.fancybox.close();
}