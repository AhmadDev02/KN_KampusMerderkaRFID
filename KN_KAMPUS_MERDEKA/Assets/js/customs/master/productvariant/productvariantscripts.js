//=======================
// INITIALIZE DATA
//=======================
var cari = '';
let pageProductVariant  = {};
pageProductVariant .page = 1;
pageProductVariant .hasContent = false;
pageProductVariant .hasNext = false;
pageProductVariant .hasPrevious = false;
let api = "/Master/ProductVariant";
let productVariant  = {};
let txtGUID = $("#txtGUID").val()
let __RequestVerificationToken = $('#frm input[name=__RequestVerificationToken]').val()
let headerData = {};
headerData.__RequestVerificationToken = __RequestVerificationToken;
let elementToSwitch = [$("#productVariantFormRow"), $("#productVariantTableRow")];
let $productVariantFormTitle = $("#productVariantFormTitle");
let selectedVariant = null;
let selectedProduct = null;
//=======================
// ALL BUTTON
//=======================
let $btnPrev = $("#btnPrev");
let $btnNext = $("#btnNext");
let $btnSave = $("#btnSave");
let $btnAddProductVariant  = $("#btnAddProductVariant");
let $btnCancelProductVariant  = $("#btnCancelAddProductVariant");
let $btnSelectVariant = $("#btnSelectVariant");
let $btnSelectProduct = $("#btnSelectProduct");
//=======================
// FORM 
//=======================
let $txtSelectedProductDescription = $("#txtSelectedProductDescription");
let $txtSelectedVariantDescription= $("#txtSelectedVariantDescription");
let $txtProductVariantCode = $("#txtProductVariantCode");
let $txtProductVariantDescription = $("#txtProductVariantDescription");
let $intLevel = $("#intLevel");
let $ImportExcel = $("#ImportExcel");

function initializePage() {
    pageProductVariant = {};
    pageProductVariant.page = 1;
    pageProductVariant.hasContent = false;
    pageProductVariant.hasNext = false;
    pageProductVariant.hasPrevious = false;
    productVariant = {};
    txtGUID = $("#txtGUID").val()
     __RequestVerificationToken = $('#frm input[name=__RequestVerificationToken]').val()
    headerData = {};
    headerData.__RequestVerificationToken = __RequestVerificationToken;
    selectedVariant = null;
    selectedProduct = null;
    setButtonNextPrvVisibility();
    iniitializeData();
}
initializePage();
getAllProductVariant(pageProductVariant.page, cari);
function setButtonNextPrvVisibility() {
    if (pageProductVariant.hasNext) {
        $btnNext.show();
    } else {
        $btnNext.hide();
    }
    if (pageProductVariant.hasPrevious) {
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
        productVariant = response.objData;
        setupAddProductVariantForm();
        $productVariantFormTitle.text = "Add Product Variant";
    }, errorHandle, headerData);
}

function setupAddProductVariantForm() {
    $txtProductVariantCode.val(productVariant.txtProductVariantCode);
    $txtProductVariantDescription.val(productVariant.txtProductVariantDescription);
    $txtSelectedProductDescription.val("Select Product");
    $txtSelectedVariantDescription.val("Select Variant");
    $intLevel.val(productVariant.intLevel);
}

