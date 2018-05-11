

/*AddNewPrestige(uint256 idx, uint256 _price, uint256 _bonusPct)*/

function AddNewPrestige()
{
     idx = 4;   
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