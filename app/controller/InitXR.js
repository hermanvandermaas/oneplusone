Ext.define("OnePlusOne.controller.InitXR", {
    extend: 'Ext.app.Controller',
    requires: ['Ext.app.Controller', ],
    constructor: function(config) {
        this.callParent(arguments);
    },

    init: function() {},

    config: {},

    initxr: function() {
        
        Ext.namespace('xr');

        xr = Ext.create('OnePlusOne.store.Exchangerates', {
            listeners: {
                'load': function() {
                    window.OnePlusOne.app.getController('OnePlusOne.controller.InitViews').initxrpicker();
                    console.log('Exchange rates loaded');
                    views.xrbutton[0].enable();
                    views.xrbutton[1].enable();
                }
            }
        });

        try {
            xr.load();
        } catch(e) {
            Ext.Msg.alert('Info', 'Exchange rate data could not be loaded.', Ext.emptyFn);
        }
    }
});