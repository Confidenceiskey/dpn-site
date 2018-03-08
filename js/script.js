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
		$("#subscribe-button").click(function(event) {
      event.preventDefault(); 

      //Obtaining the values to validate
      var name = document.getElementById("gform").elements.fullname.value;
      var email = document.getElementById("gform").elements.email_address.value;
      var count = 0;
      
      //If fails validation test, display invalid feedback
      if (name.length <= 2) {
        $(".invalid-feedback2").css("display", "block");
        $("#fullname").css("border-color", "rgb(220, 53, 69)");
      } 
      
      //If passes name test, normal display
      if (name.length > 2) {
        $(".invalid-feedback2").css("display", "none");
        $("#fullname").css("border-color", "rgb(40, 167, 69)");
        count += 1;
      }
      
      //If email validation test fails, display invalid feedback
      if (!email.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
        $(".invalid-feedback3").css("display", "block");
        $("#email_address").css("border-color", "rgb(220, 53, 69)"); 
      } else {
        $(".invalid-feedback3").css("display", "none");
        $("#email_address").css("border-color", "rgb(40, 167, 69)");
        count += 1;
      }
      
      //if all validation tests passed, submit form & let form-submission handler run (script below).
      if (count === 2) {
			  
        handleFormSubmit(event);


        // get all data in form and return object
        function getFormData() {
          var form = document.getElementById("gform");
          var elements = form.elements; // all form elements
          var fields = Object.keys(elements).map(function(k) {
            if(elements[k].name !== undefined) {
              return elements[k].name;
            // special case for Edge's html collection
            } else if(elements[k].length > 0){
              return elements[k].item(0).name;
            }
          }).filter(function(item, pos, self) {
            return self.indexOf(item) == pos && item;
          });
          var data = {};

          fields.forEach(function(k){
            data[k] = elements[k].value;
            var str = ""; // declare empty string outside of loop to allow
                          // it to be appended to for each item in the loop
            if(elements[k].type === "checkbox"){ // special case for Edge's html collection
              str = str + elements[k].checked + ", "; // take the string and append 
                                                      // the current checked value to 
                                                      // the end of it, along with 
                                                      // a comma and a space
              data[k] = str.slice(0, -2); // remove the last comma and space 
                                          // from the  string to make the output 
                                          // prettier in the spreadsheet
            } else if(elements[k].length){
              for(var i = 0; i < elements[k].length; i++){
                if(elements[k].item(i).checked){
                  str = str + elements[k].item(i).value + ", "; // same as above
                  data[k] = str.slice(0, -2);
                }
              }
            }
          });

          // add form-specific values into the data
          data.formDataNameOrder = JSON.stringify(fields);
          data.formGoogleSheetName = form.dataset.sheet || "responses"; // default sheet name
          data.formGoogleSendEmail = form.dataset.email || ""; // no email by default

          console.log(data);
          return data;
        }



        function handleFormSubmit(event) {  // handles form submit withtout any jquery
          var data = getFormData();         // get the values submitted in the form

          $(".social_login").replaceWith("<div class='text-center' id='loadingGif'><img src='images/ajax-loader.gif' alt='loading' /></div>").fadeIn();
          var url = event.target.form.action;
          var xhr = new XMLHttpRequest();      // we are submitting via xhr below
          xhr.open('POST', url);
          // xhr.withCredentials = true;
          xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
          xhr.onreadystatechange = function() {
            console.log( xhr.status, xhr.statusText )
            console.log(xhr.responseText);
            
            $("#loadingGif").hide();
            document.getElementById('thankyou_message').style.display = 'block';
            return;
          };
          // url encode form data for sending as post data
          var encoded = Object.keys(data).map(function(k) {
            return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
          }).join('&')
          xhr.send(encoded);
        }
      }
		});
});
  
