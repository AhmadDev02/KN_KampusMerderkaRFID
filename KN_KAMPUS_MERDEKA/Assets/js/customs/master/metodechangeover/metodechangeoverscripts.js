//=======================
// INITIALIZE DATA
//=======================
var cari = '';
let pageMetodeChangeOver = {};
pageMetodeChangeOver.page = 1;
pageMetodeChangeOver.hasContent = false;
pageMetodeChangeOver.hasNext = false;
pageMetodeChangeOver.hasPrevious = false;
let api = "/Master/MetodeChangeOver";
let metodeChangeOver = {};
let txtGUID = $("#txtGUID").val()
let __RequestVerificationToken = $('#frm input[name=__RequestVerificationToken]').val()
let headerData = {};
headerData.__RequestVerificationToken = __RequestVerificationToken;
let elementToSwitch = [$("#metodeChangeOverFormRow"), $("#metodeChangeOverTableRow")];
let $metodeChangeOverFormTitle = $("#metodeChangeOverFormTitle");

//=======================
// ALL BUTTON
//=======================
let $btnPrev = $("#btnPrev");
let $btnNext = $("#btnNext");
let $btnSave = $("#btnSave");
let $btnAddMetodeChangeOver = $("#btnAddMetodeChangeOver");
let $btnCancelAddMetodeChangeOver = $("#btnCancelAddMetodeChangeOver");
//=======================
// FORM 
//=======================
let $txtMetodeChangeOverCode = $("#txtMetodeChangeOverCode");
let $txtMetodeChangeOverDescription = $("#txtMetodeChangeOverDescription");
let $intLevel = $("#intLevel");
let $ImportExcel = $("#ImportExcel");

function initializePage() {
    page = 1;
    cari = "";
    pageMetodeChangeOver = {};
    pageMetodeChangeOver.page = 1;
    pageMetodeChangeOver.hasContent = false;
    pageMetodeChangeOver.hasNext = false;
    pageMetodeChangeOver.hasPrevious = false;
    api = "/Master/MetodeChangeOver";
    user = {};
    txtGUID = $("#txtGUID").val()
    __RequestVerificationToken = $('#frm input[name=__RequestVerificationToken]').val()
    headerData = {};
    headerData.__RequestVerificationToken = __RequestVerificationToken;
    setButtonNextPrvVisibility();
    iniitializeData();
}
initializePage();
getAllMetodeChangeOver(pageMetodeChangeOver.page, cari);
function setButtonNextPrvVisibility() {
    if (pageMetodeChangeOver.hasNext) {
        $btnNext.show();
    } else {
        $btnNext.hide();
    }
    if (pageMetodeChangeOver.hasPrevious) {
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
        metodeChangeOver = response.objData;
        setupAddMetodeChangeOverForm();
        $metodeChangeOverFormTitle.text = "Add Metode Change Over";
    }, errorHandle, headerData);
}

function setupAddMetodeChangeOverForm() {
    $txtMetodeChangeOverCode.val(metodeChangeOver.txtMetodeChangeOverCode);
    $txtMetodeChangeOverDescription.val(metodeChangeOver.txtMetodeChangeOverDescription);
    $intLevel.val(metodeChangeOver.intLevel);
}

