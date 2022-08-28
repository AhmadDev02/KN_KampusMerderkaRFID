//=======================
// INITIALIZE DATA
//=======================
$(() => {
    initializePage();
    getAllBo(pageBo.page, cari);
})
var cari = '';
let pageBo = {};
pageBo.page = 1;
pageBo.hasContent = false;
pageBo.hasNext = false;
pageBo.hasPrevious = false;
let api = "/Master/Bo";
let txtGUID = $("#txtGUID").val()
let __RequestVerificationToken = $('#frm input[name=__RequestVerificationToken]').val()
let headerData = {};
headerData.__RequestVerificationToken = __RequestVerificationToken;

//=======================
// ALL BUTTON
//=======================
let $btnPrev = $("#btnPrev");
let $btnNext = $("#btnNext");
let $btnSave = $("#btnSave");

//=======================
// FORM 
//=======================
function initializePage() {
    page = 1;
    cari = "";
    pageBo = {};
    pageBo.page = 1;
    pageBo.hasContent = false;
    pageBo.hasNext = false;
    pageBo.hasPrevious = false;
    api = "/Master/Bo";
    user = {};
    txtGUID = $("#txtGUID").val()
    __RequestVerificationToken = $('#frm input[name=__RequestVerificationToken]').val()
    headerData = {};
    headerData.__RequestVerificationToken = __RequestVerificationToken;
    setButtonNextPrvVisibility();
}

function setButtonNextPrvVisibility() {
    if (pageBo.hasNext) {
        $btnNext.show();
    } else {
        $btnNext.hide();
    }
    if (pageBo.hasPrevious) {
        $btnPrev.show()
    } else {
        $btnPrev.hide();
    }
}


function errorHandle(error) {
    $.errorMessage("Error", error.responseJSON.txtMessage)
}
//=======================
// AJAX REQUEST GET ALL BO
//=======================
function getAllBo(x, y) {
    $.postApi(api + "/GetAllBo",
        {
            page: x,
            cari: y,
            size: 20
        },
        function (response) {
            pageBo = response.objData;
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
// AJAX REQUEST SAVE SHIFT
//=======================
//function saveShift() {
//    $.postApi(api + "/Save",
//        shift,
//        function (response) {
//            iniitializeData();
//            $.switchElement(elementToSwitch, 1);
//            $.successMessage("Sukses", "Berhasil menyimpan shift");
//            getAllShift(0, cari)
//        },
//        function (e) {
//            $.errorMessage("Failed", e.responseJSON.txtMessage);
//            $("#tbody").html("");
//            $("#tbody").append("<tr><td colspan='4'><center><span class='text-muted'>No Data <a class='refresh' href=''>Refresh</a> </span></center></td></tr>");
//        },
//        headerData
//    )
//}
//=======================
// FILL TABLE DATA
//=======================
function fillTableData() {
    $("#tbody").html("");
    if (pageBo.hasContent) {
        for (let i = 0; i < pageBo.content.length; i++) {
            var m = pageBo.content[i];
            let currentBitHold = m.bitHold;
            let currentBitPrioritas = m.bitHold;
            let idIntBo =  m.intBoID;
            let $badgeHold = currentBitHold ? "bg-red" : "bg-green";
            let $badgePrioritas = currentBitPrioritas ? "bg-red" : "bg-green";
            let $badgeTextHold = currentBitHold ? "Hold" : "No";
            let $badgeTextPrioritas = currentBitPrioritas ? "Priority" : "Normal";
            let $switcHold = fullacces ?
                `<div class="form-group">
                                <label class="switch">
                                    <input type="checkbox" class="bitHold" id="bithold-`+ idIntBo + `" data-bo='` + JSON.stringify(m) + `' onchange="(function(e){ e.preventDefault(); setTrial(e); })(event)">
                                    <span class="slider"></span>
                                </label>
                            </div>` : "<td><span class='badge " + $badgeHold + "'>" + $badgeTextHold + "</span></td> " ;
            let $switcPrioritas = fullacces ?
                `<div class="form-group">
                                <label class="switch">
                                    <input type="checkbox" class="bitPrioritas" id="bitprioritas-`+ idIntBo + `" data-bo='` + JSON.stringify(m) + `' onchange="(function(e){ e.preventDefault(); setTrial(e); })(event)">
                                    <span class="slider"></span>
                                </label>
                            </div>` : "<td><span class='badge " + $badgePrioritas + "'>" + $badgeTextPrioritas + "</span></td> ";
            let row = "<tr id='tr-" + idIntBo + "' class='tr-class'> " +
                "<td>" +m.txtBoNo + "</td>" +
                "<td>" + $.parseJsonDate(m.dtmPlanStartDate, "d/M/yyyy h:m", true) + "</td>" +
                "<td>" + m.item.txtItemDescription + "</td>" +
                "<td>" + m.productionLine.txtProductionLineCode + "</td>" +
                "<td>" + m.txtReceipeNumber + "</td>" +
                "<td>" + m.intReceipeVersion + "</td>" +
                "<td>" + $switcHold + "</td > " +
                "<td>" + $switcPrioritas + "</td > " +
                "</tr>";
            $("#tbody").append(row);
            if (currentBitHold) {
                $("#bithold-" + idIntBo).prop('checked', true);
            }
            if (currentBitPrioritas) {
                $("#bitprioritas-" + idIntBo).prop('checked', true);
            }
        }
    } else {
        $("#tbody").append("<tr><td colspan='9'><center><span class='text-muted'>No Data <a class='refresh' href=''>Refresh</a> </span></center></td></tr>");
    }
    setButtonNextPrvVisibility();
}
//=======================
// SET PRIORITAS
//=======================
function setPrioritas(e) {
    let boTemp = JSON.parse(e.target.getAttribute("data-bo"));
    try {
        if (boSpec.intBoID) {
            let textConfirm = !boT.bitHold ? 'Hold BO? ' : 'Cancel Hold?'
            clsGlobal.getConfirmation(textConfirm, function (result) {
                if (result == true && boSpec) {
                    saveData();
                }
                else {
                    return false;
                }
            });
        }

    } catch (ex) {
        clsGlobal.showAlert(ex);
    }
}
//=======================
// EVENT LISTENER
//=======================
$btnNext.bind('click', () => {
    if (pageBo.hasNext) {
        getAllBo(pageBo.page + 1, cari);
    }
})

$btnPrev.bind('click', () => {
    if (pageBo.hasPrevious) {
        getAllBo(pageBo.page - 1, cari);
    }
})

function searchBo() {
    pageBo.page = 1;
    getAllBo(pageBo.page, cari);
}

