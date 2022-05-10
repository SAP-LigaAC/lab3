sap.ui.define(
  ["sap/ui/thirdparty/jquery"],
  function ($) {
    "use strict";

    return {
      makeAJAXCall: function (sMethodType, sUrl, oData) {
        return new Promise(function (resolve, reject) {
          jQuery.ajax({
            url: sUrl,
            type: sMethodType,
            contentType: sMethodType !== "GET" || sMethodType !== "DELETE" ? "application/json; charset=utf-8" : "",
            data: sMethodType !== "GET" || sMethodType !== "DELETE" ? JSON.stringify(oData) : oData,
            success: function (data) {
              resolve(data);
            },
            error: function (xhr, status) {
              reject(xhr, status);
            }
          });
        });
      }
    };
  });