//=======================
// AJAX REQUEST GET ALL PRODUCT
//=======================
function getAllMetodeChangeOver(x, y) {
    $.postApi(api + "/getAllMetodeChangeOver",
        {
            page: x,
            cari: y,
            size: 20
        },
        function (response) {
            pageMetodeChangeOver = response.objData;
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
function saveMetodeChangeOver() {
    $.postApi(api + "/Save",
        metodeChangeOver,
        function (response) {
            iniitializeData();
            $.switchElement(elementToSwitch, 1);
            $.successMessage("Sukses", "Berhasil menyimpan metodeChangeOver");
            getAllMetodeChangeOver(0, cari)
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
    if (pageMetodeChangeOver.hasContent) {
        for (let i = 0; i < pageMetodeChangeOver.content.length; i++) {
            var m = pageMetodeChangeOver.content[i];
            let $btnEdit = `<button class=' btn btn-outline-warning btnEdit ' data-metodechangeover='` + JSON.stringify(m) + `'> <i class='fa fa-edit'></i> Edit</button>`;
            let row = "<tr id='intMetodeChangeOverID" + m.intMetodeChangeOverID + "'>" +
                "<td class='text-center'>" + m.intMetodeChangeOverID + "</td>" +
                "<td class='text-center'>" + m.txtMetodeChangeOverCode + "</td>" +
                "<td class='text-center'>" + m.txtMetodeChangeOverDescription + "</td>" +
                "<td class='text-center'>" + m.intLevel + "</td>" +
                "<td class='text-center'>" +
                $btnEdit +
                "</td>" +
                "</tr>";
            $("#tbody").append(row);
        }
        $(".btnEdit").on('click', function () {
            let r = $(this).data('metodechangeover');
            setupDataMetodeChangeOverEdit(r);
            setupDataMetodeChangeOverEditForm();
            $.switchElement(elementToSwitch, 0);
            $metodeChangeOverFormTitle.text = "Edit Metode Change Overs";
        })

    } else {
        $("#tbody").append("<tr><td colspan='5'><center><span class='text-muted'>No Data <a class='refresh' href=''>Refresh</a> </span></center></td></tr>");
    }
    setButtonNextPrvVisibility();
}
//=======================
// ASSIGN PRODUCT SAVE
//=======================
function setupDataMetodeChangeOver() {
    metodeChangeOver.txtMetodeChangeOverCode = $txtMetodeChangeOverCode.val().toString();
    metodeChangeOver.txtMetodeChangeOverDescription = $txtMetodeChangeOverDescription.val().toString();
    metodeChangeOver.intLevel = parseInt($intLevel.val().toString());
}
//=======================
// ASSIGN EDIT PRODUCT
//=======================
function setupDataMetodeChangeOverEdit(r) {
    metodeChangeOver.intMetodeChangeOverID = r.intMetodeChangeOverID;
    metodeChangeOver.txtMetodeChangeOverCode = r.txtMetodeChangeOverCode;
    metodeChangeOver.txtMetodeChangeOverDescription = r.txtMetodeChangeOverDescription;
    metodeChangeOver.intLevel = r.intLevel;
    metodeChangeOver.txtGUID = r.txtGUID;
}
//=======================
// ASSIGN EDIT PRODUCT FORM
//=======================
function setupDataMetodeChangeOverEditForm() {
    $txtMetodeChangeOverCode.val(metodeChangeOver.txtMetodeChangeOverCode);
    $txtMetodeChangeOverDescription.val(metodeChangeOver.txtMetodeChangeOverDescription);
    $intLevel.val(metodeChangeOver.intLevel)
}

//=======================
// EXPORT EXCEL
//=======================
function ExportExcelHendler(d) {

    let wb = XLSX.utils.book_new();
    let data = d
    wb.Props = {
        Title: "Master Metode Change Over E-RPS Export",
        Subject: "Master Metode Change Over E-RPS",
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
                    { metodeChangeOverRequest: dataExcel },
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
    if (pageMetodeChangeOver.hasNext) {
        getAllMetodeChangeOver(pageMetodeChangeOver.page + 1, cari);
    }
})

$btnPrev.bind('click', () => {
    if (pageMetodeChangeOver.hasPrevious) {
        getAllMetodeChangeOver(pageMetodeChangeOver.page - 1, cari);
    }
})
$btnAddMetodeChangeOver.bind('click', () => {
    $.switchElement(elementToSwitch, 0);
    iniitializeData();
})
$btnCancelAddMetodeChangeOver.bind('click', () => {
    $.switchElement(elementToSwitch, 1);
    $metodeChangeOverFormTitle.text = "Add Metode Change Over";
})
$btnSave.bind('click', () => {
    setupDataMetodeChangeOver();
    $.confirmMessage("Confirm", "Save Metode Change Over?", "Ya Save", saveMetodeChangeOver);
})

function searchMetodeChangeOver() {
    pageMetodeChangeOver.page = 1;
    getAllMetodeChangeOver(pageMetodeChangeOver.page, cari);
}

$("#ExportExcel").click(() => {
    $.postApi(api + "/ExportExcel",
        {

        },
        function (response) {
            let wbout = ExportExcelHendler(response.objData);

            saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), `Master Metode Change Over Export - ${new Date()}.xlsx`)
        },
        function (e) {
            $.errorMessage("Failed", e.responseJSON.txtMessage);

        },
    )
})

$(document).ready(() => {
    $ImportExcel.change(hendelFile)
})