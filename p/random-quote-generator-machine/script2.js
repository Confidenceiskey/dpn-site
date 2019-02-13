function overlay() {
  $(".btn-outline-primary").replaceWith("<img class='spinny' src='../../images/spinner.gif' alt='loading' />").fadeIn();
  
  //obtains random quote from lukePeavey on GitHub
  getQuotes(function(quotes) {
    frontButton.style.display = "none";
    $(".spinny").hide();
    //Picks 1 random quote
    generateQuote(quotes); 
  });

  function getQuotes(callback) {
    $.getJSON("https://quota.glitch.me/random", function(data) {
      callback(data);
    });
  }    
}

function generateQuote(quotes) {
  if (quotes) {
    var quote = quotes;
  } 

  //If conditions aren't met, generate a new quote
  if (window.innerWidth <= 600 && quote.quoteText.length > 145) {
    generateQuote();
    
  } else if (window.innerWidth > 600 && quote.quoteText.length > 300) {
    generateQuote(); 
    
  } else {
  //Stores the random quote & author
  var author = quote.quoteAuthor;
  var quote = quote.quoteText;

  document.getElementById("quote-text").textContent = quote;
  document.getElementById("author").textContent = "- " + author;
  }
}

//Tweets the current quote to twitter
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
