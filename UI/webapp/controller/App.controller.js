sap.ui.define([
	'sap/ui/starter/controller/BaseController',
	'sap/ui/model/json/JSONModel'
], function (BaseController, JSONModel) {
	"use strict";

	return BaseController.extend("sap.ui.starter.controller.App", {

		onInit: function () {
			var oViewModel = new JSONModel({
				busy: false,
				delay: 0
			});

			this.setModel(oViewModel, "appView");
		}
	});

});
