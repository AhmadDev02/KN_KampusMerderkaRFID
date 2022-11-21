//=======================
// INITIALIZE DATA
//=======================
var cari = '';
let pageKeyInDumping = {};
pageKeyInDumping.page = 1;
pageKeyInDumping.hasContent = false;
pageKeyInDumping.hasNext = false;
pageKeyInDumping.hasPrevious = false;
let api = "/KeyInDumping";
let keyindumping = {};
let txtGUID = $("#txtGUID").val()
let __RequestVerificationToken = $('#frm input[name=__RequestVerificationToken]').val()
let headerData = {};
headerData.__RequestVerificationToken = __RequestVerificationToken;
let elementToSwitch = [$("#keyindumpingFormRow"), $("#keyindumpingTableRow")];
let $keyindumpingFormTitle = $("#keyindumpingFormTitle");

//=======================
// ALL BUTTON
//=======================
let $btnPrev = $("#btnPrev");
let $btnNext = $("#btnNext");
let $btnSave = $("#btnSave");
let $btnEdit = $("#btnEdit");
let $btnHapus = $("#btnHapus");
let $btnUpdate = $("#btnUpdate");
let $btnOnProgress = $("#btnOnProgress");
let $btnReject = $("#btnReject");
let $btnDone = $("#btnDone");

//=======================
// FORM MENU
//=======================
let $intNoBO = $("#intNoBO");
let $txtCharges = $("#txtCharges");
let $txtNamaProduk = $("#txtNamaProduk");
let $txtPIC = $("#txtPIC");
let $txtDumpingLine = $("#txtDumpingLine");
let $txtStartTime = $("#txtStartTime");
let $txtEndTime = $("#txtEndTime");
let $txtStatus = $("#txtStatus");
let $bitStatus = $("#bitStatus");

function initializePage() {
    cari = "";
    pageKeyInDumping = {};
    pageKeyInDumping.page = 1;
    pageKeyInDumping.hasContent = false;
    pageKeyInDumping.hasNext = false;
    pageKeyInDumping.hasPrevious = false;
    api = "/KeyInDumping";
    keyindumping = {};
    txtGUID = $("#txtGUID").val();
    __RequestVerificationToken = $('#frm input[name=__RequestVerificationToken]').val()
    headerData = {};
    headerData.__RequestVerificationToken = __RequestVerificationToken;
    setButtonNextPrvVisibility();
    initializeData
}
initializePage();
getAllKeyInDumping(pageKeyInDumping.page, cari);
getAllHistory(pageKeyInDumping.page, cari);

function setButtonNextPrvVisibility() {
    if (pageKeyInDumping.hasNext) {
        $btnNext.show();
    } else {
        $btnNext.hide();
    }
    if (pageKeyInDumping.hasPrevious) {
        $btnPrev.show()
    } else {
        $btnPrev.hide();
    }
}

function errorHandle(error) {
    $.errorMessage("Error", error.responseJSON.txtMessage)
}


//==========================
//INITIALIZE DATA 
//==========================
function initializeData() {
    $.postApi(api + "/InitiateData", null, function (response) {
        module = response.objData;
        setupAddKeyInDumpingForm();
        $moduleFormTitle.text = "add Key In Dumping";
    }, errorHandle, headerData);
}


//=======================
// SETUP FORM MENU
//=======================
function setupAddKeyInDumpingForm() {
    $intKeyInDumpingID.val();
    $intNoBO.val("");
    $txtCharges.val(keyindumping.txtCharges);
    $txtNamaProduk.val(keyindumping.txtNamaProduk);
    $txtCharges.val("");
    $txtNamaProduk.val("");
    $txtPIC.val("");
    $txtDumpingLine.val("");
    $txtStartTime.val("");
    $txtEndTime.val("");
    $txtStatus.val("");
  /*  $bitActive.val("");*/
}

//=======================
// AJAX REQUEST GET ALL MENU
//=======================
function getAllKeyInDumping(x, y) {
    $.postApi(api + "/getAllKeyInDumping",
        {
            page: x,
            cari: y,
            size: 20
        },
        function (response) {
            pageKeyInDumping = response.objData;
            fillTableData();
            /*fillTableDataHistory();*/
        },
        function (e) {
            $.errorMessage("Failed", e.responseJSON.txtMessage);
            $("#tbody").html("");
            $("#tbody").append("<tr><td colspan='10'><center><span class='text-muted'>No Data <a class='refresh' href=''>Refresh</a> </span></center></td></tr>");
        },
        headerData
    )
}

