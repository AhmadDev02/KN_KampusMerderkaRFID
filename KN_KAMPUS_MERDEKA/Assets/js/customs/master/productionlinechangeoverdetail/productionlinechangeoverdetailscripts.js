//=======================
// INITIALIZE DATA
//=======================
var cari = '';
let pageProductionLineChangeOverDetail = {};
pageProductionLineChangeOverDetail.page = 1;
pageProductionLineChangeOverDetail.hasContent = false;
pageProductionLineChangeOverDetail.hasNext = false;
pageProductionLineChangeOverDetail.hasPrevious = false;
let api = "/Master/ProductionLineChangeOverDetail";
let productionLineChangeOverDetail = {};
let txtGUID = $("#txtGUID").val()
let __RequestVerificationToken = $('#frm input[name=__RequestVerificationToken]').val()
let headerData = {};
headerData.__RequestVerificationToken = __RequestVerificationToken;
let elementToSwitch = [$("#productionLineChangeOverDetailFormRow"), $("#ProductionLineChangeOverDetailTableRow")];
let $productionLineChangeOverDetailFormTitle = $("#productionLineChangeOverDetailFormTitle");
let selectedProductionLine = null;
let selectedMaterialChangeOver = null;
let selectedMetodeChageOver = null;
$(() => {
    initializePage();
    getAllProductionLineChangeOverDetail(pageProductionLineChangeOverDetail.page, cari);
})

//=======================
// ALL BUTTON
//=======================
let $btnPrev = $("#btnPrev");
let $btnNext = $("#btnNext");
let $btnSave = $("#btnSave");
let $btnAddProductionLineChangeOverDetail = $("#btnAddProductionLineChangeOverDetail");
let $btnCancelProductionLineChangeOverDetail = $("#btnCancelProductionLineChangeOverDetail");
let $btnSelectProductionLine = $("#btnSelectProductionLine");
let $btnSelectMaterialChangeOver = $("#btnSelectMaterialChangeOver");
let $btnSelectMetodeChangeOver = $("#btnSelectMetodeChangeOver");
//=======================
// FORM 
//=======================
let $txtSelectedMetodeChangeOver = $("#txtSelectedMetodeChangeOver");
let $txtSelectedMaterialChangeOver = $("#txtSelectedMaterialChangeOver");
let $txtSelectedProductionLine = $("#txtSelectedProductionLine");
let $intQty = $("#intQty");
let $decCostWaktu = $("#decCostWaktu");
let $decCostMaterial = $("#decCostMaterial");
let $intDurasi = $("#intDurasi");
let $ImportExcel = $("#ImportExcel");

function initializePage() {
    page = 1;
    cari = "";
    pageProductionLineChangeOverDetail = {};
    pageProductionLineChangeOverDetail.page = 1;
    pageProductionLineChangeOverDetail.hasContent = false;
    pageProductionLineChangeOverDetail.hasNext = false;
    pageProductionLineChangeOverDetail.hasPrevious = false;
    __RequestVerificationToken = $('#frm input[name=__RequestVerificationToken]').val()
    headerData = {};
    headerData.__RequestVerificationToken = __RequestVerificationToken;
    setButtonNextPrvVisibility();
    $txtSelectedMetodeChangeOver.val("");
    $txtSelectedMaterialChangeOver.val("");
    $txtSelectedProductionLine.val("");
    $intQty.val("0");
    $decCostWaktu.val("0");
    $decCostMaterial.val("0");
    $intDurasi.val("0");
    selectedMaterialChangeOver = null;
    selectedMetodeChageOver = null;
    selectedProductionLine = null;
    iniitializeData();
}

function setButtonNextPrvVisibility() {
    if (pageProductionLineChangeOverDetail.hasNext) {
        $btnNext.show();
    } else {
        $btnNext.hide();
    }
    if (pageProductionLineChangeOverDetail.hasPrevious) {
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
        productionLineChangeOverDetail = response.objData;
        $productionLineChangeOverDetailFormTitle.text = "Add Production Line Change Over Detail";
    }, errorHandle, headerData);
}


