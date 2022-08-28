//=======================
// INITIALIZE DATA
//=======================
var cari = '';
let pageItem = {};
pageItem.page = 1;
pageItem.hasContent = false;
pageItem.hasNext = false;
pageItem.hasPrevious = false;
let api = "/Master/Item";
let item = {};
let txtGUID = $("#txtGUID").val()
let __RequestVerificationToken = $('#frm input[name=__RequestVerificationToken]').val()
let headerData = {};
headerData.__RequestVerificationToken = __RequestVerificationToken;
let elementToSwitch = [$("#setupRow"), $("#itemTableRow")];
let selectedSetupItem = null;
let selectedAlergen = null;
let selectedGramasi = null;
let $setupTitle = $("#setupTitle");
//=======================
// ALL BUTTON
//=======================
let $btnPrev = $("#btnPrev");
let $btnNext = $("#btnNext");
let $btnCancel = $("#btnCancelSetup");
let $btnSelectAlergen = $("#btnSelectAlergen");
let $btnSelectGramasi = $("#btnSelectGramasi");
let $btnSave = $("#btnSave");
//=======================
// FORM 
//=======================
let $txtSelectedAlergen = $("#txtSelectedAlergen");
let $txtSelectedGramasi = $("#txtSelectedGramasi");
let $intRevit = $("#intRevit");

function initializePage() {
    page = 1;
    cari = "";
    pageItem = {};
    pageItem.page = 1;
    pageItem.hasContent = false;
    pageItem.hasNext = false;
    pageItem.hasPrevious = false;
    api = "/Master/Item";
    user = {};
    txtGUID = $("#txtGUID").val()
    __RequestVerificationToken = $('#frm input[name=__RequestVerificationToken]').val()
    headerData = {};
    headerData.__RequestVerificationToken = __RequestVerificationToken;
    setButtonNextPrvVisibility();
}
initializePage();
getAllItem(pageItem.page, cari);
function setButtonNextPrvVisibility() {
    if (pageItem.hasNext) {
        $btnNext.show();
    } else {
        $btnNext.hide();
    }
    if (pageItem.hasPrevious) {
        $btnPrev.show()
    } else {
        $btnPrev.hide();
    }
}


function errorHandle(error) {
    $.errorMessage("Error", error.responseJSON.txtMessage)
}

