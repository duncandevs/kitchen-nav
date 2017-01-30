$(document).ready(function(){
  // RUBY DATA
var ingredients = rb_ingredients;
var steps = rb_steps;
var recipe_name = rb_recipe_name;
var owner_name = rb_owner_name;
var recipe_time = rb_recipe_time;
var recipe_serves = rb_recipe_serves;
const  INGREDIENTS = ingredients.split("#");
const  STEPS = steps.split("#");
// HTML ELEMENTS -- all elements used in file listed below
var $recipe_name = $(".recipe-name");
var $owner_name = $(".owner-name");
var $recipe_time = $(".recipe-time");
var $recipe_serves =$(".recipe-serves");
var $ingredients_list = $(".ingredients-list");
var $directions_list = $(".directions-list");
var $cooking_item = $(".cooking-item");
var $step_title = $("#step-title");
var $timer_wrap= $(".timer-wrap");
var $directions_next_nav = $(".directions-next-nav");
var $directions_back_nav = $(".directions-back-nav");
var $cooking_container = $(".cooking-container");
var $startcooking = $(".startcooking");
var $directions_container = $(".directions-container");
//TIPS RESOURCES ------------------------------------------------------------------------------------------->
var tips = [
            ["onion",[
                       ["how to cut an onion?","dCGS067s0zo"],
                       ["how to caramilize onions?","s5cNd4IYg2A"]
                      ]
            ],
            ["chicken",[
                       ["how to choose the best chicken?","lZPpx0aUblA"],
                       ["how to Break Down a Whole Chicken?","dp3e7b_hfxY"]
                      ]
            ],
            ["steak",[
                      ["how to season a steak?","pNNI3VAzfC8"],
                      ["how to cook the perfect steak?","AmC9SmCBUj4"],
                      ["worst mistake when cooking steak!","2ua_v4BA3qM"]
                     ]
            ],
            ["pasta",[
                      ["how to cook the perfect pasta","UYhKDweME3A"]
                     ]
            ]
          ];
var tips_cover = ["onions","chicken","steak","pasta"];
var tips_in_recipe = sharedElements(tips_cover,INGREDIENTS);
displayTips(tips,tips_in_recipe)
function displayTips(tips,tips_in_recipe){
  tipsButton();
  if(tips_in_recipe.length == 0){
    // display no tips
    $(".tips-show").hide();
  } else {
    for(var i = 0; i < tips.length; i++){
      var $tips_ingredients_item = document.createElement("li");

      if(tips_in_recipe.includes(tips[i][0])){
        var tips_content_array = tips[i][1];
        var tip_title = tips[i][0].toLowerCase();
        $tips_ingredients_item.innerHTML = tip_title;
        $tips_ingredients_item.id = tip_title;
        $tips_ingredients_item.className = "tips-ingredients-item list-group-item";
        $(".tips-ingredients").append($tips_ingredients_item);

        for(var j = 0; j < tips_content_array.length; j++){
          var $tips_content_item = document.createElement("li");
          var tips_videoid = tips_content_array[j][1];

          $tips_content_item.className = "tips-content-item " + tip_title;
          $tips_content_item.setAttribute("url",`${tips_videoid}`);
          $tips_content_item.innerHTML = tips_content_array[j][0].toLowerCase();
          $(".tips-content").append($tips_content_item);
        }
      }
    }
    $("iframe").attr("src","http://www.youtube.com/embed/"+tips_content_array[0][1]);
    dispTipsVideo();
  }//end else
}//end function
function dispTipsVideo(){
  $(".tips-content-item").click(function(){
    var videoid = $(this).attr("url");
    var url = "http://www.youtube.com/embed/"+videoid+"?autoplay=1";
    $("iframe").attr("src",url);
  })
}
//INGREDIENTS ---------------------------------------------------------------------------------------------->
displayIngredients(INGREDIENTS);
displayRecipeTitle(recipe_name,owner_name,recipe_time,recipe_serves);
displayDirections(STEPS);

function displayIngredients(array){
  $.each(array,function(i,val){
    var li = document.createElement("li");
    li.className = "ingredients-list-item";
    li.innerHTML = val;
    $ingredients_list.append(li);
  })
}

function displayRecipeTitle(recipe_name,owner_name,recipe_time,recipe_serves){
  $recipe_name.html(recipe_name);
  $owner_name.html(owner_name);
  $recipe_time.html(recipe_time);
  $recipe_serves.html(recipe_serves);
}
//DIRECTIONS LIST ----------------------------------------------------------------------------------------->
function displayDirections(array){
  $.each(array,function(i,val){
    var li = document.createElement("li");
    li.className = "directions-list-item";
    li.innerHTML = val;
    $directions_list.append(li);
  })
}
// DIRECTIONS COOKING-------------------------------------------------------------------------------------->
var token = 0;
directionsNav(STEPS,token);

function directionsNav(STEPS,token){
  var array_ingredients = splitToSingleItems(INGREDIENTS);
  var array_directions = splitToSingleItems(STEPS[token].split(" "));
  $cooking_item.html("");
  printDirections(array_directions,array_ingredients,$cooking_item,"highlight");

  $step_title.html("STEP 1");
  $directions_next_nav.click(function(){
    if(token < STEPS.length-1){
      token += 1;
      var step_title = token+1;
      displayStep(STEPS,step_title)
    }
  });
   $directions_back_nav.click(function(){
    if(token > 0){
      token -= 1;
      var step_title = token+1;
      displayStep(STEPS,step_title)
    }
  });

  function displayStep(STEPS,step_title){
    var $timer_wrap = document.createElement('div');
    $timer_wrap.innerHTML = "";
    var time = STEPS[token];
    var array_ingredients = splitToSingleItems(INGREDIENTS);
    var array_directions = splitToSingleItems(STEPS[token].split(" "));

    $cooking_item.html("");
    printDirections(array_directions,array_ingredients,$cooking_item,"highlight");
    //$cooking_item.html(STEPS[token][0]);
    $step_title.html("STEP "+ step_title);
    if(time > 0){
      timer(time);
    }
  }
}//end directions nav function

// HELPER FUNCTIONS ------------------------------------------------------------------------------------------------->
function splitToSingleItems(array){
  var result = [];
  for(var i = 0; i < array.length; i++){
    var split = array[i].split(" ");
    for(var j = 0; j < split.length; j++){
      var cleanstring = split[j].replace(/[^\w\s]/gi, '');
      result.push(cleanstring);
    }
  }
  return result;
}
function sharedElements(array_base,array_check){
  //pass array of ingredients
  var check_this_arr = splitToSingleItems(array_check);
  var result = [];
  for(var i = 0; i < check_this_arr.length; i++){
    var element = check_this_arr[i];
    if(array_base.includes(element) && !result.includes(element)){
     result.push(element);
    }
  }
  return result;
}
function printDirections(array_directions,array_ingredients,$span_parent,span_name){
  for(var i = 0; i < array_directions.length; i++){
    var word = array_directions[i];
    var $word = document.createElement('span');

    $word.id = "word#"+i;
    $word.className = "cooking-item-word";
    $word.innerHTML =word + " ";
    if(array_ingredients.includes(word)){
      $word.className = "cooking-item-word "+span_name;
    }
    $span_parent.append($word);
  }
}
function timer(time){
  var $timer = document.createElement('div');
  var $start_timer = document.createElement('div');
  $timer_wrap.className = "timer-wrap";
  $timer.className = "timer";
  $start_timer.className = "start-timer"
  $start_timer.innerHTML = "START TIMER";
  $timer.innerHTML = time;
  $timer_wrap.append($timer);
  $timer_wrap.append($start_timer);
  $step_title.after($timer_wrap);
}
//click to start cooking
$cooking_container.css("display","none");
$startcooking.click(function(){
  $directions_container.css("display","none");
  $cooking_container.css("display","");
})
})
function tipsButton(){
  $('.tips-wrap').hide();
  $(".tips-show").click(function(){
    $( '.tips-wrap' ).show( 'slow' );
    $('.tips-show').hide('slow');
  })
  $(".tips-hide").click(function(){
    var videoid = $( ".tips-content-item" ).first().attr("url");
    $('.tips-wrap').hide('slow');
    $('.tips-show').show('slow');
    $("iframe").attr("src","").attr("src","http://www.youtube.com/embed/"+videoid);
  })
}
