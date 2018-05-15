    window.addEventListener('load', function() {
            
      refresh_gui_dapp();

    });

      // CONTRACT ADDRESSS! 
      const contract_address = "0x5d4cbcd30515d78370f35c5e45427dd576922225";
      // USER ACCOUNT!
      var account =  web3.eth.accounts[0];

      function startApp(account) 
      {
          game.user_address = account;
          contract_init(); // GAME LOAD!
      }    

      function refresh_gui_dapp()
      {
          valid_account().then(function(ress)
                {
                  if(ress)
                  {
                  console.log(ress);
                  startApp(ress);
                  }
                }).catch(function(err)
                { 
                  console.log(err);
                  $("prologe").show();  
                  $("main").hide();  
                  if(err==1)
                  {
                    setTimeout(function(){
                      refresh_gui_dapp(); 
                     }, 5000);
                  }
                });
      }


      function contract_init()
      {

          console.log("Player Address: "+game.user_address);

          // CALLBACK IN GAME.JS!!!!
          rig_wars_contract = web3.eth.contract(abi).at(contract_address);


          //console.log(ig_wars_contract.GetMinerData)


          // GET MINER DATA
          rig_wars_contract.GetMinerData.call(game.user_address,{},function (error, result)
          {
                  if(!error)
                  {
                       game.balance = result[0].toNumber()+1;
                       game.lastupdate = result[1].toNumber();
                       game.prodPerSec = result[2].toNumber();
                       game.unclaimedPot = result[3].toNumber();
                       game.globalFlat = result[4].toNumber();
                       game.globalPct = result[5].toNumber();
                       game.prestigeLevel = result[6].toNumber();

                       GetPrestigeInfo(game.prestigeLevel);
                       GetPrestigeInfo(game.prestigeLevel+1);

                      if(game.prodPerSec>0){ // SHOW GUI
                      game_started();
                      }
                      else
                      {
                        setTimeout(function(){
                          contract_init(); 
                         }, 5000); 
                      }
                        /*
                              GetMinerData(address minerAddr) public constant returns 
                                (uint256 money, uint256 lastupdate, uint256 prodPerSec, 
                                uint256 unclaimedPot, uint256 globalFlat, uint256 globalPct)  
                        */

                      for (let index = 0; index < result.length; index++) {
                        console.log('Minerdata - Index: '+index+" Value: "+result[index].toString());
                        }  
                  } 
                  else
                  {
                      console.log(error);
                  }
          });  

          // GET GLOBAL POT
          rig_wars_contract.GetPotInfo.call({},function (error, result) // NETWORK ETH
          {
                  if(!error)
                  {   
                     
                      game.networkpot =  web3.fromWei(result[0],'ether');   
                      game.next_ico = result[1].toNumber();
                      game.nextdistributiontime = result[2].toNumber();
          
          
                      for (let index = 0; index < result.length; index++) {
                        console.log('ICO data - Index: '+index+" Value: "+result[index].toString());
                        }  
                  } 
                  else
                  {
                      console.log(error);
                  }
          });  

          // GET NETWORK HASH and MONEY 
          rig_wars_contract.GetGlobalProduction.call({},function(err,ress)
            {
              if(!err)
                  {
                      game.networkhodl = ress[0];
                      game.networkhash = ress[1];
                  } 
            });

          // LOAD YOUR RIGS 0-10!!!!!!
          
          rig_wars_contract.GetMinerRigsCount.call(game.user_address,0,{},function(err,ress)
            {
              if(!err)
                  {
                    for (let index = 0; index < ress[0].length; index++) 
                    {
                      game.Minerrigdata[index] = {};

                      game.Minerrigdata[index].rigCount = ress[0][index].toNumber();
                      game.Minerrigdata[index].rigTotalProduction = ress[1][index].toNumber();
                    }


                  } 
            });


          // LOAD BOOSTERS
          GetBoosterCount();  

            // LOAD MY BOOSTERS
          rig_wars_contract.HasBooster.call(game.user_address,0,{},function(err,ress)
          {
            if(!err)
                {
                  for (let index = 0; index < ress.length; index++) 
                  {
                    game.Minerboosterdata[index] = ress[index].toNumber();
                  }
                } 
          });


          //Available Rigs in the game  
          GetTotalRigCount();

          // ICO and FULL ICO UPDATES
         GetCurrentICOCycle();

          // GET ETH BALANCE OF USER
          web3.eth.getBalance(game.user_address,function(err,ress){
           if(!err)
           {
             game.ethbalance = web3.fromWei(ress,'ether'); ;
             console.log("ETH balance: "+game.ethbalance+" Ether"); 
           } 
          });
   

          // WHY IT IS SO UGLY JS WHY?!
         (async ()=> { await web3.eth.getBlockNumber(
           function(err,ress)
           {
            web3.eth.getBlock(ress,function(err,ress){

              if(!ress)
              {
                setTimeout(function () {contract_init()}, 2000);
              }
              else
              {
              game.time = parseInt(ress.timestamp);
              console.log("game item: "+game.time);
              }

            });
           }
         ) })();
 
      }


      function start_game_contract()
      {

        if(typeof web3.eth.accounts[0]  != 'undefined')
        {

          rig_wars_contract = web3.eth.contract(abi).at(contract_address);

          game.referee = referre_manager();

          if( parseInt(game.referee) == parseInt(account))
          {
            game.referee = legacy_reff();
          }

          console.log("Referral: "+game.referee);

          rig_wars_contract.StartNewMiner.sendTransaction(game.referee,{from:account,gasPrice: game.default_gas_price},function(err,ress)
          {
            waitForReceipt(ress, function (receipt) 
            {
              console.log('Force Update!');
              update_balance(1);
              contract_init();
            });  
          }
        );


        }
        else // No Metamask Address Found!
        {
          $('#metamask_alert_message').html(gametext.error[1]);
          $('#metamask_alert').modal('show');
        }  
      }


    // GetCurrentICOCycle() public constant returns (uint256), ez az utolsó éppen "in-progress" ICO index  
      function GetCurrentICOCycle()
      {
        rig_wars_contract.GetCurrentICOCycle.call({from:account},function(err,ress)
          {
            if(!err)
            {
              game.ico_cycle = ress.toNumber();
                console.log("ICO cycle: "+game.ico_cycle);

                    GetICOData(game.ico_cycle); // Call Daily ICO data!
                    GetMinerICOData(game.ico_cycle); // Call Miner ICO data!
            } 
            else
            {
                console.log("ICO-cylce" +err);
            }
          });

      }

      // GET PRESITGE INFO Price/Bonus
      function GetPrestigeInfo(idx)
       {
            rig_wars_contract.GetPrestigeInfo.call(idx,{},function(err,ress)
            {
              if(!err)
                  {
                      game.prestige_info[idx] = {};
                      game.prestige_info[idx].price = ress[0].toNumber();
                      game.prestige_info[idx].bonus = ress[1].toNumber();
                      game.prestige_info[idx].locktime = ress[2].toNumber();
                  } 
            });
      } 


       // (uint256 idx) public constant returns (uint256 ICOFund, uint256 ICOPot)
       function GetICOData(ico_id)
       {
         rig_wars_contract.GetICOData.call(ico_id, {from:account},function(err,ress)
           {
             if(!err)
             {
              game.ico_data_fund = ress[0].toNumber();
              game.ico_data_pot = ress[1].toNumber();
              console.log("Ico data pot: "+game.ico_data_pot);
             } 
             else
             {
                 console.log(err);
             }
           });
 
       }
       /* GetMinerICOData(address miner, uint256 idx) public constant returns (uint256 ICOFund, uint256 ICOShare , uint256 lastClaimIndex)*/
       function GetMinerICOData(ico_id)
       {
         rig_wars_contract.GetMinerICOData.call(account, ico_id, {from:account},function(err,ress)
           {
             if(!err)
             {
                  if(typeof ress[0]  != 'undefined') 
                  {
                      game.ico_personal_fund = ress[0].toNumber();
                      game.ico_personal_share = ress[1].toNumber();
                      game.ico_personal_lastclaim = ress[2].toNumber();

                      console.log("ICO cycle: "+game.ico_cycle+"Last claim: "+game.ico_personal_lastclaim)

                      GetMinerUnclaimedICOShare();
                  }
             } 
             else
             {
                 console.log("No ico invested");
             }
           });
 
       }

       function GetMinerUnclaimedICOShare()
       {
         rig_wars_contract.GetMinerUnclaimedICOShare.call(account,{from:account},function(err,ress)
           {
             if(!err)
             {
             game.ico_unclaimed = ress;
             } 
             else
             {
             game.ico_unclaimed = 0;
             }
           });
 
       }


       function GetBoosterCount()
       {
         rig_wars_contract.GetBoosterCount.call({from:account},function(err,ress)
           {
             if(!err)
             {
                  for (let index = 0; index < ress.toNumber(); index++) 
                  {
                    GetBoosterData(index);   
                  }
             } 
             else
             {
                 console.log(err);
             }
           });
       }

      // GET BOOSTER INFOS
       function GetBoosterData(idx)
       {
         rig_wars_contract.GetBoosterData.call(idx,{from:account},function(err,ress)
           {
                game.boosterdata[idx] = {};


             if(!err)
             {
                  game.boosterdata[idx].rigIdx = ress[0];
                  game.boosterdata[idx].flatbonus = ress[1];
                  game.boosterdata[idx].ptcBonus = ress[2];
                  game.boosterdata[idx].currentPrice = ress[3];
                  game.boosterdata[idx].increasePct = ress[4];
                  game.boosterdata[idx].maxNumber = ress[5];
                  game.boosterdata[idx].locktime = ress[6].toNumber();

             } 
             else
             {
                 console.log(err);
             }
           });
       }

       function GetTotalRigCount()
       {
         rig_wars_contract.GetTotalRigCount.call({from:account},function(err,ress)
           {
             if(!err)
             {
                  for (let index = 0; index < ress.toNumber(); index++) 
                  {
                    GetRigData(index);   
                  }
             } 
             else
             {
                 console.log(err);
             }
           });
       }

      // GET BOOSTER INFOS
       function GetRigData(idx)
       {
         rig_wars_contract.GetRigData.call(idx,{from:account},function(err,ress)
           {
                game.rigdata[idx] = {};

                /* GetRigData(uint256 idx) public constant returns (uint256 _basePrice, uint256 _baseOutput, uint256 _unlockMultiplier)  */

             if(!err)
             {
                  game.rigdata[idx].basePrice = ress[0].toNumber();
                  game.rigdata[idx].baseOutput = ress[1].toNumber();
                  game.rigdata[idx].unlockMultiplier = ress[2].toNumber();
                  game.rigdata[idx].limit = 512;
                  game.rigdata[idx].locktime = ress[3].toNumber();
             } 
             else
             {
                 console.log(err);
             }

           });
       }



       function UnlockRig(data)
      {

         var str = data;
         var res = str.split("-", 3);
     
         let rigID = res[1];


        rig_wars_contract = web3.eth.contract(abi).at(contract_address);

        console.log(rigID);

        rig_wars_contract.UnlockRig.sendTransaction(rigID,{from:account,gasPrice: game.default_gas_price},function(err,ress)
        {
          waitForReceipt(ress, function (receipt) 
          {
            console.log('Force!');
            update_balance(1);
            contract_init();
          });  
        });

      }


      function buy_rig (rigID,count)
      {
         rigID = parseInt(rigID);
         count = parseInt(count);

        rig_wars_contract = web3.eth.contract(abi).at(contract_address);

        console.log(rigID,count);



        rig_wars_contract.UpgradeRig.sendTransaction(rigID,count,{from:account,gasPrice: game.default_gas_price},function(err,ress)
        {
          waitForReceipt(ress, function (receipt) 
          {
            console.log('Force!');
            update_balance(1);
            contract_init();
          });  
        });

      }


      // ICO

      function ReleaseICO()
      {
        rig_wars_contract = web3.eth.contract(abi).at(contract_address);

        rig_wars_contract.ReleaseICO.sendTransaction({from:account,gasPrice: game.default_gas_price},function(err,ress)
        {
          waitForReceipt(ress, function (receipt) 
          {
            console.log('Force!');
            update_balance(1);
            contract_init();
          });  
        });
      }

      function FundICO(amount)
      {
        rig_wars_contract = web3.eth.contract(abi).at(contract_address);

        rig_wars_contract.FundICO.sendTransaction(amount,{from:account,gasPrice: game.default_gas_price},function(err,ress)
        {
          waitForReceipt(ress, function (receipt) 
          {
            console.log('Force!');
            update_balance(1);
            contract_init();
          });  
        });
      }


      function WithdrawICOEarnings()
      {
        rig_wars_contract = web3.eth.contract(abi).at(contract_address);

        rig_wars_contract.WithdrawICOEarnings.sendTransaction({from:account,gasPrice: game.default_gas_price},function(err,ress)
        {
          waitForReceipt(ress, function (receipt) 
          {
            console.log('Force!');
            update_balance(1);
            contract_init();
          });  
        });
      }


      // WORK WELL v 2.0
      function buy_booster(data)
      {

        var str = data;
        var res = str.split("-", 3);
    
        let booster_id = res[1];

        let value = game.boosterdata[booster_id].currentPrice;


        rig_wars_contract = web3.eth.contract(abi).at(contract_address);


        rig_wars_contract.BuyBooster.sendTransaction(booster_id,{from:account, value: value,gasPrice: game.default_gas_price},function(err,ress)
        {
          waitForReceipt(ress, function (receipt) 
          {
            console.log('Force!');
            update_balance(1);
            contract_init();
          });  
        });

      }


      function buy_upgrade(id)
      {
           console.log(id);

          let boost_data = boostData[id];

        rig_wars_contract = web3.eth.contract(abi).at(contract_address);

          let value = web3.toWei(boost_data.price,'ether');

          console.log(value);

         rig_wars_contract.BuyUpgrade.sendTransaction(id,{from:account, value: web3.toWei(boost_data.price),gasPrice: game.default_gas_price},function(err,ress)
         {
           waitForReceipt(ress, function (receipt) 
           {
             console.log('Force!');
             update_balance(1);
             contract_init();
           });  
         });

      }


      function buy_prestige()
      {

        if(typeof web3.eth.accounts[0]  != 'undefined')
        {

          rig_wars_contract = web3.eth.contract(abi).at(contract_address);

          rig_wars_contract.PrestigeUp.sendTransaction({from:account,gasPrice: game.default_gas_price},function(err,ress)
          {
            waitForReceipt(ress, function (receipt) 
            {
              update_balance(1);
              contract_init();
            });  
          });
        }
        else // No Metamask Address Found!
        {
          $('#metamask_alert_message').html(gametext.error[1]);
          $('#metamask_alert').modal('show');
        }  
      }


  
    
      function ClaimPersonalShare()
      {
        if(typeof web3.eth.accounts[0]  != 'undefined')
        {

          rig_wars_contract = web3.eth.contract(abi).at(contract_address);

          rig_wars_contract.WithdrawPotShare.sendTransaction({from:account,gasPrice: game.default_gas_price},function(err,ress)
          {
            waitForReceipt(ress, function (receipt) 
            {
              console.log('Force!');
              update_balance(1);
              contract_init();
            });  
          });
        }
        else // No Metamask Address Found!
        {
          $('#metamask_alert_message').html(gametext.error[1]);
          $('#metamask_alert').modal('show');
        }  
      }



      // TESTED FINISHED!
      function GetTotalMinerCount(callback)
      {

        rig_wars_contract = web3.eth.contract(abi).at(contract_address);

          rig_wars_contract.GetTotalMinerCount.call({from:account},
          function (error, result) {
            if(!error)
                {
                  return callback(result.toString());
                } 
                else
                {
                    console.log(error);
                }
          }
        );
      };

      function GetMinerAt(id,callback)
      {

        rig_wars_contract = web3.eth.contract(abi).at(contract_address);

          rig_wars_contract.GetMinerAt.call(id,{from:account},
          function (error, result) {
            if(!error)
                {
                  return callback(result.toString());
                } 
                else
                {
                    console.log(error);
                }
          }
        );
      };

      function GetMinerData(address,callback)
        {

          rig_wars_contract = web3.eth.contract(abi).at(contract_address);

            rig_wars_contract.GetMinerData.call(address,{from:account},
            function (error, result) {
              if(!error)
                  {
                    return callback(result);
                  } 
                  else
                  {
                      console.log(error);
                  }
            }
          );
        };






function callback (error, result)
{
        if(!error)
        {
          console.log(result);
        } 
        else
        {
            console.log(error);
        }
};


function waitForReceipt(hash, callback) {
  web3.eth.getTransactionReceipt(hash, function (err, receipt) {
    if (err) {
      error(err);
    }

    if (receipt !== null) {
      // Transaction went through
      if (callback) {
        callback(receipt);
      }
    } else {
      // Try again in 1 second
      window.setTimeout(function () {
        waitForReceipt(hash, callback);
      }, 1000);
    }
  });
}

function toETH(number)
{
  return web3.fromWei(number,'ether');
}