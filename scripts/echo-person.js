/**
 * Created by Administrator on 2016/4/7.
 */
$(function(){
    var Ajax =function(){};

    var $list_template=$("#list-template");

    //异步请求数据
    Ajax.prototype.ajaxData=function(index){
        $.ajax({
            url:"../mock-data/echo-person.json",
            data:{
                pageindex:index,
            },
            type:"post",
            datatype:"json",
            success:function(data){
                console.log("ajax "+data);
                $(".content-list").handlebarsHelper($list_template,data,index);
            },
            error:function(){
                alert("ajax出错");
            }

        });
    };

    // 立即执行
    Ajax.prototype.ajaxData();

    //下拉并加载数据
    (function($){
        var ScrollLoad =function(){};

        var windowHeight=$(window).height(),       //获得窗口的高度
            index=1;                               //初始化页面

        ScrollLoad.prototype.scrollLoad=function(){        // 下拉时触发的方法。

            var documentHeight=$(document).height(),        //获得内容高度
                scrollTop=$(document).scrollTop();          //获得内容向上滚动的距离

            if(windowHeight+scrollTop===documentHeight) {   //若滑到屏幕底端 加载数据
                index=index+1;
                Ajax.prototype.ajaxData(index);
                console.log(index);
            }
        };

        $(window).on("scroll",ScrollLoad.prototype.scrollLoad);

    })(jQuery);

});