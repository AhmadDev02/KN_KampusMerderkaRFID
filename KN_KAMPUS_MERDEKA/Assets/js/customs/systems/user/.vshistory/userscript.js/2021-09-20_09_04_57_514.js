//=======================
// VARIABLE GLOBAL
//=======================
var clsGlobal = new clsGlobalClass(); 
var LOV;
var bitLoading = false; 


//=======================
// Confirmation
//======================= 

//=======================
// ON PAGE LOAD
//=======================
$(document).ready(function () {  
    p_InitForm();
    p_validatePage();  
});

//=======================
// FUNCTION
//=======================
function p_InitForm() {
    p_initiateData();
}

function p_validatePage() {
    
}

function p_showPrevData() {

}
 
function p_showBlank() {
    p_initiateData(); 
}

function setChooseLOV(txtValue) { 
    var arr = txtValue.split('|'); 
    switch (arr[0]) {
        case "txtID": $("#txtID").val(arr[1]);
            p_txtID_TextChanged();
            break;
       
    }
    clsGlobal.closeLOV(); 
}

function p_DataToUI(objData) { 
    $("#txtID").val(clsGlobal.parseToInteger(objData.intUserID));
    $("#txtUserName").val(clsGlobal.parseToString(objData.txtUserName));
    $("#txtFullName").val(clsGlobal.parseToString(objData.txtFullName));
    $("#txtNick").val(clsGlobal.parseToString(objData.txtNick));
    $("#txtEmpID").val(clsGlobal.parseToString(objData.txtEmpID));
    $("#txtEmail").val(clsGlobal.parseToString(objData.txtEmail)); 
    $('#chkActive').prop('checked', clsGlobal.parseToBoolean(objData.bitActive));
    $('#chkAD').prop('checked', clsGlobal.parseToBoolean(objData.bitUseActiveDirectory));

    $("#btnResetPassword").hide();
    if (clsGlobal.parseToBoolean(objData.bitUseActiveDirectory) == false
        && clsGlobal.parseToString(objData.txtUserName)!= "") {
        $("#btnResetPassword").show(); 
    }


    $("#txtHiddenObject").val(JSON.stringify(objData));
     
    //if ($("#txtID").val() == "" || $("#txtID").val() == "0") {
    //    $("#btnDelete").hide();
    //} else {
    //    $("#btnDelete").show();
    //}
}
 
function p_initiateData() { 
    clsGlobal.showLoading();
    $.ajax({
        type: "POST",
        url: "/System/User/InitiateData",
        data: { txtGUID: $("#txtGUID").val(), __RequestVerificationToken: $('#frm1 input[name=__RequestVerificationToken]').val() },
        datatype: "json",
        success: function (retDat) {
            
            if (retDat.bitSuccess == true) { 
                if (retDat.objData != undefined) { 
                    $("#txtHiddenObject").val(JSON.stringify(retDat.objData));
                    p_DataToUI(retDat.objData);
                } else { 
                    p_showBlank();
                }
            } else {
                clsGlobal.getAlert(retDat.txtMessage);
            }
            $("#txtGUID").val(retDat.txtGUID);
            clsGlobal.hideLoading();
        },
        error: function (retDat) { 
            clsGlobal.hideLoading();
        }
    });

}

function p_UIToData() { 
    var jsonObj = [];
    var htmlJSON = $("#txtHiddenObject").val();  
    jsonData = JSON.parse(htmlJSON);
    jsonData.intUserID = clsGlobal.parseToInteger($("#txtID").val());
    jsonData.txtUserName = $("#txtUserName").val();
    jsonData.txtFullName = $("#txtFullName").val().toString();
    jsonData.txtNick = $("#txtNick").val().toString();
    jsonData.txtEmpID = $("#txtEmpID").val().toString();
    jsonData.txtEmail = $("#txtEmail").val().toString(); 
    jsonData.bitActive = clsGlobal.parseToBoolean($("#chkActive").prop("checked"));
    jsonData.bitUseActiveDirectory = clsGlobal.parseToBoolean($("#chkAD").prop("checked"));

    $("#txtHiddenObject").val(JSON.stringify(jsonData));
    
}
 

