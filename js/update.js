

/*AddNewPrestige(uint256 idx, uint256 _price, uint256 _bonusPct)*/

function AddNewPrestige()
{
     idx = 0;   
     price = 10000000;
     bonuspct = 50;

    rig_wars_contract = web3.eth.contract(abi).at(contract_address);

        rig_wars_contract.AddNewPrestige.sendTransaction(idx,price,bonuspct,{from:account,gasPrice: game.default_gas_price},function(err,ress)
        {
          waitForReceipt(ress, function (receipt) 
          {
            console.log('Force!');
            update_balance(1);
            contract_init();
          });  
        });

}



/*AddorModifyRig(uint256 idx, uint256 _basePrice, uint256 _baseOutput, uint256 _unlockMultiplier)*/



function AddorModifyRig()
{
     idx = 0;   
     price = 2500000000000;
     basehashrate = 1500000;
     multiplier = 1;

    rig_wars_contract = web3.eth.contract(abi).at(contract_address);

        rig_wars_contract.AddorModifyRig.sendTransaction(idx,price,basehashrate,multiplier,{from:account,gasPrice: game.default_gas_price},function(err,ress)
        {
          waitForReceipt(ress, function (receipt) 
          {
            console.log('Force!');
            update_balance(1);
            contract_init();
          });  
        });

}

/*AddNewBooster(uint256 idx, int256 _rigType, uint256 _flatBonus, uint256 _pctBonus, 
  uint256 _ETHPrice, uint256 _priceIncreasePct, uint256 _totalCount)*/

  function AddNewBooster()
{


  
          idx = 1;   
          rigType = 0;
          flatBonus = 0; // flat modifier adds +10 hash/s per rig
          pctBonus = 1000; // percent modifier adds +10% hash/s per rig
          ETHPrice = 10000000000000000; // WEI 0.01 ETH
          priceIncreasePct = 3;
          totalCount = 10;


         console.log(toETH(ETHPrice));

  rig_wars_contract = web3.eth.contract(abi).at(contract_address);

        rig_wars_contract.AddNewBooster.sendTransaction(idx,rigType,flatBonus,pctBonus,ETHPrice,priceIncreasePct,totalCount,{from:account,gasPrice: game.default_gas_price},function(err,ress)
        {
          waitForReceipt(ress, function (receipt) 
          {
            console.log('Force!');
            update_balance(1);
            contract_init();
          });  
        });

}