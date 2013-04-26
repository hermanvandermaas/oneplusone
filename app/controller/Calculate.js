Ext.define("OnePlusOne.controller.Calculate", {
    extend: 'Ext.app.Controller',
    requires: [
        'Ext.app.Controller',
    ],
    constructor: function(config) {
		this.callParent(arguments);
	},

    init: function() {
    },

    config: {        
        control: {  
            // Portrait view
            '#keyboard #backspace': {
                tap: 'edit'
            },
            '#keyboard #xr': {
                tap: 'xr'
            },
            '#keyboard #rpn': {
                tap: 'rpn'
            },
            '#keyboard #info': {
                tap: 'info'
            },
            '#keyboard #one': {
                tap: 'edit'
            },
            '#keyboard #two': {
                tap: 'edit'
            },
            '#keyboard #three': {
                tap: 'edit'
            },
            '#keyboard #plus': {
                tap: 'edit'
            },
            '#keyboard #four': {
                tap: 'edit'
            },
            '#keyboard #five': {
                tap: 'edit'
            },
            '#keyboard #six': {
                tap: 'edit'
            },
            '#keyboard #minus': {
                tap: 'edit'
            },
            '#keyboard #seven': {
                tap: 'edit'
            },
            '#keyboard #eight': {
                tap: 'edit'
            },
            '#keyboard #nine': {
                tap: 'edit'
            },
            '#keyboard #times': {
                tap: 'edit'
            },
            '#keyboard #root': {
                tap: 'edit'
            },
            '#keyboard #zero': {
                tap: 'edit'
            },
            '#keyboard #point': {
                tap: 'edit'
            },
            '#keyboard #divide': {
                tap: 'edit'
            },
            '#keyboard #leftp': {
                tap: 'edit'
            },
            '#keyboard #rightp': {
                tap: 'edit'
            },
            '#keyboard #exponent': {
                tap: 'edit'
            },
            '#keyboard #is': {
                tap: 'calculate'
            },
            '#keyboard #enter': {
                tap: 'edit'
            },


            // Landscape view
           '#keyboard-L #backspace': {
                tap: 'edit'
            },
            '#keyboard-L #xr': {
                tap: 'xr'
            },
            '#keyboard-L #rpn': {
                tap: 'rpn'
            },
            '#keyboard-L #info': {
                tap: 'info'
            },
            '#keyboard-L #one': {
                tap: 'edit'
            },
            '#keyboard-L #two': {
                tap: 'edit'
            },
            '#keyboard-L #three': {
                tap: 'edit'
            },
            '#keyboard-L #plus': {
                tap: 'edit'
            },
            '#keyboard-L #four': {
                tap: 'edit'
            },
            '#keyboard-L #five': {
                tap: 'edit'
            },
            '#keyboard-L #six': {
                tap: 'edit'
            },
            '#keyboard-L #minus': {
                tap: 'edit'
            },
            '#keyboard-L #seven': {
                tap: 'edit'
            },
            '#keyboard-L #eight': {
                tap: 'edit'
            },
            '#keyboard-L #nine': {
                tap: 'edit'
            },
            '#keyboard-L #times': {
                tap: 'edit'
            },
            '#keyboard-L #root': {
                tap: 'edit'
            },
            '#keyboard-L #zero': {
                tap: 'edit'
            },
            '#keyboard-L #point': {
                tap: 'edit'
            },
            '#keyboard-L #divide': {
                tap: 'edit'
            },
            '#keyboard-L #leftp': {
                tap: 'edit'
            },
            '#keyboard-L #rightp': {
                tap: 'edit'
            },
            '#keyboard-L #exponent': {
                tap: 'edit'
            },
            '#keyboard-L #is': {
                tap: 'calculate'
            },
            '#keyboard-L #enter': {
                tap: 'edit'
            }
        }        
	},
    
    edit: function(button) {
        var txt = button.getText();
        //if (txt == '_') txt = '_';

        if (txt == '←') {
            // Delete
            var theslots = io.getSlots()[0].data;
            // theslots[io.activeline].value = theslots[io.activeline].value.substr(0, (theslots[io.activeline].value.length - 1));
            
            theslots[io.activeline].text = theslots[io.activeline].text.substr(0, (theslots[io.activeline].text.length - 1));
            
            io.setSlots(
                [
                    {
                        name : 'ioLines',
                        data : theslots
                    }
                ]                
            );
            
            io.setValue( {ioLines: theslots[io.activeline].value}, true);

        } else {
            if (txt == 'Enter') var txt = String.fromCharCode(160);
            
            // Add input to io screen
            var theslots = io.getSlots()[0].data;
            // theslots[io.activeline].value = theslots[io.activeline].value + txt;
            theslots[io.activeline].text = theslots[io.activeline].text + txt;
            
            
            var thenewslots = [
                {
                    name : 'ioLines',
                    data : theslots
                }
            ];
            
            io.setSlots(thenewslots);
            io.setValue( {ioLines: theslots[io.activeline].value}, false);
            
            // Add empty last line if needed
            window.OnePlusOne.app.getController('OnePlusOne.controller.InitIoScreen').addemptyline();
            
            // Save input to local storage
            localStorage.lines = Ext.JSON.encode(theslots);
        }
    },

    calculate: function() {
        var theslots = io.getSlots()[0].data;
        var input = theslots[io.activeline].text;
        if (input.toString() == '') return;
        
        // Replace symbols
        var input = input.replace(/×/g,'*');
        var input = input.replace(/÷/g,'/');
        var input = input.replace(/_/g,' ');

        // Calculate
        mathparser.Reset();
        mathparser.Expression(input);
        var output = mathparser.Evaluate().toString();
        // parseFloat(mathparser.Evaluate()).toPrecision(12);

        // If exchange rate mode is on
        if (views.xrbutton[0].getBadgeText() == 'on') {
            var containsLetters = /[a-zA-Z]/g;
            var isNotAnExpression = containsLetters.test(input);

            console.log(isNotAnExpression);
            console.log(Number(input).toString());

            if (isNotAnExpression /*Number(input).toString() == 'NaN'*/) return;

            var fromXRate = Number(views.xrpicker.getValues().fromcurrency).toFixed(5);
            var toXRate = Number(views.xrpicker.getValues().tocurrency).toFixed(5);

            var convertedValue = ((Number(output) / fromXRate) * toXRate).toFixed(2).toString();
            //console.log(xr.getProxy().getReader().rawData.exchangerates[views.xrpicker.query('pickerslot')[0].selectedIndex].code);
            var currencyFromCode = xr.getProxy().getReader().rawData.exchangerates[views.xrpicker.query('pickerslot')[0].selectedIndex].code;
            var currencyToCode = xr.getProxy().getReader().rawData.exchangerates[views.xrpicker.query('pickerslot')[1].selectedIndex].code;

            var xrinputline = input + ' ' + currencyFromCode + ' =';
            theslots[io.activeline].text = xrinputline;

            var output = convertedValue + ' ' + currencyToCode;
        }

        // Add output to io screen
        io.activeline++;
        
        theslots.splice(io.activeline, 0, {text: output, value: io.activeline});

        // Make sure 'value' properties are all unique and incrementing
        for (var i = io.activeline + 1; i < theslots.length; i++){
            theslots[i].value++;
        }
        
        var thenewslots = [
            {
                name : 'ioLines',
                data : theslots
            }
        ];
        
        io.setSlots(thenewslots);
        io.setValue( {ioLines: theslots[io.activeline].value}, false);
        
        // Add empty last line if needed
        window.OnePlusOne.app.getController('OnePlusOne.controller.InitIoScreen').addemptyline();
        
        // Save input to local storage
        localStorage.lines = Ext.JSON.encode(theslots);
        localStorage.activeline = io.activeline;
    },
    
    xr: function(button) {
        if ( button.getBadgeText() == 'off' ) {
            io.xr = 'on';
            views.xrbutton[0].setBadgeText('on');
            views.xrbutton[1].setBadgeText('on');

            if (!Ext.Viewport.getComponent(views.xrpicker)) {
                Ext.Viewport.add([views.xrpicker]);
            } else {
                views.xrpicker.show();
            }
            
        } else {
            io.xr = 'off';
            views.xrbutton[0].setBadgeText('off');
            views.xrbutton[1].setBadgeText('off');
        }
    },
    
    rpn: function(button) {
        if ( button.getBadgeText() == 'off' ) {
            io.rpn = 'on';
            views.rpnbutton[0].setBadgeText('on');
            views.rpnbutton[1].setBadgeText('on');

            Ext.each(Ext.ComponentQuery.query('#keyboard #parentheses_enter_container'), function(item, index, theArray) {
                item.animateActiveItem(1, {type: 'slide', direction: 'right', duration: 450});
            });
            
            Ext.each(Ext.ComponentQuery.query('#keyboard #is'), function(item, index, theArray) {
                item.disable();
            });
        } else {
            io.rpn = 'off';
            views.rpnbutton[0].setBadgeText('off');
            views.rpnbutton[1].setBadgeText('off');

            Ext.each(Ext.ComponentQuery.query('#keyboard #parentheses_enter_container'), function(item, index, theArray) {
                item.animateActiveItem(0, {type: 'slide', direction: 'left', duration: 450});
            });
        
            Ext.each(Ext.ComponentQuery.query('#keyboard #is'), function(item, index, theArray) {
                item.enable();
            });
        }
    },
    
    info: function(button) {
        Ext.Viewport.animateActiveItem(views.infosheet, {type:'slide', direction:'left'});
    }
});