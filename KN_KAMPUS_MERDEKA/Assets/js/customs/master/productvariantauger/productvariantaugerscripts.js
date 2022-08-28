//=======================
// INITIALIZE DATA
//=======================
var cari = '';
let pageProductVariantAuger = {};
pageProductVariantAuger.page = 1;
pageProductVariantAuger.hasContent = false;
pageProductVariantAuger.hasNext = false;
pageProductVariantAuger.hasPrevious = false;
let api = "/Master/ProductVariantAuger";
let productVariantAuger = {};
let txtGUID = $("#txtGUID").val()
let __RequestVerificationToken = $('#frm input[name=__RequestVerificationToken]').val()
let headerData = {};
headerData.__RequestVerificationToken = __RequestVerificationToken;
let elementToSwitch = [$("#productVariantAugerFormRow"), $("#productVariantAugerTableRow")];
let $productVariantAugerFormTitle = $("#productVariantAugerFormTitle"); 
let selectedProductVariant = null;
let selectedAuger = null;
//=======================
// ALL BUTTON
//=======================
let $btnPrev = $("#btnPrev");
let $btnNext = $("#btnNext");
let $btnSave = $("#btnSave");
let $btnAddProductVariantAuger = $("#btnAddProductVariantAuger");
let $btnCancelAddProductVariantAuger = $("#btnCancelAddProductVariantAuger");
let $btnSelectAuger = $("#btnSelectAuger");
let $btnSelectProductVariant = $("#btnSelectProductVariant");
//=======================
// FORM 
//=======================
let $txtSelectedProductVariant = $("#txtSelectedProductVariant");
let $txtSelectedAuger = $("#txtSelectedAuger");
let $ImportExcel = $("#ImportExcel");

function initializePage() {
    page = 1;
    cari = "";
    pageProductVariantAuger = {};
    pageProductVariantAuger.page = 1;
    pageProductVariantAuger.hasContent = false;
    pageProductVariantAuger.hasNext = false;
    pageProductVariantAuger.hasPrevious = false;
    selectedProductVariant = null;
    selectedAuger = null;
    productVariantAuger = {};
    txtGUID = $("#txtGUID").val()
    __RequestVerificationToken = $('#frm input[name=__RequestVerificationToken]').val()
    headerData = {};
    headerData.__RequestVerificationToken = __RequestVerificationToken;
    setButtonNextPrvVisibility();
    iniitializeData();
}
initializePage();
getAllProductVariantAuger(pageProductVariantAuger.page, cari);
function setButtonNextPrvVisibility() {
    if (pageProductVariantAuger.hasNext) {
        $btnNext.show();
    } else {
        $btnNext.hide();
    }
    if (pageProductVariantAuger.hasPrevious) {
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
        productVariantAuger = response.objData;
        $productVariantAugerFormTitle.text = "Add Product Variant Auger";
    }, errorHandle, headerData);

    selectedAuger = null;
    selectedProductVariant = null;
    $txtSelectedAuger.val("");
    $txtSelectedProductVariant.val("")
}