//=======================
// AJAX REQUEST SAVE SETUPR ITEM
//=======================
function saveSetupItem(x) {
    $.postApi(api + "/setupItem",
        x,
        function (response) {
            $.switchElement(elementToSwitch, 1);
            $.successMessage("Sukses", "Berhasil menyimpan setup");
            getAllItem(0, cari)
        },
        function (e) {
            $.errorMessage("Failed", e.responseJSON.txtMessage);

        },
        headerData
    )
}
//=======================
// AJAX REQUEST GET ALL PRODUCT
//=======================
function getAllItem(x, y) {
    $.postApi(api + "/getAllItem",
        {
            page: x,
            cari: y,
            size: 20
        },
        function (response) {
            pageItem = response.objData;
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
// AJAX REQUEST GET ONE ALEREGEN
//=======================
function getOneAlergen(x) {
    $.postApi("/Master/Alergen/getByKode",
        {
            kode: x
        },
        function (response) {
            selectedAlergen = response.objData;
            $txtSelectedAlergen.val(selectedAlergen.txtAlergenCode)
        },
        function (e) {
            $.errorMessage("Failed", e.responseJSON.txtMessage + " Silahkan setup alergen terlebih dahulu");
        },
        headerData
    )
}
function getSelectedProductVariantAugerGramasi(x) {
    selectedGramasi = x;
    $txtSelectedGramasi.val(`${selectedGramasi.decGramasi} GR`)
}
function getSelectedAlergen(x) {
    selectedAlergen = x;
    $txtSelectedAlergen.val(selectedAlergen.txtAlergenCode)
}

//=======================
// FILL TABLE DATA
//=======================
function fillTableData() {
    $("#tbody").html("");
    if (pageItem.hasContent) {
        for (let i = 0; i < pageItem.content.length; i++) {
            var m = pageItem.content[i];
            let $btnSetup = !m.bitSetup ? `<button class=' btn btn-outline-warning btn-setup' data-item='` + JSON.stringify(m) + `'> <i class='fa fa-edit'></i> Setup</button>` : 'No Action Required';
            let row = "<tr id='intItemID" + m.intItemID + "'>" +
                "<td class='text-center'>" + m.intItemID + "</td>" +
                "<td class='text-center'>" + m.intInventoyItemID + "</td>" +
                "<td class='text-center'>" + m.txtItemCode + "</td>" +
                "<td class='text-center'>" + m.txtItemDescription + "</td>" +
                "<td class='text-center'>" + m.txtPrimaryUom + "</td>" +
                "<td class='text-center'>" + m.txtType + "</td>" +
                "<td class='text-center'>" + m.txtCategory + "</td>" +
                "<td class='text-center'>" + m.txtAttribute + "</td>" +
                "<td class='text-center'>" +
                $btnSetup +
                "</td>" +
                "</tr>";
            $("#tbody").append(row);
        }
        $(".btn-setup").on('click', function () {
            let r = $(this).data('item');
            selectedSetupItem = r;
            $.switchElement(elementToSwitch, 0);
            setupItemForm();
            $setupTitle.html(`Setup Item <span class='text-green text-bold blinking'>${r.txtItemDescription}</span>`);
        })

    } else {
        $("#tbody").append("<tr><td colspan='9'><center><span class='text-muted'>No Data <a class='refresh' href=''>Refresh</a> </span></center></td></tr>");
    }
    setButtonNextPrvVisibility();
}

function setupItemForm() {
    if (selectedSetupItem != null) {
        if (selectedSetupItem.txtAlergenCode.length > 0) {
            getOneAlergen(selectedSetupItem.txtAlergenCode);
        }
    }
}





//=======================
// EVENT LISTENER
//=======================
$btnNext.bind('click', () => {
    if (pageItem.hasNext) {
        getAllItem(pageItem.page + 1, cari);
    }
})

$btnPrev.bind('click', () => {
    if (pageItem.hasPrevious) {
        getAllItem(pageItem.page - 1, cari);
    }
})
$btnCancel.bind('click', () => {
    $.switchElement(elementToSwitch, 1);
    selectedSetupItem = null;
    selectedGramasi = null;
    selectedAlergen = null;
    $txtSelectedGramasi.val("");
    $txtSelectedAlergen.val("");
});
$btnSelectAlergen.bind('click', () => {
    $.showLOV('Alergen');
})
$btnSelectGramasi.bind('click', () => {
    let productSearchFilter = selectedSetupItem.txtItemDescription.split(" ");
    let regex = /([0-9]+)\s+G/g;
    let productGramasi = selectedSetupItem.txtItemDescription.match(regex);
    productGramasi = productGramasi != null ? productGramasi[0] : "";
    productSearchFilter = `${productSearchFilter[0]} ${productSearchFilter[1]}  ${productGramasi}`;

    $.showLOV('ProductVariantAugerGramasi?cari=' + productSearchFilter);
})
$btnSave.bind('click', () => {
    if (selectedAlergen == null) {
        $.errorMessage('Error', 'Pilih Jenis Alergen');
    } else {
        if (selectedGramasi == null) {
            $.errorMessage('Error', 'Pilih Gramasi');
        } else {
            if (selectedSetupItem == null) {
                $.errorMessage('Error', 'Item tidak di pilih');
            } else {
                let itemSetup = {};
                itemSetup.intItemID = selectedSetupItem.intItemID;
                itemSetup.intAlergenID = selectedAlergen.intAlergenID;
                itemSetup.intProductVariantAugerGramasiID = selectedGramasi.intProductVariantAugerGramasiID;
                itemSetup.intRevit = parseInt($intRevit.val().toString()) | 0;
                $.confirmMessageHtml(`Simpan Setup ${selectedSetupItem.txtItemDescription}`,
                    `
                    <table class='table-boredered table'>
                        <thead>
                            <tr>
                                <td class='text-bold'>Property</td>
                                <td class='text-bold'>Value</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Gramasi<td>
                                <td> ${selectedGramasi.decGramasi}  <td>
                            </tr>
                            <tr>
                                <td>Alergen<td>
                                <td>  ${selectedAlergen.txtAlergenCode}  <td>
                            </tr>
                            <tr>
                                <td>Alergen<td>
                                <td>  ${itemSetup.intRevit} <td>
                            </tr>
                        </tbody>
                    </table>
                    `,
                    'Ya Saya Yakin', () => {
                        //saveSetupItem(itemSetup);
                        alert('OK');
                    })
            }
        }
    }
});
function searchItem() {
    pageItem.page = 1;
    getAllItem(pageItem.page, cari);
}

