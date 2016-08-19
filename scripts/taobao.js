/**
 * Created by Administrator on 2016/4/12.
 */

$(function(){

    $(".cover-page ").fadeOut(1500, function () {
        console.log("启动封面已隐藏");
    });

    var Ajax =function(){};

    var $list_template=$("#list-template");

    //异步请求数据
    Ajax.prototype.ajaxData=function(index,url){
        $.ajax({
            url:url,
            data:{
                pageindex:index
            },
            type:"post",
            datatype:"json",
            success:function(data){
                //console.log("ajax "+data);
                $(".product-list .active").handlebarsHelper($list_template,data,index);
            },
            error:function(){
                alert("ajax出错");
            }

        });
    };

    //left-menu 和 product
    (function($){

        var leftMenu = function () {};

        var product=function(){};

        //确定要请求数据的url
        var urll = "../mock-data/taobao/taobao",
            urlr = ".json";

        //确定要加载的页数。
        var pageIndex=1;

        //得到商品列表
        var $productList = $(".product .product-list");

        //初始化菜单索引
        leftMenu.prototype.index=0;

        //初始化菜单滚动条高度
        leftMenu.prototype.leftScrollTop=0;

        //默认触摸时没有移动
        leftMenu.prototype.istouchmove=false;

        //是否下拉到极限
        leftMenu.prototype.isPadding=false;

        //到极限时，滚动条的位置
        leftMenu.prototype.top=0;

        //初始化默认要显示的数据
        Ajax.prototype.ajaxData(1,urll+1+urlr);

        //点击处理事件
        leftMenu.prototype.clickEvent = function (event) {

             if(event.type==="touchend"){  //若是触摸结束事件

                if(leftMenu.prototype.istouchmove===false){
                    var $this = $(this);
                    var index = $this.index();
                    $this.addClass("active").siblings().removeClass("active");
                    $productList.children().eq(index).addClass("active").siblings().removeClass("active");
                    $(".product").scrollTop(0);// 将滚动条放到开头。
                    //异步请求数据
                    Ajax.prototype.ajaxData(1, urll + (1 + index) + urlr);
                    pageIndex=1;
                    leftMenu.prototype.index=index;
                }else if(leftMenu.prototype.istouchmove===true){
                    console.log("因为滚动，所以不能点击");
                    leftMenu.prototype.istouchmove=false;
                    if(leftMenu.prototype.isPadding===true){
                        $(".left-menu-list").css("padding-top", "0px");
                        $(".left-menu-list").css("padding-bottom", "0px");
                        $(".left-menu").scrollTop(leftMenu.prototype.top);
                        leftMenu.prototype.isPadding=false;
                    }
                }

            }else if(event.type==="touchmove"){
                leftMenu.prototype.istouchmove=true;
            }

        };

        //left-menu滚动条事件处理
        leftMenu.prototype.scrollEvent=function(){
            var containerHeight =$(".left-menu").height();   //得到.left-menu的高度
            var documentHeight=$(".left-menu-list").innerHeight(); // 得到.left-menu-list的高度
            var documentScrollTop=$(".left-menu").scrollTop(); // 得到.left-menu的内容向上滚动的高度
            //console.log("left-menu高度："+containerHeight);
            //console.log("left-menu-list高度："+documentHeight);
            //console.log("left-menu内容向上滚动的高度："+documentScrollTop);
            //if (documentScrollTop <=0 &&leftMenu.prototype.istouchmove===true) {
            //    leftMenu.prototype.isPadding=true;
            //    console.log("顶部");
            //    $(".left-menu-list").css("padding-top", "400px");
            //
            //} else
            if (documentScrollTop + containerHeight >= documentHeight - 1 &&leftMenu.prototype.istouchmove===true) {
                leftMenu.prototype.isPadding=true;
                console.log("底部");
                $(".left-menu-list").css("padding-bottom","400px");
            }
        };

        ////
        //product.prototype.documentHeight = 0;

        //确认是否在触摸状态
        product.prototype.isTouching=false;

        //确认是否异步加载数据
        product.prototype.isAjax=false;

        //product点击事件处理
        product.prototype.clickEvent=function(event){
            if(event.type==="touchstart"){
                product.prototype.isTouching=true;
            }else if(event.type==="touchend"){
                product.prototype.isTouching=false;
                if(product.prototype.isAjax){
                    pageIndex=pageIndex+1;
                    console.log("可加载数据,分页为 "+pageIndex);
                    $(".product .loading").removeClass("loading-active");
                    Ajax.prototype.ajaxData(pageIndex, urll + (1 + leftMenu.prototype.index) + urlr);
                }else {
                    $(".product .loading").removeClass("loading-active");

                }
            }


        }

        //product滚动条事件处理
        product.prototype.scrollEvent = function () {
            var containerHeight =$(".product").height();   //得到.product的高度
            var documentHeight=$(".product-list").height(); // 得到.product-list的高度
            var documentScrollTop=$(".product").scrollTop(); // 得到.product的内容向上滚动的高度
            product.prototype.isAjax=false;

            if(documentScrollTop+containerHeight>=documentHeight-2 && product.prototype.isTouching===true ){
                $(".product .loading").addClass("loading-active");
                $(".product .loading .up").addClass("loading-active");
                $(".product .loading .down").removeClass("loading-active");
                if(documentScrollTop+containerHeight-documentHeight>=$(".product .loading").height()){
                    product.prototype.documentHeight=documentHeight;
                    product.prototype.isAjax=true;
                    $(".product .loading .up").removeClass("loading-active");
                    $(".product .loading .down").addClass("loading-active");

                }

            }
        };

        $(document).on("touchmove", ".left-menu-list>li", leftMenu.prototype.clickEvent)
            .on("touchend", ".left-menu-list>li", leftMenu.prototype.clickEvent)
            .on("touchstart", ".product", product.prototype.clickEvent)
            .on("touchend", ".product", product.prototype.clickEvent);
        $(".product").on("scroll", product.prototype.scrollEvent);
        $(".left-menu").on("scroll",leftMenu.prototype.scrollEvent);



    })(jQuery);

    //side-bar
    (function($){
        var sideBar=function(){};

        sideBar.prototype.clickEvent=function(){
            $(".product").toggleClass("side-bar-show");
            $(".product").toggleClass("side-bar-hide");

        }

        $(document).on("touchend",".header .side-bar-btn",sideBar.prototype.clickEvent);
    })(jQuery);
});