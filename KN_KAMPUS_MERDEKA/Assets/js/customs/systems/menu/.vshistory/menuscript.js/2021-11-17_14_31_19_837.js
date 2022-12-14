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
let elementToSwitch = [$("#menuFormRow"), $("#menuTableRow")];
let $menuFormTitle = $("#menuFormTitle");
let selectedModule = {};
selectedModule.intModuleID = 0;
selectedModule.txtModuleName = "Select Module";
let selectedParentMenu = {};
selectedParentMenu.intMenuID = 0;
selectedParentMenu.txtMenuName = "Select Parent Menu";
$('#txtIcon').iconpicker({ placement: "inline" });
//=======================
// ALL BUTTON
//=======================
let $btnPrev = $("#btnPrev");
let $btnNext = $("#btnNext");
let $btnSave = $("#btnSave");
let $btnAddMenu = $("#btnAddMenu");
let $btnCancelAddMenu = $("#btnCancelAddMenu");
let $btnSelectModule = $("#btnSelectModule");
let $btnSelectParent = $("#btnSelectParent");
let $btnClearSelectParent = $("#btnClearSelectParent");
//=======================
// FORM MENU
//=======================
let $txtMenuName = $("#txtMenuName");
let $txtDescription = $("#txtDescription");
let $intOrderID = $("#intOrderID");
let $txtIcon = $("#txtIcon");
let $bitActive = $("#bitActive");
let $txtLink = $("#txtLink");
let $txtSelectedModuleName = $("#txtSelectedModuleName");
let $txtSelectedParentName = $("#txtSelectedParentName");


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
    txtGUID = $("#txtGUID").val();
    $txtLink.val("#");
    $txtIcon.val("fa fa-menu");
    __RequestVerificationToken = $('#frm input[name=__RequestVerificationToken]').val()
    headerData = {};
    headerData.__RequestVerificationToken = __RequestVerificationToken;
    selectedModule = {};
    selectedModule.intModuleID = 0;
    selectedModule.txtModuleName = "Select Module";
    selectedParentMenu = {};
    selectedParentMenu.intMenuID = 0;
    selectedParentMenu.txtMenuName = "Select Parent Menu";
    setButtonNextPrvVisibility();
    iniitializeData

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

function iniitializeData() {
    $.postApi(api + "/InitiateData", null, function (response) {
        menu = response.objData;
        setupAddMenuForm();
        $menuFormTitle.text = "Add Menu";
    }, errorHandle, headerData);
}

