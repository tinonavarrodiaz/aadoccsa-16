$(document).ready(function(){
  //Examples of how to assign the Colorbox event to elements
  $(".group1").colorbox({rel:'group1'});
  $(".img").colorbox();
  $(".group2").colorbox({rel:'group2', transition:"fade"});
  $(".group3").colorbox({rel:'group3', transition:"none", width:"75%", height:"75%"});
  $(".group4").colorbox({rel:'group4', slideshow:true});
  $(".ajax").colorbox();
  $(".youtube").colorbox({iframe:true, innerWidth:640, innerHeight:390});
  $(".vimeo").colorbox({iframe:true, innerWidth:500, innerHeight:409});
  $(".iframe").colorbox({iframe:true, maxWidth:"800", width:"90%", height:"350px"});
  $(".inline").colorbox({iframe:true, maxWidth:"650", width:"90%", height:"550px"});
  $(".callbacks").colorbox({
    onOpen:function(){ alert('onOpen: colorbox is about to open'); },
    onLoad:function(){ alert('onLoad: colorbox has started to load the targeted content'); },
    onComplete:function(){ alert('onComplete: colorbox has displayed the loaded content'); },
    onCleanup:function(){ alert('onCleanup: colorbox has begun the close process'); },
    onClosed:function(){ alert('onClosed: colorbox has completely closed'); }
  });

  $('.non-retina').colorbox({rel:'group5', transition:'none'})
  $('.retina').colorbox({rel:'group5', transition:'none', retinaImage:true, retinaUrl:true});

  //Example of preserving a JavaScript event for inline calls.
  $("#click").click(function(){
    $('#click').css({"background-color":"#f00", "color":"#fff", "cursor":"inherit"}).text("Open this window again and this message will still be here.");
    return false;
  });
});
