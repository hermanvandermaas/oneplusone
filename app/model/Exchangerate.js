Ext.define('OnePlusOne.model.Exchangerate', {
    extend: 'Ext.data.Model',
    requires: [
        'Ext.data.Model'
    ],
	constructor: function(config) {
		this.callParent(arguments);
	 },
	 
    config: {
        fields: [
            {name: 'text',  type: 'string'},
            {name: 'value',   type: 'float'}
        ]
    }
});