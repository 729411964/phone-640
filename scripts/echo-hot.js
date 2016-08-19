/**
 * Created by Administrator on 2016/4/7.
 */
$(function () {
    // 用handlebars组装数据
    (function ($) {
        $.ajax({
            url:"../mock-data/echo-taobao1.json",
            type:"post",
            datatype:"json",
            success:function(data){
                console.log("ajax "+data);
                $(".content-list").handlebarsHelper($("#content-template"),data);
            },
            error:function(){
                alert("ajax出错");
            }

        });

//下拉并加载数据
        (function($){

        })(jQuery)

    })(jQuery);

});