//====================For Tabel History MAsih Revisi
function getAllHistory(x, y) {
    $.postApi(api + "/getAllHistory",
        {
            page: x,
            cari: y,
            size: 20
        },
        function (response) {
            pageKeyInDumping = response.objData;
            fillTableDataHistory();
        },
        function (e) {
            $.errorMessage("Failed", e.responseJSON.txtMessage);
            $("#tabelbody").html("");
            $("#tabelbody").append("<tr><td colspan='10'><center><span class='text-muted'>No Data <a class='refresh' href=''>Refresh</a> </span></center></td></tr>");
        },
        headerData
    )
}

//=======================
// AJAX REQUEST DELETE 
//=======================
function deleteKeyInDumping(x) {
    $.postApi(api + "/Delete",
        {
            id: x.intKeyInDumpingID
            
        }
        ,
        function (response) {
            getAllHistory(pageKeyInDumping.page)
        },
        function (e) {
            $.errorMessage("Failed", e.responseJSON.txtMessage);
        },
        headerData
    )
}

//=======================
// AJAX REQUEST SAVE MENU
//=======================
function saveKeyInDumping() {
    $.postApi(api + "/Save",
        keyindumping,
        function (response) {
            $.switchElement(elementToSwitch, 1);
            $.successMessage("Sukses", "Berhasil menyimpan key in dumping");
            getAllKeyInDumping(0, cari)
        },
        function (e) {
            $.errorMessage("Failed", e.responseJSON.txtMessage);
            $("#tbody").html("");
            $("#tbody").append("<tr><td colspan='10'><center><span class='text-muted'>No Data <a class='refresh' href=''>Refresh</a> </span></center></td></tr>");
        },
        headerData
    )
}


//=====for done ====//
function doneKeyInDumping(r) {
    $.postApi(api + "/Save",
        r,
        function (response) {
            $.switchElement(elementToSwitch, 1);
            $.successMessage("Sukses", "Done");
            getAllHistory(0, cari)
        },
        function (e) {
            $.errorMessage("Failed", e.responseJSON.txtMessage);
            $("#tabelbody").html("");
            $("#tabelbody").append("<tr><td colspan='10'><center><span class='text-muted'>No Data <a class='refresh' href=''>Refresh</a> </span></center></td></tr>");
        },
        headerData
    )
}

//=====for REJECT====//
function rejectKeyInDumping(r) {
    $.postApi(api + "/Save",
        r,
        function (response) {
            $.switchElement(elementToSwitch, 1);
            $.successMessage("Sukses", "Reject");
            getAllHistory(0, cari)
        },
        function (e) {
            $.errorMessage("Failed", e.responseJSON.txtMessage);
            $("#tabelbody").html("");
            $("#tabelbody").append("<tr><td colspan='10'><center><span class='text-muted'>No Data <a class='refresh' href=''>Refresh</a> </span></center></td></tr>");
        },
        headerData
    )
}