function p_txtID_TextChanged() {
    clsGlobal.showLoading();
    $.ajax({
        type: "POST",
        url: "/System/User/GetData",
        data: { txtID: $("#txtID").val(), txtGUID: $("#txtGUID").val(), __RequestVerificationToken: $('#frm1 input[name=__RequestVerificationToken]').val() },
        datatype: "json",
        success: function (retDat) {
            
            if (retDat.bitSuccess == true) {
                if (retDat.objData != undefined) {
                    p_DataToUI(retDat.objData); 
                } else {
                    p_showBlank();
                }                
            } else {
                clsGlobal.getAlert(retDat.txtMessage);
            }
            $("#txtGUID").val(retDat.txtGUID);
            clsGlobal.hideLoading();
        },
        error: function (retDat) {
            clsGlobal.hideLoading();
        }
    });
}
 
function p_saveData() {
    
    clsGlobal.showLoading();
    p_UIToData(); 
    $.ajax({ 
        type: "POST",
        url: "/System/User/SaveData", 
        data: { data: $("#txtHiddenObject").val(), txtGUID: $("#txtGUID").val(), __RequestVerificationToken: $('#frm1 input[name=__RequestVerificationToken]').val() },
        datatype: "json",
        success: function (retDat) {
            debugger; 
            if (retDat.bitSuccess == true) { 
                p_DataToUI(retDat.objData);
                clsGlobal.getInformationMessage(retDat.txtMessage);
            } else {
                clsGlobal.getAlert(retDat.txtMessage);
            }
            $("#txtGUID").val(retDat.txtGUID);
            clsGlobal.hideLoading();
        },
        error: function (retDat) {
            debugger;
            clsGlobal.hideLoading();
        }
    });
}
 
function p_deleteData() { 
    clsGlobal.showLoading();
    p_UIToData(); 
    $.ajax({ 
        type: "POST",
        url: "/System/User/DeleteData", 
        data: { data: $("#txtHiddenObject").val(), txtGUID: $("#txtGUID").val(), __RequestVerificationToken: $('#frm1 input[name=__RequestVerificationToken]').val() },
        datatype: "json",
        success: function (retDat) {
            debugger; 
            if (retDat.bitSuccess == true) { 
                p_DataToUI(retDat.objData);
                clsGlobal.getInformationMessage(retDat.txtMessage);
            } else {
                clsGlobal.getAlert(retDat.txtMessage);
            }
            $("#txtGUID").val(retDat.txtGUID);
            clsGlobal.hideLoading();
        },
        error: function (retDat) { 
            clsGlobal.hideLoading();
        }
    });
}


function p_resetPassword() {
    clsGlobal.showLoading();
    p_UIToData();
    $.ajax({
        type: "POST",
        url: "/System/User/ResetPassword",
        data: { data: $("#txtHiddenObject").val(), txtGUID: $("#txtGUID").val(), __RequestVerificationToken: $('#frm1 input[name=__RequestVerificationToken]').val() },
        datatype: "json",
        success: function (retDat) {
            debugger;
            if (retDat.bitSuccess == true) {
                p_DataToUI(retDat.objData);
                clsGlobal.getInformationMessage(retDat.txtMessage);
            } else {
                clsGlobal.getAlert(retDat.txtMessage);
            }
            $("#txtGUID").val(retDat.txtGUID);
            clsGlobal.hideLoading();
        },
        error: function (retDat) {
            clsGlobal.hideLoading();
        }
    });
}

//=======================
// HANDLER
//=======================

$('#btnSave').bind('click', function () {
    try {
        clsGlobal.getConfirmation("Save this data?", function (result) {
            if (result == true) {
                p_saveData();
            }
            else {
                return false;
            }
        });
    } catch (ex) {
        clsGlobal.showAlert(ex);
    }
  });
  
$('#btnNew').bind('click', function () {   
    try {
        p_showBlank();
    } catch (ex) {
        clsGlobal.showAlert(ex);
    }
  });

  $('#btnLOVID').bind('click', function () { 
      try {           
           LOV = clsGlobal.generateLOV(MODULE_USER, "txtID");
      }catch(ex) {
          clsGlobal.showAlert(ex);
      }
  });

  $('#btnDelete').bind('click', function () {
      try {
          clsGlobal.getConfirmation("Delete this data?", function (result) {
              if (result == true) {
                  p_deleteData();
              }
              else {
                  return false;
              }
          });
      } catch (ex) {
          clsGlobal.showAlert(ex);
      }
  });
 
  $('#btnResetPassword').bind('click', function () {
      try {
          clsGlobal.getConfirmation("Reset Password this user?", function (result) {
              if (result == true) {
                  p_resetPassword();
              }
              else {
                  return false;
              }
          });
      } catch (ex) {
          clsGlobal.showAlert(ex);
      }
  });
 
