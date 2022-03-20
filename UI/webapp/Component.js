sap.ui.define([
	'sap/ui/core/UIComponent',
	'sap/ui/model/resource/ResourceModel',
	'sap/ui/starter/model/models',
	'sap/ui/Device'
], function (UIComponent, ResourceModel, models, Device) {
	"use strict";

	return UIComponent.extend("sap.ui.starter.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * In this function, the resource and application models are set and the router is initialized.
		 * @public
		 * @override
		 */
		init: function () {

			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// set the device model
			this.setModel(models.createDeviceModel(), "device");

			// create the views based on the url/hash
			this.getRouter().initialize();

			// attach handlers for validation errors
			sap.ui.getCore().attachValidationError(function (evt) {
				var control = evt.getParameter("element");
				if (control && control.setValueState) {
					control.setValueState("Error");
				}
			});
			sap.ui.getCore().attachValidationSuccess(function (evt) {
				var control = evt.getParameter("element");
				if (control && control.setValueState) {
					control.setValueState("None");
				}
			});
		}
	});

});