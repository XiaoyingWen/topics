
//buttons to display upon page loaded
var friends =[
  'mickey mouse',
  'minnie mouse',
  'donald duck',
  'daisy duck',
  'goofy',
  'pluto',
  "elmo"
]


function addBtnClickListener(){
  $('#buttons').on("click", "button", function() {
      //$("button").on("click", function() {  this won't work for the newly added button
      //get the name of the button clicked
      var kidfriend = $(this).attr("data-kidfriend");

      //generate the API url for the search with 10 matched records
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
          kidfriend + "&api_key=dc6zaTOxFJmzC&limit=10";

      //make the call
      $.ajax({
          url: queryURL,
          method: "GET"
        })
        .done(function(response) {
          //erase the existing images
          $("#giphy-imgs").empty();

          //get the images information from the response
          var results = response.data;

          //for each search result record, generate the img element with 
          //the attributes for stop/start the animation
          for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div class='item'>");
            var rating = results[i].rating;
            var p = $("<p>").text("Rating: " + rating);

            var kidfriendImage = $("<img>");
            kidfriendImage.attr("src", results[i].images.fixed_height_still.url);
            kidfriendImage.attr("data-still", results[i].images.fixed_height_still.url);
            kidfriendImage.attr("data-animate", results[i].images.fixed_height.url);
            kidfriendImage.attr("data-state", "still");
            kidfriendImage.attr("class", "gif");

            gifDiv.prepend(p);
            gifDiv.prepend(kidfriendImage);

            //add the newly created img element to div giphy-imgs
            $("#giphy-imgs").prepend(gifDiv);
          }
        });
  });
}

function addSubmitListener(){
  //disable the default submit button function so onclick would work
  $("form").submit(function( event ) {
    event.preventDefault();
  });

  //add new button upon clicking Submit button
  $("#add-kidfriend").on("click", function() {
       var newfriend = $("#kidfriend-to-add").val().trim();
       console.log(newfriend);
       if(newfriend.length>0) {
         addGitButton(newfriend);
       }
  });
}

function addGitButton(name){
    var buttonToAdd = $("<button>");
    buttonToAdd.attr("type", "button");
    buttonToAdd.attr("class", "btn btn-info");
    buttonToAdd.attr("data-kidfriend", name);
    buttonToAdd.append(name);
    $("#buttons").append(buttonToAdd);
}

// add the function to the images so that 
// click on the image to activate animation
// Then click again to pause.   $(".gif").on("click", function() {}
function addImglickListener(){
  $('#giphy-imgs').on("click", ".gif", function() {
      // make a variable named state and then store the image's data-state into it.
      var imgState = $(this).attr("data-state"); 

      // Check if the variable state is equal to 'still',
      // then update the src attribute of this image to it's data-animate value,
      // and update the data-state attribute to 'animate'.
      if(imgState === 'still'){
        $(this).attr("src", $(this).attr('data-animate'));
        $(this).attr("data-state", 'animate');
      }
      // If state does not equal 'still', then update the src attribute of this
      // image to it's data-still value and update the data-state attribute to 'still'
      else{
        $(this).attr("src", $(this).attr('data-still'));
        $(this).attr("data-state", 'still');
      }
  });
}

$(document).ready(function(){
  $("#buttons").empty();
  // display the buttons
  $.each(friends, function(index, value){
    addGitButton(value);
  });

  //add 
  addBtnClickListener();
  addSubmitListener();
  addImglickListener();
});
