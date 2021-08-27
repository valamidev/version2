


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

     return "0x23034CA985A6D46f41C94BD7498e4d4D4a72816b";

}