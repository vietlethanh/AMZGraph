(function () {
    "use strict";
    //wrapper
    var olc = this.amz.olc;

    // Data Service ----------------------------------------------------------
    var dataService = {
        addKeyword: function () {
            return $.post(olc.sidebarview.data.AddProductUrl, null);
        }
    };

    //Views----------------------------------------------------------

    var sideBarView = {
        initPage: function () {
            var isToggled = $("#ProductContent").hasClass("toggled");
            if (isToggled) {
                console.log("ok");
                $("#IconOutSide").hide();
            }

            $("#IconOutSide").click(function (e) {
                e.preventDefault();
                $(this).hide();
                $("#ProductContent").toggleClass("toggled");
            });

            $("#IconInSide").click(function (e) {
                e.preventDefault();
                $("#IconOutSide").show();
                $("#ProductContent").toggleClass("toggled");
            });
            
            $("#BtnAddProduct").click(function (e) {
                dataService.addProduct().done(function(result) {
                    bootbox.dialog({
                        message: result,
                        title: ""
                    });
                    $('.modal-dialog').addClass("modal-lg");
                });
            });
        }
    };



    //export
    var sideBarViewModule = {
        data: {}, //data from server controller
        dataService: dataService,
        views: {
            sidebarview: sideBarView,
        }
    };

    this.amz.olc.sidebarview = sideBarViewModule;
}).call(this);