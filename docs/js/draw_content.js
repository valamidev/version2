function update_dash()
{

    $("#debug_prestige").hide();

    let bonus = "";


    if(typeof game.prestige_info[game.prestigeLevel]  != 'undefined')
    {
            if(game.prestige_info[game.prestigeLevel].bonus > 100)
            {
            bonus = " +"+(game.prestige_info[game.prestigeLevel].bonus-100)+"% Hash";
            }


            $('#nextlevelprestige').html("Next level: "+show_big_values(game.prestige_info[game.prestigeLevel].price));

            if(game.futurebalance > game.prestige_info[game.prestigeLevel].price)
            {
                $("#debug_prestige").show()  
            }
    }        

    $('#prestigelevel').html('LvL: '+game.prestigeLevel+bonus);


    $('#balance').html(show_big_values(game.futurebalance));
    $('#wallet_balance').html(show_big_values(game.sincedbalance));
    $('#prodPerSec').html(show_big_values_hash(game.prodPerSec)+"/s");



}

function update_dash_slow()
{
    $('#networkhodl').html('Total Open Supply: '+show_big_values(game.networkhodl)+" Token");
    $('#networkpot').html('Network HODL: '+precisionRound(game.networkpot,4)+' <b>BNB</b>');
    $('#networkhash').html('Network hash: '+show_big_values_hash(game.networkhash)+' /s');
    $('#networkshare').html('Your Network Share: '+personal_share()+"%");
    $('#unclaimedICO').html('Your unlcaimed ICO: '+toETH(game.ico_unclaimed)+' <b>BNB</b>');
    $('#unclaimedpot').html('Your contract balance: '+ toETH(game.unclaimedPot)+' <b>BNB</b>');
   

    $('.console-text').html(generate_output());

    if(game.debug==0)
    {
       $('#debug').hide();   
    }

    if(game.prodPerSec>0)
    {
        $('#start').hide();  
        $('.slidecontainer').show();
        $('#reflink').html(url_generator(game.user_address));
    }
    else
    {
        $('.slidecontainer').hide();
    }

    var daily_income =  parseInt(game.prodPerSec)*86400;
    $('#prodPerDay').html(show_big_values(daily_income)+" /day");



    // SUPER BLOCK BUTTON SHOW/HIDE
            if(game.time >= game.nextjackpot && game.time>0)
            {
              $('#jackpot').show();
            }
            else
            {
              $('#jackpot').hide();   
            }


    // Claim ETH BUTTON SHOW/HIDE
                if(toETH(game.unclaimedPot) >= 0.001)
                {
                    $('#withdraw1').removeClass( "btn-outline-warning" ).addClass( "btn-warning" ); 
                    $('#withdraw1').show();  
                    
                }     
                else
                {
                    $('#withdraw1').removeClass( "btn-warning" ).addClass( "btn-outline-warning" ); 
                    $('#withdraw1').hide();  
                } 


                if(toETH(game.ico_unclaimed) >= 0.001)
                {
                    $('#claim_ico_share').removeClass( "btn-outline-success " ).addClass( "btn-success " ); 
                    $('#unclaimedshare').addClass("green-background");
                    $('#claim_ico_share').show();

                }     
                else
                {
                    $('#claim_ico_share').removeClass( "btn-success " ).addClass( "btn-outline-success " );   
                    $('#unclaimedshare').removeClass("green-background");
                    $('#claim_ico_share').hide();
                } 


}


function update_ico()
{
    // Token ivested
    $('.ico_pot').html(show_big_values(game.ico_data_fund)+" Token");

    // ETH invested
    $('.ico_pot_eth').html('ICO pot equals: '+precisionRound(web3.fromWei(game.ico_data_pot,'ether'),4)+' <b>BNB</b>');

    if(game.countdown_ico > 0)
    {
    $('.ico_countdown').html(countdown(game.countdown_ico));
            if(game.prodPerSec>0)
            {
            $('#debug_newico').hide();
            $('.ico-buy-button').show();
            }
    }

    if(game.ico_personal_fund > 0)
    $('#ico_by_you').html(', '+show_big_values(game.ico_personal_fund)+' by you');

    if(game.countdown_ico<=0 && game.prodPerSec>0)
    {
        $('#debug_newico').show();
        $('.ico-buy-button').hide();
    }


    let personal_pct = precisionRound(game.ico_personal_share/game.ico_data_pot*100,2);
  
    // Personal ICO
    $('.ico_pot_yours').html('Your investment so far: '+precisionRound(web3.fromWei(game.ico_personal_share,'ether'),4)+'<b>BNB</b> ('+personal_pct+'%)');

}


