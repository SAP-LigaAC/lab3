/*global history*/

sap.ui.define([
	'sap/ui/core/mvc/Controller',
	'sap/ui/core/routing/History',
	'sap/m/MessageBox',
	'flight/bookings/ui/utils/AjaxClient',
	'flight/bookings/ui/utils/Formatter',
], function (Controller, History, MessageBox, AjaxClient, Formatter) {
	"use strict";

	return Controller.extend("flight.bookings.ui.controller.BaseController", {

		MessageBox: MessageBox,
		AjaxClient: AjaxClient,
		Formatter: Formatter,

		/**
		 * Convenience method for accessing the router.
		 * @public
		 * @returns {sap.ui.core.routing.Router} the router for this component
		 */
		getRouter: function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},

		/**
		 * Convenience method for getting the view model by name.
		 * @public
		 * @param {string} [sName] the model name
		 * @returns {sap.ui.model.Model} the model instance
		 */
		getModel: function (sName) {
			return this.getView().getModel(sName);
		},

		/**
		 * Convenience method for setting the view model.
		 * @public
		 * @param {sap.ui.model.Model} oModel the model instance
		 * @param {string} sName the model name
		 * @returns {sap.ui.mvc.View} the view instance
		 */
		setModel: function (oModel, sName) {
			return this.getView().setModel(oModel, sName);
		},

		/**
		 * Getter for the resource bundle.
		 * @public
		 * @returns {sap.ui.model.resource.ResourceModel} the resourceModel of the component
		 */
		getResourceBundle: function () {
			return this.getOwnerComponent().getModel("i18n").getResourceBundle();
		},

		/**
		 * Navigates back in the browser history, if the entry was created by this app.
		 * If not, it navigates to a route passed to this function.
		 *
		 * @public
		 * @param {string} sRoute the name of the route if there is no history entry
		 * @param {object} mData the parameters of the route, if the route does not need parameters, it may be omitted.
		 */
		myNavBack: function (sRoute, mData) {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				// The history contains a previous entry
				history.go(-1);
			} else {
				// Otherwise we go backwards with a forward history
				var bReplace = true;
				this.getRouter().navTo(sRoute, mData, bReplace);
			}
		},

		getI18nMessage: function (sI18n) {
			var oBundle = this.getView().getModel("i18n").getResourceBundle();
			var sMsg = oBundle.getText(sI18n);
			return sMsg;
		},

		read: function (url, queryParams) {
			return this.AjaxClient.get(url, queryParams);
		},

		post: function (url, body) {
			return this.AjaxClient.post(url, body);
		},

		delete: function (url, body) {
			return this.AjaxClient.makeAJAXCall(url, body);
		}
	});

});
