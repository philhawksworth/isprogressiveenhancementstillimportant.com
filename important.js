var pe = {};

// I'm adding some latency to prove a point, but your network provider 
// or connection location might be adding some of its own. 
// That's one of the points, we just can't know.
pe.latency = 1000;


// go!
pe.init = function() {
  setTimeout(function(){ pe.getAnswer(); }, pe.latency);
};

// populte the content of the page which answers the question.
pe.getAnswer = function() {
  console.log("Getting the answer to the question, 'is progressive enhancement still important?'...");
  $.getJSON('/answer.json', function(data) {
    console.log("Got an answer! Now I'm going to reveal it.");
    console.log("(As long as there have been no breaking errors so far)...");
    $('.answer').text(data.answer);
    setTimeout(function(){ pe.getReasons(); }, pe.latency);
  });
};


// Populate the content on the page which links to some explanations.
pe.getReasons = function() {

  console.log("Who gives a hoot? Let's get some explanaition about progressive enhancement.");

  $.getJSON('/reasons.json', function(data) {

    console.log("We have got some reasons. I found them in a JSON file on the server. ");
    console.log("I'm going to put them in our eyes now...");

    // add somewhere to put some explanations
    $(".answer").after("<h2>Here are some thoughts on why that is</h2><ul class='reasons'></ul>");

    // add each explanation
    for (var i = 0; i < data.reasons.length; i++) {
      var t = $($(".template").html());
      t.find('a').text(data.reasons[i].title);
      t.find('a').attr('href', data.reasons[i].url);
      t.find('p').text(data.reasons[i].description);
      $('.reasons').append(t);
    }

    console.log("Boom. All populated. I think I'll take a break.");
  });
};


// Ready. LEt's do this!
jQuery(document).ready(function($) {
  console.log("We have a DOM. We can start populating things.");
  pe.init();
});

