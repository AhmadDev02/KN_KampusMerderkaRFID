//=======================
// INITIALIZE DATA
//=======================
var cari = '';
let pageMaterialChangeOver = {};
pageMaterialChangeOver.page = 1;
pageMaterialChangeOver.hasContent = false;
pageMaterialChangeOver.hasNext = false;
pageMaterialChangeOver.hasPrevious = false;
let api = "/Master/MaterialChangeOver";
let materialChangeOver = {};
let txtGUID = $("#txtGUID").val()
let __RequestVerificationToken = $('#frm input[name=__RequestVerificationToken]').val()
let headerData = {};
headerData.__RequestVerificationToken = __RequestVerificationToken;
let elementToSwitch = [$("#materialChangeOverFormRow"), $("#materialChangeOverTableRow")];
let $materialChangeOverFormTitle = $("#materialChangeOverFormTitle");

//=======================
// ALL BUTTON
//=======================
let $btnPrev = $("#btnPrev");
let $btnNext = $("#btnNext");
let $btnSave = $("#btnSave");
let $btnAddMaterialChangeOver = $("#btnAddMaterialChangeOver");
let $btnCancelAddMaterialChangeOver = $("#btnCancelAddMaterialChangeOver");
//=======================
// FORM 
//=======================
let $txtMaterialChangeOverCode = $("#txtMaterialChangeOverCode");
let $txtMaterialChangeOverDescription = $("#txtMaterialChangeOverDescription");
let $intLevel = $("#intLevel");
let $ImportExcel = $("#ImportExcel");

function initializePage() {
    page = 1;
    cari = "";
    pageMaterialChangeOver = {};
    pageMaterialChangeOver.page = 1;
    pageMaterialChangeOver.hasContent = false;
    pageMaterialChangeOver.hasNext = false;
    pageMaterialChangeOver.hasPrevious = false;
    api = "/Master/MaterialChangeOver";
    user = {};
    txtGUID = $("#txtGUID").val()
    __RequestVerificationToken = $('#frm input[name=__RequestVerificationToken]').val()
    headerData = {};
    headerData.__RequestVerificationToken = __RequestVerificationToken;
    setButtonNextPrvVisibility();
    iniitializeData();
}
initializePage();
getAllMaterialChangeOver(pageMaterialChangeOver.page, cari);
function setButtonNextPrvVisibility() {
    if (pageMaterialChangeOver.hasNext) {
        $btnNext.show();
    } else {
        $btnNext.hide();
    }
    if (pageMaterialChangeOver.hasPrevious) {
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
        materialChangeOver = response.objData;
        setupAddMaterialChangeOverForm();
        $materialChangeOverFormTitle.text = "Add MaterialChangeOver";
    }, errorHandle, headerData);
}

function setupAddMaterialChangeOverForm() {
    $txtMaterialChangeOverCode.val(materialChangeOver.txtMaterialChangeOverCode);
    $txtMaterialChangeOverDescription.val(materialChangeOver.txtMaterialChangeOverDescription);
    $intLevel.val(materialChangeOver.intLevel);
}

