// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function noop() {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

var App = {};


$(document).ready(function(){ 
  App.sound.init();
  App.pageScroll.init();
  App.nav.init();
  App.thermometer.init();
});

App.pageScroll = {
    windowHeight: $(window).height(),
    windowWidth: $(window).height(),
    $window: $(window),
    activeSection: "section1",
    scrolling: false,
    hasBegun: false,
    contentDiv: ".content-wrap",
    
    getActiveSection: function(){
      return this.activeSection;
    },
    getScrolling: function(){
      return this.scrolling;
    },
    setActiveSection: function(as){
      this.activeSection = as;
    },
    setScrolling: function(s){
      this.scrolling = s;
    },
    
    init: function(){
      if(this.windowHeight<770){
        for(var i = 0; i < 3; i++){
          $('#landing').css('height', '770px');
          $('#about').css('height', '770px');
          $('#ways-to-give').css('height', '770px');
        }
        $(this.contentDiv).css({position:'absolute',top: (770 - $(this.contentDiv).outerHeight())/2});
       }
       
       $(window).resize(function() {
          var that = App.pageScroll;
          that.windowHeight = $(window).height();
          that.windowWidth  = $(window).width();
          
          for(var i = 0; i < 3; i++){
              if(that.windowHeight>770)$(that.contentDiv).css({position:'absolute',top: ($(window).height() - $(that.contentDiv).outerHeight())/2});
              $(that.contentDiv).css({position:'absolute',left: ($(window).width() - $(that.contentDiv).outerWidth())/2}); 
          }
          if(that.windowHeight>770){
              $('#landing').css('height',that.windowHeight+'px');
              $('#about').css('height',that.windowHeight+'px');
              $('#ways-to-give').css('height',that.windowHeight+'px');
          }
          $('#landing').css('width', that.windowWidth+'px');
          $('#about').css('width', that.windowWidth+'px');
          $('#ways-to-give').css('width', that.windowWidth+'px');
      });
       
      $(window).resize();
       
      $(window).scroll(function() {
        var that = App.pageScroll,
        scrollPos = $(window).scrollTop(),
        sectionHeight1 = that.windowHeight*0.5,
        sectionHeight2 = (that.windowHeight*2)*0.5,
        sectionHeight3 = (that.windowHeight*3)*0.5;
        
        if(scrollPos < sectionHeight1){
            if (that.activeSection === 'section2')$('#menu-main .menu-2 a').removeClass("on");
            if (that.activeSection === 'section3')$('#menu-main .menu-3 a').removeClass("on");
            
            if(that.activeSection !== 'section1'){
                that.activeSection = 'section1';
                if (that.activeSection === 'section1'){
                  $('#menu-main .menu-1 a').addClass("on");
                }
            }
        }
        
        if(scrollPos > sectionHeight1 && scrollPos < sectionHeight3){
            if (that.activeSection === 'section1')$('#menu-main .menu-1 a').removeClass("on");
            if (that.activeSection === 'section3')$('#menu-main .menu-3 a').removeClass("on");
            
            if(that.activeSection !== 'section2'){
                that.activeSection = 'section2';
                $('#menu-main .menu-2 a').addClass("on");
            }
        }
        
        if(scrollPos > sectionHeight3 && scrollPos > sectionHeight2){
            if (that.activeSection === 'section1')$('#menu-main .menu-1 a').removeClass("on");
            if (that.activeSection === 'section2')$('#menu-main .menu-2 a').removeClass("on");
            
            if(that.activeSection !== 'section3'){
                that.activeSection = 'section3';
                $('#menu-main .menu-3 a').addClass("on");
            }
        }
      });
    }
};

