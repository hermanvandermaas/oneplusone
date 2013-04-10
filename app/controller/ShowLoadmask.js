Ext.define("OnePlusOne.controller.ShowLoadmask", {
    extend: 'Ext.app.Controller',
    requires: [
        'Ext.app.Controller'
    ],
	constructor: function(config) {
		this.callParent(arguments);
	},
	
	init: function() {
		// Show loadmask
		Ext.Viewport.setMasked({
			xtype: 'loadmask',
			message: 'Loading...'
		});
	},

    config: {
    }
	
});