//=======================
// AJAX REQUEST GET ALL PRODUCT
//=======================
function getAllMaterialChangeOver(x, y) {
    $.postApi(api + "/getAllMaterialChangeOver",
        {
            page: x,
            cari: y,
            size: 20
        },
        function (response) {
            pageMaterialChangeOver = response.objData;
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
function saveMaterialChangeOver() {
    $.postApi(api + "/Save",
        materialChangeOver,
        function (response) {
            iniitializeData();
            $.switchElement(elementToSwitch, 1);
            $.successMessage("Sukses", "Berhasil menyimpan materialChangeOver");
            getAllMaterialChangeOver(0, cari)
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
    if (pageMaterialChangeOver.hasContent) {
        for (let i = 0; i < pageMaterialChangeOver.content.length; i++) {
            var m = pageMaterialChangeOver.content[i];
            let $btnEdit = `<button class=' btn btn-outline-warning btnEdit ' data-materialchangeover='` + JSON.stringify(m) + `'> <i class='fa fa-edit'></i> Edit</button>`;
            let row = "<tr id='intMaterialChangeOverID" + m.intMaterialChangeOverID + "'>" +
                "<td class='text-center'>" + m.intMaterialChangeOverID + "</td>" +
                "<td class='text-center'>" + m.txtMaterialChangeOverCode + "</td>" +
                "<td class='text-center'>" + m.txtMaterialChangeOverDescription + "</td>" +
                "<td class='text-center'>" + m.intLevel + "</td>" +
                "<td class='text-center'>" +
                $btnEdit +
                "</td>" +
                "</tr>";
            $("#tbody").append(row);
        }
        $(".btnEdit").on('click', function () {
            let r = $(this).data('materialchangeover');
            setupDataMaterialChangeOverEdit(r);
            setupDataMaterialChangeOverEditForm();
            $.switchElement(elementToSwitch, 0);
            $materialChangeOverFormTitle.text = "Edit Material Change Over";
        })

    } else {
        $("#tbody").append("<tr><td colspan='5'><center><span class='text-muted'>No Data <a class='refresh' href=''>Refresh</a> </span></center></td></tr>");
    }
    setButtonNextPrvVisibility();
}
//=======================
// ASSIGN PRODUCT SAVE
//=======================
function setupDataMaterialChangeOver() {
    materialChangeOver.txtMaterialChangeOverCode = $txtMaterialChangeOverCode.val().toString();
    materialChangeOver.txtMaterialChangeOverDescription = $txtMaterialChangeOverDescription.val().toString();
    materialChangeOver.intLevel = parseInt($intLevel.val().toString());
}
//=======================
// ASSIGN EDIT PRODUCT
//=======================
function setupDataMaterialChangeOverEdit(r) {
    materialChangeOver.intMaterialChangeOverID = r.intMaterialChangeOverID;
    materialChangeOver.txtMaterialChangeOverCode = r.txtMaterialChangeOverCode;
    materialChangeOver.txtMaterialChangeOverDescription = r.txtMaterialChangeOverDescription;
    materialChangeOver.intLevel = r.intLevel;
    materialChangeOver.txtGUID = r.txtGUID;
}
//=======================
// ASSIGN EDIT PRODUCT FORM
//=======================
function setupDataMaterialChangeOverEditForm() {
    $txtMaterialChangeOverCode.val(materialChangeOver.txtMaterialChangeOverCode);
    $txtMaterialChangeOverDescription.val(materialChangeOver.txtMaterialChangeOverDescription);
    $intLevel.val(materialChangeOver.intLevel)
}

//=======================
// EXPORT EXCEL
//=======================
function ExportExcelHendler(d) {

    let wb = XLSX.utils.book_new();
    let data = d
    wb.Props = {
        Title: "Master Material Change Over E-RPS Export",
        Subject: "Master Material Change Over E-RPS",
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
                    { materialChangeOverRequest: dataExcel },
                    function (response) {
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
    if (pageMaterialChangeOver.hasNext) {
        getAllMaterialChangeOver(pageMaterialChangeOver.page + 1, cari);
    }
})

$btnPrev.bind('click', () => {
    if (pageMaterialChangeOver.hasPrevious) {
        getAllMaterialChangeOver(pageMaterialChangeOver.page - 1, cari);
    }
})
$btnAddMaterialChangeOver.bind('click', () => {
    $.switchElement(elementToSwitch, 0);
    iniitializeData();
})
$btnCancelAddMaterialChangeOver.bind('click', () => {
    $.switchElement(elementToSwitch, 1);
    $materialChangeOverFormTitle.text = "Add Material Change Over";
})
$btnSave.bind('click', () => {
    setupDataMaterialChangeOver();
    $.confirmMessage("Confirm", "Save Material Change Over?", "Ya Save", saveMaterialChangeOver);
})

function searchMaterialChangeOver() {
    pageMaterialChangeOver.page = 1;
    getAllMaterialChangeOver(pageMaterialChangeOver.page, cari);
}

$("#ExportExcel").click(() => {
    $.postApi(api + "/ExportExcel",
        {

        },
        function (response) {
            let wbout = ExportExcelHendler(response.objData);

            saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), `Master Material Change Over Export - ${new Date()}.xlsx`)
        },
        function (e) {
            $.errorMessage("Failed", e.responseJSON.txtMessage);

        },
    )
})

$(document).ready(() => {
    $ImportExcel.change(hendelFile)
})