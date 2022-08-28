//=======================
// INITIALIZE DATA
//=======================
var cari = '';
let pageProductVariantMetodeChangeOver = {};
pageProductVariantMetodeChangeOver.page = 1;
pageProductVariantMetodeChangeOver.hasContent = false;
pageProductVariantMetodeChangeOver.hasNext = false;
pageProductVariantMetodeChangeOver.hasPrevious = false;
let api = "/Master/ProductVariantMetodeChangeOver";
let productVariantMetodeChangeOver = {};
let txtGUID = $("#txtGUID").val()
let __RequestVerificationToken = $('#frm input[name=__RequestVerificationToken]').val()
let headerData = {};
headerData.__RequestVerificationToken = __RequestVerificationToken;
let elementToSwitch = [$("#productVariantMetodeChangeOverFormRow"), $("#ProductVariantMetodeChangeOverTableRow")];
let $productVariantMetodeChangeOverFormTitle = $("#productVariantMetodeChangeOverFormTitle");
let selectedProductVariantFrom = null;
let selectedProductVariantTo = null;
let selectedMetodeChageOver = null;
let typeProductVariantSelect = 0;
$(() => {
    initializePage();
    getAllProductVariantMetodeChangeOver(pageProductVariantMetodeChangeOver.page, cari);
})

//=======================
// ALL BUTTON
//=======================
let $btnPrev = $("#btnPrev");
let $btnNext = $("#btnNext");
let $btnSave = $("#btnSave");
let $btnAddProductVariantMetodeChangeOver = $("#btnAddProductVariantMetodeChangeOver");
let $btnCancelProductVariantMetodeChangeOver = $("#btnCancelProductVariantMetodeChangeOver");
let $btnSelectProductVariantFrom = $("#btnSelectProductVariantFrom");
let $btnSelectProductVariantTo = $("#btnSelectProductVariantTo");
let $btnSelectMetodeChangeOver = $("#btnSelectMetodeChangeOver");
//=======================
// FORM 
//=======================
let $txtSelectedProductVariantFrom = $("#txtSelectedProductVariantFrom");
let $txtSelectedProductVariantTo= $("#txtSelectedProductVariantTo");
let $txtSelectedMetodeChangeOver = $("#txtSelectedMetodeChangeOver");
let $ImportExcel = $("#ImportExcel");
let $txtRevitFrom = $("#txtRevitFrom");
let $txtRevitTo = $("#txtRevitTo");
let $totalPage = $("#totalPage");

function initializePage() {
    page = 1;
    cari = "";
    pageProductVariantMetodeChangeOver = {};
    pageProductVariantMetodeChangeOver.page = 1;
    pageProductVariantMetodeChangeOver.hasContent = false;
    pageProductVariantMetodeChangeOver.hasNext = false;
    pageProductVariantMetodeChangeOver.hasPrevious = false;
    __RequestVerificationToken = $('#frm input[name=__RequestVerificationToken]').val()
    headerData = {};
    headerData.__RequestVerificationToken = __RequestVerificationToken;
    setButtonNextPrvVisibility();
    $txtSelectedProductVariantFrom.val("");
    $txtSelectedProductVariantTo.val("");
    $txtSelectedMetodeChangeOver.val("");
    $txtRevitFrom.val(0);
    $txtRevitTo.val(0);
    selectedProductVariantFrom = null;
    selectedProductVariantTo = null;
    selectedMetodeChageOver = null;
    iniitializeData();
}

function setButtonNextPrvVisibility() {
    if (pageProductVariantMetodeChangeOver.hasNext) {
        $btnNext.show();
    } else {
        $btnNext.hide();
    }
    if (pageProductVariantMetodeChangeOver.hasPrevious) {
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
        productVariantMetodeChangeOver = response.objData;
        $productVariantMetodeChangeOverFormTitle.text = "Add Product Variant Metode Change Over";
    }, errorHandle, headerData);
}


