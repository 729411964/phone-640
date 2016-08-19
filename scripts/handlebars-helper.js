/**
 * Created by Administrator on 2016/4/7.
 */

$(function(){
    $.fn.handlebarsHelper=function(template,data,index){
        //console.log(template);
        //console.log(data);
        var mytemplate = Handlebars.compile(template.html());
        if(index===1){
            this.html(mytemplate(data))
        }else {
            this.append(mytemplate(data));

        }

    }
});
