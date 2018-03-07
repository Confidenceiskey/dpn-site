$(document).ready(function() {
//// ** START OF MODIFY SECTIONS OF THE HEADER ***
  // Closes the Responsive Menu on Menu Item Click
   $("#collapsable-nav a").click(function() {
     $("#collapsable-nav").collapse('hide'); 
   });
//// ** END OF MODIFY SECTIONS OF THE HEADER ** 
  
//// ** START OF MODIFY SECTIONS OF THE FOOTER ** 
  //Determine current date and store that as a variable
  var time = new Date();
  var year = time.getFullYear();
  
  //Insert the copyright text at the bottom of the footer  
  $("#copy").html("&copy; " + year + " David Nowak. All rights reserved.");
//// ** END OF MODIFY SECTIONS OF THE FOOTER ** 
});
  

// JavaScript for disabling form submissions if there are invalid fields
(function() {
  "use strict";
  window.addEventListener('load', function() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
   
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
          form.classList.add('was-validated');
          // if (form.checkValidity() === true) {
          //   window.location.reload(true);
          // }
      }, false);
    });
  }, false);
})();


// POP UP SUBSCRIBE FORM
$("#modal_trigger").leanModal({
		top: 100,
		overlay: 0.6,
		closeButton: ".modal_close"
});

$(function() {
  // When User clicks subscribe button
		$("#subscribe-button").click(function() {
      
      //Obtaining the values to validate
      var name = $("#fullname")["0"].value;
      var email = $("#email")["0"].value;
      var count = 0;
      
      //If fails validation test, display invalid feedback
      if (name.length <= 2) {
        $(".invalid-feedback2").css("display", "block");
        $("#fullname").css("border-color", "rgb(220, 53, 69)");
      } 
      
      //If passes name test, normal display
      if (name.length > 2) {
        $(".invalid-feedback2").css("display", "none");
        $("#fullname").css("border-color", "");
        count += 1;
      }
      
      //If fails "." or "@" validation test, display invalid feedback
      if (!email.match(/\./) || !email.match(/@/)) {
        $(".invalid-feedback3").css("display", "block");
        $("#email").css("border-color", "rgb(220, 53, 69)"); 
      } 
      
      //If passes "." & "@" validation test, normal display
      if (email.match(/\./) && email.match(/@/)) {
        $(".invalid-feedback3").css("display", "none");
        $("#email").css("border-color", "");
        count += 1;
      }
      
      //if all validation tests passed, submit form (let form-submission handler run).
      if (count === 2) {
			  //added ajax loader in form-submission-handler.js
      }
		});
});
  