//=======================
// SETUP FORM MENU
//=======================
function setupAddMenuForm() {
    $txtMenuName.val(menu.txtMenuName);
    $txtDescription.val(menu.txtDescription);
    $txtMenuName.val("");
    $txtDescription.val("");
    $intOrderID.val("");
    $txtIcon.val("");
    $bitActive.val("");
    $txtLink.val("");
    $txtSelectedModuleName.val("");
    $txtSelectedParentName.val("");
    selectedParentMenu = null;
    selectedModule = null;
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
            $("#tbody").html("");
            $("#tbody").append("<tr><td colspan='10'><center><span class='text-muted'>No Data <a class='refresh' href=''>Refresh</a> </span></center></td></tr>");
        },
        headerData
    )
}
//=======================
// AJAX REQUEST SAVE MENU
//=======================
function saveMenu() {
    $.postApi(api + "/Save",
        menu,
        function (response) {
            iniitializeData();
            $.switchElement(elementToSwitch, 1);
            $.successMessage("Sukses", "Berhasil menyimpan menu");
            getAllMenu(0, cari)
        },
        function (e) {
            $.errorMessage("Failed", e.responseJSON.txtMessage);
            $("#tbody").html("");
            $("#tbody").append("<tr><td colspan='10'><center><span class='text-muted'>No Data <a class='refresh' href=''>Refresh</a> </span></center></td></tr>");
        },
        headerData
    )
}
//=======================
// FILL TABLE DATA
//=======================
function fillTableData() {
    $("#tbody").html("");
    if (pageMenu.hasContent) {
        for (let i = 0; i < pageMenu.content.length; i++) {
            var m = pageMenu.content[i];
            let $btnEdit = `<button class=' btn btn-outline-warning btnEdit ' data-menu='` + JSON.stringify(m) + `'> <i class='fa fa-edit'></i> Edit</button>`;
            let row = "<tr id='intMenuID" + m.intMenuID + "'>" +
                "<td class='text-center'>" + m.intMenuID + "</td>" +
                "<td class='text-center'>" + m.txtMenuName + "</td>" +
                "<td class='text-center'>" + m.txtDescription + "</td>" +
                "<td class='text-center'>" + m.txtLink + "</td>" +
                "<td class='text-center'>" + (m.parent ? m.parent.txtMenuName : '-') + "</td>" +
                "<td class='text-center'>" + (m.module ? m.module.txtModuleName : '-') + "</td>" +
                "<td class='text-center'>" + m.intOrderID + "</td>" +
                "<td class='text-center'><i class='fa " + m.txtIcon + "'></i></td>" +
                "<td class='text-center'>" + m.bitActive + "</td>" +
                "<td class='text-center'>" +
                $btnEdit +
                "</td>" +
                "</tr>";
            $("#tbody").append(row);
        }
        $(".btnEdit").on('click', function () {
            let r = $(this).data('menu');
            setupDataMenuEdit(r);
            setupDataMenuEditForm();
            $.switchElement(elementToSwitch, 0);
            $menuFormTitle.text = "Edit Menus";
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
    menu.txtLink = $txtLink.val().toString();
    menu.intModuleID = selectedModule.intModuleID;
    menu.intParentID = selectedParentMenu !== null ? selectedParentMenu.intMenuID : 0;
    menu.intOrderID = $intOrderID.val().toString();
    menu.txtIcon = $txtIcon.val().toString();
    menu.bitActive = $bitActive.is(":checked");

}
//=======================
// ASSIGN EDIT MENU
//=======================
function setupDataMenuEdit(r) {
    menu.intMenuID = r.intMenuID;
    menu.txtMenuName = r.txtMenuName;
    menu.txtDescription = r.txtDescription;
    menu.txtGUID = r.txtGUID;
    selectedParentMenu = r.parent;
    selectedModule = r.module;
    menu.txtLink = r.txtLink;
    menu.intOrderID = r.intOrderID;
    menu.bitActive = r.bitActive;
    menu.txtIcon = r.txtIcon;
}
//=======================
// ASSIGN EDIT MENU FORM
//=======================
function setupDataMenuEditForm() {
    $txtMenuName.val(menu.txtMenuName);
    $txtDescription.val(menu.txtDescription);
    $intOrderID.val(menu.intOrderID);
    $txtIcon.val(menu.txtIcon);
    $txtLink.val(menu.txtLink);
    if (selectedModule != null ) {
        $txtSelectedModuleName.val(selectedModule.txtModuleName);
    }
    if (selectedParentMenu != null) {

        $txtSelectedParentName.val(selectedParentMenu.txtMenuName);
    } else {
        selectedParentMenu = {};
        selectedParentMenu.intMenuID = 0;
        selectedParentMenu.txtMenuName = "Select Parent Menu";
        $txtSelectedParentName.val(selectedParentMenu.txtMenuName);
    }

    $bitActive.prop("checked", menu.bitActive);
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
    if (selectedModule) {
        setupDataMenu();
        $.confirmMessage("Confirm", "Save Menu?", "Ya Save", saveMenu);
    }
})
$btnSelectModule.bind('click', () => {
    $.showLOV("Module");
})
$btnSelectParent.bind('click', () => {
    $.showLOV("Menu");
});
$btnClearSelectParent.bind('click', () => {
    selectedParentMenu = {};
    selectedParentMenu.intMenuID = 0;
    selectedParentMenu.txtMenuName = "Select Parent Menu";
    $txtSelectedParentName.val(selectedParentMenu.txtMenuName);
})
function searchMenu() {
    pageMenu.page = 1;
    getAllMenu(pageMenu.page, cari);
}

$txtIcon.on('iconpickerSelected', function (event) {
    console.log(event.iconpickerValue)
    $txtIcon.val(event.iconpickerValue)
});