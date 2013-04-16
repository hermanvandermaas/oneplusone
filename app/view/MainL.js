Ext.define("OnePlusOne.view.MainL", {
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
                xtype: 'container',
                itemId : 'iocontainer',
                cls: 'ioscreen',
                flex: 2,
                layout: 'hbox',
                items: [
                    {
                        xtype: 'container',
                        flex: 1,
                        items: [
                            // io screen
                            {
                                xtype: 'picker',
                                itemId : 'L-io',
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
                    },
                    {
                        xtype: 'container',
                        itemId: 'keyboard',
                        cls: 'keys',
                        flex: 1,
                        layout: 'vbox',
                        items: [    // top right button block
                            {
                                xtype: 'container',
                                flex: 1,
                                layout: 'hbox',
                                items: [
                                    // 3 buttons
                                    {
                                        xtype: 'container',
                                        layout: 'card',     
                                        activeItem: 0,
                                        flex: 2,
                                        itemId: 'parentheses_enter_container',
                                        items: [
                                            // 2 or 1 buttons: parenthese or rpn Enter button
                                            {
                                                xtype: 'container',
                                                itemId: 'parenthesescontainer',
                                                flex: 1,
                                                layout: 'hbox',
                                                items: [
                                                    // 2 or 1 buttons: parenthese or rpn Enter button
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
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'button',
                                                flex: 1,
                                                itemId: 'enter',
                                                text: 'Enter',
                                                ui: 'orange'
                                            }
                                            
                                            
                                        ]
                                    },
                                    {
                                        xtype: 'container',
                                        itemId: 'backspacecontainer',
                                        layout: 'fit',
                                        flex: 1,
                                        items: [
                                            {
                                                xtype: 'button',
                                                itemId: 'backspace',
                                                //style: 'padding: 0;',
                                                flex: 1,
                                                text: '⇦',
                                                ui: 'normal',
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                flex: 1,
                                layout: 'hbox',
                                items: [
                                    // 3 buttons
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
                                    }
                                ]
                            },
                        ]
                    },
                ]
            },
            {
                xtype: 'container',
                flex: 3,
                layout: 'hbox',
                items: [
                    {
                        xtype: 'container',
                        itemId: 'keyboard',
                        cls: 'keys',
                        flex: 1,
                        layout: 'vbox',
                        items: [
                            // bottom left button block
                            {
                                xtype: 'container',
                                flex: 1,
                                layout: 'hbox',
                                items: [
                                    // 3 buttons
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
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                flex: 1,
                                layout: 'hbox',
                                items: [
                                    // 3 buttons
                                    {
                                        xtype: 'button',
                                        itemId: 'root',
                                        flex: 1,
                                        text: '√',
                                        ui: 'orange'
                                    },
                                    {
                                        xtype: 'button',
                                        itemId: 'plus',
                                        flex: 1,
                                        text: '+',
                                        ui: 'action'
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
                                xtype: 'container',
                                flex: 1,
                                layout: 'hbox',
                                items: [
                                    // 3 buttons
                                    {
                                        xtype: 'button',
                                        itemId: 'exponent',
                                        flex: 1,
                                        text: '^',
                                        ui: 'orange'
                                    },
                                    {
                                        xtype: 'button',
                                        itemId: 'times',
                                        flex: 1,
                                        text: '×',
                                        ui: 'action'
                                    },
                                    {
                                        xtype: 'button',
                                        itemId: 'divide',
                                        flex: 1,
                                        text: '÷',
                                        ui: 'action'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        itemId: 'keyboard',
                        cls: 'keys',
                        flex: 1,
                        layout: 'vbox',
                        items: [
                            // bottom right button block
                            {
                                xtype: 'container',
                                flex: 1,
                                layout: 'hbox',
                                items: [
                                    // 3 buttons
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
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                flex: 1,
                                layout: 'hbox',
                                items: [
                                    // 3 buttons
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
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                flex: 1,
                                layout: 'hbox',
                                items: [
                                    // 3 buttons
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
                                        itemId: 'is',
                                        flex: 1,
                                        text: '=',
                                        ui: 'confirm'
                                    }
                                ]
                            }
                        ]
                    },
                ]
            }
        ]
    }
});