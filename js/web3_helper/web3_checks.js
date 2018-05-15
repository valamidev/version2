
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

  return "0x6C9ab3a2Cd5A104CeC2bf019C7377d16dC54De96";
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
  