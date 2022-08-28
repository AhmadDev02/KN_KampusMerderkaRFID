//=======================
// INITIALIZE DATA
//=======================
var cari = '';
let pageMenu = {};
pageMenu.page = 1;
pageMenu.hasContent = false;
pageMenu.hasNext = false;
pageMenu.hasPrevious = false;
let api = "/System/Menu";
let menu = {};
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
    pageMenu = {};
    pageMenu.page = 1;
    pageMenu.hasContent = false;
    pageMenu.hasNext = false;
    pageMenu.hasPrevious = false;
    api = "/System/Menu";
    menu = {};
    txtGUID = $("#txtGUID").val()
    __RequestVerificationToken = $('#frm input[name=__RequestVerificationToken]').val()
    headerData = {};
    headerData.__RequestVerificationToken = __RequestVerificationToken;
    setButtonNextPrvVisibility();
}
initializePage();
getAllMenu(pageMenu.page, cari);
function setButtonNextPrvVisibility() {
    if (pageMenu.hasNext) {
        $btnNext.show();
    } else {
        $btnNext.hide();
    }
    if (pageMenu.hasPrevious) {
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
function getAllMenu(x, y) {
    $.postApi(api + "/getAllMenu",
        {
            page: x,
            cari: y,
            size: 20
        },
        function (response) {
            pageMenu = response.objData;
            fillTableData();
        },
        function (e) {
            $.errorMessage("Failed", e.responseJSON.txtMessage);
            $("#tbodyLOV").html("");
            $("#tbodyLOV").append("<tr><td colspan='10'><center><span class='text-muted'>No Data <a class='refresh' href=''>Refresh</a> </span></center></td></tr>");
        },
        headerData
    )
}
//=======================
// FILL TABLE DATA
//=======================
function fillTableData() {
    $("#tbodyLOV").html("");
    if (pageMenu.hasContent) {
        for (let i = 0; i < pageMenu.content.length; i++) {
            var m = pageMenu.content[i];
            let $btnSelect = `<button class=' btn btn-outline-success btnEdit ' data-menu='` + JSON.stringify(m) + `'> <i class='fa fa-edit'></i> Select</button>`;
            let row = "<tr id='intMenuID" + m.intMenuID + "'>" +
                "<td class='text-center'>" +
                $btnSelect +
                "</td>" +
                "<td class='text-center'>" + m.intMenuID + "</td>" +
                "<td class='text-center'>" + m.txtMenuName + "</td>" +
                "<td class='text-center'>" + m.txtDescription + "</td>" +
                "<td class='text-center'>" + m.txtLink + "</td>" +
                "<td class='text-center'>" + (m.parent ? m.parent.txtMenuName : '-') + "</td>" +
                "<td class='text-center'>" + (m.module ? m.module.txtModuleName : '-') + "</td>" +
                "<td class='text-center'>" + m.intOrderID + "</td>" +
                "<td class='text-center'><i class='fa " + m.txtIcon + "'></i></td>" +
                "<td class='text-center'>" + m.bitActive + "</td>" +
                "</tr>";
            $("#tbodyLOV").append(row);
        }
        $(".btnSelect").on('click', function () {
            selectData($(this).data('menu'));
        })

    } else {
        $("#tbodyLOV").append("<tr><td colspan='10'><center><span class='text-muted'>No Data <a class='refresh' href=''>Refresh</a> </span></center></td></tr>");
    }
    setButtonNextPrvVisibility();
}


//=======================
// EVENT LISTENER
//=======================
$btnNext.bind('click', () => {
    if (pageMenu.hasNext) {
        getAllMenu(pageMenu.page + 1, cari);
    }
})

$btnPrev.bind('click', () => {
    if (pageMenu.hasPrevious) {
        getAllMenu(pageMenu.page - 1, cari);
    }
})

$cariLOV.on('keyup', function () {
    if ($cariLOV.val().toString().length % 3 == 0 && $cariLOV.val().toString() != cari || (e.key == 'Enter')) {
        cari = $cariLOV.val();
        getAllMenu(0, cari);
    }
})

/*================================
SELECT DATA
================================== */
function selectData(data) {
    parent.getSelectedModule(data); // pass it to parent page
    parent.$.fancybox.close();
}