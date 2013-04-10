Ext.define("OnePlusOne.controller.InitViews", {
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
    
    initviews: function() {
        // views contains portrait and landscape views
        Ext.namespace('views');
        
        // Instantiate portrait view
        views.portrait = Ext.create('OnePlusOne.view.MainP', {
            itemId: 'portrait',
            listeners: {
                'painted': function() {
                    //window.OnePlusOne.app.getController('OnePlusOne.controller.InitIoScreen').initioscreen();

                    // Set button font size relative to window height
                    var windowHeight = Ext.Viewport.getWindowHeight();
                    var fontSizePortrait = Math.round(0.045 * windowHeight).toString();
                    var buttonsArray = Ext.ComponentQuery.query('#keyboard .button');

                    Ext.Array.each(buttonsArray, function(item, index, allItems) {
                        item.setStyle({'font-size': fontSizePortrait + 'px'});
                    });

                    var badgesArray = Ext.select('.x-badge');

                    Ext.Array.each(badgesArray, function(item, index, allItems) {
                        item.setStyle({'font-size': '.8em'});
                    });

                }
            }
        });
        
        // Instantiate landscape view
        views.landscape = Ext.create('OnePlusOne.view.MainL', {
            itemId: 'landscape',
            listeners: {
                'painted': function() {
                    //window.OnePlusOne.app.getController('OnePlusOne.controller.InitIoScreen').initioscreen();

                    // Set button font size relative to window height
                    var windowHeight = Ext.Viewport.getWindowHeight();
                    var fontSizeLandscape = Math.round(0.08 * windowHeight).toString();
                    var buttonsArray = Ext.ComponentQuery.query('#keyboard-L .button');

                    Ext.Array.each(buttonsArray, function(item, index, allItems) {
                        item.setStyle({'font-size': fontSizeLandscape + 'px'});
                    });

                    var badgesArray = Ext.select('.x-badge');

                    Ext.Array.each(badgesArray, function(item, index, allItems) {
                        item.setStyle({'font-size': '.8em'});
                    });

                }
            }
        });
        
        Ext.Viewport.add([views.portrait, views.landscape]);                

        // Initialize exchange rates
        window.OnePlusOne.app.getController('OnePlusOne.controller.InitXR').initxr();
    },
    
    setview: function( orientation, animate ) {
        // Set portrait or landscape view
        if (orientation == 'portrait') {
            if (animate) {
                Ext.Viewport.animateActiveItem(views.portrait, {type:'slide', direction:'right'});
            } else {
                Ext.Viewport.setActiveItem(views.portrait);
            }
        } else {
           if (animate) {
                Ext.Viewport.animateActiveItem(views.landscape, {type:'slide', direction:'right'});
            } else {
                Ext.Viewport.setActiveItem(views.landscape);
            }
        }
    },

    initxrpicker: function() {
        // Instantiate exchange rate picker
        if (xr.getProxy().getReader().rawData == undefined) {
            Ext.Msg.alert('Info', 'Exchange rate data could not be loaded.', Ext.emptyFn);
            return;
        }

        views.xrpicker = Ext.create('Ext.Picker', {
            useTitles: true,
            slots: [
                {
                    name: 'fromcurrency',
                    title: 'From',
                    data: xr.getProxy().getReader().rawData.exchangerates
                },
                {
                    name: 'tocurrency',
                    title: 'To',
                    data: xr.getProxy().getReader().rawData.exchangerates
                }

            ]
        });

    },

    initinfosheet: function() {
        var infotext = 
        'The One Plus One calculator is a normal and currency converter in one. ' +
        'It accepts <a href="http://en.wikipedia.org/wiki/Reverse_Polish_notation">Reverse Polish Notation</a>, which can save you some keystrokes because parentheses are not needed.<br><br>' +

        '<ul>' +
        '<li>The calculator screen is vertically scrollable, even though only one line may be visible on very small screens.<br><br></li>' +
        '<li>There is always an empty line for new input at the bottom of the list.<br><br></li>' +
        '<li>Double tap one the currently active line to delete it. Only the active line in the center of the calculator screen can be deleted.<br><br></li>' +
        '<li>Tap and hold on the calculator screen to delete all lines.<br><br></li>' +
        '<li>You must type a number or something between parentheses on the left hand side of the root operator √, it is a two sided operator.' +
        ' For example: √4 will not work but 2√4 yields 2, the square root of 4.' +
        ' This allows cubic or higher roots like 3√27 = 3. Or fractional roots like (1/2)√9 = 81<br><br></li>' +
        '<li>Incorrect input followed by pressing the = button yields no error message, nothing happens.<br><br></li>' +
        '<li>Tap the $ button for switching between normal and currency mode. Select the "from" and "to" currency.' +
        ' Next, simply type an amount and press the = button. Alternatively, type an expression like 2×3.5 and press =, ' +
        'the expression will be calculated first, then the result will be converted in the selected currency.<br><br></li>' +
        '<li>Tap the RPN button for switching between normal and Reverse Polish Notation (RPN) mode.' +
        ' One of the parentheses buttons is disabled, the other parenthese button is changed to an underscore _.'+
        ' Parentheses are not needed in RPN.' +
        ' The underscore is the separator which is needed in Reverse Polish Notation. Where you would type <span style="font-weight:bold;">Enter</span> after' +
        ' each number in a traditional RPN calculator, here type an underscore _.' +
        ' Input a full RPN expression, then press =.<br><br>' +
        ' <span style="font-weight:bold;">Example:</span><br>' +
        ' To calculate (2+3)×(6-2) = 20 in RPN mode, type 2_3+6_2-× and press =.' +
        ' The advantage of RPN becomes clear now: in the above example using RPN saves you 3 keystrokes!<br><br>' +
        ' This is different from most RPN calculators, where you have to press <span style="font-weight:bold;">Enter</span> after each number,' +
        ' and the calculation is immediately performed everytime an operator like + is pressed.' +
        ' Typing the whole RPN expression instead of pressing <span style="font-weight:bold;">Enter</span> has the advantage of keeping the full' +
        ' RPN expression on one line in the calculator memory for future reference.'+
        ' Also, you don\'t have to remember which part of the calculation you have finished and what remains to be done.<br><br></li>' +
        '<li>Exchange rates from <a href="http://themoneyconverter.com">themoneyconverter.com</a> through waywayway.nl/xr, updated every hour.<br><br></li>' +
        '<li>Math parser by <a href="http://www.codeproject.com/Articles/12116/JavaScript-Mathematical-Expression-Evaluator">Prasad Khandekar</a>, with adaptations.</li>' +
        '</ul>'
        ;

        // Instantiate info sheet
        views.infosheet = Ext.create('Ext.Container', {
            layout: 'fit',
            items: [
                {
                    xtype: 'container',
                    scrollable: 'vertical',
                    html: infotext,
                    styleHtmlContent: true
                },
                {
                    xtype: 'toolbar',
                    title: 'Info',
                    docked: 'top',
                    items: [
                        {
                            xtype: 'button',
                            ui: 'back',
                            text: 'Back',
                            listeners: {
                                'tap': function() {
                                    var orientation = Ext.Viewport.getOrientation();
                                    window.OnePlusOne.app.getController('OnePlusOne.controller.InitViews').setview(orientation, true);
                                }
                            }
                        }
                    ]
                }
            ]
        });

        Ext.Viewport.add([views.infosheet]);

    }

});