//=======================
// INITIALIZE DATA
//=======================
var cari = '';
let pageVariant = {};
pageVariant.page = 1;
pageVariant.hasContent = false;
pageVariant.hasNext = false;
pageVariant.hasPrevious = false;
let api = "/Master/Variant";
let variant = {};
let txtGUID = $("#txtGUID").val()
let __RequestVerificationToken = $('#frm input[name=__RequestVerificationToken]').val()
let headerData = {};
headerData.__RequestVerificationToken = __RequestVerificationToken;
let elementToSwitch = [$("#variantFormRow"), $("#variantTableRow")];
let $variantFormTitle = $("#variantFormTitle");
let selectedVariantCategory = null;
//=======================
// ALL BUTTON
//=======================
let $btnPrev = $("#btnPrev");
let $btnNext = $("#btnNext");
let $btnSave = $("#btnSave");
let $btnAddVariant = $("#btnAddVariant");
let $btnCancelAddVariant = $("#btnCancelAddVariant");
let $btnSelectVariantCategory = $("#btnSelectVariantCategory");
//=======================
// FORM 
//=======================
let $txtSelectedVariantCategoryDescription = $("#txtSelectedVariantCategoryDescription");
let $txtVariantCode = $("#txtVariantCode");
let $txtVariantDescription = $("#txtVariantDescription");
let $intLevel = $("#intLevel");
let $ImportExcel = $("#ImportExcel");
function initializePage() {
    page = 1;
    cari = "";
    pageVariant = {};
    pageVariant.page = 1;
    pageVariant.hasContent = false;
    pageVariant.hasNext = false;
    pageVariant.hasPrevious = false;
    api = "/Master/Variant";
    user = {};
    txtGUID = $("#txtGUID").val()
    __RequestVerificationToken = $('#frm input[name=__RequestVerificationToken]').val()
    headerData = {};
    headerData.__RequestVerificationToken = __RequestVerificationToken;
    setButtonNextPrvVisibility();
    selectedVariantCategory = null;
    iniitializeData();
}
initializePage();
getAllVariant(pageVariant.page, cari);
function setButtonNextPrvVisibility() {
    if (pageVariant.hasNext) {
        $btnNext.show();
    } else {
        $btnNext.hide();
    }
    if (pageVariant.hasPrevious) {
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
        variant = response.objData;
        setupAddVariantForm();
        $variantFormTitle.text = "Add Variant";
    }, errorHandle, headerData);
}

function setupAddVariantForm() {
    $txtSelectedVariantCategoryDescription.val(variant.txtSelectedVariantCategoryDescription);
    $txtVariantCode.val(variant.txtVariantCode);
    $txtVariantDescription.val(variant.txtVariantDescription);
    $intLevel.val(variant.intLevel);
}

