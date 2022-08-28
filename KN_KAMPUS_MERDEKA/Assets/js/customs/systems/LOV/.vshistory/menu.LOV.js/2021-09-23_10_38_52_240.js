﻿//=======================
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
            let $btnSelect = `<button class=' btn btn-outline-warning btnEdit ' data-menu='` + JSON.stringify(m) + `'> <i class='fa fa-edit'></i> Edit</button>`;
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
        $(".btnEdit").on('click', function () {

        })

    } else {
        $("#tbody").append("<tr><td colspan='10'><center><span class='text-muted'>No Data <a class='refresh' href=''>Refresh</a> </span></center></td></tr>");
    }
    setButtonNextPrvVisibility();
}
//=======================
// ASSIGN ROLE SAVE
//=======================
function setupDataMenu() {
    menu.txtMenuName = $txtMenuName.val().toString();
    menu.txtDescription = $txtDescription.val().toString();
}
//=======================
// ASSIGN EDIT MENU
//=======================
function setupDataMenuEdit(r) {
    menu.intMenuID = r.intMenuID;
    menu.txtMenuName = r.txtMenuName;
    menu.txtDescription = r.txtDescription;
    menu.txtGUID = r.txtGUID;
}
//=======================
// ASSIGN EDIT MENU FORM
//=======================
function setupDataMenuEditForm() {
    $txtMenuName.val(menu.txtMenuName);
    $txtDescription.val(menu.txtDescription);
}
/*================================
GET SELECTED MODULE
================================== */
function getSelectedModule(x) {
    selectedModule = x;
    $txtSelectedModuleName.val(x.txtModuleName);

}
/*================================
GET SELECTED MENU
================================== */
function getSelectedMenu(x) {
    selectedParentMenu = x;
    $txtSelectedParentName.val(x.txtMenuName);

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
$btnAddMenu.bind('click', () => {
    $.switchElement(elementToSwitch, 0);
    iniitializeData();
})
$btnCancelAddMenu.bind('click', () => {
    $.switchElement(elementToSwitch, 1);
    $menuFormTitle.text = "Add Menu";
})
$btnSave.bind('click', () => {
    setupDataMenu();
    $.confirmMessage("Confirm", "Save Menu?", "Ya Save", saveMenu);
})
$btnSelectModule.bind('click', () => {
    $.showLOV("Module");
})

function searchMenu() {
    pageMenu.page = 1;
    getAllMenu(pageMenu.page, cari);
}

