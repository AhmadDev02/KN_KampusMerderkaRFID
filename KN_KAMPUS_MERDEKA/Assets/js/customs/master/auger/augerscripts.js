//=======================
// INITIALIZE DATA
//=======================
var cari = '';
let pageAuger = {};
pageAuger.page = 1;
pageAuger.hasContent = false;
pageAuger.hasNext = false;
pageAuger.hasPrevious = false;
let api = "/Master/Auger";
let auger = {};
let txtGUID = $("#txtGUID").val()
let __RequestVerificationToken = $('#frm input[name=__RequestVerificationToken]').val()
let headerData = {};
headerData.__RequestVerificationToken = __RequestVerificationToken;
let elementToSwitch = [$("#augerFormRow"), $("#augerTableRow")];
let $augerFormTitle = $("#augerFormTitle");

//=======================
// ALL BUTTON
//=======================
let $btnPrev = $("#btnPrev");
let $btnNext = $("#btnNext");
let $btnSave = $("#btnSave");
let $btnAddAuger = $("#btnAddAuger");
let $btnCancelAddAuger = $("#btnCancelAddAuger");
//=======================
// FORM 
//=======================
let $intAugerSize = $("#intAugerSize");
let $txtAugerDescription = $("#txtAugerDescription");
let $ImportExcel = $("#ImportExcel");

function initializePage() {
    page = 1;
    cari = "";
    pageAuger = {};
    pageAuger.page = 1;
    pageAuger.hasContent = false;
    pageAuger.hasNext = false;
    pageAuger.hasPrevious = false;
    api = "/Master/Auger";
    user = {};
    txtGUID = $("#txtGUID").val()
    __RequestVerificationToken = $('#frm input[name=__RequestVerificationToken]').val()
    headerData = {};
    headerData.__RequestVerificationToken = __RequestVerificationToken;
    setButtonNextPrvVisibility();
    iniitializeData();
}
initializePage();
getAllAuger(pageAuger.page, cari);
function setButtonNextPrvVisibility() {
    if (pageAuger.hasNext) {
        $btnNext.show();
    } else {
        $btnNext.hide();
    }
    if (pageAuger.hasPrevious) {
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
        auger = response.objData;
        setupAddAugerForm();
        $augerFormTitle.text = "Add Auger";
    }, errorHandle, headerData);
}

function setupAddAugerForm() {
    $intAugerSize.val(auger.intAugerSize);
    $txtAugerDescription.val(auger.txtAugerDescription);
}

//=======================
// AJAX REQUEST GET ALL AUGER
//=======================
function getAllAuger(x, y) {
    $.postApi(api + "/getAllAuger",
        {
            page: x,
            cari: y,
            size: 20
        },
        function (response) {
            pageAuger = response.objData;
            fillTableData();
        },
        function (e) {
            $.errorMessage("Failed", e.responseJSON.txtMessage);
            $("#tbody").html("");
            $("#tbody").append("<tr><td colspan='4'><center><span class='text-muted'>No Data <a class='refresh' href=''>Refresh</a> </span></center></td></tr>");
        },
        headerData
    )
}
//=======================
// AJAX REQUEST SAVE AUGER
//=======================
function saveAuger() {
    $.postApi(api + "/Save",
        auger,
        function (response) {
            iniitializeData();
            $.switchElement(elementToSwitch, 1);
            $.successMessage("Sukses", "Berhasil menyimpan auger");
            getAllAuger(0, cari)
        },
        function (e) {
            $.errorMessage("Failed", e.responseJSON.txtMessage);
            $("#tbody").html("");
            $("#tbody").append("<tr><td colspan='4'><center><span class='text-muted'>No Data <a class='refresh' href=''>Refresh</a> </span></center></td></tr>");
        },
        headerData
    )
}
//=======================
// FILL TABLE DATA
//=======================
function fillTableData() {
    $("#tbody").html("");
    if (pageAuger.hasContent) {
        for (let i = 0; i < pageAuger.content.length; i++) {
            var m = pageAuger.content[i];
            let $btnEdit = `<button class=' btn btn-outline-warning btnEdit ' data-auger='` + JSON.stringify(m) + `'> <i class='fa fa-edit'></i> Edit</button>`;
            let row = "<tr id='intAugerID" + m.intAugerID + "'>" +
                "<td class='text-center'>" + m.intAugerID + "</td>" +
                "<td class='text-center'>" + m.intAugerSize + "</td>" +
                "<td class='text-center'>" + m.txtAugerDescription + "</td>" +
                "<td class='text-center'>" +
                $btnEdit +
                "</td>" +
                "</tr>";
            $("#tbody").append(row);
        }
        $(".btnEdit").on('click', function () {
            let r = $(this).data('auger');
            setupDataAugerEdit(r);
            setupDataAugerEditForm();
            $.switchElement(elementToSwitch, 0);
            $augerFormTitle.text = "Edit Augers";
        })

    } else {
        $("#tbody").append("<tr><td colspan='4'><center><span class='text-muted'>No Data <a class='refresh' href=''>Refresh</a> </span></center></td></tr>");
    }
    setButtonNextPrvVisibility();
}
//=======================
// ASSIGN AUGER SAVE
//=======================
function setupDataAuger() {
    auger.intAugerSize = parseInt($intAugerSize.val().toString());
    auger.txtAugerDescription = $txtAugerDescription.val().toString();
}
//=======================
// ASSIGN EDIT AUGER
//=======================
function setupDataAugerEdit(r) {
    auger.intAugerID = r.intAugerID;
    auger.intAugerSize = r.intAugerSize;
    auger.txtAugerDescription = r.txtAugerDescription;
    auger.txtGUID = r.txtGUID;
}
//=======================
// ASSIGN EDIT AUGER FORM
//=======================
function setupDataAugerEditForm() {
    $intAugerSize.val(auger.intAugerSize);
    $txtAugerDescription.val(auger.txtAugerDescription);
}

//=======================
// EXPORT EXCEL
//=======================
function ExportExcelHendler(d) {

    let wb = XLSX.utils.book_new();
    let data = d
    wb.Props = {
        Title: "Auger E-RPS Export",
        Subject: "Auger E-RPS",
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
                    { augerRequest: dataExcel },
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
    if (pageAuger.hasNext) {
        getAllAuger(pageAuger.page + 1, cari);
    }
})

$btnPrev.bind('click', () => {
    if (pageAuger.hasPrevious) {
        getAllAuger(pageAuger.page - 1, cari);
    }
})
$btnAddAuger.bind('click', () => {
    $.switchElement(elementToSwitch, 0);
    iniitializeData();
})
$btnCancelAddAuger.bind('click', () => {
    $.switchElement(elementToSwitch, 1);
    $augerFormTitle.text = "Add Auger";
})
$btnSave.bind('click', () => {
    setupDataAuger();
    $.confirmMessage("Confirm", "Save Auger?", "Ya Save", saveAuger);
})

function searchAuger() {
    pageAuger.page = 1;
    getAllAuger(pageAuger.page, cari);
}

$("#ExportExcel").click(() => {
    $.postApi(api + "/ExportExcel",
        {

        },
        function (response) {
            let wbout = ExportExcelHendler(response.objData);

            saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), `Master Auger Export - ${new Date()}.xlsx`)
        },
        function (e) {
            $.errorMessage("Failed", e.responseJSON.txtMessage);

        },
    )
})

$(document).ready(() => {
    $ImportExcel.change(hendelFile)
})