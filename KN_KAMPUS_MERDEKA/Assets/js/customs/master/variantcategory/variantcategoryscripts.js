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
let elementToSwitch = [$("#variantCategoryFormRow"), $("#variantCategoryTableRow")];
let $variantCategoryFormTitle = $("#variantCategoryFormTitle");

//=======================
// ALL BUTTON
//=======================
let $btnPrev = $("#btnPrev");
let $btnNext = $("#btnNext");
let $btnSave = $("#btnSave");
let $btnAddVariantCategory = $("#btnAddVariantCategory");
let $btnCancelAddVariantCategory = $("#btnCancelAddVariantCategory");
//=======================
// FORM 
//=======================
let $txtVariantCategoryCode = $("#txtVariantCategoryCode");
let $txtVariantCategoryDescription = $("#txtVariantCategoryDescription");
let $intLevel = $("#intLevel");
let $ImportExcel = $("#ImportExcel");

function initializePage() {
    page = 1;
    cari = "";
    pageVariantCategory = {};
    pageVariantCategory.page = 1;
    pageVariantCategory.hasContent = false;
    pageVariantCategory.hasNext = false;
    pageVariantCategory.hasPrevious = false;
    api = "/Master/VariantCategory";
    user = {};
    txtGUID = $("#txtGUID").val()
    __RequestVerificationToken = $('#frm input[name=__RequestVerificationToken]').val()
    headerData = {};
    headerData.__RequestVerificationToken = __RequestVerificationToken;
    setButtonNextPrvVisibility();
    iniitializeData();
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

function iniitializeData() {
    $.postApi(api + "/InitiateData", null, function (response) {
        variantCategory = response.objData;
        setupAddVariantCategoryForm();
        $variantCategoryFormTitle.text = "Add VariantCategory";
    }, errorHandle, headerData);
}

function setupAddVariantCategoryForm() {
    $txtVariantCategoryCode.val(variantCategory.txtVariantCategoryCode);
    $txtVariantCategoryDescription.val(variantCategory.txtVariantCategoryDescription);
    $intLevel.val(variantCategory.intLevel);
}

//=======================
// AJAX REQUEST GET ALL PRODUCT
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
            $("#tbody").html("");
            $("#tbody").append("<tr><td colspan='5'><center><span class='text-muted'>No Data <a class='refresh' href=''>Refresh</a> </span></center></td></tr>");
        },
        headerData
    )
}
//=======================
// AJAX REQUEST SAVE PRODUCT
//=======================
function saveVariantCategory() {
    $.postApi(api + "/Save",
        variantCategory,
        function (response) {
            iniitializeData();
            $.switchElement(elementToSwitch, 1);
            $.successMessage("Sukses", "Berhasil menyimpan variantCategory");
            getAllVariantCategory(0, cari)
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
    if (pageVariantCategory.hasContent) {
        for (let i = 0; i < pageVariantCategory.content.length; i++) {
            var m = pageVariantCategory.content[i];
            let $btnEdit = `<button class='btn btn-outline-warning btnEdit' data-variantCat='` + JSON.stringify(m) + `'> <i class='fa fa-edit'></i> Edit</button>`;
            let row = "<tr id='intVariantCategoryID" + m.intVariantCategoryID + "'>" +
                "<td class='text-center'>" + m.intVariantCategoryID + "</td>" +
                "<td class='text-center'>" + m.txtVariantCategoryCode + "</td>" +
                "<td class='text-center'>" + m.txtVariantCategoryDescription + "</td>" +
                "<td class='text-center'>" + m.intLevel + "</td>" +
                "<td class='text-center'>" +
                $btnEdit +
                "</td>" +
                "</tr>";
            $("#tbody").append(row);
        }
        $(".btnEdit").on('click', function () {
            let r = $(this).data('variantcat');
            setupDataVariantCategoryEdit(r);
            setupDataVariantCategoryEditForm();
            $.switchElement(elementToSwitch, 0);
            $variantCategoryFormTitle.text = "Edit Variant Categorys";
        })

    } else {
        $("#tbody").append("<tr><td colspan='5'><center><span class='text-muted'>No Data <a class='refresh' href=''>Refresh</a> </span></center></td></tr>");
    }
    setButtonNextPrvVisibility();
}
//=======================
// ASSIGN PRODUCT SAVE
//=======================
function setupDataVariantCategory() {
    variantCategory.txtVariantCategoryCode = $txtVariantCategoryCode.val().toString();
    variantCategory.txtVariantCategoryDescription = $txtVariantCategoryDescription.val().toString();
    variantCategory.intLevel = parseInt($intLevel.val().toString());
}
//=======================
// ASSIGN EDIT PRODUCT
//=======================
function setupDataVariantCategoryEdit(r) {
    variantCategory.intVariantCategoryID = r.intVariantCategoryID;
    variantCategory.txtVariantCategoryCode = r.txtVariantCategoryCode;
    variantCategory.txtVariantCategoryDescription = r.txtVariantCategoryDescription;
    variantCategory.intLevel = r.intLevel;
    variantCategory.txtGUID = r.txtGUID;
}
//=======================
// ASSIGN EDIT PRODUCT FORM
//=======================
function setupDataVariantCategoryEditForm() {
    $txtVariantCategoryCode.val(variantCategory.txtVariantCategoryCode);
    $txtVariantCategoryDescription.val(variantCategory.txtVariantCategoryDescription);
    $intLevel.val(variantCategory.intLevel)
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
$btnAddVariantCategory.bind('click', () => {
    $.switchElement(elementToSwitch, 0);
    iniitializeData();
})
$btnCancelAddVariantCategory.bind('click', () => {
    $.switchElement(elementToSwitch, 1);
    $variantCategoryFormTitle.text = "Add Variant Category";
})
$btnSave.bind('click', () => {
    setupDataVariantCategory();
    $.confirmMessage("Confirm", "Save Variant Category?", "Ya Save", saveVariantCategory);
})

function searchVariantCategory() {
    pageVariantCategory.page = 1;
    getAllVariantCategory(pageVariantCategory.page, cari);
}

//===============================
//IMPORT EXCEL
//===============================
$(document).ready(() => {
    $ImportExcel.change(hendelFile)
})

function hendelFile(e) {
    let files = e.target.files;
    for (i = 0, f = files[i]; i != files.length; ++i) {
        var reader = new FileReader();
        var name = f.name;
        reader.onload = function (e) {
            var data = e.target.result;

            var result;
            try {
                var workbook = XLSX.read(data, { type: 'binary' });

                var sheet_name_list = workbook.SheetNames;
                sheet_name_list.forEach(function (y) { /* iterate through sheets */
                    //Convert the cell value to Json
                    var roa = XLSX.utils.sheet_to_json(workbook.Sheets[y]);
                    if (roa.length > 0) {
                        result = roa;
                    }
                });
                //Get the result                
                dataExcel = result
                $.postApi(api + "/ImportExcel",
                    { variantCategoryRequest: dataExcel },
                    function (response) {
                        $.successMessage('Excel', "Berhasil di Save")
                    },
                    function (e) {
                        console.log(e);
                        $.errorMessage("Failed", e.responseJSON.txtMessage);
                    },
                    headerData
                )
            } catch (e) {
                $.errorMessage('Excel', "Tidak dapat memproses file !")
            }

        };
        reader.readAsArrayBuffer(f);
    }
}

//============================================
// EXPORT EXCEL
//============================================


function ExportExcelHendler(d) {

    let wb = XLSX.utils.book_new();
    let data = d
    wb.Props = {
        Title: "Variant Category Export",
        Subject: "Varian Category",
        Author: "Application E-RPS",
        Company: "PT Sanghiang Perkasa",
        Category: "Report",
        CreatedDate: new Date()
    }
    wb.SheetNames.push("Export")

    var ws = XLSX.utils.json_to_sheet(data)
    wb.Sheets["Export"] = ws

    var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
    return wbout;
}

function s2ab(s) {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
    return buf
}

$("#ExportExcel").click(() => {
    $.postApi(api + "/ExportExcel",
        {
            
        },
        function (response) {
            let wbout = ExportExcelHendler(response.objData);

            saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), `Variant Category Export - ${new Date()}.xlsx`)
        },
        function (e) {
            $.errorMessage("Failed", e.responseJSON.txtMessage);
            
        },
    )
})