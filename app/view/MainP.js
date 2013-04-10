Ext.define("OnePlusOne.view.MainP", {
    extend: 'Ext.Container',
    requires: [
        'Ext.Container',
        'Ext.Picker',
        'Ext.Panel',
        'Ext.Button'
    ],
	constructor: function(config) {
		this.callParent(arguments);
	 },

    config: {
		//scrollable: null,
        layout: 'vbox',
        items: [
            {
                xtype: 'container', // input/output line
                itemId : 'iocontainer',
                flex: 2.5,
                layout: 'hbox',
                items: [
                    {
                        xtype: 'container',
                        flex: 4,
                        cls: 'ioscreen',
                        items: [
                            {
                                xtype: 'picker',
                                itemId : 'P-io',
                                cancelButton: false,
                                doneButton: false,
                                toolbar: { height: 0 },
                                height: '100%',
                                width: '100%',
                                docked: 'left',
                                modal: false,
                                slots: [
                                    {
                                        name : 'ioLines',
                                        data : [
                                            {text: '', value: ''}/*,
                                            {text: 'Two', value: '2'},
                                            {text: 'Three', value: '3'}*/
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                xtype: 'container',             // Keyboard
                itemId: 'keyboard',
                cls: 'keys',
                flex: 6,
                layout: 'vbox',
                items: [
                    {
                        xtype: 'container',     // Row 1
                        flex: 1,
                        layout: 'hbox',
                        items: [
                            /*
                            {
                                xtype: 'container',
                                flex: 3,
                                cls: 'nokey',
                                ui: 'normal',
                                style: 'padding:0'
                            },*/
                            {
                                xtype: 'button',
                                itemId: 'xr',
                                flex: 1,
                                text: '$',
                                disabled: true,
                                badgeText: 'off',
                                ui: 'orange',
                            },
                            {
                                xtype: 'button',
                                itemId: 'rpn',
                                flex: 1,
                                text: 'rpn',
                                badgeText: 'off',
                                ui: 'orange',
                            },
                            {
                                xtype: 'button',
                                itemId: 'info',
                                flex: 1,
                                text: 'i',
                                ui: 'orange',
                            },
                            {
                                xtype: 'button',
                                itemId: 'backspace',
                                flex: 1,
                                text: '←',
                                ui: 'normal',
                            }
                        ]
                    },
                    {
                        xtype: 'container',     // Row 2
                        flex: 1,
                        layout: 'hbox',
                        items: [
                            {
                                xtype: 'button',
                                itemId: 'one',
                                flex: 1,
                                text: '1',
                                ui: 'normal'
                            },
                            {
                                xtype: 'button',
                                itemId: 'two',
                                flex: 1,
                                text: '2',
                                ui: 'normal'
                            },
                            {
                                xtype: 'button',
                                itemId: 'three',
                                flex: 1,
                                text: '3',
                                ui: 'normal'
                            },
                            {
                                xtype: 'button',
                                itemId: 'plus',
                                flex: 1,
                                text: '+',
                                ui: 'action'
                            }
                        ]
                    },
                    {
                        xtype: 'container',     // Row 3
                        flex: 1,
                        layout: 'hbox',
                        items: [
                            {
                                xtype: 'button',
                                itemId: 'four',
                                flex: 1,
                                text: '4',
                                ui: 'normal'
                            },
                            {
                                xtype: 'button',
                                itemId: 'five',
                                flex: 1,
                                text: '5',
                                ui: 'normal'
                            },
                            {
                                xtype: 'button',
                                itemId: 'six',
                                flex: 1,
                                text: '6',
                                ui: 'normal'
                            },
                            {
                                xtype: 'button',
                                itemId: 'minus',
                                flex: 1,
                                text: '-',
                                ui: 'action'
                            }
                        ]
                    },
                    {
                        xtype: 'container',     // Row 4
                        flex: 1,
                        layout: 'hbox',
                        items: [
                            {
                                xtype: 'button',
                                itemId: 'seven',
                                flex: 1,
                                text: '7',
                                ui: 'normal'
                            },
                            {
                                xtype: 'button',
                                itemId: 'eight',
                                flex: 1,
                                text: '8',
                                ui: 'normal'
                            },
                            {
                                xtype: 'button',
                                itemId: 'nine',
                                flex: 1,
                                text: '9',
                                ui: 'normal'
                            },
                            {
                                xtype: 'button',
                                itemId: 'times',
                                flex: 1,
                                text: '×',
                                ui: 'action'
                            }
                        ]
                    },
                    {
                        xtype: 'container',     // Row 5
                        flex: 1,
                        layout: 'hbox',
                        items: [
                            {
                                xtype: 'button',
                                itemId: 'root',
                                flex: 1,
                                text: '√',
                                ui: 'orange'
                            },
                            {
                                xtype: 'button',
                                itemId: 'zero',
                                flex: 1,
                                text: '0',
                                ui: 'normal'
                            },
                            {
                                xtype: 'button',
                                itemId: 'point',
                                flex: 1,
                                text: '.',
                                ui: 'normal'
                            },
                            {
                                xtype: 'button',
                                itemId: 'divide',
                                flex: 1,
                                text: '÷',
                                ui: 'action'
                            }
                        ]
                    },
                    {
                        xtype: 'container',     // Row 6
                        flex: 1,
                        layout: 'hbox',
                        items: [
                            {
                                xtype: 'button',
                                itemId: 'leftp',
                                flex: 1,
                                text: '(',
                                ui: 'orange'
                            },
                            {
                                xtype: 'button',
                                itemId: 'rightp',
                                flex: 1,
                                text: ')',
                                ui: 'orange'
                            },
                            {
                                xtype: 'button',
                                itemId: 'exponent',
                                flex: 1,
                                text: '^',
                                ui: 'orange'
                            },
                            {
                                xtype: 'button',
                                itemId: 'is',
                                flex: 1,
                                text: '=',
                                ui: 'confirm'
                            }
                        ]
                    }
                ]
            }
        ]
    }
});