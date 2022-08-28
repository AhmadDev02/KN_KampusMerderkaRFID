//=======================
// VARIABLE GLOBAL
//=======================
 

//=======================
// ON PAGE LOAD
//=======================
$(document).ready(function () {
    p_InitForm();
    p_validatePage();
    p_showPrevData();
});

//=======================
// FUNCTION
//=======================
function p_InitForm() { 
     
}

function p_validatePage() {
    
}

function p_showPrevData() {

}
  
 
//=======================
// HANDLER
//=======================

$(document).ready(function () {
    
    debugger;
    $('#txtUserName').focus();

    //$('#txtUserName').bind('change', function () {
    //    p_PopulateRole();
    //});
    //$('#btn-login').val();

   
});

function p_PopulateRole() {
    //$.blockUI();
    $.blockUI({
        css: {
            border: 'none',
            padding: '15px',
            backgroundColor: '#ccc',
            '-webkit-border-radius': '10px',
            '-moz-border-radius': '10px',
            opacity: .3,
            color: '#fff'
        }
    });
    $.ajax({
        type: "POST",
        url: "/Account/PopulateRole",
        data: { txtUserName: $("#txtUserName").val(), __RequestVerificationToken: $('#FormLogin input[name=__RequestVerificationToken]').val() },
        datatype: "json",
        success: function (itemList) { 
            $('#txtRole').empty();
            $.each(itemList, function (i, data) {
                $('#txtRole').append($('<option>').text(data.txtRoleName).attr('value', data.intRoleID));
            });
            $.unblockUI();
        }
    });
}



///===========================
/// INSTASCAN
///===========================
var clsGlobal = new clsGlobalClass();
$(document).ready(function () {
    let scanner;
    $("#btnScanQRCode").click(function () {
        $("#scanQRCode").toggle("show");
        scanner = new Instascan.Scanner({
            video: document.getElementById('preview'),
            continues: false

        });
        scanner.addListener('scan', function (content) {

            loginScan(content);
        });
        Instascan.Camera.getCameras().then(function (cameras) {
            if (cameras.length > 0) {
                debugger;
                var selectedCam = cameras[0];
                $.each(cameras, (i, c) => {
                    if (c.name.indexOf('back') != -1) {
                        selectedCam = c;
                        return false;
                    }
                });
                if (cameras.length > 1) {
                    scanner.mirror = false;
                }
                scanner.start(selectedCam);
            } else {
                clsGlobal.getAlert('No cameras found.');
            }
        }).catch(function (e) {
            console.log(e);
            clsGlobal.getAlert("Error");
        });
    });
    $(".dialog-close").click(function () {
        closeScan();

    })
    function loginScan(x) {
        scanner.stop();
        clsGlobal.showLoading();
        $.ajax({
            type: "POST",
            url: "/Account/ScanLoginApi",
            data: { txtGuid: x, __RequestVerificationToken: $('#FormLogin input[name=__RequestVerificationToken]').val() },
            datatype: "json",
            success: function (retDat) {
                clsGlobal.hideLoading();
                if (retDat.bitSuccess == true) {
                    if (retDat.objData != undefined) {
                        window.open("/", "_self");
                        closeScan();
                    } else {
                        scanner.start();
                    }
                } else {
                    clsGlobal.getAlert("Failed!!!");
                    scanner.start();
                }

            },
            error: function (retDat) {
                clsGlobal.hideLoading();
                clsGlobal.getAlert(retDat.txtMessage);
                scanner.start();
            }
        });

    }

    function closeScan() {
        $("#scanQRCode").hide();
        scanner.stop();
    }
});
