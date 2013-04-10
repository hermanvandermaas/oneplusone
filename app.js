Ext.application({
    name: 'OnePlusOne',

    requires: [
        'Ext.MessageBox'
    ],
    
    controllers: ['InitViews', 'Calculate', 'InitIoScreen', 'InitXR'],
    views: ['MainP', 'MainL'],
    models: ['Exchangerate'],
    stores: ['Exchangerates'],

    viewport: {
        preventZooming: true
    },

    icon: {
        '57': 'resources/icons/Icon.png',
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    },

    isIconPrecomposed: true,

    startupImage: {
        '320x460': 'resources/startup/320x460.jpg',
        '640x920': 'resources/startup/640x920.png',
        '768x1004': 'resources/startup/768x1004.png',
        '748x1024': 'resources/startup/748x1024.png',
        '1536x2008': 'resources/startup/1536x2008.png',
        '1496x2048': 'resources/startup/1496x2048.png'
    },
    
    launch: function() {
        // Initialize views
        window.OnePlusOne.app.getController('OnePlusOne.controller.InitViews').initviews();

        // Initialize infosheet
        window.OnePlusOne.app.getController('OnePlusOne.controller.InitViews').initinfosheet();

        // Initialize input / output screen
        window.OnePlusOne.app.getController('OnePlusOne.controller.InitIoScreen').initioscreen();
        
        // Get current orientation and handle orientation changes
        Ext.Viewport.on('orientationchange', function(thisss, newOrientation, width, height, eOpts) {
            if (Ext.Viewport.getActiveItem() == views.infosheet) return;
            window.OnePlusOne.app.getController('OnePlusOne.controller.InitViews').setview( newOrientation );
            window.OnePlusOne.app.getController('OnePlusOne.controller.InitIoScreen').initioscreen();
        }, this);
        
        // Show main view
        window.OnePlusOne.app.getController('OnePlusOne.controller.InitViews').setview( Ext.Viewport.getOrientation() );
    },

    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function(buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});