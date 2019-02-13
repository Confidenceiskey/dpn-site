function overlay() {
  $(".btn-outline-primary").replaceWith("<div><img class='spinny' src='../../images/spinner.gif' alt='loading' /><h3>API is currently broken</h3></div>").fadeIn();
  
  //obtains 100 random quotes from talaikis
  getQuotes(function(quotes) {
    frontButton.style.display = "none";
    $(".spinny").hide();
    //Picks 1 random quote from list of 100 
    generateQuote(quotes); 
  });

  function getQuotes(callback) {
    $.getJSON("https://talaikis.com/api/quotes/", function(data) {
      callback(data);
    });
  }    
}

function generateQuote(quotes) {
  if (quotes && quotes.length === 100) {
    var hundredQuotes = quotes;
    
    //Stores 100 quotes locally
    localStorage.setItem('myStorage', JSON.stringify(hundredQuotes));
  } 
  //Calc random number between 0-99
  var randomNumber = Math.floor(Math.random() * 100);
  
  //Retrieve locally stored quotes 
  var hundredQuotes = JSON.parse(localStorage.getItem('myStorage'));
  
  //If conditions aren't met, generate new quote
  if (window.innerWidth <= 600 && hundredQuotes[randomNumber].quote.length > 145) {
    generateQuote();
    
  } else if (window.innerWidth > 600 && hundredQuotes[randomNumber].quote.length > 300) {
    generateQuote(); 
    
  } else {
  //Obtain the random quote & author from list of 100 quotes
  var author = hundredQuotes[randomNumber].author;
  var quote = hundredQuotes[randomNumber].quote;

  document.getElementById("quote-text").textContent = quote;
  document.getElementById("author").textContent = "- " + author;
  }
}

function tweetQuote() {
  var quote = document.getElementById("quote-text").textContent;
  var author = document.getElementById("author").textContent
  var tweetUrl = "https://twitter.com/intent/tweet?text="+ '"' + quote + '" ' + author + ". Coded" + "&via=davidpnowak";
  document.getElementById("tweetUrl").setAttribute("href", tweetUrl);
}

//Add event listener for initial button click (Get Quote)
var frontButton = document.getElementById("initial-prop");
frontButton.addEventListener("click", overlay, false)

//Add event listener for 'get a new quote' button click
var newQuote = document.getElementById("new-quote");
newQuote.addEventListener("click", generateQuote, false);

//Add event listener for 'tweeting' click
var tweet = document.getElementById("twitter-share");
tweet.addEventListener("click", tweetQuote, false);
