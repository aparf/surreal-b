// link for Google Spreadsheet script for adding emails
const scriptURL = 'https://script.google.com/macros/s/AKfycbwpgvVbHUFfAIZ_u4by7EKx-bVCFQj1KuPrapmhQkTWkORN5IjrLJAcbN8QKZMryhrp2g/exec'


const form = document.forms['submit-to-google-sheet']

const opensea = document.getElementById("opensea")


function isMobile(mobileBreakpoint = 481){
	return(window.innerWidth <= mobileBreakpoint)
}

// adding stars animation
const stars = document.getElementsByClassName("star")
if (!isMobile()){
  for (let s of stars){
  	s.addEventListener('click', function(){
  		document.getElementById("c-" + s.id).classList.add("star-container-animated");
  	})
  }
}

// floating elements stylying
const floatingLogo = document.getElementById("floating-logo")
const floatingText = document.getElementById("floating-text")

floatingLogo.addEventListener('mouseover', function() {
	showElement(floatingText);
});

floatingLogo.addEventListener('mouseout', function() {
	hideElement(floatingText);
});


// email input field
const emailInput = document.getElementById("waitlist-email-input");

// email input box
const emailContainer = document.getElementById("waitlist-email-c");


// return neon border color when input field clicked
emailInput.addEventListener('click', function(){
	emailContainer.style.border="rgba(230 254 84) 1px solid";
})

// waitlist-button
const waitButton = document.getElementById("waitlist-button");

// is opensea ad is displayed
var AdDisplayed = true;

// hide element
function hideElement(element){
	element.style.visibility = "hidden";
	element.style.opacity='0';
}

// show element
function showElement(element){
	element.style.visibility = "visible";
	element.style.opacity='1';
}

// email input validation
function validateForm() {
    var x = form["email"].value;
    var atpos = x.indexOf("@");
    var dotpos = x.lastIndexOf(".");
    if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length)
        return false;
    return true;
}


// display waitlist form when waitlist-button is pressed
waitButton.addEventListener('click', function(){

	// align the width of wailist form with opensea ad
	if (!isMobile())
		form.style.width = opensea.offsetWidth + 'px';
	else
		form.style.top = (parseInt(waitButton.offsetHeight) + 50).toString() + 'px';

	if (AdDisplayed){
		hideElement(opensea)
		showElement(form)
		// waitButton.classList.remove("waitlist-button-border-uncolored");
		waitButton.classList.add("waitlist-button-border-colored");
		// waitButton.style.border="rgba(230 254 84) 1px solid"; // neon border color
	} else {
		hideElement(form)
		showElement(opensea)
		waitButton.classList.remove("waitlist-button-border-colored");
		// waitButton.classList.add("waitlist-button-border-uncolored");
		// waitButton.classList.add("waitlist-button-border-uncolored");
		// waitButton.style.border="rgba(35, 37, 38, 1) 1px solid"; // grey border color
	}
	AdDisplayed = !AdDisplayed;
})




const loader = document.getElementById("loader");

  
// waitlist form email submission
form.addEventListener('submit', e => {
e.preventDefault()
if (validateForm()){
	document.getElementById("emailButton").innerHTML = "<span id='loader' style='display:block; z-index:24;'></span>";
	// using Google Spreadsheet script to collect emails
	fetch(scriptURL, { method: 'POST', body: new FormData(form)})
      .then(response => {
      	document.getElementById("emailButton").innerHTML = "✓";
      	// disable button and remove hover effect
      	document.getElementById("emailButton").disabled = true;
    	document.getElementById("emailButton").classList.remove('waitlist-form-submit-hover');
    })
    .catch(error => {
    	console.error('Error!', error.message)
      	document.getElementById("emailButton").innerHTML = "✗";
      	document.getElementById("emailButton").disabled = false;
    })
}
else
	emailContainer.style.border="red 1px solid";

})

// stylying for footer popup email 
const footerPopUp = document.getElementById("footer-email-popup");

document.getElementById("footer-email").addEventListener('mouseover', function(){
	setTimeout(function(){
			showElement(footerPopUp);
		}, 100)
	// showElement(footerPopUp);
})

// on mobile "Copied" popup should disappear
document.getElementById("footer-email").addEventListener('click', function(){
	setTimeout(function(){
	navigator.clipboard.writeText(footerPopUp.innerHTML);
	footerPopUp.innerHTML = 'Copied';
	showElement(footerPopUp);
	}, 100)

	if (isMobile())
		setTimeout(function(){
			hideElement(footerPopUp);
		}, 1500)
})

// on mobile only "Copied" popup should be visible
document.getElementById("footer-email").addEventListener('mouseout', function(){
	hideElement(footerPopUp);
	if (!isMobile())
		setTimeout(function(){
			footerPopUp.innerHTML = 'gm@surr.app';
		}, 600)

})



