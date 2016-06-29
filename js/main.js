$(document).ready(function(){
	var i = 0;
	// Submit function
	$('.submit').click(function(){
		// If city field is empty
		if ($('#cityNameField').val() == "") {
			alert("Enter the City name!")
			return;
		}
		// Variables
		var city = $('#cityNameField').val(),
				APIKEY = "d3f0ba0a9d0adb5eb95dc26a774d4030";
				link = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&APPID=" + APIKEY;
		// Request to server
		$.get(link, function (response) {
			// If the city doesn`t exist
			if (response.cod == 404) {
				alert("This city is not found");
				return;
			}
			// Result of request
			var result = ('<span>' + response.name + '</span>' + ', ' + response.sys.country + ': ' + response.main.temp  + '&deg;C, ' + response.weather[0].main);
			// if the server returned an inaccurate result - append result to a page with text message
			if(response.name != city) {
				$('<li>' + '<span>' + '- Perhaps you meant: ' + '</span>' + result + '</li>').fadeIn('slow').appendTo('#city-list');
				i++;
				document.getElementById('weatherForm').reset();
				return;
			}
			// Else append result to a page without text message
			$('<li>' + '- ' + result + '</li>').fadeIn('slow').appendTo('#city-list');
			i++;
			// Reset text field
			document.getElementById('weatherForm').reset();
		});
	});
	// Reset function
	$('#reset').click(function() {
    while(i > 0) {
      $('#city-list li:last').remove();
      i--;
    }
  });
});
