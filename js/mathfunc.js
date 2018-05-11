

function buy_price(idx , owned, count) 
{
    basePrice = parseInt(game.rigdata[idx].basePrice);
    owned = parseInt(owned);
    count = parseInt(count);


    let price = 0;

    multiplier = 5;
    
    basePower = Math.floor(owned / multiplier);
    endPower = Math.floor((owned + count) / multiplier);
    
    price = (basePrice * (2**basePower) * multiplier) * ((2**((endPower-basePower)+1))-1);
    

    price = price - ((basePrice * 2**basePower) * (Math.floor(owned % multiplier)));
    price = price - ((basePrice * 2**endPower) * (multiplier - (Math.floor((owned + count) % multiplier))));

    return price; 
}


function buy_price_all(idx , owned, balance) 
    {
        // 100 means a really really big number!!!!!!! game.rigdata[idx].limit

        for (let index = 1; index < 102; index++)
        {
            
            price = buy_price(idx , owned, index);

            if(price > balance)
            {
              return index-1;
            }

            count = index;
        }

        return count-1;

    }












function limit_check(count,owned,limit)
{
    if(count+owned > limit)
    {
      count = limit-owned; 
    }

    return count;
}
