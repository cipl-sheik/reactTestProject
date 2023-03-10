$(document).ready(function() {
    $(".next01").on('click', function() {
    //   $("html, body").animate({
    //       scrollTop: 100
    //   }, "100");
      $("#slide01").hide();
      $("#slide02").show(); 
    });
    $(".next02").on('click', function() {
        $("#slide03").hide();
        $("#slide04").show(); 
    });
    $("#back02").on('click', function() {
        $("#slide04").hide();
        $("#slide03").show(); 
    });
    $("#showadrs2").on('click', function() {
        $("#postaddrs2").show();
        $("#submitoradd01").hide();
    });
    $("#showadrs3").on('click', function() {
        $("#postaddrs3").show();
        $("#submitoradd02").hide();
    });

    $("#remove3").on('click', function() {
        $("#submitoradd01").show();
        $("#postaddrs2").hide();
    });
    $("#remove4").on('click', function() {
        $("#submitoradd02").show();
        $("#postaddrs3").hide();
    });
    
    
    $("#submit_claim").on('click', function() {
        window.location.href='page02.html'
        }
    )
    $(".tothank").on('click', function() {
        window.location.href='thankyou.html'
        }
    )


  });
    
