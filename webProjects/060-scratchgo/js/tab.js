// JavaScript source code
$(document).ready(function(){
    $('#tab-btn .choice-btn').click(function(e){
      var index = $(this).index();
      
      const linkName = $(this).data("img");
      $(".sc__canvas").remove();
      sc2(linkName);

      $('#tab-btn .downAnchor_box.active').removeClass('active').fadeOut(function(){
        $('#tab-btn .downAnchor_box').eq(index).fadeIn().addClass('active');
      });

      

    
      $('#tab-btn .box').eq(index-1).hover(function(){
        $(this).css('background-color', '#fffae0');
      }, function(){
        $(this).css('background-color', 'rgba(255,255,255,0.2)');
      });

      $('#tab-btn .box').eq(index).hover(function(){
        $(this).css('background-color', '#fffae0');
      }, function(){
        $(this).css('background-color', '#fffae0');
      });
    
      $('#tab-btn .box').eq(index+1).hover(function(){
        $(this).css('background-color', '#fffae0');
      }, function(){
        $(this).css('background-color', 'rgba(255,255,255,0.2)');
      });
    

      $('#tab-btn .box').eq(index-1).css('background-color', 'rgba(255,255,255,0.2)');
      $('#tab-btn .box').eq(index).css('background-color', '#fffae0');
      $('#tab-btn .box').eq(index+1).css('background-color', 'rgba(255,255,255,0.2)');



      $('#tab-btn .box').eq(index).hover(function(){
        $('#tab-btn .downAnchor_box').css('color', '#fffae0');
      }, function(){
        $('#tab-btn .downAnchor_box').css('color', '#fffae0');
      });
      $('#tab-btn .downAnchor_box').eq(index).css('color', '#fffae0');


  });

  //預設隱藏
  // $('#content-list .content').hide().first().show().addClass('active');
  $('#tab-btn .downAnchor_box').hide().first().show().addClass('active');

});


