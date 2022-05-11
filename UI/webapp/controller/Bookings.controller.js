sap.ui.define([
	'flight/bookings/ui/controller/BaseController',
	'sap/ui/model/json/JSONModel',
	"sap/m/MessageBox",
	"sap/m/MessageToast"
], function (Controller, JSONModel, MessageBox, MessageToast) {
	"use strict";

	return Controller.extend("flight.bookings.ui.controller.Bookings", {
		onInit: function () {
			this.oBookingsModel = new JSONModel({});
			this.getView().setModel(this.oBookingsModel, "bookingsModel");
			this.getRouter().getRoute("bookings").attachPatternMatched(this.onPatternMatched, this);
		},

		onPatternMatched: function () {
			const oBookingsPage = this.byId("idBookingsPage");
			oBookingsPage.setBusy(true);

			this.read("/core/api/bookings")
				.then(oResponse => {
					this.oBookingsModel.setProperty("/bookings", oResponse);
					this.oBookingsModel.setProperty("/bookingsCount", oResponse.length);
				})
				.catch(oError => {
					const sGenericErrorMessage = this.getI18nMessage("generic.error.message");
					this.MessageBox.error(sGenericErrorMessage);
				})
				.finally(() => {
					oBookingsPage.setBusy(false);
				});
		},

		onPressTableItem: function (oEvent) {
			const oTableItem = oEvent.getParameters().listItem;
			const oItemBindingContext = oTableItem.getBindingContext("bookingsModel");
			const oBooking = oItemBindingContext.getObject();
			this.getRouter().navTo("booking", { bookingId: oBooking.ID });
		},

		onPressBookNow: function (oEvent) {
			this.getRouter().navTo("book");
		},

		onDeleteTableItem: function (oEvent) {
			const oTableItem = oEvent.getParameters().listItem.getBindingContext("bookingsModel").getObject();
			const nTableItemId = oTableItem.ID;
			const sMessageBoxText = this.getI18nMessage("deleteBookingMessageText", [nTableItemId])
			MessageBox.confirm(sMessageBoxText, {
				actions: [this.getI18nMessage("generic.delete"), this.getI18nMessage("generic.cancel")],
				emphasizedAction: this.getI18nMessage("generic.delete"),
				onClose: this.onCloseDeleteBookingMessageBox.bind(this, nTableItemId)
			});
		},

		onCloseDeleteBookingMessageBox: function (nBookingId, sAction) {
			if (sAction === this.getI18nMessage("generic.delete")) {
				const oBookingsPage = this.byId("idBookingsPage");
				oBookingsPage.setBusy(true);

				this.delete(`/core/api/bookings/${nBookingId}`)
					.then(oResponse => {
						let aBookings = this.oBookingsModel.getProperty("/bookings");
						aBookings = aBookings.filter(booking => booking.ID !== nBookingId);
						this.oBookingsModel.setProperty("/bookings", aBookings);
						this.oBookingsModel.setProperty("/bookingsCount", aBookings.length);
					})
					.catch(oError => {
						this.MessageBox.error(oError.responseText);
					})
					.finally(() => {
						oBookingsPage.setBusy(false);
					});
			}
		}
	});
});