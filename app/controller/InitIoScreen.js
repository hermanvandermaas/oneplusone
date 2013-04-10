Ext.define("OnePlusOne.controller.InitIoScreen", {
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
	},
    
    initioscreen: function() {
        // Initialize i/o screen on app startup
        // io is the calculator input/output screen (instance of Ext.picker.Picker)
        delete io;
        Ext.namespace('io');
        
        if (Ext.Viewport.getOrientation() == 'portrait') {
            io = Ext.ComponentQuery.query('#P-io')[0];
        } else {
            io = Ext.ComponentQuery.query('#L-io')[0];
        }

        // Initialize exchange rates and RPN
        views.xrbutton = Ext.ComponentQuery.query('#xr');
        views.rpnbutton = Ext.ComponentQuery.query('#rpn');
        views.leftparenthese = Ext.ComponentQuery.query('#leftp');
        views.rightparenthese = Ext.ComponentQuery.query('#rightp');


        // Initialize math parser
        Ext.namespace('mathparser');
        mathparser = new Expression('');
        mathparser.Reset();
        
        // Get saved lines from local storage
        io.lines = Ext.JSON.decode(localStorage.lines) || [{text: '', value: 0}];
        io.setSlots([
            {
                name : 'ioLines',
                data : io.lines
            }
        ]);
        
        // Get active line from local storage
        io.activeline = parseInt(localStorage.activeline) || (io.lines.length -1);
        localStorage.activeline = io.activeline;
        
        io.setSlots([
            {
                name : 'ioLines',
                data : io.lines
            }
        ]);
        
        // Add empty last line if needed
        window.OnePlusOne.app.getController('OnePlusOne.controller.InitIoScreen').addemptyline();

        // io.activeline = io.getSlots()[0].data.length - 1;
        io.setValue( {ioLines: io.activeline} , false);
                            
        // Set active line after scrolling in i/o screen = pick event on picker
        if (!io.hasListener('pick')) {
            io.on('pick', function(thisss, The, slot, eOpts){
                io.activeline = slot.selectedIndex;
                localStorage.activeline = io.activeline;
            });
        }

        if (!io.element.hasListener('doubletap')) {
            io.element.on('doubletap', function(event, node, options, eOpts) {
                window.OnePlusOne.app.getController('OnePlusOne.controller.InitIoScreen').deleteline(event, node, options, eOpts);
            }, io);
        }

        if (!io.element.hasListener('taphold')) {
            io.element.on('taphold', function(event, node, options, eOpts) {
                window.OnePlusOne.app.getController('OnePlusOne.controller.InitIoScreen').deleteall(event, node, options, eOpts);
            }, io);
        }

        // A waiting queue (an array) with functions that will execute after scrolling of the picker ends
        io.doAfterScrollingQueue = [];

        io.doAfterScrollingQueue.push(
            function() {this.een('test 123')},
            function(twee) { console.log('Function 02'); }
        );

        // io.scrolling is true or false dependent on scrolling or not scrolling picker slot
        io.query('pickerslot')[0].getScrollable().getScroller().on({
            scope: this,
            scroll: function() {
                io.scrolling = true;
            },
            scrollend: function() {
                io.scrolling = false;
                if (io.doAfterScrollingQueue.length > 0) {
                    for (var i = 0; i < io.doAfterScrollingQueue.length; i++){
                        console.log('function nr executed: ' + i);
                        io.doAfterScrollingQueue[i]();
                    }

                    io.doAfterScrollingQueue.shift();
                }
            }
        });

    },

    addemptyline: function(){
        // Add empty line to end of io screen lines if needed
        var lastline = io.getSlots()[0].data.length - 1;

        if ( io.getSlots()[0].data[lastline].text != '' ) {
            var theslots = io.getSlots()[0].data;
            theslots.push( {text: '', value: (lastline + 1)} );
            
            io.setSlots(
                [
                    {
                        name : 'ioLines',
                        data : theslots
                    }
                ]                
            );
            
            localStorage.lines = Ext.JSON.encode(theslots);
            io.setValue( {ioLines: theslots[io.activeline].value}, false);
        }
    },
    
    deleteline: function(event, node, options, eOpts){
        // Make sure slot is not animating by setting value
        io.setValue( {ioLines: io.activeline} , false);
        console.log('test');

        // Delete active line
        var lastline = io.getSlots()[0].data.length - 1;        
        if (io.activeline == lastline) return;
        var theslots = io.getSlots()[0].data;

        theslots.splice(io.activeline, 1);
        
        // Make sure 'value' properties are all unique and incrementing
        for (var i = io.activeline; i < theslots.length; i++){
            theslots[i].value--;
        }
        
        var thenewslots = [
            {
                name : 'ioLines',
                data : theslots
            }
        ];
        
        io.setSlots(thenewslots);

        io.setValue( {ioLines: theslots[io.activeline].value}, false);
        
        // Save input to local storage
        localStorage.lines = Ext.JSON.encode(theslots);
    },

    deleteall: function(event, node, options, eOpts){
        Ext.Msg.confirm("Delete all lines", "Delete all lines?", function(buttonId) {
            if (buttonId == 'yes') {
                // On taphold delete all lines
                var theslots = [{text: '', value: 0}];
                
                var thenewslots = [
                    {
                        name : 'ioLines',
                        data : theslots
                    }
                ];
                
                io.activeline = 0;
                localStorage.activeline = io.activeline;
                io.setSlots(thenewslots);
                
                // Save input to local storage
                localStorage.lines = Ext.JSON.encode(theslots);
            }
        });
    }

});