//=======================
// AJAX REQUEST GET ALL PRODUCT VARIANT
//=======================
function getAllProductVariant(x, y) {
    $.postApi(api + "/getAllProductVariant",
        {
            page: x,
            cari: y,
            size: 20
        },
        function (response) {
            pageProductVariant = response.objData;
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
// AJAX REQUEST SAVE PRODUCT VARIANT
//=======================
function saveProductVariant() {
    $.postApi(api + "/Save",
        productVariant ,
        function (response) {
            iniitializeData();
            $.switchElement(elementToSwitch, 1);
            $.successMessage("Sukses", "Berhasil menyimpan Product Variant ");
            getAllProductVariant(0, cari)
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
    if (pageProductVariant .hasContent) {
        for (let i = 0; i < pageProductVariant .content.length; i++) {
            var m = pageProductVariant .content[i];
            let $btnEdit = `<button class=' btn btn-outline-warning btnEdit ' data-productvariant ='` + JSON.stringify(m) + `'> <i class='fa fa-edit'></i> Edit</button>`;
            let row = "<tr id='intProductVariantID" + m.intProductVariantID + "'>" +
                "<td class='text-center'>" + m.intProductVariantID + "</td>" +
                "<td class='text-center'>" + m.txtProductVariantCode + "</td>" +
                "<td class='text-center'>" + m.txtProductVariantDescription + "</td>" +
                "<td class='text-center'>" + m.variant.category.txtVariantCategoryDescription + "</td>" +
                "<td class='text-center'>" + m.intLevel + "</td>" +
                "<td class='text-center'>" +
                $btnEdit +
                "</td>" +
                "</tr>";
            $("#tbody").append(row);
        }
        $(".btnEdit").on('click', function () {
            let r = $(this).data('productvariant');
            setupDataProductVariantEdit(r);
            setupDataProductVariantEditForm();
            $.switchElement(elementToSwitch, 0);
            $productVariantFormTitle.text = "Edit Product Variants " + r.txtProductVariantCode;
        })

    } else {
        $("#tbody").append("<tr><td colspan='6'><center><span class='text-muted'>No Data <a class='refresh' href=''>Refresh</a> </span></center></td></tr>");
    }
    setButtonNextPrvVisibility();
}
//=======================
// ASSIGN PRODUCT VARIANT SAVE
//=======================
function setupDataProductVariant() {
    productVariant.txtProductVariantCode = $txtProductVariantCode.val().toString();
    productVariant.txtProductVariantDescription = $txtProductVariantDescription.val().toString();
    productVariant.intLevel = parseInt($intLevel.val().toString());
    productVariant.intProductID = selectedProduct.intProductID;
    productVariant.intVariantID = selectedVariant.intVariantID;
}
//=======================
// ASSIGN EDIT PRODUCT VARIANT
//=======================
function setupDataProductVariantEdit(r) {
    selectedProduct = {}
    selectedProduct.intProductID = r.product.intProductID;
    selectedProduct.txtProductDescription = r.product.txtProductDescription

    selectedVariant = {}
    selectedVariant.intVariantID = r.variant.intVariantID;
    selectedVariant.txtVariantDescription = r.variant.txtVariantDescription;

    productVariant.intProductVariantID = r.intProductVariantID;
    productVariant.txtProductVariantCode = r.txtProductVariantCode;
    productVariant.txtProductVariantDescription = r.txtProductVariantDescription;
    productVariant.intLevel = r.intLevel;
    productVariant.txtGUID = r.txtGUID;
}
//=======================
// ASSIGN EDIT PRODUCT VARIANT FORM
//=======================
function setupDataProductVariantEditForm() {
    $txtProductVariantCode.val(productVariant.txtProductVariantCode);
    $txtProductVariantDescription.val(productVariant.txtProductVariantDescription);
    $txtSelectedProductDescription.val(selectedProduct.txtProductDescription);
    $txtSelectedVariantDescription.val(selectedVariant.txtVariantDescription);
    $intLevel.val(productVariant.intLevel);
}
/*================================
GET SELECTED VARIANT
================================== */
function getSelectedVariant(x) {
    selectedVariant = x;
    $txtSelectedVariantDescription.val(x.txtVariantDescription);
    if (selectedProduct != null) {
        $txtProductVariantCode.val(selectedProduct.txtProductCode + selectedVariant.txtVariantCode)
        $txtProductVariantDescription.val(selectedProduct.txtProductDescription + " " + selectedVariant.txtVariantDescription)
    } else {
        $txtProductVariantCode.val(selectedVariant.txtVariantCode)
        $txtProductVariantDescription.val(selectedVariant.txtVariantDescription)
    }
}
/*================================
GET SELECTED PRODUCT
================================== */
function getSelectedProduct(x) {
    selectedProduct = x;
    $txtSelectedProductDescription.val(x.txtProductDescription);
    if (selectedVariant != null) {
        $txtProductVariantCode.val(selectedProduct.txtProductCode + selectedVariant.txtVariantCode)
        $txtProductVariantDescription.val(x.txtProductDescription + " " + selectedVariant.txtVariantDescription)
    } else {
        $txtProductVariantDescription.val(x.txtProductDescription)
        $txtProductVariantCode.val(selectedProduct.txtProductCode)
    }

}

//=======================
// EXPORT EXCEL
//=======================
function ExportExcelHendler(d) {

    let wb = XLSX.utils.book_new();
    let data = d
    wb.Props = {
        Title: "Product Variant E-RPS Export",
        Subject: "Product Variant E-RPS",
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
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
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

                $('#uploadModal').modal('show')
                let successCount = 0;
                let failedCount = 0;

                dataExcel.forEach((item, index) => {
                    let row = `<tr id='uploadExcelID-${index}'>` +
                        "<td class='text-center'>" + item.txtProductVariantCode + "</td>" +
                        "<td class='text-center'>" + item.txtProductVariantDescription + "</td>" +
                        "<td class='text-center'>" + item.intProductID + "</td>" +
                        "<td class='text-center'>" + item.intVariantID + "</td>" +
                        "<td class='text-center'>" + item.intLevel + "</td>" +
                        "<td class='text-center' id='statusUploadId-" + index + "'><span class='badge badge-warning'>Pending</span></td>" +
                        "</tr>";
                    $("#tbodyProductVariantUpload").append(row);

                    setTimeout(function () {
                        $.ajax({
                            type: "POST",
                            url: api + "/ImportExcel",
                            data: JSON.stringify({ productVariantRequest: item }),
                            contentType: "application/json; charset=utf-8",
                            datatype: "json",
                            async: false,
                            headers: headerData,
                            beforeSend: function () {
                                $(`#statusUploadId-${index} span`).replaceWith(`<span class='badge badge-info'>In Progress</span>`);
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
                    }, 5000);
                    

                })
                $("#modalFooterProductVariantUpload").append(`<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>`);

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
    if (pageProductVariant.hasNext) {
        getAllProductVariant(pageProductVariant.page + 1, cari);
    }
})

$btnPrev.bind('click', () => {
    if (pageProductVariant.hasPrevious) {
        getAllProductVariant(pageProductVariant.page - 1, cari);
    }
})
$btnAddProductVariant.bind('click', () => {
    $.switchElement(elementToSwitch, 0);
    iniitializeData();
})
$btnCancelProductVariant.bind('click', () => {
    $.switchElement(elementToSwitch, 1);
    $productVariantFormTitle.text = "Add Variant";
})
$btnSave.bind('click', () => {
    if (selectedVariant != null && selectedProduct != null) {
        setupDataProductVariant();
        $.confirmMessage("Confirm", "Save Product Variant?", "Ya Save", saveProductVariant);
    }
})
$btnSelectVariant.bind('click', () => {
    $.showLOV('Variant')
})
$btnSelectProduct.bind('click', () => {
    $.showLOV('Product')
})
function searchProductVariant() {
    pageProductVariant.page = 1;
    getAllProductVariant(pageProductVariant.page, cari);
}

$("#ExportExcel").click(() => {
    $.postApi(api + "/ExportExcel",
        {

        },
        function (response) {
            let wbout = ExportExcelHendler(response.objData);

            saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), `Product Variant Export - ${new Date()}.xlsx`)
        },
        function (e) {
            $.errorMessage("Failed", e.responseJSON.txtMessage);

        },
    )
})

$(document).ready(() => {
    $ImportExcel.change(hendelFile)
})