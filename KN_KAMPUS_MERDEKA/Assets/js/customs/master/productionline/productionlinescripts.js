//=======================
// INITIALIZE DATA
//=======================
var cari = '';
let pageProductionLine = {};
pageProductionLine.page = 1;
pageProductionLine.hasContent = false;
pageProductionLine.hasNext = false;
pageProductionLine.hasPrevious = false;
let api = "/Master/ProductionLine";
let productionLine = {};
let txtGUID = $("#txtGUID").val()
let __RequestVerificationToken = $('#frm input[name=__RequestVerificationToken]').val()
let headerData = {};
headerData.__RequestVerificationToken = __RequestVerificationToken;
let elementToSwitch = [$("#productionLineFormRow"), $("#productionLineTableRow")];
let $productionLineFormTitle = $("#productionLineFormTitle");
$(function () {
    initializePage();
    getAllProductionLine(pageProductionLine.page, cari);
})
//=======================
// ALL BUTTON
//=======================
let $btnPrev = $("#btnPrev");
let $btnNext = $("#btnNext");
let $btnSave = $("#btnSave");
let $btnAddProductionLine = $("#btnAddProductionLine");
let $btnCancelAddProductionLine = $("#btnCancelAddProductionLine");
//=======================
// FORM 
//=======================
let $txtProductionLineCode = $("#txtProductionLineCode");
let $txtProductionLineDescription = $("#txtProductionLineDescription");
let $intLevel = $("#intLevel");
let $bitAutomatic = $("#bitAutomatic");
let $ImportExcel = $("#ImportExcel");

function initializePage() {
    page = 1;
    cari = "";
    pageProductionLine = {};
    pageProductionLine.page = 1;
    pageProductionLine.hasContent = false;
    pageProductionLine.hasNext = false;
    pageProductionLine.hasPrevious = false;
    api = "/Master/ProductionLine";
    user = {};
    txtGUID = $("#txtGUID").val()
    __RequestVerificationToken = $('#frm input[name=__RequestVerificationToken]').val()
    headerData = {};
    headerData.__RequestVerificationToken = __RequestVerificationToken;
    setButtonNextPrvVisibility();
    iniitializeData();
}

function setButtonNextPrvVisibility() {
    if (pageProductionLine.hasNext) {
        $btnNext.show();
    } else {
        $btnNext.hide();
    }
    if (pageProductionLine.hasPrevious) {
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
        productionLine = response.objData;
        setupAddProductionLineForm();
        $productionLineFormTitle.text = "Add ProductionLine";
    }, errorHandle, headerData);
}

function setupAddProductionLineForm() {
    $txtProductionLineCode.val(productionLine.txtProductionLineCode);
    $txtProductionLineDescription.val(productionLine.txtProductionLineDescription);
    $intLevel.val(productionLine.intLevel);
    $bitAutomatic.prop("checked", productionLine.bitAutomatic);
}

