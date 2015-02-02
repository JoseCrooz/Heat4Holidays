$(document).ready(function(){
   var windowHeight = $(window).height();
   var windowWidth  = $(window).width();
   
   var sectionObj = document.getElementsByTagName('section');
   var l = sectionObj.length;
   for(var i = 0; i < l; i++){
    document.getElementById(sectionObj[i].id).style.height = windowHeight+'px';
    document.getElementById(sectionObj[i].id).style.width = windowWidth+'px';
   }
   
   $(window).resize(function() {
    windowHeight = $(window).height();
    windowWidth  = $(window).width();
    for(var i = 0; i < l; i++){
        document.getElementById(sectionObj[i].id).style.height = windowHeight+'px';
        document.getElementById(sectionObj[i].id).style.width = windowWidth+'px';
        }
    });
});