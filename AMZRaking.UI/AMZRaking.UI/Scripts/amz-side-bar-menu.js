(function(){"use strict";var t=(this.amz.olc,{}),e={initPage:function(){var t=$("#ProductContent").hasClass("toggled");t&&(console.log("ok"),$("#IconOutSide").hide()),$("#IconOutSide").click(function(t){t.preventDefault(),$(this).hide(),$("#ProductContent").toggleClass("toggled")}),$("#IconInSide").click(function(t){t.preventDefault(),$("#IconOutSide").show(),$("#ProductContent").toggleClass("toggled")})}},o={data:{},dataService:t,views:{sidebarview:e}};this.amz.olc.sidebarview=o}).call(this);