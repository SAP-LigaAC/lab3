sap.ui.define([
    'flight/bookings/ui/controller/BaseController',
    'sap/ui/model/json/JSONModel'
], function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("flight.bookings.ui.controller.Booking", {
        onInit: function () {
            this.oBookingModel = new JSONModel({});
            this.oLocalModel = new JSONModel({});
			this.getView().setModel(this.oLocalModel, "localModel");
            this.getView().setModel(this.oBookingModel, "bookingModel");
            this.getRouter().getRoute("booking").attachPatternMatched(this.onPatternMatched, this);

            this.oLocalModel.setProperty("/isInEditMode", false);
        },

        onPatternMatched: function (oEvent) {
            this._resetBookingModel();
            this.sBookingId = oEvent.getParameter("arguments").bookingId;
            const oBookingPage = this.byId("idBookingPage");
            oBookingPage.setBusy(true);

            this.getBookingDetails(oBookingPage);
        },

        getBookingDetails: function (oBookingPage) {
            this.read(`https://booking-darius.cfapps.us10.hana.ondemand.com/bookings/${this.sBookingId}`)
                .then(oResponse => {
                    this.oBookingModel.setProperty("/booking", oResponse);
                })
                .catch(oError => {
                    const sGenericErrorMessage = this.getI18nMessage("generic.error.message");
                    this.MessageBox.error(sGenericErrorMessage);
                })
                .finally(() => {
                    oBookingPage.setBusy(false);
                });
        },

        onNavHomePress: function () {
			this.getRouter().navTo("bookings");
		},

        _resetBookingModel: function () {
            this.oBookingModel.setJSON(`{
                "booking" : {
                    "ID": null,
                    "FlightDate": null,
                    "FlightDestination": null,
                    "FirstName": null,
                    "LastName": null,
                    "EmailAddress": null,
                    "PhoneNumber": null
                }
            }`);
        },

        onEditPress: function () {
			this.oLocalModel.setProperty("/isInEditMode", true);
		},

        onDeletePress: function () {
            const oBookingPage = this.byId("idBookingPage");
            oBookingPage.setBusy(true);

            this.delete(`https://booking-darius.cfapps.us10.hana.ondemand.com/bookings/${this.sBookingId}`) 
            .then(() => {
                oBookingPage.setBusy(false);
            })
            .catch(oError => {
                debugger
            })
            .finally(() => {
                this.onNavHomePress();
            });
        },

		onCancelEditPress: function () {
			this.oLocalModel.setProperty("/isInEditMode", false);
		},

        onEditDonePress: function() {

            const oBookingPage = this.byId("idBookingPage");
            oBookingPage.setBusy(true);

            const dataToBeSent = this.oBookingModel.getProperty("/booking");
            this.put(`https://booking-darius.cfapps.us10.hana.ondemand.com/bookings/${this.sBookingId}`, dataToBeSent)
            .then(() => {
                this.onCancelEditPress();
            })
            .catch(oError => {
                debugger
            })
            .finally(() => {
                this.getBookingDetails(oBookingPage);
            });
        }
    });
});