//=======================
// AJAX REQUEST GET ALL PRODUCT VARIANT AUGER
//=======================
function getAllProductVariantAuger(x, y) {
    $.postApi(api + "/getAllProductVariantAuger",
        {
            page: x,
            cari: y,
            size: 20
        },
        function (response) {
            pageProductVariantAuger = response.objData;
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
// AJAX REQUEST SAVE PRODUCT VARIANT AUGER
//=======================
function saveProductVariantAuger() {
    $.postApi(api + "/Save",
        productVariantAuger,
        function (response) {
            iniitializeData();
            $.switchElement(elementToSwitch, 1);
            $.successMessage("Sukses", "Berhasil menyimpan Product Variant Auger");
            getAllProductVariantAuger(0, cari)
            selectedAuger = null;
            selectedProductVariant = null;
            $txtSelectedAuger.val("");
            $txtSelectedProductVariant.val("")
        },
        function (e) {
            $.errorMessage("Failed", e.responseJSON.txtMessage);
        },
        headerData
    )
}
//=======================
// FILL TABLE DATA
//=======================
function fillTableData() {
    $("#tbody").html("");
    if (pageProductVariantAuger.hasContent) {
        for (let i = 0; i < pageProductVariantAuger.content.length; i++) {
            var m = pageProductVariantAuger.content[i];
            let $btnEdit = `<button class=' btn btn-outline-warning btnEdit m-1' data-productvariantauger='` + JSON.stringify(m) + `'> <i class='fa fa-edit'></i> Edit</button>`;
            let $btnGramasi = `<a href='/master/gramasi?id=` + m.intProductVariantAugerID + `' class=' btn btn-outline-success btnGramasi m-1' data-productvariantauger='` + JSON.stringify(m) + `'> <i class='fa fa-balance-scale'></i> Gramasi</button>`;
            let row = "<tr id='intProductVariantAugerID" + m.intProductVariantAugerID + "'>" +
                "<td class='text-center'>" + m.intProductVariantAugerID + "</td>" +
                "<td class='text-center'>" + m.txtProductVariantAugerCode + "</td>" +
                "<td class='text-center'>" + m.productVariant.txtProductVariantDescription + "</td>" +
                "<td class='text-center'>" + m.auger.intAugerSize + "</td>" +
                "<td class='text-center'>" +
                $btnEdit +
                $btnGramasi +
                "</td>" +
                "</tr>";
            $("#tbody").append(row);
        }
        $(".btnEdit").on('click', function () {
            let r = $(this).data('productvariantauger');
            setupDataProductVariantAugerEdit(r);
            setupDataProductVariantAugerEditForm();
            $.switchElement(elementToSwitch, 0);
            $productVariantAugerFormTitle.text = "Edit ProductVariantAugers";
        })

    } else {
        $("#tbody").append("<tr><td colspan='5'><center><span class='text-muted'>No Data <a class='refresh' href=''>Refresh</a> </span></center></td></tr>");
    }
    setButtonNextPrvVisibility();
}
//=======================
// ASSIGN PRODUCT SAVE
//=======================
function setupDataProductVariantAuger() {
    productVariantAuger.intAugerID = selectedAuger.intAugerID
    productVariantAuger.intProductVariantID = selectedProductVariant.intProductVariantID;
}
//=======================
// ASSIGN EDIT PRODUCT
//=======================
function setupDataProductVariantAugerEdit(r) {
    productVariantAuger.txtGUID = r.txtGUID;
    productVariantAuger.bitActive = r.bitActive;
    productVariantAuger.intProductVariantID = r.productVariant.intProductVariantID;
    productVariantAuger.intAugerID = r.auger.intAugerID;
    productVariantAuger.intProductVariantAugerID = r.intProductVariantAugerID;
    selectedProductVariant = r.productVariant;
    selectedAuger = r.auger;
}
//=======================
// ASSIGN EDIT PRODUCT FORM
//=======================
function setupDataProductVariantAugerEditForm() {
    $txtSelectedAuger.val(selectedAuger.intAugerSize + " - " + selectedAuger.txtAugerDescription)
    $txtSelectedProductVariant.val(selectedProductVariant.txtProductVariantCode + " - " + selectedProductVariant.txtProductVariantDescription)
}
//=======================
// GET SELECTED AUGER
//=======================
function getSelectedAuger(x) {
    selectedAuger = x;
    $txtSelectedAuger.val(x.intAugerSize +" - "+ x.txtAugerDescription)
}
//=======================
// GET SELECTED PRODUCT VARIANT
//=======================
function getSelectedProductVariant(x) {
    selectedProductVariant = x;
    $txtSelectedProductVariant.val(x.txtProductVariantCode + " - " + x.txtProductVariantDescription)
}

//=======================
// EXPORT EXCEL
//=======================
function ExportExcelHendler(d) {

    let wb = XLSX.utils.book_new();
    let data = d
    wb.Props = {
        Title: "Product Variant Auger E-RPS Export",
        Subject: "Product Variant Auger E-RPS",
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

                $('#uploadModal').modal('show')
                let successCount = 0;
                let failedCount = 0;

                dataExcel.forEach((item, index) => {
                    let row = `<tr id='uploadExcelID-${index}'>` +
                        "<td class='text-center'>" + item.intProductVariantID + "</td>" +
                        "<td class='text-center'>" + item.intAugerID + "</td>" +
                        "<td class='text-center'>" + item.decGramasi + "</td>" +
                        "<td class='text-center' id='statusUploadId-" + index + "'><span class='badge badge-warning'>Pending</span></td>" +
                        "</tr>";
                    $("#tbodyUpload").append(row);

                    setTimeout(function () {
                        $.ajax({
                            type: "POST",
                            url: api + "/ImportExcel",
                            data: JSON.stringify({ productVariantAugerRequest: item }),
                            contentType: "application/json; charset=utf-8",
                            datatype: "json",
                            async: false,
                            headers: headerData,
                            beforeSend: function () {
                                $(`#statusUploadId-${index} span`).removeClass('badge-warning').addClass('badge-info').text('In Progress..');
                            },
                            success: function (response) {
                                successCount += 1;
                                $("#successCountUpload").text(successCount)
                                $(`#statusUploadId-${index} span`).replaceWith(`<span class='badge badge-success'>success</span>`);
                            },
                            error: function (response) {
                                failedCount += 1;
                                $("#failedCountUpload").text(failedCount)
                                $(`#statusUploadId-${index} span`).replaceWith(`<span class='badge badge-danger' data-toggle="tooltip" data-placement="top" title="${response.responseJSON.txtMessage}">Failed</span>`);
                            },
                        })
                    }, 500);
                })
                $("#modalFooterUpload").append(`<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>`);
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
    if (pageProductVariantAuger.hasNext) {
        getAllProductVariantAuger(pageProductVariantAuger.page + 1, cari);
    }
})

$btnPrev.bind('click', () => {
    if (pageProductVariantAuger.hasPrevious) {
        getAllProductVariantAuger(pageProductVariantAuger.page - 1, cari);
    }
})
$btnAddProductVariantAuger.bind('click', () => {
    $.switchElement(elementToSwitch, 0);
    iniitializeData();
})
$btnCancelAddProductVariantAuger.bind('click', () => {
    $.switchElement(elementToSwitch, 1);
    $productVariantAugerFormTitle.text = "Add Product Variant Auger";
    selectedAuger = null;
    selectedProductVariant = null;
    $txtSelectedAuger.val("");
    $txtSelectedProductVariant.val("")
})
$btnSave.bind('click', () => {
    if (selectedProductVariant != null && selectedAuger != null) {
        setupDataProductVariantAuger();
        $.confirmMessage("Confirm", "Save Product Variant Auger?", "Ya Save", saveProductVariantAuger);
    }
})
$btnSelectAuger.bind('click', function () {
    $.showLOV('Auger')
})
$btnSelectProductVariant.bind('click', function () {
    $.showLOV('ProductVariant')
})

function searchProductVariantAuger() {
    pageProductVariantAuger.page = 1;
    getAllProductVariantAuger(pageProductVariantAuger.page, cari);
}

$("#ExportExcel").click(() => {
    $.postApi(api + "/ExportExcel",
        {

        },
        function (response) {
            let wbout = ExportExcelHendler(response.objData);

            saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), `Product Variant Auger Export - ${new Date()}.xlsx`)
        },
        function (e) {
            $.errorMessage("Failed", e.responseJSON.txtMessage);

        },
    )
})

$(document).ready(() => {
    $ImportExcel.change(hendelFile)
})