//=======================
// AJAX REQUEST GET ALL PRODUCT
//=======================
function getAllProductionLine(x, y) {
    $.postApi(api + "/getAllProductionLine",
        {
            page: x,
            cari: y,
            size: 20
        },
        function (response) {
            pageProductionLine = response.objData;
            fillTableData();
        },
        function (e) {
            $.errorMessage("Failed", e.responseJSON.txtMessage);
            $("#tbody").html("");
            $("#tbody").append("<tr><td colspan='6'><center><span class='text-muted'>No Data <a class='refresh' href=''>Refresh</a> </span></center></td></tr>");
        },
        headerData
    )
}
//=======================
// AJAX REQUEST SAVE PRODUCT
//=======================
function saveProductionLine() {
    $.postApi(api + "/Save",
        productionLine,
        function (response) {
            iniitializeData();
            $.switchElement(elementToSwitch, 1);
            $.successMessage("Sukses", "Berhasil menyimpan production Line");
            getAllProductionLine(0, cari)
        },
        function (e) {
            $.errorMessage("Failed", e.responseJSON.txtMessage);
            $("#tbody").html("");
            $("#tbody").append("<tr><td colspan='6'><center><span class='text-muted'>No Data <a class='refresh' href=''>Refresh</a> </span></center></td></tr>");
        },
        headerData
    )
}
//=======================
// FILL TABLE DATA
//=======================
function fillTableData() {
    $("#tbody").html("");
    if (pageProductionLine.hasContent) {
        for (let i = 0; i < pageProductionLine.content.length; i++) {
            var m = pageProductionLine.content[i];
            let $btnEdit = `<button class=' btn btn-outline-warning btnEdit ' data-productionline='` + JSON.stringify(m) + `'> <i class='fa fa-edit'></i> Edit</button>`;
            let row = "<tr id='intProductionLineID" + m.intProductionLineID + "'>" +
                "<td class='text-center'>" + m.intProductionLineID + "</td>" +
                "<td class='text-center'>" + m.txtProductionLineCode + "</td>" +
                "<td class='text-center'>" + m.txtProductionLineDescription + "</td>" +
                "<td class='text-center'>" + m.intLevel + "</td>" +
                "<td class='text-center'>" + m.bitAutomatic + "</td>" +
                "<td class='text-center'>" +
                $btnEdit +
                "</td>" +
                "</tr>";
            $("#tbody").append(row);
        }
        $(".btnEdit").on('click', function () {
            let r = $(this).data('productionline');
            setupDataProductionLineEdit(r);
            setupDataProductionLineEditForm();
            $.switchElement(elementToSwitch, 0);
            $productionLineFormTitle.text = "Edit ProductionLines";
        })

    } else {
        $("#tbody").append("<tr><td colspan='6'><center><span class='text-muted'>No Data <a class='refresh' href=''>Refresh</a> </span></center></td></tr>");
    }
    setButtonNextPrvVisibility();
}
//=======================
// ASSIGN PRODUCTION LINE SAVE
//=======================
function setupDataProductionLine() {
    productionLine.txtProductionLineCode = $txtProductionLineCode.val().toString();
    productionLine.txtProductionLineDescription = $txtProductionLineDescription.val().toString();
    productionLine.intLevel = parseInt($intLevel.val().toString());
    productionLine.bitAutomatic = $bitAutomatic.is(":checked");
}
//=======================
// ASSIGN EDIT PRODUCT
//=======================
function setupDataProductionLineEdit(r) {
    productionLine.intProductionLineID = r.intProductionLineID;
    productionLine.txtProductionLineCode = r.txtProductionLineCode;
    productionLine.txtProductionLineDescription = r.txtProductionLineDescription;
    productionLine.intLevel = r.intLevel;
    productionLine.txtGUID = r.txtGUID;
    productionLine.bitAutomatic = r.bitAutomatic;
}
//=======================
// ASSIGN EDIT PRODUCT FORM
//=======================
function setupDataProductionLineEditForm() {
    $txtProductionLineCode.val(productionLine.txtProductionLineCode);
    $txtProductionLineDescription.val(productionLine.txtProductionLineDescription);
    $intLevel.val(productionLine.intLevel)
}

//=======================
// EXPORT EXCEL
//=======================
function ExportExcelHendler(d) {

    let wb = XLSX.utils.book_new();
    let data = d
    wb.Props = {
        Title: "Production line E-RPS Export",
        Subject: "Production line E-RPS",
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
//=======================
// IMPORT EXCEL
//=======================
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
                    { productionLineRequest: dataExcel },
                    function (response) {
                        console.log(response)
                        if (response.bitSuccess == true) {
                            $.successMessage('Excel', "Berhasil di Save")
                        } else {
                            $.errorMessage('Failed', "Gagal Memperoses Import")
                        }
                    },
                    function (e) {
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

//=======================
// EVENT LISTENER
//=======================
$btnNext.bind('click', () => {
    if (pageProductionLine.hasNext) {
        getAllProductionLine(pageProductionLine.page + 1, cari);
    }
})

$btnPrev.bind('click', () => {
    if (pageProductionLine.hasPrevious) {
        getAllProductionLine(pageProductionLine.page - 1, cari);
    }
})
$btnAddProductionLine.bind('click', () => {
    $.switchElement(elementToSwitch, 0);
    iniitializeData();
})
$btnCancelAddProductionLine.bind('click', () => {
    $.switchElement(elementToSwitch, 1);
    $productionLineFormTitle.text = "Add ProductionLine";
})
$btnSave.bind('click', () => {
    setupDataProductionLine();
    $.confirmMessage("Confirm", "Save Production Line?", "Ya Save", saveProductionLine);
})

function searchProductionLine() {
    pageProductionLine.page = 1;
    getAllProductionLine(pageProductionLine.page, cari);
}

$("#ExportExcel").click(() => {
    $.postApi(api + "/ExportExcel",
        {

        },
        function (response) {
            let wbout = ExportExcelHendler(response.objData);

            saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), `Production line Export - ${new Date()}.xlsx`)
        },
        function (e) {
            $.errorMessage("Failed", e.responseJSON.txtMessage);

        },
    )
})

$(document).ready(() => {
    $ImportExcel.change(hendelFile)
})