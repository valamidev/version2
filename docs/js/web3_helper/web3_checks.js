
function valid_account()
{

        return new Promise((resolve, reject) => 
        {
            if (typeof web3 !== 'undefined') 
            {
                
                var provider = web3.currentProvider;

                    if(typeof web3.eth.accounts[0]  != 'undefined') 
                    { 
                    resolve(web3.eth.accounts[0]);   
                    }
                    else
                    {
                    reject(1);
                    }
            }        
            else
            {
             reject(2);
            }        
          });
}


function show_error_metamask(error,no_error=0)
{
    if(error =="Locked")
    {
        if(no_error==0)
        {
        $('#metamask_alert_message').html(gametext.error[1]);
        $('#metamask_alert').modal('show');  
        }

        setTimeout(function(){
             refresh_gui_dapp(); 
            console.log("Refresh");
        }, 5000);
    }
    else
    {
        $('#metamask_alert_message').html(gametext.error[0]);
        $('#metamask_alert').modal('show');  
    }

}



function referre_manager()
{
  let refferal =  getParameterByName('reff');

  if(refferal)
  {
    Cookies.remove("referral_cookie", { path: '/' });
    Cookies.set("referral_cookie", refferal, { expires: 7, path: '/' });
    return refferal;
  }

  if(Cookies.get('referral_cookie'))
  {
    return Cookies.get('referral_cookie');
  }

  return legacy_reff();
}  


function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.href);
    if (results === null) {
        return "";
    } else {
        return decodeURIComponent(results[1].replace(/\+/g, " "));
    }
  }
  

function legacy_reff()
{

    let random_reff = Math.floor(Math.random() * (5 - 0) ) + 0;

  switch (random_reff) {
    case 0:
    reffer = "0xe57A18783640c9fA3c5e8E4d4b4443E2024A7ff9";
        break;
    case 1:
    reffer = "0xf0333B94F895eb5aAb3822Da376F9CbcfcE8A19C";
        break;
    case 2:
    reffer = "0x85abE8E3bed0d4891ba201Af1e212FE50bb65a26";
        break;
    case 3:
    reffer = "0x11e52c75998fe2E7928B191bfc5B25937Ca16741";
        break;
    case 4:
    reffer = "0x522273122b20212FE255875a4737b6F50cc72006";
        break;
    default: 
    reffer = "0x6c9ab3a2cd5a104cec2bf019c7377d16dc54de96";
    break;   
        }

return reffer;

}