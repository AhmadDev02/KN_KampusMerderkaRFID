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
    //p_showPrevData(); 
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
    $("#txtID").val(clsGlobal.parseToInteger(objData.intMenuID));
    $("#txtName").val(clsGlobal.parseToString(objData.txtMenuName));
    $("#txtDescription").val(clsGlobal.parseToString(objData.txtDescription));
    $("#txtLink").val(clsGlobal.parseToString(objData.txtLink));
    $("#txtOrder").val(clsGlobal.parseToInteger(objData.intOrderID));

    p_PopulateParentAndSet(clsGlobal.parseToInteger(objData.intParentID));
    p_PopulateModuleAndSet(clsGlobal.parseToInteger(objData.intModuleID));

    $('#chkActive').prop('checked', clsGlobal.parseToBoolean(objData.bitActive)); 
    $("#txtHiddenObject").val(JSON.stringify(objData));
     
    if ($("#txtID").val() == "" || $("#txtID").val() == "0") {
        $("#btnDelete").hide();
    } else {
        $("#btnDelete").show();
    }
}

function p_PopulateParentAndSet(txtValue) { 
    clsGlobal.showLoading();
    $.ajax({
        type: "POST",
        url: "/Menu/PopulateParent",
        data: { txtGUID: $("#txtGUID").val(), __RequestVerificationToken: $('#FormLogin input[name=__RequestVerificationToken]').val() },
        datatype: "json",
        success: function (retDat) { 
            if (retDat.bitSuccess == true) {
                if (retDat.objData != undefined) {
                    $('#ddlParent').empty();
                    $('#ddlParent').append($('<option>').text("-").prop('value', "0"));
                    for (var i = 0; i < retDat.objData.length; i++) {                        
                        $('#ddlParent').append($('<option>').text(retDat.objData[i].txtMenuName).prop('value', retDat.objData[i].intMenuID));
                    }

                    if (txtValue != "") {
                        $("#ddlParent").val(txtValue);
                    }
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

function p_PopulateModuleAndSet(txtValue) { 
    clsGlobal.showLoading();
    $.ajax({
        type: "POST",
        url: "/Menu/PopulateModule",
        data: { txtGUID: $("#txtGUID").val(), __RequestVerificationToken: $('#FormLogin input[name=__RequestVerificationToken]').val() },
        datatype: "json",
        success: function (retDat) { 
            if (retDat.bitSuccess == true) {
                if (retDat.objData != undefined) {
                    $('#ddlModule').empty();
                        $('#ddlModule').append($('<option>').text("-").prop('value', "0"));
                    for (var i = 0; i < retDat.objData.length; i++) {
                        $('#ddlModule').append($('<option>').text(retDat.objData[i].txtModuleName).prop('value', retDat.objData[i].intModuleID));
                    }

                    if (txtValue != "") {
                        $("#ddlModule").val(txtValue);
                    }
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


function p_initiateData() { 
    clsGlobal.showLoading();
    $.ajax({
        type: "POST",
        url: "/System/Menu/InitiateData",
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
    jsonData.intMenuID = clsGlobal.parseToInteger($("#txtID").val());
    jsonData.intParentID = clsGlobal.parseToInteger($("#ddlParent").val());
    jsonData.txtMenuName = $("#txtName").val().toString();
    jsonData.txtDescription = $("#txtDescription").val().toString();
    jsonData.intModuleID = clsGlobal.parseToInteger( $("#ddlModule").val().toString());
    jsonData.txtLink = $("#txtLink").val().toString();
    jsonData.intOrderID = clsGlobal.parseToInteger($("#txtOrder").val().toString());
    jsonData.bitActive = clsGlobal.parseToBoolean($("#chkActive").prop("checked"));

       
    $("#txtHiddenObject").val(JSON.stringify(jsonData));
    
}
 

function p_txtID_TextChanged() {
    clsGlobal.showLoading();
    $.ajax({
        type: "POST",
        url: "/System/Menu/GetData",
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
        url: "/System/Menu/SaveData", 
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
        url: "/System/Menu/DeleteData", 
        data: { data: $("#txtHiddenObject").val(), txtGUID: $("#txtGUID").val(),  __RequestVerificationToken: $('#frm1 input[name=__RequestVerificationToken]').val() },
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

          LOV = clsGlobal.generateLOV(MODULE_MENU, "txtID");

          // -- for used : Test Access2Oracle --
          //LOV = clsGlobal.generateLOV(LOV_XXSHP_SFA_ITEMMASTER_V, "txtID"); // OK
          //LOV = clsGlobal.generateLOV(LOV_XXSHP_SFA_PRODLINE_V, "txtID"); // OK
          //LOV = clsGlobal.generateLOV(LOV_XXSHP_SFA_BATCH_ORDER_V, "txtID"); //OK
          //LOV = clsGlobal.generateLOV(LOV_XXSHP_SFA_LOB_V, "txtID"); // OK
          //LOV = clsGlobal.generateLOV(LOV_XXSHP_SFA_UOM_CONVERSION_V, "txtID"); //OK

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
 
