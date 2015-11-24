/*!
 * matching-game
 * 
 * 
 * @author Steve Yawan
 * @version 1.0.0
 * Copyright 2015. ISC licensed.
 */

$( document ).ready(function() {
  var newGame = $('#new-game');
  var quitGame = $('.quit-btn');
  var mainTiles = $('main');
  var tilesMatched = 0;
  var numRows = 4;
  var numCols = 4;
  var numPairs = 8;
  var difficultySetting = $('#difficulty-setting');
  var difficulty = $('#difficulty-setting').val();
  var tile = $('.table-view');

  var tilesClicked = 0;
  var matchedPair = '';

  var finalOutput = '';

  var tileCounterDisplay = $('.steps-taken');
  var tileMatchesDisplay = $('.number-of-matches');

  var tilesFlipped = 0;

  var matchedTiles = [];
  var activeTiles = 0;
  var activeTile = [];

  function resetAll(){
    tilesFlipped = 0;
    tilesMatched = 0;
    tilesClicked = 0;
    matchedTiles = [];
    activeTiles = 0;
    activeTile = [];

    //Reset tile flip counter
    tileCounterDisplay.html(tilesFlipped);
    tileCounterDisplay.attr('data-moves', tilesFlipped);

    //Reset tile flip counter
    tileMatchesDisplay.html('<span class="number-of-matches"> '+tilesMatched+'</span>');

    matchedTiles = [];
    activeTiles = 0;
    activeTile = [];
  }

  function checkMatching(){
      activeTiles = 0;

      //COUNT THE NUMBER OF ACTIVE TILES
      for( var i = 0; i <= (numPairs*2) ; i++ ) {
        if($('.tile_'+i).hasClass('active')) {
          activeTiles += 1;
        }
      }

      if(activeTiles === 1){
        //do nothing
      } else if(activeTiles === 2) {
        for( i = 0; i <= (numPairs*2) ; i++ ) {
          if($('.tile_'+i).hasClass('active')) {
            activeTile.push($('.tile_'+i).attr("class").match(/(pair_.*?)(?:\s+|$)/)[1]);
          }
        }
         //check if the 2 active tiles are matching
        if(activeTile[0]===activeTile[1]) {

          //add name of matching pair into global variable
          matchedTiles.push(activeTile[0]);

          //add 'matched' class to matched items
          $('.'+activeTile[0]).addClass('matched');
          $('.'+activeTile[1]).addClass('matched');
          activeTiles = 0;
          activeTile = [];
          unflipExceptMatched();
        } else { //if they don't match
          unflipExceptMatched();
          activeTiles = 0;
          activeTile = [];
        }

      }
    }

    function alreadyMatched() {

      for( var i = 0; i <= (numPairs*2) ; i++ ) {
        if($('.tile_'+i).hasClass('matched')) {
          //$('.tile_'+i).css('background-image','url("assets/img/superheroes/pair_'+i+'.gif")');
          matchedPair = $('.tile_'+i).attr("class").match(/(pair_.*?)(?:\s+|$)/)[1];
          $('.tile_'+i).css('background-image','url("assets/img/superheroes/'+matchedPair+'.gif")');
          $('.tile_'+i).removeClass('active');
        }
      }
    }

    function unflipExceptMatched() {


      for( var i = 0; i <= (numPairs*2) ; i++ ) {
        if($('.tile_'+i).hasClass('matched')) {
          matchedPair = $('.tile_'+i).attr("class").match(/(pair_.*?)(?:\s+|$)/)[1];
          $('.tile_'+i).css('background-image','url("assets/img/superheroes/'+matchedPair+'.gif")');
          $('.tile').removeClass('active');
        }else {
           $('.tile_'+i).animate({opacity: 0}, 'slow', function() {
            $(this)
              .css({'background-image': 'url("assets/img/marvel-shield.svg")'})
              .animate({opacity: 1});
          });
          $('.tile_'+i).removeClass('active');
          $('.tile').removeClass('active');
        }
      }
    }

    function displayMatched() {
      tilesMatched = 0;
      for( var i = 0; i <= (numPairs*2) ; i++ ) {
        if($('.tile_'+i).hasClass('matched')) {
          //$('.tile_'+i).css('background-image','url("assets/img/superheroes/pair_'+i+'.gif")');
          tilesMatched +=1;
          tileMatchesDisplay.html('<span class="number-of-matches"> '+(tilesMatched/2)+'</span>');
        }
      }
    }

    function revealTiles(){
      for( var i = 0; i <= (numPairs*2) ; i++ ) {
        $('.pair_'+i).css('background-image','url("assets/img/superheroes/pair_'+i+'.gif")');
      }
    }

  function resetTiles(){
    if(difficulty==='Tough'){
      numRows = 6;
      numCols = 5;
      numPairs = 15;
    }else if(difficulty==='Normal') {
      numRows = 5;
      numCols = 4;
      numPairs = 12;
    }else {
      numRows = 4;
      numCols = 4;
      numPairs = 8;
    }

     tilesClicked = 0;
     matchedTiles = [];
     activeTiles = 0;
     activeTile = [];

    // console.log(difficulty);
    mainTiles.removeClass('Easy');
    mainTiles.removeClass('Normal');
    mainTiles.removeClass('Tough');
    mainTiles.addClass(difficulty);

    resetAll();

    deck = buildTiles(numPairs);
    deck = shuffleTiles(deck);
    buildCards(deck);
  }

  function buildTiles(numPairs) {
    var deck = [];
    for(var i = 1; i <= numPairs; i++){
      deck.push(i,i);
    }
    return deck;
  }

  function shuffleTiles(deck) {
    var rand, shuffled = [];
    // Randomly access each pair in the given deck and add it to the resulting
    // shuffled deck
    while(deck.length > 0){
      rand = Math.random() * deck.length ;
      shuffled.push(deck.splice(rand, 1)[0]);
    }
    return shuffled;
  }

  function buildCards(deck) {

    var counter = 0;
    finalOutput = '';
    tile.html(finalOutput);
    for(var c=0; c<numCols; c++) {
      finalOutput+='<ul class="col_'+c+'"></ul>';
      for(var r=0; r<numRows; r++) {
        finalOutput+='<li class="tile tile_'+counter+' pair_'+deck[counter]+'"><a href="#" id="tile">'+deck[counter]+'</a></li>';
        counter++;
      }
    }
    tile.html(finalOutput);
    for(i=0;i<(numCols*numRows);i++){
      $('pair_'+i).css({'background-image': 'url("assets/img/marvel-shield.svg")'});
    }
  }


  newGame.click(function(){
    resetAll();
    difficulty = $('select').val();
    resetTiles();
  });

  quitGame.click(function(){
    resetAll();
    difficulty = $('select').val();
    revealTiles();
    difficultySetting.removeClass('disabled');
    difficultySetting.attr('disabled',false);
  });

  tile.on('click', '.tile', function(){

    //capture this click, add an active class to the tile
    $(this).addClass('active');
    tilesFlipped += 1;

    //display this in the click counter
    tileCounterDisplay.html('&nbsp;'+tilesFlipped);
    tileCounterDisplay.data('moves',tilesFlipped);
    tileCounterDisplay.attr('data-moves', tilesFlipped);

    activeTiles += 1;

    var pairName = $(this).attr("class").match(/(pair_.*?)(?:\s+|$)/)[1];
    $(this).css('background-image','url("assets/img/superheroes/'+pairName+'.gif")');

    tilesClicked = tileCounterDisplay.data('moves');

    //disable difficulty setting
    difficultySetting.addClass('disabled');
    difficultySetting.attr('disabled', true);

    checkMatching();
    alreadyMatched();
    displayMatched();

  });
  // Initialize array, shuffle and then display in the table-view
  var deck = buildTiles(numPairs);
  deck = shuffleTiles(deck);
  buildCards(deck);
});
