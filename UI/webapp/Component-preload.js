sap.ui.require.preload({"sap/ui/starter/Component.js":"sap.ui.define([\"sap/ui/core/UIComponent\",\"sap/ui/model/resource/ResourceModel\",\"sap/ui/starter/model/models\",\"sap/ui/Device\"],function(e,t,a,i){\"use strict\";return e.extend(\"sap.ui.starter.Component\",{metadata:{manifest:\"json\"},init:function(){e.prototype.init.apply(this,arguments),this.setModel(a.createDeviceModel(),\"device\"),this.getRouter().initialize(),sap.ui.getCore().attachValidationError(function(e){var t=e.getParameter(\"element\");t&&t.setValueState&&t.setValueState(\"Error\")}),sap.ui.getCore().attachValidationSuccess(function(e){var t=e.getParameter(\"element\");t&&t.setValueState&&t.setValueState(\"None\")})}})});"}, "sap.ui.starter.Component-preload")