//=======================
// AJAX REQUEST GET ALL PRODUCTION LINE CHANGE OVER DETAIL
//=======================
function getAllProductionLineChangeOverDetail(x, y) {
    $.postApi(api + "/getAllProductionLineChangeOverDetail",
        {
            page: x,
            cari: y,
            size: 20
        },
        function (response) {
            pageProductionLineChangeOverDetail = response.objData;
            fillTableData();
        },
        function (e) {
            $.errorMessage("Failed", e.responseJSON.txtMessage);
            $("#tbody").html("");
            $("#tbody").append("<tr><td colspan='9'><center><span class='text-muted'>No Data <a class='refresh' href=''>Refresh</a> </span></center></td></tr>");
        },
        headerData
    )
}
//=======================
// AJAX REQUEST SAVE PRODUCT
//=======================
function saveProductionLineChangeOverDetail() {
    $.postApi(api + "/Save",
        productionLineChangeOverDetail,
        function (response) {
            iniitializeData();
            $.switchElement(elementToSwitch, 1);
            $.successMessage("Sukses", "Berhasil menyimpan productionLineChangeOverDetail");
            getAllProductionLineChangeOverDetail(0, cari)
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
    if (pageProductionLineChangeOverDetail.hasContent) {
        for (let i = 0; i < pageProductionLineChangeOverDetail.content.length; i++) {
            var m = pageProductionLineChangeOverDetail.content[i];
            let $btnEdit = `<button class=' btn btn-outline-warning btnEdit ' data-productionlinechangeoverdetail='` + JSON.stringify(m) + `'> <i class='fa fa-edit'></i> Edit</button>`;
            let row = "<tr id='intProductionLineChangeOverDetailID" + m.intLineChangeOverID + "'>" +
                "<td class='text-center'>" + m.intLineChangeOverID + "</td>" +
                "<td class='text-center'>" + m.metode.txtMetodeChangeOverCode + "</td>" +
                "<td class='text-center'>" + m.material.txtMaterialChangeOverCode + "</td>" +
                "<td class='text-center'>" + m.productionLine.txtProductionLineCode + "</td>" +
                "<td class='text-center'>" + m.intQty + "</td>" +
                "<td class='text-center'>" + $.formatRupiah(m.decCostWaktu) + "</td>" +
                "<td class='text-center'>" + $.formatRupiah(m.decCostMaterial) + "</td>" +
                "<td class='text-center'>" + $.formatRupiah(m.decCostWaktu+m.decCostMaterial) + "</td>" +
                "<td class='text-center'>" + m.intDurasi + "</td>" +
                "<td class='text-center'>" +
                $btnEdit +
                "</td>" +
                "</tr>";
            $("#tbody").append(row);
        }
        $(".btnEdit").on('click', function () {
            let r = $(this).data('productionlinechangeoverdetail');
            setupDataProductionLineChangeOverDetailEdit(r);
            $.switchElement(elementToSwitch, 0);
            $productionLineChangeOverDetailFormTitle.text = "Edit Production Line Change Over Detail";
        })

    } else {
        $("#tbody").append("<tr><td colspan='10'><center><span class='text-muted'>No Data <a class='refresh' href=''>Refresh</a> </span></center></td></tr>");
    }
    setButtonNextPrvVisibility();
}
//=======================
// ASSIGN PRODUCTION CHANGE OVER DETAIL SAVE
//=======================
function setupDataProductionLineChangeOverDetail() {
    productionLineChangeOverDetail.intProductionLineID = selectedProductionLine.intProductionLineID;
    productionLineChangeOverDetail.intMaterialChangeOverID = selectedMaterialChangeOver.intMaterialChangeOverID;
    productionLineChangeOverDetail.intMetodeChangeOverID = selectedMetodeChageOver.intMetodeChangeOverID;
    productionLineChangeOverDetail.intQty = parseInt($intQty.val().toString());
    productionLineChangeOverDetail.decCostMaterial = parseFloat($decCostMaterial.val().toString());
    productionLineChangeOverDetail.decCostWaktu = parseFloat($decCostWaktu.val().toString());
    productionLineChangeOverDetail.intDurasi = parseInt($intDurasi.val().toString());
}
//=======================
// ASSIGN EDIT PRODUCTION LINE CHANGE OVER DETAIL
//=======================
function setupDataProductionLineChangeOverDetailEdit(r) {
    selectedProductionLine = r.productionLine;
    selectedMetodeChageOver = r.metode;
    selectedMaterialChangeOver = r.material;
    productionLineChangeOverDetail.intLineChangeOverID = r.intLineChangeOverID;
    productionLineChangeOverDetail.intMetodeChangeOverID = r.metode.intMetodeChangeOverID;
    productionLineChangeOverDetail.intMaterialChangeOverID = r.material.intMetodeChangeOverID;
    productionLineChangeOverDetail.intProductionLineID = r.productionLine.intProductionLineID;
    productionLineChangeOverDetail.intQty = r.intQty;
    productionLineChangeOverDetail.decCostWaktu = r.decCostWaktu;
    productionLineChangeOverDetail.decCostMaterial = r.decCostMaterial;
    productionLineChangeOverDetail.txtGUID = r.txtGUID;
    productionLineChangeOverDetail.intDurasi = r.intDurasi;
    //===========================
    $txtSelectedMetodeChangeOver.val(r.metode.txtMetodeChangeOverCode);
    $txtSelectedMaterialChangeOver.val(r.material.txtMaterialChangeOverCode);
    $txtSelectedProductionLine.val(r.productionLine.txtProductionLineCode);
    $intQty.val(r.intQty.toString());
    $decCostWaktu.val(r.decCostWaktu.toString());
    $decCostMaterial.val(r.decCostMaterial.toString());
    $intDurasi.val(r.intDurasi.toString());
}
// =====================
// GET SELETED DATA LOV
// =====================
function getSelectedProductionLine(x) {
    selectedProductionLine = x;
    $txtSelectedProductionLine.val(x.txtProductionLineCode)
}
function getSelectedMaterialChangeOver(x) {
    selectedMaterialChangeOver = x;
    $txtSelectedMaterialChangeOver.val(x.txtMaterialChangeOverCode);
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
        Title: "Production Line ChangeOver Detail E-RPS Export",
        Subject: "Production Line ChangeOver Detail E-RPS",
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
                        "<td class='text-center'>" + item.intMetodeChangeOverID + "</td>" +
                        "<td class='text-center'>" + item.intMaterialChangeOverID + "</td>" +
                        "<td class='text-center'>" + item.intProductionLineID + "</td>" +
                        "<td class='text-center'>" + item.intQty + "</td>" +
                        "<td class='text-center'>" + item.decCostWaktu + "</td>" +
                        "<td class='text-center'>" + item.decCostMaterial + "</td>" +
                        "<td class='text-center'>" + item.intDurasi + "</td>" +
                        "<td class='text-center' id='statusUploadId-" + index + "'><span class='badge badge-warning'>Pending</span></td>" +
                        "</tr>";
                    $("#tbodyUpload").append(row);

                    setTimeout(function () {
                        $.ajax({
                            type: "POST",
                            url: api + "/ImportExcel",
                            data: JSON.stringify({ productionLineChangeOverDetailRequest: item }),
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
    if (pageProductionLineChangeOverDetail.hasNext) {
        getAllProductionLineChangeOverDetail(pageProductionLineChangeOverDetail.page + 1, cari);
    }
})

$btnPrev.bind('click', () => {
    if (pageProductionLineChangeOverDetail.hasPrevious) {
        getAllProductionLineChangeOverDetail(pageProductionLineChangeOverDetail.page - 1, cari);
    }
})
$btnAddProductionLineChangeOverDetail.bind('click', () => {
    $.switchElement(elementToSwitch, 0);
    initializePage();
})
$btnCancelProductionLineChangeOverDetail.bind('click', () => {
    $.switchElement(elementToSwitch, 1);
    $productionLineChangeOverDetailFormTitle.text = "Add Production Line Change Over Detail";
})
$btnSave.bind('click', () => {
    setupDataProductionLineChangeOverDetail();
    $.confirmMessage("Confirm", "Save Production Line Change Over Detail", "Ya Save", saveProductionLineChangeOverDetail);
})
$btnSelectProductionLine.bind('click', () => {
    $.showLOV('ProductionLine');
})
$btnSelectMaterialChangeOver.bind('click', () => {
    $.showLOV('MaterialChangeOver');
})
$btnSelectMetodeChangeOver.bind('click', () => {
    $.showLOV('MetodeChangeOver');
})


function searchProductionLineChangeOverDetail() {
    pageProductionLineChangeOverDetail.page = 1;
    getAllProductionLineChangeOverDetail(pageProductionLineChangeOverDetail.page, cari);
}

$("#ExportExcel").click(() => {
    $.postApi(api + "/ExportExcel",
        {

        },
        function (response) {
            let wbout = ExportExcelHendler(response.objData);

            saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), `Production Line ChangeOver Detail Export - ${new Date()}.xlsx`)
        },
        function (e) {
            $.errorMessage("Failed", e.responseJSON.txtMessage);

        },
    )
})

$(document).ready(() => {
    $ImportExcel.change(hendelFile)
})