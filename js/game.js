game = [];

game.default_gas_price = web3.toHex(10100000000); //10.1 Gwei best price!
game.optimalsavetime = 10800;
game.optimalclaim = 86400;

game.debug = 0; // TRUE DEBUG!

game.user_address = "";


game.ico_cycle = 0;
game.ico_data_fund = 0;
game.ico_data_pot = 0;
game.ico_personal_fund = 0;
game.ico_personal_share = 0;
game.ico_personal_lastclaim = 0;
game.ico_unclaimed = 0;
game.next_ico = 0;
game.countdown_ico = 0;


game.lastupdate = 0;
game.prodPerSec = 0;
game.balance = 0;
game.globalFlat = 0;
game.globalPct = 0;


game.prestigeLevel = 0;
game.ethbalance = 0;
game.sincedbalance = 0;
game.futurebalance = 0;
game.unconfirmedbalance = 0;
game.time = 0;
game.current_unixtime = 0;
game.console_output = [];

game.unclaimedPot = 0;

game.rigdetails = 0;
game.rigpart = [];
game.upgrades = [];

game.totalminer = 0;
game.networkpot = "";
game.networkpot_share = 0;
game.networkhodl = 0;
game.networkhash = 0;

// BOOSTER
game.boosterdata  = [];
game.Minerboosterdata = [];

game.prestige_info = [];

//RIGS
game.rigdata = [];

game.Minerrigdata = [];

game.leaderboard = [];

window.windowage = 0;
first_update = 0;



function buy_action_rig (data)
{
    var str = data;
    var res = str.split("-", 3);
    /* Data: category,id,count, */

    // Check money!
    console.log(res);

    let rigID = parseInt(res[1]);

    var owned_supply = parseInt(game.Minerrigdata[rigID].rigCount);
    var buying_count = parseInt(res[2]);


    if(buying_count != 1000 && buying_count>0)
    {
    var price = buy_price(rigID , owned_supply, buying_count);

        if(price <= game.futurebalance)
        {
           buy_rig(rigID,limit_check(buying_count,owned_supply,game.rigdata[rigID].limit)); // Coin buy!
        }
        else
        {
            console.log(price); // TODO NOT POSSIBLE BUY!
        }
    }
    else
    {
        var count = buy_price_all(rigID,game.Minerrigdata[rigID].rigCount,game.futurebalance);     
        var price = buy_price(rigID , owned_supply, count);

        if(count>=1)
        {

            console.log(price);
            buy_rig(rigID,limit_check(count,owned_supply,game.rigdata[rigID].limit));
        }

    }

    return 0;
}


 // Update Owned Rig Parts -- FINISHED
 function update_rig()
 {

    if(game.prodPerSec==0)
    return;

    for (let index = 0; index < game.rigdata.length; index++) 
    {


        let possible_buy = 0;
        let cost_next = 0;


        
        if(game.Minerrigdata[index].rigCount==0) // SHOW NEXT LOCKED RIG!
        {

         cost_next = game.rigdata[index].basePrice*game.rigdata[index].unlockMultiplier; //Get Price of the Upgrade!

            if(cost_next < game.futurebalance)
            {
               possible_buy = 1;  
            }

         update_rig_ui(index,game.Minerrigdata[index].rigCount,possible_buy,cost_next);

        return;
        }
        else
        {
            possible_buy = buy_price_all(index,game.Minerrigdata[index].rigCount,game.futurebalance);

            cost_next = buy_price(index , game.Minerrigdata[index].rigCount, 1); //Get Price of next piece! 

            update_rig_ui(index,game.Minerrigdata[index].rigCount,possible_buy,cost_next);  
        }
        

    }


 }


 // REMOVE BUY BUTTON FROM OWNED UPGRADES -- FINISHED
 function update_upgrades()
 {
    var res =  game.upgrades.split(",");

    for (let index = 0; index < res.length; index++) 
    {
        if(res[index] !=0)
        hide_upgrade(index); 
    }
 }



// MAIN LOOP
function update_balance(force)
{

    if(force == 1)
    {
        // Equal with reload the page!
        game.time = 0;  
        first_update = 0;
        window.windowage = 0;
    }

        // FIRST UPDATE
        if(first_update != 1 && parseInt(game.balance) > 0 && game.time!=0)
        {
            timediff = game.time - game.lastupdate;
            new_balance_diff = (game.time-game.lastupdate) * game.prodPerSec;     

            game.balance = parseInt(game.balance)+new_balance_diff;
            first_update = 1;
            update_dash_slow();
        }
        // FIRST UPDATE

    if(first_update==1)
        {
        game.futurebalance = game.balance + game.prodPerSec*window.windowage;
        game.current_unixtime = game.time+window.windowage;
        }



        if(game.nextdistributiontime > 0 && game.nextdistributiontime > game.time && game.time!=0 && game.ico_cycle > 0)
        {
            game.countdown_ico  = game.nextdistributiontime-game.time-window.windowage; 
        }


}
// MAIN LOOP 


//SLOW LOOP!

function update_leaderboard()
{
       let  address = "";        
       let counter = game.leaderboard.length;

            if(game.totalminer>0 && counter<game.totalminer)
            {

                GetMinerAt(counter,function(res)
                {
                    address = res;

                    GetMinerData(address,function(result){
                        let minerdata =  result.toString();
                        minerdata = minerdata.split(",");


                                game.leaderboard[counter] = minerdata;
                                    game.leaderboard[counter][7] = address;

                                            game.leaderboard.sort(function(a, b)
                                                    {
                                                        return b[0]-a[0];
                                                    });   
                                counter++;  

                        
                    }) 
                });
            }

            if(game.totalminer == 0)
            {
                GetTotalMinerCount(function(result)
                {
                 game.totalminer =  result;  
                 console.log("Totalminer: "+game.totalminer);
                });  
            }      

};




// START GAME -> AFTER LOADED!
$( document ).ready(function() {

    update_dash_slow();

        function update(){
        
            update_balance(0); // Non force update!

            if(first_update == 1)
            {
                update_dash();   
               update_rig();  
            }

        };

        function slow_update() 
        {
            // update_leaderboard();
             if(first_update == 1)
                {
                update_booster_ui();
                update_ico();
                }
                update_leaderboard();
        };

        

        setInterval(update, 1000); // Main Loop every 100ms

        setInterval(startTime,1000);

        setInterval(slow_update,1000);

        setInterval(update_dash_slow,5000);  // 5 sec

        function startTime() {
            window.windowage = window.windowage+1;
        }

        var slider = document.getElementById("myRange");
            var output = document.getElementById("demo");

            // Update the current slider value (each time you drag the slider handle)
            slider.oninput = function() {

                if(game.futurebalance > 2)
                {
                    output.innerHTML = show_big_values((this.value*game.futurebalance)/100);   
                }
                else
                {
                output.innerHTML = this.value;
                }
            } 

});