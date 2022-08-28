//=======================
// INITIALIZE DATA
//=======================
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

$(document).ready(function () {
    $.fn.dataTable.pipeline = function (opts) {
        // Configuration options
        var conf = $.extend(
            {
                pages: 50, // number of pages to cache
                url: api + '/GetAllBoDataTable', // script url
                data: null, // function or object with parameters to send to the server
                // matching how `ajax.data` works in DataTables
                method: 'POST', // Ajax HTTP method
                headers: headerData,
            },
            opts
        );

        // Private variables for storing the cache
        var cacheLower = -1;
        var cacheUpper = null;
        var cacheLastRequest = null;
        var cacheLastJson = null;

        return function (request, drawCallback, settings) {
            var ajax = false;
            var requestStart = request.start;
            var drawStart = request.start;
            var requestLength = request.length;
            var requestEnd = requestStart + requestLength;

            if (settings.clearCache) {
                // API requested that the cache be cleared
                ajax = true;
                settings.clearCache = false;
            } else if (cacheLower < 0 || requestStart < cacheLower || requestEnd > cacheUpper) {
                // outside cached data - need to make a request
                ajax = true;
            } else if (
                JSON.stringify(request.order) !== JSON.stringify(cacheLastRequest.order) ||
                JSON.stringify(request.columns) !== JSON.stringify(cacheLastRequest.columns) ||
                JSON.stringify(request.search) !== JSON.stringify(cacheLastRequest.search)
            ) {
                // properties changed (ordering, columns, searching)
                ajax = true;
            }

            // Store the request for checking next time around
            cacheLastRequest = $.extend(true, {}, request);

            if (ajax) {
                // Need data from the server
                if (requestStart < cacheLower) {
                    requestStart = requestStart - requestLength * (conf.pages - 1);

                    if (requestStart < 0) {
                        requestStart = 0;
                    }
                }

                cacheLower = requestStart;
                cacheUpper = requestStart + requestLength * conf.pages;

                request.start = requestStart;
                request.length = requestLength * conf.pages;

                // Provide the same `data` options as DataTables.
                if (typeof conf.data === 'function') {
                    // As a function it is executed with the data object as an arg
                    // for manipulation. If an object is returned, it is used as the
                    // data object to submit
                    var d = conf.data(request);
                    if (d) {
                        $.extend(request, d);
                    }
                } else if ($.isPlainObject(conf.data)) {
                    // As an object, the data given extends the default
                    $.extend(request, conf.data);
                }

                return $.ajax({
                    type: conf.method,
                    url: conf.url,
                    data: request,
                    dataType: 'json',
                    cache: false,
                    success: function (json) {
                        cacheLastJson = $.extend(true, {}, json);

                        if (cacheLower != drawStart) {
                            json.data.splice(0, drawStart - cacheLower);
                        }
                        if (requestLength >= -1) {
                            json.data.splice(requestLength, json.data.length);
                        }

                        drawCallback(json);
                    },
                    headers: headerData,
                });
            } else {
                json = $.extend(true, {}, cacheLastJson);
                json.draw = request.draw; // Update the echo for each response
                json.data.splice(0, requestStart - cacheLower);
                json.data.splice(requestLength, json.data.length);

                drawCallback(json);
            }
        };
    };

    $.fn.dataTable.Api.register('clearPipeline()', function () {
        return this.iterator('table', function (settings) {
            settings.clearCache = true;
        });
    });

    let tableBo = $('#table-bo').DataTable({
        processing: true,
        serverSide: true,
        ajax: $.fn.dataTable.pipeline({
            url: '/Master/Bo/GetAllBoDataTable',
            type: "POST",
            headers: headerData,
        }),
        search: {
            return: true,
        },
        columns: [
            {
                data: 'txtBoNo',
            },{
                data: 'dtmPlanStartDate',
                render: function (data, type) {
                    if (type === 'display') {
                        return moment(data).format('DD-MM-YYYY hh:mm:ss')
                    }
                    return data
                }
            },{
                data: 'item.txtItemDescription',
            },{
                data: 'productionLine.txtProductionLineCode',
            },{
                data: 'txtReceipeNumber',
            },{
                data: 'intReceipeVersion',
            }, {
                searchable: false,
                orderable: false,
                render: function (data, type, row, meta) {
                    $('#table-bo tbody').on('click', 'button', function () {
                        var data = tableBo.row($(this).parents('tr')).data();
                        $("#boNumber").val(data.txtBoNo)
                        $("#prioritasQueue").val(data.intPrioritasQueue)
                        if (data.bitHold) {
                            $("#bithold").prop('checked', true);
                        } else {
                            $("#bithold").prop('checked', false);
                        }
                        if (data.bitPrioritas) {
                            $("#bitPrioritas").prop('checked', true);
                        } else {
                            $("#bitPrioritas").prop('checked', false);
                        }

                        $("#ChangeModalLabel").html(`Change Bo-${data.txtBoNo}`)

                    });

                    return fullacces ? `<button class="btn btn-info btn-change" data-bo='${JSON.stringify(row)}' data-toggle="modal" data-target="#ChangeModal"> Change</button>` : `<td><span class='badge'>No Access</span></td> `;
                }
            },
        ],
        createdRow: function (row, data, index) {
            if (data.bitPrioritas) {
                $(row).addClass('table-info');
            }

            if (data.bitHold) {
                $(row).addClass('table-warning');
            }
        }
    });

    function saveChange() {
        $.ajax({
            type: "POST",
            url: api + "/SaveData",
            data: JSON.stringify({
                hold: $("#bithold").prop('checked'),
                prioritas: $("#bitPrioritas").prop('checked'),
                boNumber: $("#boNumber").val(),
                intPrioritasQueue: $("#prioritasQueue").val()
            }),
            contentType: "application/json; charset=utf-8",
            datatype: "json",
            headers: headerData,
            success: function (response) {
                Swal.fire({
                    title: "Berhasil menyimpan Mengubah Status BO",
                    type: 'success',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Close'
                }).then((result) => {
                    if (result.value) {
                        window.location.reload();
                    }
                });
            },
            error: function (response) {
                Swal.fire(
                    "Failed",
                    response.responseJSON.txtMessage,
                    'error'
                );
            }
        });
    }

    function resetChange() {
        try {
            $.ajax({
                type: "POST",
                url: api + "/SaveData",
                data: JSON.stringify({
                    hold: false,
                    prioritas: false,
                    boNumber: $("#boNumber").val(),
                    intPrioritasQueue: 0
                }),
                contentType: "application/json; charset=utf-8",
                datatype: "json",
                headers: headerData,
                success: function (response) {
                    Swal.fire({
                        title: "Berhasil Mereset BO",
                        type: 'success',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'Close'
                    }).then((result) => {
                        if (result.value) {
                            window.location.reload();
                        }
                    });
                },
                error: function (response) {
                    Swal.fire(
                        "Failed",
                        response.responseJSON.txtMessage,
                        'error'
                    );
                }
            });
            
        } catch (ex) {
            Swal.fire(
                "Erorr",
                ex.message,
                'error'
            );
        }
    }


    $("#saveChange").bind('click', () => {
        saveChange();
    })
    $("#resetChange").bind('click', () => {
        resetChange();
    })
});

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
// FILL TABLE DATA
//=======================
function fillTableData() {
    $("#tbody").html("");
    if (pageBo.hasContent) {
        for (let i = 0; i < pageBo.content.length; i++) {
            var m = pageBo.content[i];
            let currentBitHold = m.bitHold;
            let currentBitPrioritas = m.bitHold;
            let idIntBo = m.intBoID;
            let $badgeHold = currentBitHold ? "bg-red" : "bg-green";
            let $badgePrioritas = currentBitPrioritas ? "bg-red" : "bg-green";
            let $badgeTextHold = currentBitHold ? "Hold" : "No";
            let $badgeTextPrioritas = currentBitPrioritas ? "Priority" : "Normal";
            let $switcHold = fullacces ?
                `<div class="form-group">
                    <label class="switch">
                        <input type="checkbox" class="bitHold" id="bithold-`+ idIntBo + `" data-bo='` + JSON.stringify(m) + `' onchange="(function(e){ e.preventDefault(); setHold(e); })(event)">
                        <span class="slider"></span>
                    </label>
                </div>` : "<td><span class='badge " + $badgeHold + "'>" + $badgeTextHold + "</span></td> ";
            let $switcPrioritas = fullacces ?
                `<div class="form-group">
                                <label class="switch">
                                    <input type="checkbox" class="bitPrioritas" id="bitprioritas-`+ idIntBo + `" data-bo='` + JSON.stringify(m) + `' onchange="(function(e){ e.preventDefault(); setPrioritas(e); })(event)">
                                    <span class="slider"></span>
                                </label>
                            </div>` : "<td><span class='badge " + $badgePrioritas + "'>" + $badgeTextPrioritas + "</span></td> ";
            //let row = "<tr id='tr-" + idIntBo + "' class='tr-class'> " +
            //    "<td>" +m.txtBoNo + "</td>" +
            //    "<td>" + $.parseJsonDate(m.dtmPlanStartDate, "d/M/yyyy h:m", true) + "</td>" +
            //    "<td>" + m.item.txtItemDescription + "</td>" +
            //    "<td>" + m.productionLine.txtProductionLineCode + "</td>" +
            //    "<td>" + m.txtReceipeNumber + "</td>" +
            //    "<td>" + m.intReceipeVersion + "</td>" +
            //    "<td>" + $switcPrioritas + "</td > " +
            //    "<td>" + $switcHold + "</td > " +
            //    "</tr>";  

            let $btnChange = fullacces ? `<button class="btn btn-info btn-change" data-bo='${JSON.stringify(m)}'> Change</button>` : `<td><span class='badge " + $badgePrioritas + "'>" + $badgeTextPrioritas + "</span></td> `;
            let row = "<tr id='tr-" + idIntBo + "' class='tr-class'> " +
                "<td>" + m.txtBoNo + "</td>" +
                "<td>" + $.parseJsonDate(m.dtmPlanStartDate, "d/M/yyyy h:m", true) + "</td>" +
                "<td>" + m.item.txtItemDescription + "</td>" +
                "<td>" + m.productionLine.txtProductionLineCode + "</td>" +
                "<td>" + m.txtReceipeNumber + "</td>" +
                "<td>" + m.intReceipeVersion + "</td>" +
                "<td>" + $btnChange + "</td > " +
                "</tr>";
            $("#tbody").append(row);
            //if (currentBitHold) {
            //    $("#bithold-" + idIntBo).prop('checked', true);
            //}
            //if (currentBitPrioritas) {
            //    $("#bitprioritas-" + idIntBo).prop('checked', true);
            //}
        }

        $(".btn-change").on("click", function () {
            let r = $(this).data('bo');
            console.log(r)
            setFormChange(r);
            $("#ChangeModalLabel").html(`Change Bo-${r.txtBoNo}`)
            $('#ChangeModal').modal('show');
        })
    } else {
        $("#tbody").append("<tr><td colspan='7'><center><span class='text-muted'>No Data <a class='refresh' href=''>Refresh</a> </span></center></td></tr>");
    }
    setButtonNextPrvVisibility();
}
//=======================
// SET HOLD
//=======================
function setHold(e) {
    let boTemp = JSON.parse(e.target.getAttribute("data-bo"));
    let $switchHold = $(this);
    console.log($(this).is("checked"));
    try {
        if (boTemp.intBoID) {
            let textConfirm = !boTemp.bitHold ? 'Hold BO? ' : 'Cancel Hold?';
            $.confirmMessage(textConfirm, "Apakah Yakin?", "Saya Yakin", function () {
                console.log("Bo Di Hold");
            }, function () {
                $switchHold.prop('checked', false);
            })
        }

    } catch (ex) {
        $.errorMessage("Erorr", ex.message);
    }
}
//=======================
// SET PRIORITAS
//=======================
function setPrioritas(e) {
    let boTemp = JSON.parse(e.target.getAttribute("data-bo"));
    let $switchPrioritas = $(this);
    console.log($(this).is("checked"));
    try {
        if (boTemp.intBoID) {
            let textConfirm = !boTemp.bitPrioritas ? 'Prioritas BO? ' : 'Cancel Prioritas?';
            $.confirmMessage(textConfirm, "Apakah Yakin?", "Saya Yakin", function () {
                
            }, function () {
                location.reload();
            })
        }

    } catch (ex) {
        $.errorMessage("Erorr", ex.message);
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