//=======================
// AJAX REQUEST GET ALL VARIANT
//=======================
function getAllVariant(x, y) {
    $.postApi(api + "/getAllVariant",
        {
            page: x,
            cari: y,
            size: 20
        },
        function (response) {
            pageVariant = response.objData;
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
// AJAX REQUEST SAVE VARIANT
//=======================
function saveVariant() {
    $.postApi(api + "/Save",
        variant,
        function (response) {
            iniitializeData();
            $.switchElement(elementToSwitch, 1);
            $.successMessage("Sukses", "Berhasil menyimpan variant");
            getAllVariant(0, cari)
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
    if (pageVariant.hasContent) {
        for (let i = 0; i < pageVariant.content.length; i++) {
            var m = pageVariant.content[i];
            let $btnEdit = `<button class=' btn btn-outline-warning btnEdit ' data-variant='` + JSON.stringify(m) + `'> <i class='fa fa-edit'></i> Edit</button>`;
            let row = "<tr id='intVariantID" + m.intVariantID + "'>" +
                "<td class='text-center'>" + m.intVariantID + "</td>" +
                "<td class='text-center'>" + m.txtVariantCode + "</td>" +
                "<td class='text-center'>" + m.txtVariantDescription + "</td>" +
                "<td class='text-center'>" + m.category.txtVariantCategoryDescription + "</td>" +
                "<td class='text-center'>" + m.intLevel + "</td>" +
                "<td class='text-center'>" +
                $btnEdit +
                "</td>" +
                "</tr>";
            $("#tbody").append(row);
        }
        $(".btnEdit").on('click', function () {
            let r = $(this).data('variant');
            setupDataVariantEdit(r);
            setupDataVariantEditForm();
            $.switchElement(elementToSwitch, 0);
            $variantFormTitle.text = "Edit Variants";
        })

    } else {
        $("#tbody").append("<tr><td colspan='6'><center><span class='text-muted'>No Data <a class='refresh' href=''>Refresh</a> </span></center></td></tr>");
    }
    setButtonNextPrvVisibility();
}
//=======================
// ASSIGN VARIANT SAVE
//=======================
function setupDataVariant() {
    variant.txtVariantCode = $txtVariantCode.val().toString();
    variant.txtVariantDescription = $txtVariantDescription.val().toString();
    variant.intLevel = parseInt($intLevel.val().toString());
    variant.intVariantCategoryID = selectedVariantCategory.intVariantCategoryID;
}
//=======================
// ASSIGN EDIT VARIANT
//=======================
function setupDataVariantEdit(r) {
    selectedVariantCategory = {}
    selectedVariantCategory.intVariantCategoryID = r.category.intVariantCategoryID;
    selectedVariantCategory.txtVariantCategoryDescription = r.category.txtVariantCategoryDescription;
    variant.intVariantID = r.intVariantID;
    variant.txtVariantCode = r.txtVariantCode;
    variant.txtVariantDescription = r.txtVariantDescription;
    variant.intLevel = r.intLevel;
    variant.txtGUID = r.txtGUID;
}
//=======================
// ASSIGN EDIT VARIANT FORM
//=======================
function setupDataVariantEditForm() {
    $txtVariantCode.val(variant.txtVariantCode);
    $txtVariantDescription.val(variant.txtVariantDescription);
    $intLevel.val(variant.intLevel)
    $txtSelectedVariantCategoryDescription.val(selectedVariantCategory.txtVariantCategoryDescription);
}
/*================================
GET SELECTED VARIANT CATEGORY
================================== */
function getSelectedVariantCategory(x) {
    selectedVariantCategory = x;
    $txtSelectedVariantCategoryDescription.val(x.txtVariantCategoryDescription);

}
//=======================
// EXPORT EXCEL
//=======================
function ExportExcelHendler(d) {

    let wb = XLSX.utils.book_new();
    let data = d
    wb.Props = {
        Title: "Variant E-RPS Export",
        Subject: "Varian E-RPS",
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
                    { variantRequest: dataExcel },
                    function (response) {
                        if (response.bitSuccess == true) {
                            $.successMessage('Excel', "Berhasil di Save")
                        } else {
                            $.errorMessage('Failed',"Gagal Memperoses Import")
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
    if (pageVariant.hasNext) {
        getAllVariant(pageVariant.page + 1, cari);
    }
})

$btnPrev.bind('click', () => {
    if (pageVariant.hasPrevious) {
        getAllVariant(pageVariant.page - 1, cari);
    }
})
$btnAddVariant.bind('click', () => {
    $.switchElement(elementToSwitch, 0);
    iniitializeData();
})
$btnCancelAddVariant.bind('click', () => {
    $.switchElement(elementToSwitch, 1);
    $variantFormTitle.text = "Add Variant";
})
$btnSave.bind('click', () => {
    if (selectedVariantCategory != null) {
        setupDataVariant();
        $.confirmMessage("Confirm", "Save Variant?", "Ya Save", saveVariant);
    }
})
$btnSelectVariantCategory.bind('click', () => {
    $.showLOV('VariantCategory')
})

function searchVariant() {
    pageVariant.page = 1;
    getAllVariant(pageVariant.page, cari);
}

$("#ExportExcel").click(() => {
    $.postApi(api + "/ExportExcel",
        {

        },
        function (response) {
            let wbout = ExportExcelHendler(response.objData);

            saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), `Variant Export - ${new Date()}.xlsx`)
        },
        function (e) {
            $.errorMessage("Failed", e.responseJSON.txtMessage);

        },
    )
})

$(document).ready(() => {
    $ImportExcel.change(hendelFile)
})