App.nav = {
    isTermsVisible: false,
    donateActive: false,
    
    nextClick: function(){
        App.pageScroll.setScrolling(true);
        if(App.pageScroll.getActiveSection()=='section1'){
             $('html, body').stop().animate({scrollTop: $('#about').offset().top}, 1000, function(){App.pageScroll.setScrolling(false);});
         }
         else if(App.pageScroll.getActiveSection()=='section2'){
             $('html, body').stop().animate({scrollTop: $('#ways-to-give').offset().top}, 1000, function(){App.pageScroll.setScrolling(false);});
         }
    },
    
    nextMouseover: function(){
        if(!App.pageScroll.getScrolling()){
            if(App.pageScroll.getActiveSection()=='section1')$('html, body').stop().animate({scrollTop: $('#landing').offset().top+20}, 300);
            else if(App.pageScroll.getActiveSection()=='section2')$('html, body').stop().animate({scrollTop: $('#about').offset().top+20}, 300);
        }
    },
    
    nextMouseout: function(){
        if(!App.pageScroll.getScrolling()){
            if(App.pageScroll.getActiveSection()=='section1')$('html, body').stop().animate({scrollTop: $('#landing').offset().top}, 300);
            else if(App.pageScroll.getActiveSection()=='section2')$('html, body').stop().animate({scrollTop: $('#about').offset().top}, 300);
        }
    },
    
    prevClick: function(){
        App.pageScroll.setScrolling(true);
        if(App.pageScroll.getActiveSection()=='section2'){
            $('html, body').stop().animate({scrollTop: $('#landing').offset().top}, 1000, function(){App.pageScroll.setScrolling(false);});
        }
        else if(App.pageScroll.getActiveSection()=='section3'){
            $('html, body').stop().animate({scrollTop: $('#about').offset().top}, 1000, function(){App.pageScroll.setScrolling(false);});
        }
    },
    
   prevMouseover: function(){
      if(!App.pageScroll.getScrolling()){
          if(App.pageScroll.getActiveSection()=='section2')$('html, body').stop().animate({scrollTop: $('#about').offset().top-20}, 300);
          else if(App.pageScroll.getActiveSection()=='section3')$('html, body').stop().animate({scrollTop: $('#ways-to-give').offset().top-20}, 300);
      }
    },
    
    prevMouseout: function(){
      if(!App.pageScroll.getScrolling()){
          if(App.pageScroll.getActiveSection()=='section2')$('html, body').stop().animate({scrollTop: $('#about').offset().top}, 300);
          else if(App.pageScroll.getActiveSection()=='section3')$('html, body').stop().animate({scrollTop: $('#ways-to-give').offset().top}, 300);
      }
    },
    
    flickerOn: function(){
        var randNum = App.utils.getRandomInt(10,99)*.01;
        if(this.donateActive)$('.donate-hover').fadeTo(250,randNum,function(){App.nav.flickerOn();});
        else $('.donate-hover').fadeTo(400,0,function(){});
    },
    
    mainNavAnimate: function(self){
        if (!$(self).hasClass('on')) {
          $(self).parent().siblings().children("a").removeClass("on");
          $(self).toggleClass("on");
        }
    },
    
    prevNextSetup: function(){
        //next
       $('.next a').bind('click', function(){
          App.nav.nextClick();
       });
       $('.next a').bind('mouseover', function(){
          App.nav.nextMouseover();
       });
       $('.next a').bind('mouseout', function(){
          App.nav.nextMouseout();
       });

       //prev
       $('.prev a').bind('click', function(){
          App.nav.prevClick();
       });
       $('.prev a').bind('mouseover', function(){
          App.nav.prevMouseover();
       });
       $('.prev a').bind('mouseout', function(){
          App.nav.prevMouseout();
       });
    },
    
    showOverlay: function(){
        isTermsVisible = true;
        $('.terms-of-use').fadeIn();
        $('.overlay').fadeTo(500,.6,function(){});
        $("body").addClass("stop-modal-scroll"); /*Stop window from scrolling when scrolling in modal*/
    },
    
    hideOverlay: function(){
        isTermsVisible = false;
        //$('.terms-of-use').fadeTo(600,0,function(){$('.overlay').fadeOut()});
        $('.terms-of-use').fadeOut();
        $('.overlay').fadeOut();
        setTimeout(function(){
          $("body").removeClass("stop-modal-scroll");
        }, 400); /* avoid scrollbar pushing modal over a few pixels on reappear*/
    },

    shareThis: function() {
      var b = "share_" + Math.round(Math.random() * 1e7);
      $('<span id="' + b + '" style="display:none;"></span>').appendTo("body"), stWidget.addEntry({
          service: "sharethis",
          element: $("#" + b).get(0),
          url: "http://Heat4Holidays.com",
          title: "SHARE THE WARMTH!",
          type: "large",
          content: "Wishing you all a happy (and heated) Holiday!",
          image: "http://propanestudio.com/Heat4Holidays/assets/img/header-house.png",
          summary: "This holiday, give the gift of warmth: donate to the National Fuel Fund Network, a charity providing heating assistance to those who can&rsquo;t afford it."
      }), $("#" + b).click();
    },
    
    init: function(){
        $("#menu-main .menu-1 a").addClass('on'); // Set default state onLoad
   
        //Home
        $("#menu-main .menu-1 a").click(function(){
            App.nav.mainNavAnimate(this);
            App.pageScroll.setActiveSection('section1');
            $('html, body').stop().animate({scrollTop: $('#landing').offset().top}, 1000);
        });
   
        //About
        $("#menu-main .menu-2 a").click(function(){
          App.nav.mainNavAnimate(this);
          App.pageScroll.setActiveSection('section2');
          $('html, body').stop().animate({scrollTop: $('#about').offset().top}, 1000);
        });
   
        //Other Ways to Give
        $("#menu-main .menu-3 a").click(function(){
          App.nav.mainNavAnimate(this);
          App.pageScroll.setActiveSection('section3');
          $('html, body').stop().animate({scrollTop: $('#ways-to-give').offset().top}, 1000);
        });
        
        $('.donate-1').mouseover(function(){
          App.nav.donateActive = true;
          App.nav.flickerOn();
        });
        
        $('.donate-1').mouseout(function(){
          App.nav.donateActive = false;
        });
   
       //Set it off
       this.prevNextSetup();
   
        $(".panel-header-house").click(function(){
         $(".next a, .prev a").unbind(); /*Avoid mouse getting snagged on .prev & .next when scrolling up*/
         $('html, body').stop().animate({scrollTop: $('#landing').offset().top}, 1000, function(){
           App.nav.prevNextSetup(); //Return prev/next listeners
         });
        });
    
        $('.terms-btn').click(function(event){
            if(App.nav.isTermsVisible)App.nav.hideOverlay();
            else App.nav.showOverlay();
            event.preventDefault();
        });
        
        $('.tu-close, .overlay').click(function(){
          App.nav.hideOverlay();
        });
        
        $(".donate-2 a, .donate-3 a, .donate-4 a").click(function () {
          App.nav.shareThis();
        })
        
        $(".external").live("click", function() {
          window.open(this.href);
          return false;
        });
    }
};