function personal_share ()
{
    let share =  (parseInt(game.sincedbalance)*10000) / parseInt(game.networkhodl);

    share = parseInt(share);

    share_pct = share/100;

    if(share_pct >= 0.01) 
    return share_pct;
    else
    {
    return "Less than 0.01";    
    }
}

function personal_share_eth(ico_unclaimed)
{
    ico_unclaimed = web3.fromWei(ico_unclaimed,'ether');


    if(ico_unclaimed>= 0.0001 )
    {

     return precisionRound(ico_unclaimed,4)+'<b>BNB</b>';
    }
    else
    {
      return 'Less than 0.0001 <b>BNB</b>';  
    }

}



function update_rig_ui(idx,count,possible_buy,cost_next)
{
 
    $('.card').find('[data-price-next-rig="' + idx+'-1"]').html(show_big_values(cost_next));  
    $('.card').find('[data-buyrig-unlock-button="' + idx+'-1"]').html(show_big_values(cost_next));  

    $('[data-rig-hashrate="1-'+idx+'-1"]').html(show_big_values_hash(game.Minerrigdata[idx].rigTotalProduction)+'/s'); 

    if(count > 0)
    {
        $('[data-card="1-'+idx+'-1"]').show(); 
        $('.card').find('[data-rig-unlocked="' + idx + '"]').show();   
        $('.card').find('[data-owned-count-rig="' + idx + '"]').html(count+'X').show(); 
        $('.card').find('[data-rig-locked="' + idx + '"]').hide();  
    }
    else
    {
        $('[data-card="1-'+idx+'-1"]').show(); 
        $('.card').find('[data-rig-locked="' + idx + '"]').show();   
       // $('.card').find('[data-owned-count-rig="' + idx + '"]').html(count+'X').show();   
    }

    let can_buy = 0;

    if(count==game.rigdata[idx].limit)
    {
        $('.card').find('[data-buyrig-button="' + idx + '"]').hide();

        $('.card').find('[data-maxrig-button="' + idx + '"]').show();  

        $('.card').find('[data-price-next-rig="' + idx+'-1"]').html("-");
    }

    if(possible_buy >= 1 && game.rigdata[idx].basePrice > 0 && count!=game.rigdata[idx].limit)
    {
            $('.card').find('[data-price-next-rig="' + idx+'-1"]').html(show_big_values(cost_next));
            $('.card').find('[data-buyrig-count="' + idx+'-1"]').removeClass( "btn-secondary" ).addClass( "btn-primary" );  
            $('.card').find('[data-buyrig-count="' + idx+'-5"]').removeClass( "btn-primary" ).addClass( "btn-secondary" );  
            $('.card').find('[data-buyrig-count="' + idx+'-1000"]').removeClass( "btn-secondary" ).addClass( "btn-primary" ); 
            can_buy = 1;
    }

    if(possible_buy >= 5 && game.rigdata[idx].basePrice > 0 && count!=game.rigdata[idx].limit)
    {
        $('.card').find('[data-buyrig-count="' + idx+'-5"]').removeClass( "btn-secondary" ).addClass( "btn-primary" );  
        can_buy = 1;
    }

    if(can_buy==1)
    {
        $('.card').find('[data-buyrig-button="' + idx + '"]').removeClass( "btn-outline-success" ).addClass( "btn-success" );
        $('.card').find('[data-buyrig-unlock-button="' + idx + '"]').removeClass( "btn-outline-success" ).addClass( "btn-success" ); 
    }
    else
    {
        $('.card').find('[data-buyrig-button="' + idx + '"]').removeClass( "btn-success" ).addClass( "btn-outline-success" );  
        $('.card').find('[data-buyrig-unlock-button="' + idx + '"]').removeClass( "btn-success" ).addClass( "btn-outline-success" ); 
    }

}



