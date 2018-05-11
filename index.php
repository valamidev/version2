<!DOCTYPE html>
<html>
    <head>
        <title>RigWars.io v2 | ETH Idle Game</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="Ethereum Idle game with daily 20% ETH dividens!"/>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js" ></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" ></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" ></script>
        <script defer src="https://use.fontawesome.com/releases/v5.0.10/js/all.js" integrity="sha384-slN8GvtUJGnv6ca26v8EzVaR9DC58QEwsIk9q1QXdCU8Yu8ck/tL/5szYlBbqmS+" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-slider/10.0.0/bootstrap-slider.min.js" ></script>
        <script src="https://cdn.jsdelivr.net/npm/js-cookie@2/src/js.cookie.min.js"></script>
        <script src="https://cdn.jsdelivr.net/gh/ethereum/web3.js/dist/web3.min.js"></script>

        <script src="./js/constants/game_constant.js" ></script>
        <script src="./js/web3_helper/web3_checks.js" ></script>
        <script src="./js/contract/abi.js" ></script>
        <script src="./js/mathfunc.js" ></script>
        <script src="./js/game.js" ></script>
        <script src="./js/eth_magic.js" ></script>
        <script src="./js/buttons.js" ></script>
        <script src="./js/draw_content.js" ></script>
        
        

        <link rel="stylesheet" href="./css/style.css">    
            
    </head>
    <body>
      
  
