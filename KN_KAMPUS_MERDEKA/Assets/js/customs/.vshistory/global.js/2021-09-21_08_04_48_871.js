

(function ($) {
    $.extend({
        showLoading: function () {
            $(".content-wrapper").LoadingOverlay("show");
        },
        hideLoading: function () {
            $(".content-wrapper").LoadingOverlay("hide");
        },
        postApi: function (uri, data, sukses, error, header) {
            $.ajax({
                type: "POST",
                url: uri,
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                datatype: "json",
                headers: header,
                beforeSend: function () {
                    $.showLoading()
                },
                success: function (response) {
                    sukses(response)
                },
                error: function (response) {
                    error(response)
                },
                complete: function (response) {
                    $.hideLoading()
                }
            });
        },
        putApi: function (uri, data, sukses, error) {
            $.ajax({
                type: "PUT",
                url: uri,
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                datatype: "json",
                beforeSend: function () {
                    $.showLoading()
                },
                success: function (response) {
                    sukses(response)
                },
                error: function (response) {
                    error(response)
                },
                complete: function (response) {
                    $.hideLoading()
                }
            });
        },
        getApi: function (uri, sukses, error) {
            $.ajax({
                type: "GET",
                url: uri,
                datatype: "json",
                beforeSend: function () {
                    $.showLoading()
                },
                success: function (response) {
                    sukses(response)
                },
                error: function (response) {
                    error(response)
                },
                complete: function (response) {
                    $.hideLoading()
                }
            });
        },
        deleteApi: function (uri, sukses, error) {
            $.ajax({
                type: "delete",
                url: uri,
                contentType: "application/json; charset=utf-8",
                datatype: "json",
                beforeSend: function () {
                    $.showLoading()
                },
                success: function (response) {
                    sukses(response)
                },
                error: function (response) {
                    error(response)
                },
                complete: function (response) {
                    $.hideLoading()
                }
            });
        },
        successMessage: function (title, message) {
            Swal.fire(
                title,
                message,
                'success'
            );
        },
        errorMessage: function (title, message) {
            Swal.fire(
                title,
                message,
                'error'
            );
        },
        inputText: function (title, callback) {
            Swal.fire({
                title: title,
                input: 'text',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Add',
            }).then((result) => {
                if (result.value) {
                    callback(result.value);
                }
            })
        },
        confirmMessage: function (title, message, confirmtext, callbackaction) {
            Swal.fire({
                title: title,
                text: message,
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: confirmtext
            }).then((result) => {
                if (result.value) {
                    callbackaction();
                }
            })
        },
        formatRupiah: function (number) {
            let stringNumber = number.toString().replace(/[^,\d]/g, "").toString(),
                split = stringNumber.split(","),
                sisa = split[0].length % 3,
                hasil = split[0].substr(0, sisa),
                ribuan = split[0].substr(sisa).match(/\d{3}/gi);
            if (ribuan) {
                separator = sisa ? "." : "";
                hasil += separator + ribuan.join(".");
            }
            hasil = split[1] != undefined ? hasil + "," + split[1] : hasil;
            return "Rp. " + hasil;
        },
        showLOV: function (LOV) {
            $.fancybox({
                openEffect: 'elastic',
                closeEffect: 'elastic',
                fitToView: true,
                nextSpeed: 0, //important
                prevSpeed: 0, //important
                modal: false,
                padding: 0,
                width: '60%',
                height: '100%',
                scrolling: 'false',
                href: url + 'lov/' + LOV,
                type: 'iframe',
                autoSize: false,
                afterClose: function () {
                    $(window).trigger('fancyboxClosed');
                }
            });
        },
        parseJsonDate: function (jsonDate, format) {
            try {
                const re = /-?\d+/;
                const m = re.exec(jsonDate);
                let dt = parseInt(m[0], 10);
                let dtm = new Date(dt);
                return $.format.date(dtm, format);
            } catch (e) {
                return "-";
            }
        },
        parseJsonDateAsPretty: function (jsonDate) {
            try {
                const re = /-?\d+/;
                const m = re.exec(jsonDate);
                let dt = parseInt(m[0], 10);
                let dtm = new Date(dt);
                return $.format.prettyDate(dtm);
            } catch (e) {
                return "-";
            }
        }
    });


    Inputmask.extendAliases({
        rupiah: {
            prefix: "Rp ",
            groupSeparator: ".",
            alias: "numeric",
            placeholder: "0",
            autoGroup: true,
            digits: 0,
            digitsOptional: false,
            clearMaskOnLostFocus: false,
            autoUnmask: true
        }
    });
})(window.jQuery);
