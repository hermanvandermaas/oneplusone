Ext.define("OnePlusOne.store.Exchangerates", {
    extend: 'Ext.data.Store',
    requires: [
        'Ext.data.Store',
		'Ext.data.proxy.JsonP'
    ],	
	constructor: function(config) {
		this.callParent(arguments);
        this.initConfig(config);
	},
	
    config: {
        model: 'OnePlusOne.model.Exchangerate',
        proxy: {
            type: "jsonp",
            url : "http://waywayway.nl/xr",
            reader: {
                type: "json",
                rootProperty: "exchangerates",
                listeners: {
                    'exception': function(reader, response, error, eOpts) {
                        console.log('Exception');
                    }
                }
            }
        }
    }
});