App.thermometer = {
    rise: function(){
      var that = this;
      $("#mercury").animate({top:App.utils.getRandomInt(80,115)},2500,function(){that.shrink();});
    },
    
    shrink: function(){
      var that = this;
      $("#mercury").animate({top:App.utils.getRandomInt(80,115)},2300,function(){that.rise();});
    },
    
    init: function(){
        this.rise();
    }
};

App.sound = {
  
  setupEvents: function() {
    $('a.btn-present').click(function() {
      soundManager.stopAll();
    });
  },
  
  setupSounds: function() {
    // background arctic/wind sound
    soundManager.createSound({
      id: 'arctic', url: '/propane/holidaycard/assets/mp3/arctic.mp3',
      autoLoad: true, autoPlay: false,
      loops: 1000, volume: 100,
      onload: function() { soundManager.getSoundById('arctic').play(); }
    });

    // knock sound on social sharing buttons
    soundManager.createSound({
      id: 'knock', url: '/propane/holidaycard/assets/mp3/knock.mp3',
      autoLoad: true, autoPlay: false,
      loops: 0, volume: 100,
      onload: function() { 
        $('.btn-knock').mouseover(function() {
          soundManager.getSoundById('knock').play(); 
        });
      }
    });

    soundManager.createSound({
      id: 'present', url: '/propane/holidaycard/assets/mp3/present.mp3',
      autoLoad: true, autoPlay: false,
      loops: 0, volume: 100,
      onload: function() { 
        $('.btn-present').mouseover(function() {
          soundManager.getSoundById('present').play(); 
        });
      }
    });

  },
  
  onReady: function() {
    this.setupEvents();
    this.setupSounds(); 
  },
  
  init: function () {
    
    var that = this;
    
    soundManager.setup({
      url: '/propane/holidaycard/assets/js/vendor/soundmanager/swf',
      flashVersion: 0,
      useFlashBlock: false,
      debugMode: false,
      onready: function() {
        that.onReady();
      }
    });
    
  }
  
};

App.utils = {
    getRandomInt: function(min,max){
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    wholeElementClickable: function(self) {
      var url = $(self).find("a").attr("href"); // Assign href to var
      var element = $(self).find("a"); // Find the element
      if ($(element).hasClass("external")) { // Check if external class applied
        $(element).removeClass("external");  // Remove external class to prevent double pop-ups
        window.open(url); // Open href in new window
        setTimeout(function () {
          $(element).addClass('external');
        }, 3000); // Add class back to element in case user returns to window
      } else {
        document.location = url;
      }
  }
}