//=====for ONPROGRESS===//
function onprogressKeyInDumping(r) {
    $.postApi(api + "/Save",
        r,
        function (response) {
            $.switchElement(elementToSwitch, 1);
            $.successMessage("Sukses", "On Progress");
            getAllKeyInDumping(0, cari)
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
// FILL TABLE DATA revisi
//=======================
function fillTableData() {
    $("#tbody").html("");
    if (pageKeyInDumping.hasContent) {
        for (let i = 0; i < pageKeyInDumping.content.length; i++) {
            var m = pageKeyInDumping.content[i];
            let $btnEdit = `<button class='btnEdit  btn btn-outline-warning  m-1' data-keyindumping='` + JSON.stringify(m) + `'> <i class='fa fa-edit'></i> Edit</button>`;
            let $btnDeleteKeyInDumping = `<button class='btnDeleteKeyInDumping btn btn-outline-danger' data-keyindumping='` + JSON.stringify(m) + `'> <i class='fa fa-trash'></i> Delete</button>`;

            let $btnDone = `<button class='btnDone btn btn-outline-success   float-right m-1' data-dumping='${JSON.stringify(m)}'> <i class='fa fa-check'></i> Done</button>`;
            let $btnOnProgress = `<button class='btnStart btn btn-outline-warning   float-right m-1' data-dumping='${JSON.stringify(m)}'> <i class='fas fa-play'></i> Start</button>`;
            let $btnReject = `<button class='btnReject btn btn-outline-danger   float-right m-1' data-dumping='${JSON.stringify(m)}'> <i class='fas fa-exclamation-circle'></i> Reject</button>`;
            let row = "<tr id='intKeyInDumpingID" + m.intKeyInDumpingID + "'>" +
                "<td class='text-center'>" + m.intNoBO + "</td>" +
                "<td class='text-center'>" + m.txtCharges + "</td>" +
                "<td class='text-center'>" + m.txtNamaProduk + "</td>" +
                "<td class='text-center'>" + m.txtPIC + "</td>" +
                "<td class='text-center'>" + m.txtDumpingLine + "</td>" +
                "<td class='text-center'>" + m.txtStartTime + "</td>" +
                "<td class='text-center'>" + m.txtEndTime + "</td>" +
                "<td class='text-center'>" + m.txtStatus + "</td>" +
                "<td class='text-center'>" + $btnDone + $btnReject + $btnOnProgress +
                "</td>" +
                "</tr>";
            $("#tbody").append(row);

        }
        $(".btnStart").on('click', function () {
            var r = $(this).data('dumping');
            var tanggal = new Date();
            var nameTime = $(this).data('dumping');
            $.confirmMessage('On Progress', 'Apakah anda yakin', 'On Progress', function () {
                nameTime.txtStartTime = tanggal.getHours() + ":" + tanggal.getMinutes();
                r.txtStatus = "ON PROGRESS"
                onprogressKeyInDumping(r, nameTime)

            });


        })

        $(".btnDone").on('click', function () {
            var r = $(this).data('dumping');
            var tanggal = new Date();
            var nameTime = $(this).data('dumping');

            $.confirmMessage('Done', 'Apakah anda yakin', 'Done', function () {
                //=====Sudah Ok Waktu ya=======/
                nameTime.txtEndTime = tanggal.getHours() + ":" + tanggal.getMinutes();
                //====Revisi====/
                r.txtStatus = "DONE"
                doneKeyInDumping(r, nameTime)
                location.reload();
            });

          
        })

        $(".btnReject").on('click', function () {
            var r = $(this).data('dumping');
            var tanggal = new Date();
            var nameTime = $(this).data('dumping');
            $.confirmMessage('Reject', 'Apakah anda yakin', 'Reject', function () {
                nameTime.txtEndTime = tanggal.getHours() + ":" + tanggal.getMinutes();
                r.txtStatus = "REJECT"
                rejectKeyInDumping(r, nameTime)
                location.reload();
            });
        })

      


        $(".btnDeleteKeyInDumping").on('click', function () {
            var r = $(this).data('keyindumping');
            $.confirmMessage('Delete', 'Apakah anda yakin', 'Ya, Delete', function () {
                deleteKeyInDumping(r)
            });
        })

        $(".btnEdit").on('click', function () {
            let r = $(this).data('keyindumping');
            setupDataKeyInDumpingEdit(r);
            setupDataKeyInDumpingEditForm();
            $.switchElement(elementToSwitch, 0);
            $keyindumpingFormTitle.text = "Edit KeyInDumpings";
        })

    } else {
        $("#tbody").append("<tr><td colspan='10'><center><span class='text-muted'>No Data <a class='refresh' href=''>Refresh</a> </span></center></td></tr>");
    }
    setButtonNextPrvVisibility();


}//=======================
// FILL TABLE DATA HISTORY revisi
//=======================
function fillTableDataHistory() {
    $("#tabelbody").html("");
    if (pageKeyInDumping.hasContent) {
        for (let i = 0; i < pageKeyInDumping.content.length; i++) {
            var m = pageKeyInDumping.content[i];
            let $btnEdit = `<button class='btnEdit  btn btn-outline-warning  m-1' data-keyindumping='` + JSON.stringify(m) + `'> <i class='fa fa-edit'></i> Edit</button>`;
            let $btnDeleteKeyInDumping = `<button class='btnDeleteKeyInDumping btn btn-outline-danger' data-keyindumping='` + JSON.stringify(m) + `'> <i class='fa fa-trash'></i> Delete</button>`;

            let row2 = "<tr id='intKeyInDumpingID" + m.intKeyInDumpingID + "'>" +
                "<td class='text-center'>" + m.intNoBO + "</td>" +
                "<td class='text-center'>" + m.txtCharges + "</td>" +
                "<td class='text-center'>" + m.txtNamaProduk + "</td>" +
                "<td class='text-center'>" + m.txtPIC + "</td>" +
                "<td class='text-center'>" + m.txtDumpingLine + "</td>" +
                "<td class='text-center'>" + m.txtStartTime + "</td>" +
                "<td class='text-center'>" + m.txtEndTime + "</td>" +
                "<td class='text-center'>" + m.txtStatus + "</td>" +
                "<td class='text-center'>" + $btnDeleteKeyInDumping + $btnEdit + "</td>" +
                "</tr>";
            $("#tabelbody").append(row2);
        }

        $(".btnDeleteKeyInDumping").on('click', function () {
            var r = $(this).data('keyindumping');
            $.confirmMessage('Delete', 'Apakah anda yakin', 'Ya, Delete', function () {
                deleteKeyInDumping(r)
            });
        })

        $(".btnEdit").on('click', function () {
            let r = $(this).data('keyindumping');
            setupDataKeyInDumpingEdit(r);
            setupDataKeyInDumpingEditForm();
            $.switchElement(elementToSwitch, 0);
            $keyindumpingFormTitle.text = "Edit KeyInDumpings";
        })

    } else {
        $("#tabelbody").append("<tr><td colspan='10'><center><span class='text-muted'>No Data <a class='refresh' href=''>Refresh</a> </span></center></td></tr>");
    }
    setButtonNextPrvVisibility();
}


//=======================
// ASSIGN ROLE SAVE
//=======================
function setupDataKeyInDumping() {
    keyindumping.intNoBO = $intNoBO.val().toString();
    keyindumping.txtCharges = $txtCharges.val().toString();
    keyindumping.txtNamaProduk = $txtNamaProduk.val().toString();
    keyindumping.txtPIC = $txtPIC.val().toString();
    keyindumping.txtDumpingLine = $txtDumpingLine.val().toString();
    //keyindumping.txtStartTime = $txtStartTime.val().toString();
    //keyindumping.txtEndTime = $txtEndTime.val().toString();
    /*keyindumping.txtStatus = $txtStatus.val().toString();*/
   /* keyindumping.bitStatus = $bitStatus.is(":checked");*/
}
//=======================
// ASSIGN EDIT MENU
//=======================
function setupDataKeyInDumpingEdit(r) {
    keyindumping.intKeyInDumpingID = r.intKeyInDumpingID;
    keyindumping.intNoBO = r.intNoBO;
    keyindumping.txtCharges = r.txtCharges;
    keyindumping.txtGUID = r.txtGUID;
    keyindumping.txtNamaProduk = r.txtNamaProduk;
    keyindumping.txtPIC = r.txtPIC;
    keyindumping.txtDumpingLine = r.txtDumpingLine;
    //keyindumping.txtStartTime = r.txtStartTime;
    //keyindumping.txtEndTime = r.txtEndTime;
    /*keyindumping.txtStatus = r.txtStatus;*/
    /*keyindumping.bitStatus = r.bitStatus;*/
}
//=======================
// ASSIGN EDIT MENU FORM
//=======================
function setupDataKeyInDumpingEditForm() {
    $intNoBO.val(keyindumping.intNoBO);
    $txtCharges.val(keyindumping.txtCharges);
    $txtNamaProduk.val(keyindumping.txtNamaProduk);
    $txtPIC.val(keyindumping.txtPIC);
    $txtDumpingLine.val(keyindumping.txtDumpingLine);
    //$txtStartTime.val(keyindumping.txtStartTime);
    //$txtEndTime.val(keyindumping.txtEndTime);
    /* $txtStatus.val(keyindumping.txtStatus);*/
/*    $bitStatus.prop("checked", keyindumping.bitStatus);*/
}

//=======================
// EVENT LISTENER
//=======================
$btnSave.bind('click', () => {
    setupDataKeyInDumping();
    $.confirmMessage("Confirm", "Save Key In Dumping", "Ya Save", saveKeyInDumping);
})

$btnNext.bind('click', () => {
    if (pageKeyInDumping.hasNext) {
        getAllKeyInDumping(pageKeyInDumping.page + 1, cari);
    }
})

$btnPrev.bind('click', () => {
    if (pageKeyInDumping.hasPrevious) {
        getAllKeyInDumping(pageKeyInDumping.page - 1, cari);
    }
})

function searchKeyInDumping() {
    pageKeyInDumping.page = 1;
    getAllKeyInDumping(pageKeyInDumping.page, cari);
}