//=======================
// AJAX REQUEST GET ALL PRODUCTION LINE CHANGE OVER DETAIL
//=======================
function getAllProductVariantMetodeChangeOver(x, y) {
    $.postApi(api + "/getAllProductVariantMetodeChangeOver",
        {
            page: x,
            cari: y,
            size: 20
        },
        function (response) {
            pageProductVariantMetodeChangeOver = response.objData;
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
function saveProductVariantMetodeChangeOver() {
    $.postApi(api + "/Save",
        productVariantMetodeChangeOver,
        function (response) {
            iniitializeData();
            $.switchElement(elementToSwitch, 1);
            $.successMessage("Sukses", "Berhasil menyimpan product Variant Metode Change Over");
            getAllProductVariantMetodeChangeOver(0, cari)
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
    if (pageProductVariantMetodeChangeOver.hasContent) {
        $totalPage.html(pageProductVariantMetodeChangeOver.total);
        for (let i = 0; i < pageProductVariantMetodeChangeOver.content.length; i++) {
            var m = pageProductVariantMetodeChangeOver.content[i];
            let $btnEdit = `<button class=' btn btn-outline-warning btnEdit ' data-productvariantmetodecshangeover='` + JSON.stringify(m) + `'> <i class='fa fa-edit'></i> Edit</button>`;
            let row = "<tr id='intProductVariantMetodeChangeOverID" + m.intProductVariantMethodeChangeOverID + "'>" +
                "<td class='text-center'>" + m.intProductVariantMethodeChangeOverID + "</td>" +
                "<td class='text-center'>" + m.txtProductVariantFrom + "</td>" +
                "<td class='text-center'>" + m.intRevitFrom + "</td>" +
                "<td class='text-center'>" + m.txtProductVariantTo + "</td>" +
                "<td class='text-center'>" + m.intRevitTo + "</td>" +
                "<td class='text-center'>" + m.txtMetodeChangeOver + "</td>" +
                "<td class='text-center'>" +
                $btnEdit +
                "</td>" +
                "</tr>";
            $("#tbody").append(row);
        }
        $(".btnEdit").on('click', function () {
            let r = $(this).data('productvariantmetodecshangeover');
            setupDataProductVariantMetodeChangeOverEdit(r);
            $.switchElement(elementToSwitch, 0);
            $productVariantMetodeChangeOverFormTitle.text = "Edit Product Variant Metode Change Over";
        })

    } else {
        $("#tbody").append("<tr><td colspan='7'><center><span class='text-muted'>No Data <a class='refresh' href=''>Refresh</a> </span></center></td></tr>");
    }
    setButtonNextPrvVisibility();
}
//=======================
// ASSIGN PRODUCT VARIANT METODE CHANGE OVER
//=======================
function setupDataProductVariantMetodeChangeOver() {
    console.log(selectedProductVariantFrom);
    productVariantMetodeChangeOver.intProductVariantIDFrom = parseInt(selectedProductVariantFrom.intProductVariantID);
    productVariantMetodeChangeOver.intProductVariantIDTo = parseInt(selectedProductVariantTo.intProductVariantID);
    productVariantMetodeChangeOver.intMetodeChangeOverID = parseInt(selectedMetodeChageOver.intMetodeChangeOverID);
    productVariantMetodeChangeOver.intRevitFrom = parseInt($txtRevitFrom.val());
    productVariantMetodeChangeOver.intRevitTo = parseInt($txtRevitTo.val());
}
//=======================
// ASSIGN EDIT PRODUCT VARIANT METODE CHANGE OVER
//=======================
function setupDataProductVariantMetodeChangeOverEdit(r) {
    productVariantMetodeChangeOver.intProductVariantMethodeChangeOverID = r.intProductVariantMethodeChangeOverID;
    productVariantMetodeChangeOver.intProductVariantIDFrom = r.intProductVariantIDFrom;
    productVariantMetodeChangeOver.intProductVariantIDTo = r.intProductVariantIDTo;
    productVariantMetodeChangeOver.intRevitFrom = r.intRevitFrom;
    productVariantMetodeChangeOver.intRevitTo = r.intRevitTo;
    productVariantMetodeChangeOver.intMetodeChangeOverID = r.intMetodeChangeOverID;
    productVariantMetodeChangeOver.txtGUID = r.txtGUID;
    productVariantMetodeChangeOver.bitActive = r.bitActive;
    //===========================
    $txtSelectedProductVariantFrom.val(r.txtProductVariantFrom);
    $txtSelectedProductVariantTo.val(r.txtProductVariantTo);
    $txtSelectedMetodeChangeOver.val(r.txtMetodeChangeOver);
    $txtRevitFrom.val(r.intRevitFrom);
    $txtRevitTo.val(r.intRevitTo);
    //===========================
    selectedProductVariantFrom = {};
    selectedProductVariantFrom.intProductVariantID = r.intProductVariantIDFrom;
    selectedProductVariantTo = {};
    selectedProductVariantTo.intProductVariantID = r.intProductVariantIDTo;
    selectedMetodeChageOver = {};
    selectedMetodeChageOver.intMetodeChangeOverID = r.intMetodeChangeOverID;
}
// =====================    
// GET SELETED DATA LOV
// =====================
function getSelectedProductVariant (x) {
    if (typeProductVariantSelect == 0) {
        selectedProductVariantFrom = x;
        $txtSelectedProductVariantFrom.val(x.txtProductVariantCode + " " + x.txtProductVariantDescription)
    } else {
        selectedProductVariantTo = x;
        $txtSelectedProductVariantTo.val(x.txtProductVariantCode + " " +  x.txtProductVariantDescription)
    }
    typeProductVariantSelect = 0;
}
function getSelectedMetodeChangeOver(x) {
    selectedMetodeChageOver = x;
    $txtSelectedMetodeChangeOver.val(x.txtMetodeChangeOverCode);
}

//=======================
// EXPORT EXCEL
//=======================
function ExportExcelHendler(d) {

    let wb = XLSX.utils.book_new();
    let data = d
    wb.Props = {
        Title: "Product Variant Metode Change Over E-RPS Export",
        Subject: "Product Variant Metode Change Over E-RPS",
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
                    let row = `<tr id='uploadExcelID-${item}'>` +
                        "<td class='text-center'>" + item.intProductVariantIDFrom + "</td>" +
                        "<td class='text-center'>" + item.intRevitFrom + "</td>" +
                        "<td class='text-center'>" + item.intProductVariantIDTo + "</td>" +
                        "<td class='text-center'>" + item.intRevitTo + "</td>" +
                        "<td class='text-center'>" + item.intMetodeChangeOverID + "</td>" +
                        "<td class='text-center' id='statusUploadId-" + index + "'><span class='badge badge-warning'>Pending</span></td>" +
                        "</tr>";
                    $("#tbodyUpload").append(row);

                    setTimeout(function () {
                        $.ajax({
                            type: "POST",
                            url: api + "/Save",
                            data: JSON.stringify({ productVariantMetodeChangeOverRequest: item }),
                            contentType: "application/json; charset=utf-8",
                            datatype: "json",
                            async: false,
                            headers: headerData,
                            beforeSend: function () {
                                $(`#statusUploadId-${index} span`).replaceWith(`<span class='badge badge-info'>In Progress</span>`);
                            },
                            success: function (response) {
                                setTimeout(() => {
                                    successCount += 1;
                                    $("#successCountUpload").text(successCount)
                                    $(`#statusUploadId-${index} span`).replaceWith(`<span class='badge badge-success'>success</span>`);
                                }, 1000);
                            },
                            error: function (response) {
                                setTimeout(() => {
                                    failedCount += 1;
                                    $("#failedCountUpload").text(failedCount)
                                    $(`#statusUploadId-${index} span`).replaceWith(`<span class='badge badge-danger' data-toggle="tooltip" data-placement="top" title="${response.responseJSON.txtMessage}">Failed</span>`);

                                }, 1000);
                            },
                        })
                    }, 5000);


                })

            } catch (e) {
                $.errorMessage('Excel', "Tidak dapat memproses file !")
            } finally {
                setTimeout(() => {
                    $("#modalFooterUpload").append(`<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>`);
                },5000)
            }

        };
        reader.readAsArrayBuffer(f);
    }
}

//=======================
// EVENT LISTENER
//=======================
$btnNext.bind('click', () => {
    if (pageProductVariantMetodeChangeOver.hasNext) {
        getAllProductVariantMetodeChangeOver(pageProductVariantMetodeChangeOver.page + 1, cari);
    }
})

$btnPrev.bind('click', () => {
    if (pageProductVariantMetodeChangeOver.hasPrevious) {
        getAllProductVariantMetodeChangeOver(pageProductVariantMetodeChangeOver.page - 1, cari);
    }
})
$btnAddProductVariantMetodeChangeOver.bind('click', () => {
    $.switchElement(elementToSwitch, 0);
    initializePage();
})
$btnCancelProductVariantMetodeChangeOver.bind('click', () => {
    $.switchElement(elementToSwitch, 1);
    $productVariantMetodeChangeOverFormTitle.text = "Add Producti Variant Metode Change Over";
})
$btnSave.bind('click', () => {
    setupDataProductVariantMetodeChangeOver();
    $.confirmMessage("Confirm", "Save Product Variant Metode Change over", "Ya Save", saveProductVariantMetodeChangeOver);
})
$btnSelectProductVariantFrom.bind('click', () => {
    typeProductVariantSelect = 0;
    $.showLOV('ProductVariant');
})
$btnSelectProductVariantTo.bind('click', () => {
    typeProductVariantSelect =1;
    $.showLOV('ProductVariant');
})
$btnSelectMetodeChangeOver.bind('click', () => {
    $.showLOV('MetodeChangeOver');
})


function searchProductVariantMetodeChangeOver() {
    pageProductVariantMetodeChangeOver.page = 1;
    getAllProductVariantMetodeChangeOver(pageProductVariantMetodeChangeOver.page, cari);
}

$("#ExportExcel").click(() => {
    $.postApi(api + "/ExportExcel",
        {

        },
        function (response) {
            let wbout = ExportExcelHendler(response.objData);

            saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), `Product Variant Metode Change Over Export - ${new Date()}.xlsx`)
        },
        function (e) {
            $.errorMessage("Failed", e.responseJSON.txtMessage);

        },
    )
})

$(document).ready(() => {
    $ImportExcel.change(hendelFile)
})