<header>
      <div class="collapse bg-dark" id="navbarHeader">
        <div class="container">
          <div class="row">
            <div class="col-sm-8 col-md-7 py-4">
              <h4 class="text-white">About</h4>
              <p class="text-muted">RigWars ETH based Idle game about the life of the miners, catch the Algorithms and buy more Hash power to make a better future.</p>
            </div>
            <div class="col-sm-4 offset-md-1 py-4">
              <h4 class="text-white">Contact</h4>
              <ul class="list-unstyled">
                <li><a href="https://discord.gg/VtuT96Q" class="text-white">Discord</a></li>
                <li><a href="https://www.reddit.com/r/rigwars/" class="text-white">Check us on Reddit</a></li>
                <li><a href="https://medium.com/@CoinDealShip/play-rigwars-free-idle-game-try-yourself-in-virtual-mining-earn-real-eth-84fb62962a0d" class="text-white">How to play Guide</a></li>
                <li><a href="https://etherscan.io/address/0xd731c88890ca047cd1bed2e6ea1562c7a425c29d" class="text-white">Contract(Etherscan)</a></li>
                <li><a href="https://github.com/rigwars/rigwars" class="text-white">Github</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="navbar navbar-dark bg-dark box-shadow">
        <div class="container d-flex justify-content-between">
          <a href="#" class="navbar-brand d-flex align-items-center">
             <span class="logo">  <i class="fas fa-server"></i>  </span> 
            <strong> RigWars ETH Idle Game</strong>
          </a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>
      </div>
    </header>

    <main role="main">

     <div class="container">

                <div class="row">
                  <div class="minestat col-8">
                     <div class="mining-anim">
                      <div class="console-text">
                        
                      </div>
                      <div class="mining-text">
                        <table class="dos-mining" >
                          <tr>
                            <td>Prestige Level</td>
                            <td>Accepted speed</td>
                            <td>Profitability</td>
                            <td>Total Balance</td>
                          </tr> 
                          <tr>
                            <td id="prestigelevel" >0</td>
                            <td id="prodPerSec">N/A Hash/s </td>
                            <td id="prodPerDay">N/A /day</td>
                            <td id="balance">N/A</td>
                          </tr> 
                          <tr>
                            <td id="nextlevelprestige" >Next level: -</td>
                            <td ></td>
                            <td></td>
                            <td ></td>
                          </tr>
                        </table>
                      </div>

                      <div class="static-anim">
                        <div class="network-stat">* RigWars Network *
                          <ul class="">
                            <li id="networkhodl" class="">Total Open Supply: </li>
                            <li id="networkpot" class="">Network HODL: N/A <i class="fab fa-ethereum"></i></li>
                            <li id="networkhash" class="">Network hash: 0 Hash/s </li>
                            <li id="unclaimedpot" class="">Your contract balance: Less than 0.001 <i class="fab fa-ethereum"></i></li>
                            <li id="unclaimedICO" class="">Unclaimed ICO <i class="fab fa-ethereum"></i></li>
                          </ul>
                        </div>
                        <div class="pvp-stat">
                             <button type="button" style="display: none;" id="debug_prestige" class="btn btn-secondary btn-lg btn-console beauty_button_big">Upgrade Prestige</button>
                             <button type="button" id="start" class="btn btn-success btn-lg beauty_button beauty_button_big">Start game</button>
                            <button type="button" id="claim_ico_share" class="btn btn-outline-success btn-lg beauty_button_big">Claim ICO Share</button>
                            <button type="button" id="withdraw1" class="btn btn-outline-warning btn-lg beauty_button_big">Withdraw <i class="fab fa-ethereum"></i></button>
                        </div> 
        
                      </div>

                     </div>

                     <br> 

                     
                    <!-- Market Selector
                    <div class="market_buttons">
                    <button type="button" id="showrig"  class="btn btn-outline-primary">Mining equipments</button>      
                    <button type="button" id="showarmy" class="btn btn-outline-primary">Hacking equipments</button>
                    </div>
                     Market Selector -->        

                    
                  </div>
                                 <div  class="col-4">
                                      <div class="ico_box">
                                          <h5>ICO of the day:</h5>
                                          <h6>Daily SALE is live, ends in</h6>
                                          <span class="ico_countdown">-:-:-</span>
                                                <div class="pull-mid">
                                                              <button type="button"  style="display: none" class="btn btn-danger ico-buy-button">Buy ICO</button>
                                                              <button type="button" id="debug_newico" style="display: none" class="btn btn btn-outline-warning">Release New ICO</button>

                                                              <div class="slidecontainer">
                                                                  <input type="range" min="1" max="100" value="1" class="slider" id="myRange">
                                                                <div id="left_pct">1%</div><div id="demo">-</div><div id="right_pct">100%</div>


                                                                </div>
                                                </div>

                                                                    
                                          <div class="ico_pot">n/a Token</div>
                                          <div class="ico_pot_under">Total investment<span id="ico_by_you"></span></div>  

                                          <div class="ico_pot_eth">ICO pot equals: n/a <i class="fab fa-ethereum"></i></div> 
                                          <div class="ico_pot_yours">Your investment so far: n/a<i class="fab fa-ethereum"></i></div> 
                                      </div>
                                
                                      <div class="divider_small"></div>
                                      <button type="button" id="leaderboard" class="btn btn-outline-info btn-lg btn-block beauty_button_big">Leaderboard</button>
                                      <div class="divider_small"></div>
                                      <a  href="https://discord.gg/P3Vkqjc" target="_blank" class="btn btn-outline-info btn-lg btn-block beauty_button_big">Discord Chat</a>

                                      <debug id="debug">
                                      <div class="divider_small"></div>
                                      <button type="button" id="debug_money" class="btn btn-secondary btn-lg btn-block beauty_button_big">Debug money</button>
                                    </debug>   

                                    </div>
                </div>
              </div>   

        
    <section class="marketplace">      
       <div class="container">

        <div class="row">
        <div class="col-8"> 
              <div class="row">    

              <!-- RIG ITEMS -->
              <?php include_once "generator.php"; ?>
              <!-- RIG ITEMS -->     


            </div>  
      </div>    
    <!-- Cards End --> 
    <!-- UPGRADES -->
    <div class="col-4">    

        <!-- BOOSTER-->
              <div class="card" style="width: 16rem; display: none;" data-card="4-0-1"> <!-- Data: category,id,count, -->
                <img class="card-img-top" data-booster-image="4-0-1" src="" >
                <div class="card-body">
                <h5 class="card-title" data-booster-name="4-0-1"></h5>
                <h6 class="card-subtitle mb-2 text-muted" data-booster-desc="4-0-1"></h6>
                  <p class="card-text" >
                  <span data-booster-spec="4-0-1"></span>
                    <br>
                  <span data-booster-cost="4-0-1"></span>
                  </p>
                    <div class="input-group">
                        <button type="button" data-booster-button="0" style="display: none" class="buy_booster btn btn-success beauty_button_big">Buy!</button>
                        <button type="button" data-booster-own-button="0" style="display: none" class="btn btn btn-outline-success beauty_button_big">Owned</button>
                    </div>
                </div>
            </div>


            <div class="card" style="width: 16rem; display: none;" data-card="4-1-1"> <!-- Data: category,id,count, -->
                <img class="card-img-top" data-booster-image="4-1-1" src="" >
                <div class="card-body">
                <h5 class="card-title" data-booster-name="4-1-1"></h5>
                <h6 class="card-subtitle mb-2 text-muted" data-booster-desc="4-1-1"></h6>
                  <p class="card-text" >
                  <span data-booster-spec="4-1-1"></span>
                    <br>
                  <span data-booster-cost="4-1-1"></span>
                  </p>
                    <div class="input-group">
                        <button type="button" data-booster-button="1" style="display: none" class="buy_booster btn btn-success beauty_button_big">Buy!</button>
                        <button type="button" data-booster-own-button="1" style="display: none" class="btn btn btn-outline-success beauty_button_big">Owned</button>
                    </div>
                </div>
            </div>

      <!-- BOOSTER -->
        
      </div>

            </div>
      </div>
   </section>

    </main>

    <div id="metamask_alert" class="modal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Metamask Alert!</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div id="metamask_alert_message" class="modal-body">
            <p>Please install or activate your Metamask Plugin in your browser. <br> You can't play RigWars without Metamask installed.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>


    <div id="leaderboard_modal" class="modal" tabindex="-1" role="dialog">
        <div class="modal-dialog leaderboard" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Leaderboard</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div  class="modal-body">
              <table class="table table-borderless">
                  <thead>
                    <tr>
                      <th>Address</th>
                      <th>Prestige</th>
                      <th>Balance</th>
                    </tr>
                  </thead>
                  <tbody id="leaderboard_modal_content">
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  </tbody>  
              </table>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>



    <footer class="text-muted">
      <div class="container">
        <p class="float-right">
          <a href="#">Back to top</a>
        </p>
        <p>Just a game! <span id="reflink"></span>  </p>
      </div>
    </footer>




    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->


    </body>
</html>
