//=======================
// INITIALIZE DATA
//=======================
var cari = '';
let pageAlergen = {};
pageAlergen.page = 1;
pageAlergen.hasContent = false;
pageAlergen.hasNext = false;
pageAlergen.hasPrevious = false;
let api = "/Master/Alergen";
let alergen = {};
let txtGUID = $("#txtGUID").val()
let __RequestVerificationToken = $('#frm input[name=__RequestVerificationToken]').val()
let headerData = {};
headerData.__RequestVerificationToken = __RequestVerificationToken;
let elementToSwitch = [$("#alergenFormRow"), $("#alergenTableRow")];
let $alergenFormTitle = $("#alergenFormTitle");

//=======================
// ALL BUTTON
//=======================
let $btnPrev = $("#btnPrev");
let $btnNext = $("#btnNext");
let $btnSave = $("#btnSave");
let $btnAddAlergen = $("#btnAddAlergen");
let $btnCancelAddAlergen = $("#btnCancelAddAlergen");
//=======================
// FORM 
//=======================
let $txtAlergenCode = $("#txtAlergenCode");
let $txtAlergenDescription = $("#txtAlergenDescription");
let $intLevel = $("#intLevel");
let $ImportExcel = $("#ImportExcel");

function initializePage() {
    page = 1;
    cari = "";
    pageAlergen = {};
    pageAlergen.page = 1;
    pageAlergen.hasContent = false;
    pageAlergen.hasNext = false;
    pageAlergen.hasPrevious = false;
    api = "/Master/Alergen";
    user = {};
    txtGUID = $("#txtGUID").val()
    __RequestVerificationToken = $('#frm input[name=__RequestVerificationToken]').val()
    headerData = {};
    headerData.__RequestVerificationToken = __RequestVerificationToken;
    setButtonNextPrvVisibility();
    iniitializeData();
}
initializePage();
getAllAlergen(pageAlergen.page, cari);
function setButtonNextPrvVisibility() {
    if (pageAlergen.hasNext) {
        $btnNext.show();
    } else {
        $btnNext.hide();
    }
    if (pageAlergen.hasPrevious) {
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
        alergen = response.objData;
        setupAddAlergenForm();
        $alergenFormTitle.text = "Add Alergen";
    }, errorHandle, headerData);
}

function setupAddAlergenForm() {
    $txtAlergenCode.val(alergen.txtAlergenCode);
    $txtAlergenDescription.val(alergen.txtAlergenDescription);
    $intLevel.val(alergen.intLevel);
}

//=======================
// AJAX REQUEST GET ALL PRODUCT
//=======================
function getAllAlergen(x, y) {
    $.postApi(api + "/getAllAlergen",
        {
            page: x,
            cari: y,
            size: 20
        },
        function (response) {
            pageAlergen = response.objData;
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
function saveAlergen() {
    $.postApi(api + "/Save",
        alergen,
        function (response) {
            iniitializeData();
            $.switchElement(elementToSwitch, 1);
            $.successMessage("Sukses", "Berhasil menyimpan alergen");
            getAllAlergen(0, cari)
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
    if (pageAlergen.hasContent) {
        for (let i = 0; i < pageAlergen.content.length; i++) {
            var m = pageAlergen.content[i];
            let $btnEdit = `<button class=' btn btn-outline-warning btnEdit ' data-alergen='` + JSON.stringify(m) + `'> <i class='fa fa-edit'></i> Edit</button>`;
            let row = "<tr id='intAlergenID" + m.intAlergenID + "'>" +
                "<td class='text-center'>" + m.intAlergenID + "</td>" +
                "<td class='text-center'>" + m.txtAlergenCode + "</td>" +
                "<td class='text-center'>" + m.txtAlergenDescription + "</td>" +
                "<td class='text-center'>" + m.intLevel + "</td>" +
                "<td class='text-center'>" +
                $btnEdit +
                "</td>" +
                "</tr>";
            $("#tbody").append(row);
        }
        $(".btnEdit").on('click', function () {
            let r = $(this).data('alergen');
            setupDataAlergenEdit(r);
            setupDataAlergenEditForm();
            $.switchElement(elementToSwitch, 0);
            $alergenFormTitle.text = "Edit Alergens";
        })

    } else {
        $("#tbody").append("<tr><td colspan='5'><center><span class='text-muted'>No Data <a class='refresh' href=''>Refresh</a> </span></center></td></tr>");
    }
    setButtonNextPrvVisibility();
}
//=======================
// ASSIGN PRODUCT SAVE
//=======================
function setupDataAlergen() {
    alergen.txtAlergenCode = $txtAlergenCode.val().toString();
    alergen.txtAlergenDescription = $txtAlergenDescription.val().toString();
    alergen.intLevel = parseInt($intLevel.val().toString());
}
//=======================
// ASSIGN EDIT PRODUCT
//=======================
function setupDataAlergenEdit(r) {
    alergen.intAlergenID = r.intAlergenID;
    alergen.txtAlergenCode = r.txtAlergenCode;
    alergen.txtAlergenDescription = r.txtAlergenDescription;
    alergen.intLevel = r.intLevel;
    alergen.txtGUID = r.txtGUID;
}
//=======================
// ASSIGN EDIT PRODUCT FORM
//=======================
function setupDataAlergenEditForm() {
    $txtAlergenCode.val(alergen.txtAlergenCode);
    $txtAlergenDescription.val(alergen.txtAlergenDescription);
    $intLevel.val(alergen.intLevel)
}

//=======================
// EXPORT EXCEL
//=======================
function ExportExcelHendler(d) {

    let wb = XLSX.utils.book_new();
    let data = d
    wb.Props = {
        Title: "Alergent E-RPS Export",
        Subject: "Alergent E-RPS",
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
                    { alergenRequest: dataExcel },
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
    if (pageAlergen.hasNext) {
        getAllAlergen(pageAlergen.page + 1, cari);
    }
})

$btnPrev.bind('click', () => {
    if (pageAlergen.hasPrevious) {
        getAllAlergen(pageAlergen.page - 1, cari);
    }
})
$btnAddAlergen.bind('click', () => {
    $.switchElement(elementToSwitch, 0);
    iniitializeData();
})
$btnCancelAddAlergen.bind('click', () => {
    $.switchElement(elementToSwitch, 1);
    $alergenFormTitle.text = "Add Alergen";
})
$btnSave.bind('click', () => {
    setupDataAlergen();
    $.confirmMessage("Confirm", "Save Alergen?", "Ya Save", saveAlergen);
})

function searchAlergen() {
    pageAlergen.page = 1;
    getAllAlergen(pageAlergen.page, cari);
}

$("#ExportExcel").click(() => {
    $.postApi(api + "/ExportExcel",
        {

        },
        function (response) {
            let wbout = ExportExcelHendler(response.objData);

            saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), `Master Alergent Export - ${new Date()}.xlsx`)
        },
        function (e) {
            $.errorMessage("Failed", e.responseJSON.txtMessage);

        },
    )
})

$(document).ready(() => {
    $ImportExcel.change(hendelFile)
})