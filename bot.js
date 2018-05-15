console.log('I am GOD');

console.log('the bot is starting!');
var Twit = require('twit');
var config = require('./config.js');
var T = new Twit({
	consumer_key:		'LGBWvWoy0D6EaMg8rm3qTo48I',
	consumer_secret:	'TSRbDWdd4d73WZRRiiAt45BcCTczJ4CQWi9rXiLt5Ufg5oNGpB',
	access_token:		'992828160474583040-vZXMyDi7KnF1kQlcjgaAVvuMutOhet4',
	access_token_secret:	'bi1vw9emzWV0jEXRo66sUIs6X5HRk9p1JTZn5EcUwMDqi'

});

//var T = new Twit({
//    consumer_key: process.env.TWITTER_CONSUMER_KEY,
//    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
//    access_token: process.env.TWITTER_ACCESS_TOKEN,
//    access_token_secret: process.env.TWITTER_ACCESS_SECRET
//});
var params = 
	{ q: 'glauniversity', count: 15 };

T.get('search/tweets', params, gotData);

function gotData(err, data, responce){
	var tweets = data.statuses;
	for(var i = 0; i < tweets.length; i++){
		console.log(tweets[i].text);	
	}
	
 };

//--------------- This is part of POST() Below -------------------

var tweet = {
	status: '#glauniversity from GLAU this is the BOT of GLA.'
}

T.post('statuses/update', tweet, tweeted);

function tweeted(err, data, responce){
	if(err){
		console.log("Something went Wrong!");
	}
	else{
		console.log("Worked!");	
	}
	
}
//============================--------------=================

var stream = T.stream('user');

// Anytime someone follows me
stream.on('follow', followed);

// Just looking at the event but I could tweet back!
function followed(event) {
  var name = event.source.name;
  var screenName = event.source.screen_name;
  console.log('I was followed by: ' + name + ' @' + screenName);
  var toooo = 'GLAU is now followed by: ' + name + ' @' + screenName;
  tweetIt(toooo);
}

// Now looking for tweet events
// See: https://dev.twitter.com/streaming/userstreams
// stream.on('tweet', tweetEvent);

// // Here a tweet event is triggered!
// function tweetEvent(tweet) {

//   // If we wanted to write a file out
//   // to look more closely at the data
//   // var fs = require('fs');
//   // var json = JSON.stringify(tweet,null,2);
//   // fs.writeFile("tweet.json", json, output);

//   // Who is this in reply to?
//   var reply_to = tweet.in_reply_to_screen_name;
//   // Who sent the tweet?
//   var name = tweet.user.screen_name;
//   // What is the text?
//   var txt = tweet.text;
//   // If we want the conversation thread
//   var id = tweet.id_str;

//   // Ok, if this was in reply to me
//   // Tweets by me show up here too
//   if (reply_to === 'GLAu_BOT') {

//     // Get rid of the @ mention
//     txt = txt.replace(/@GLAu_BOT/g,'');

//     // Start a reply back to the sender
//     var replyText = '@'+name + ' ';
//     // Reverse their text
//     for (var i = txt.length-1; i >= 0; i--) {
//       replyText += txt.charAt(i);
//     }

//     // Post that tweet
//     T.post('statuses/update', { status: replyText, in_reply_to_status_id: id}, tweeted);

//     // Make sure it worked!
//     function tweeted(err, reply) {
//       if (err) {
//         console.log(err.message);
//       } else {
//         console.log('Tweeted: ' + reply.text);
//       }
//     }
// }
// }










var stream = T.stream('user');

stream.on('follow', followed);
// Just looking at the event but I could tweet back!
function followed(event) {
  var name = event.source.name;
  var screenName = event.source.screen_name;
  tweetIt('Thank you: @' + screenName + ' for following GLAU.');
}
//stream.on('tweet', tweetEvent);


 stream.on('tweet', tweetEvent);

function tweetEvent(eventMsg)
{
	//var fs = require('fs');
	//var json = JSON.stringify(eventMsg, null, 10);
	//fs.writeFile("tweet.json", json);

	var replyto = eventMsg.in_reply_to_screen_name;
	var text = eventMsg.text;
	var from = eventMsg.user.screen_name;
	console.log(replyto + ' ' + from);
	if(replyto == 'GLAu_BOT')
	{
		var newtweet = '@' + from + ' thank you for tweeting to GLA University';
		tweetIt(newtweet);
	}
};
 	

function tweetIt(txt)
{
	var tweet = {
		status: txt
	}

	T.post('statuses/update', tweet, tweeted);

	function tweeted(err, data, responce){	
		if(err){
			console.log("Something went Wrong!");
		}
		else{
			console.log("Worked!");	
		}
	
	}

};























// // Now looking for tweet events
// // See: https://dev.twitter.com/streaming/userstreams
// stream.on('tweet', tweetEvent);

// // Here a tweet event is triggered!
// function tweetEvent(tweet) 
// {
//   // Who is this in reply to?
//   var reply_to = tweet.in_reply_to_screen_name;
//   // Who sent the tweet?
//   var name = tweet.user.screen_name;
//   // What is the text?
//   var txt = tweet.text;
//   // If we want the conversation thread
//   var id = tweet.id_str;

//   // Ok, if this was in reply to me
//   // Tweets by me show up here too
//   if (reply_to === 'GLAu_BOT') {

//     // Get rid of the @ mention
//     txt = txt.replace(/@GLAu_BOT/g,'');

//     // Start a reply back to the sender
//     var replyText = '@' + name + ' ';
//     // Reverse their text
//     for (var i = txt.length-1; i >= 0; i--) {
//       replyText += txt.charAt(i);
//     }

//     // Post that tweet
//     T.post('statuses/update', { status: replyText, in_reply_to_status_id: id}, tweeted);

//     // Make sure it worked!
//     function tweeted(err, reply) {
//       if (err) {
//         console.log(err.message);
//       } else {
//         console.log('Tweeted: ' + reply.text);
//       }
//     }
//   }
// }