function update_booster_ui ()
{
 

    for (let index = 0; index < game.boosterdata.length; index++) {

        let idx = index;

        if(game.prodPerSec>0 && game.boosterdata[idx].locktime < game.time)
        {
        $('[data-card="4-' + idx+ '-1"]').show();
        }

        $('.card').find('[data-booster-name="4-' + idx+ '-1"]').html(boosterdata[idx].name);
        $('.card').find('[data-booster-desc="4-' + idx+ '-1"]').html(boosterdata[idx].desc);
        $('.card').find('[data-booster-spec="4-' + idx+ '-1"]').html(boosterdata[idx].spec);
        $('.card').find('[data-booster-image="4-' + idx+ '-1"]').attr("src",boosterdata[idx].img); 


        $('.card').find('[data-booster-cost="4-' + idx+ '-1"]').html('Cost: '+precisionRound(web3.fromWei(game.boosterdata[idx].currentPrice,'ether'),4)+' <b>BNB</b>');



        if(game.Minerboosterdata[idx] == 0)
        {
        $('.card').find('[data-booster-button="' + idx + '"]').show();
        $('.card').find('[data-booster-own-button="' + idx + '"]').hide();
        }
        else
        {
        $('.card').find('[data-booster-own-button="' + idx + '"]').show();
        $('.card').find('[data-booster-button="' + idx + '"]').hide();
        }


    }    
}

function game_started()
{
    $("main").show();  
    $("prologe").hide(); 
}

function generate_leaderboard()
{
    let content = "";
    
    for (let index = 0; index < game.leaderboard.length; index++) 
    {
            let user_data = game.leaderboard[index];
            let button = "";
            let address_or_allias = "";

         if(index>=1)
         {
                if(game.leaderboard[index][7] == game.leaderboard[index-1][7]) 
                {   
                    continue;    
                }
         }
         
         if(typeof alliases[game.leaderboard[index][7]]  != 'undefined')
                {
                    address_or_allias = alliases[game.leaderboard[index][7]]; 
                }
         else
         {
            address_or_allias = game.leaderboard[index][7];  
         }       

            content+= "<tr>"+
            "<td>"+address_or_allias+"</td>"+ 
            "<td>"+show_big_values(game.leaderboard[index][6])+"</td>"+
            "<td>"+show_big_values(game.leaderboard[index][0])+"</td>"+
            "</tr>";
    }


    return content;
}


function precisionRound(number, precision) {
    var factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
  }


  function show_big_values_hash (labelValue) 
  {
      // Nine Zeroes for Billions
      return Math.abs(Number(labelValue)) >= 1.0e+12
  
      ? Math.round(Math.abs(Number(labelValue) / 1.0e+12)*100) /100 + " TH"
      // Six Zeroes for Millions 
      : Math.abs(Number(labelValue)) >= 1.0e+9
  
      ? Math.round(Math.abs(Number(labelValue) / 1.0e+9)*100) /100 + " GH"
      // Six Zeroes for Millions 
      : Math.abs(Number(labelValue)) >= 1.0e+6
  
      ? Math.round(Math.abs(Number(labelValue) / 1.0e+6)*100) /100 + " MH"
      // Three Zeroes for Thousands
      : Math.abs(Number(labelValue)) >= 1.0e+3
  
      ? Math.round(Math.abs(Number(labelValue) / 1.0e+3)*100) /100 + " kH"
  
      : String(Math.abs(Number(labelValue))+ " Hash");
  }


function show_big_values (labelValue) 
{
    // Nine Zeroes for Billions
    return Math.abs(Number(labelValue)) >= 1.0e+12

    ? Math.round(Math.abs(Number(labelValue) / 1.0e+12)*100) /100 + "T"
    // Six Zeroes for Millions 
    : Math.abs(Number(labelValue)) >= 1.0e+9

    ? Math.round(Math.abs(Number(labelValue) / 1.0e+9)*100) /100 + "B"
    // Six Zeroes for Millions 
    : Math.abs(Number(labelValue)) >= 1.0e+6

    ? Math.round(Math.abs(Number(labelValue) / 1.0e+6)*100) /100 + "M"
    // Three Zeroes for Thousands
    : Math.abs(Number(labelValue)) >= 1.0e+3

    ? Math.round(Math.abs(Number(labelValue) / 1.0e+3)*100) /100 + "k"

    : Math.abs(Number(labelValue));
}


function show_token_value (labelValue) 
{
    labelValue = precisionRound(labelValue/100000000,4);

    // Nine Zeroes for Billions
    return Math.abs(Number(labelValue)) >= 1.0e+12

    ? Math.round(Math.abs(Number(labelValue) / 1.0e+12)*100) /100 + "T"
    // Six Zeroes for Millions 
    : Math.abs(Number(labelValue)) >= 1.0e+9

    ? Math.round(Math.abs(Number(labelValue) / 1.0e+9)*100) /100 + "B"
    // Six Zeroes for Millions 
    : Math.abs(Number(labelValue)) >= 1.0e+6

    ? Math.round(Math.abs(Number(labelValue) / 1.0e+6)*100) /100 + "M"
    // Three Zeroes for Thousands
    : Math.abs(Number(labelValue)) >= 1.0e+3

    ? Math.round(Math.abs(Number(labelValue) / 1.0e+3)*100) /100 + "k"

    : Math.abs(Number(labelValue));
}

