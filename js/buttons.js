
// START GAME BUTTON
$(function(){
    $("#start").click(function(){
        start_game_contract();
    });
});

$(function(){
    $("#claim_ico_share").click(function(){
        if(game.ico_cycle > game.ico_personal_lastclaim)
         {
        WithdrawICOEarnings();
         }
    });
});

$(function(){
    $("#withdraw1").click(function(){
        ClaimPersonalShare();
    });
});


// ICO INVEST
$(function(){
    $(".ico-buy-button").click(function(){
       var slider_val = $("#myRange").val();
         var invest_amount = (slider_val*game.futurebalance)/105; // 5% can be desinced worst case!
         FundICO(invest_amount);
    });
});
// ICO INVEST  


$(function(){
    $("#debug_money").click(function(){
        debug_gold();
    });
});

$(function(){
    $("#debug_prestige").click(function(){
        buy_prestige();
    });
});


$(function(){
    $("#debug_newico").click(function(){
        ReleaseICO();
    });
});

$(function(){
    $("#leaderboard").click(function(){

        $('#leaderboard_modal_content').html(generate_leaderboard());
        $('#leaderboard_modal').modal('show');
        
    });
});


// RIG BUY
$(function(){

        // BUY BUTTON!
        $(".buy_rig").click(function(){

            buy_action_rig($(this).closest(".card").data('card'));

        });

        // BUY TOGGLE! RIG!
        $('.buy_toggle .btn').on('click', function(event) {

            var count = $(this).find('input').val();
            /* Data: category,id,count, */
            var str = $(this).closest(".card").data('card');
            var res = str.split("-", 3);

            var nem_data = res[0]+"-"+res[1]+"-"+count;

            $(this).closest(".card").data('card',nem_data);

        });


        // UNLOCK RIG
        $(".unlock_rig").click(function(){

            UnlockRig($(this).closest(".card").data('card'));

        });


        $(".buy_booster").click(function(){

            buy_booster($(this).closest(".card").data('card'));

        });



});  