/**
 * Created by Administrator on 2016/4/7.
 */
$(function(){
    //tab标签点击时状态切换
    (function($){
        var tab=function(){};
        tab.prototype.clickEvent=function(){
            console.log("dianji");
            var $this=$(this);
            $this.addClass("active").siblings().removeClass("active");
        }
        $(document).on("touchend",".footer-list>li",tab.prototype.clickEvent);
    })(jQuery);
});