function countdown (distance)
{

  if(distance>0)
  {
        distance = distance*1000; // Fukin unixtime

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the element with id="demo"
        let string = hours + "h "
        + minutes + "m " + seconds + "s ";

        if(days>0)
        {
        let string = days + "d " + hours + "h "
        + minutes + "m " + seconds + "s ";
        }

        return string;
  }

}


function generate_output()
{
    let content = ""


    if(game.prodPerSec==0)
    {
        content = gametext.welcome;

        return content;
    }

    if(game.console_output.length == 0)
    {
        game.console_output.push("<span>C:/Mining/RigWars >RigWarsMiner.exe --load miner</span> <br>");
    }

    // LOOP STARTED
    if(game.console_output.length > 0)
    {
         let value_factor = Math.random()*100;
         let random_text = Math.floor(Math.random() * (7 - 0) ) + 0;
         let random_text2 = Math.floor(Math.random() * (4 - 0) ) + 0;
         let random_temp = Math.floor(Math.random() * (90 - 56) ) + 56;
         let random_vent = Math.floor(Math.random() * (95 - 80) ) + 80;

        let date = new Date();


        if(game.hasbooster == "true" && value_factor>97)
        {
            game.console_output.push('<span class="claymore-gold">FUTURE: Ponzy scheme found(BITCONNEEEEEEEEEEEEEEEEEEEEEEEEEECT!)</span><br>');
        }
        else
        {
                switch (random_text) 
                {
                    case 0:
                    game.console_output.push( '<span>FUTURE: '+date.getUTCDate()+'/'+date.getMonth()+'/18 - '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()+' - New job from pool.rigwars.io:4414</span>  <br>');
                        break;
                    case 1:
                    game.console_output.push( '<span class="claymore-blue">FUTURE: - Total Speed: '+show_big_values(game.prodPerSec)+' H/s, Total Shares: '+Math.floor((value_factor*34))+', Rejected: 0, Time: '+date.getHours()+':'+date.getMinutes()+'</span><br>');
                        break;
                    case 2:
                        game.console_output.push( '<span class="claymore-blue">FUTURE: - Total Speed: '+show_big_values(game.prodPerSec)+' H/s, Total Shares: '+Math.floor((value_factor*34))+', Rejected: 0, Time: '+date.getHours()+':'+date.getMinutes()+'</span><br>');
                        break;    
                    case 3:
                    game.console_output.push( '<span class="claymore-green">FUTURE: '+date.getUTCDate()+'/'+date.getMonth()+'/18 - '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()+' - SHARE FOUND - (RIG '+random_text2+')</span><br>');
                        break;
                    case 4:
                    game.console_output.push( '<span class="claymore-green">FUTURE: Share accepted('+(Math.floor(value_factor+12))+'ms)!</span><br>');
                        break;
                    case 5:
                    game.console_output.push( '<span class="claymore-purple">RIG 0 t='+random_temp+'C fan='+random_vent+'%, RIG 1 t='+(random_temp-7)+'C fan='+(random_vent-3)+'%, RIG 3 t='+(random_temp+2)+'C fan='+(random_vent+5)+'%, RIG 4 t='+(random_temp-4)+'C fan='+(random_vent+3)+'%</span><br>');
                        break;
                    case 6:
                    game.console_output.push( '<span class="claymore-green">FUTURE: Share accepted('+(Math.floor(value_factor+12))+'ms)!</span><br>');
                    break;    

                    default:
                    game.console_output.push( '<span class="claymore-purple">RIG 0 t=55C fan=85%, RIG 1 t=58C fan=92%, RIG 3 t=58C fan=92%, RIG 4 t=58C fan=92%</span><br>');
                        break;
                }
        }


            if(game.console_output.length>11)
            {
                game.console_output.shift();  
            }     

    }

    for (let index = 0; index < game.console_output.length; index++) 
    {
        content += game.console_output[index]; 
    }

    return content;

}



function url_generator(address)
{

  return 'Your referral link: <a href="'+location.protocol + '//' + location.host + location.pathname+'?reff='+address+'" target="_blank"> '+location.protocol + '//' + location.host + location.pathname+'?reff='+address+'</a>';

}