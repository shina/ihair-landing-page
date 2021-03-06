$(document).ready(function() {

  // Scroll to top
  $.scrollUp({
     scrollText: '', // Text for element
  });


  // Ajax contact form
	// credit -> How to handle error or success responce -> http://goo.gl/Wg5AZI
	//
	$('.form-contact').submit(function(e) {

		// Prevent default event
		e.preventDefault();

		// Variables
		var form      			= $(this),
				formUrl   			= $(this).attr('action'),
	      formData  			=	$(this).serialize(),
	      responceServer  = $(this).find('.responce-server');

		// Define functions for adding and removing effects while submitting
		function addSubmittingEffects() {
			form.addClass("overlay");
	    form.find('button').text('Sending...');
		}

		function removeSubmittingEffects() {
			form.removeClass("overlay");
	    form.find('button').text('Send');
	    form.find('input').val('');
	    form.find('textarea').val('');
		}

		function errorSubmittingEffects() {
			form.removeClass("overlay");
	    form.find('button').text('Resend');
		}

		// Add submitting effects after submit button clicked
		addSubmittingEffects();	  

		// Wait one second before submitting the form
		setTimeout( function() {

			// Submiting form
		  $.ajax({
			  type: "POST",
			  url: formUrl,
			  data: formData,
			  dataType: "json",

			  success: function( responce ) {
			  	if (responce.status === 'success') {
			  		responceServer.addClass('success').removeClass('error').html("<i class='fa fa-check-circle-o'></i> " + responce.message).fadeIn();
			  		removeSubmittingEffects();
			  	} else {
			  		responceServer.addClass('error').removeClass('success').html("<i class='fa fa-times-circle-o'></i> " + responce.message).fadeIn();
			  		errorSubmittingEffects();
			  	}
			  }, // success

			  error: function( jqXHR, textStatus ) {
		  		responceServer.addClass('error').removeClass('success').html("<i class='fa fa-times-circle-o'></i> " + textStatus).fadeIn();
		  		errorSubmittingEffects();
		  		console.log(textStatus);
			  } // success

			}); // ajax

			}, 1000); //setTimeout

	}); // submit

	// Toggle scrollup with modal scrollUp
  $('#modalDanger').on('show.bs.modal', function (e) {
	  $('#scrollUp').hide();
	});

});