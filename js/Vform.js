/*	>>>>>>>>>>Javascript form validation Ruhull Alam 2017<<<<<<<<<<

Contents
	1. Other function - this is the coding for showing a new input box if "other" option is selected for job-titles.
			1.1 -this includes the validation code to show that if selected the input is not empty
	2. T shirt function - this is where the color options are shown for the respective t shirt chosen
	3. Activities selector function - this code shows how much the chosen activities cost as well as disabling options if they conflict with each other
	4. Payment selector function - this code provides the correct methods of payment or info depending on what option is selected for payment
	5. Validation functions - all other validation functions are here.
		5.1 - Name validation
		5.2 - Email validation
		5.3 - Credit Card Number Validation
		5.4 - Credit Card Expiry Date Validation
	6. Check all function - this runs when the submit button is clicked and basically runs all the validation codes previously made, plus a few more which ensures that the page can't be submitted upon load.
*/

/////////////////////Other function//////////////////////
var jobRoles = document.getElementById("title");
jobRoles.addEventListener("change", otherCheck); //if option selected changed, run function otherCheck
var otherDialog = document.createElement("dialog");
	var otherDialogDiv = document.getElementsByTagName("fieldset")[1]

function otherCheck() {
	if (jobRoles.value === "other") {
		
	var otherInput = document.createElement("input"); //Create input 
	otherInput.type.value = "text"; // set type to text  
	otherInput.id = "other-title" // apply ID 
	arrayInput.push(otherInput)
	otherInput.addEventListener("keyup", checkOther);
	otherInput.placeholder = "Your Job Role" //set placeholder
	var fieldset1 = document.getElementsByTagName("fieldset")[0]; 
	fieldset1.append(otherInput);	 //append it to parent
	} 	else 
		{ //Makes sure that the object is deleted if 'other' is deselected
			var otherInputObject = document.getElementById("other-title");
			if (otherInputObject !== null) {
				createDialog(false, "", otherDialogDiv, otherDialog)
				otherInputObject.remove();
				arrayInput.pop(otherInput)
				}
		}
	
		//validate function for other within creation of otherInput function
		function checkOther() {
		if (otherInput.value.trim() === "") {
				createDialog(true, "You have not entered anything", otherDialogDiv, otherDialog)
				addInvalidClass(otherInput, true)
				loadMarker++
		} else {
			addInvalidClass(otherInput, false)
			createDialog(false, "", otherDialogDiv, otherDialog)
			loadMarker++
		}
	};
	
}

/////////////////////End of Other function//////////////////////

/////////////////////T shirt Color function//////////////////////
var colorOptions = document.getElementById("color");

var designSelect = document.getElementById("design")
var colorsBox = document.getElementById("colors-js-puns")
	colorsBox.style.display = "none"; //Hides color options intially as no theme selected
	

designSelect.addEventListener("change", selectCheck); //upon change on option select, runs function

function selectCheck() {

//First check allows the color options to be shown
if (designSelect.value=== "Select Theme") {
	colorsBox.style.display = "none";
	}	
		 else {
			colorsBox.style.display = "inline";
		}
		
// Checks to see if puns shirts were chose to run through the options that have puns shirt only and display them only
	if (designSelect.value === "js puns") {
		for (i = 0; i < colorOptions.length; i++)
			if (colorOptions[i].innerHTML.indexOf("Puns") ===  -1) { 
				colorOptions[i].style.display = "none";
			} else {
				colorOptions[i].style.display = "inline";
			} 
			colorOptions.selectedIndex = 0; //auto selects one of the first options for this list
	} else 
	
// Checks to see if heart shirts were chose to run through the options that have heart shirt only and display them only	
	if (designSelect.value === "heart js") {
		for (i = 0; i < colorOptions.length; i++)
			
			if (colorOptions[i].innerHTML.indexOf("Puns") !==  -1) {
				colorOptions[i].style.display = "none";
			} else {
				colorOptions[i].style.display = "inline";
			} 
			colorOptions.selectedIndex = 3; //auto selects one of the first options for this list
	}
}
/////////////////////End of T shirt Color function//////////////////////

/////////////////////Activities selector function//////////////////////

//Price display functions
var totalPrice = 0;
//var price;
var totalPriceParagraph = document.createElement("p");//Create paragraph element to outprice price to.
	var fieldset3 = document.getElementsByTagName("fieldset")[2]; 
	fieldset3.append(totalPriceParagraph);	 //append it to parent
	checkPrice();	
	
	//this changes the price on the actual document to show the total;
	function updatePriceParagraph(totalPrice) {
	totalPriceParagraph.innerHTML = "Total price: $" + totalPrice;
	}
	
	function checkPrice() {
		//This function will display the total price only if it's > 0;
		if (totalPrice === 0) {
			totalPriceParagraph.style.display = "none";
			} else {
				totalPriceParagraph.style.display = "inline";
				//console.log(totalPrice);
				}
	}
	
	//targeting activities list
	var activities = document.getElementsByClassName("activities")[0].getElementsByTagName("label");
	
		for (i = 0; i < activities.length; i++) {
		clickCheck(i)
	}
	
	//click event for checkboxes
		function clickCheck(x) {
				activities[x].addEventListener("change", function() {
				retrievePrice(x);
				updatePriceParagraph(totalPrice)
				// when clicked runs above functions
				});
		}
		
	var array= [[0], [3], [4], [1], [2]]; //this array is selected from the original x value passed through arguments, this a second value to the activities checkbox that is selected which tells the program which second activity should be disabled from the options
	
function retrievePrice (i) {
					if (activities[i].textContent.indexOf(/\$\d\d\d/)) { // if string includes £xxx then will store the figure
					var price = parseInt(activities[i].textContent.substr(-3,  4));
					}
			//firstElementChild selects the input checkbox of the activity passed through activities[i]		
			if (activities[i].firstElementChild.checked) { 
			// update total price with price from retrievePrice(), and run neccessary enable and disable activity functions after checking the i value against the array variable.
			totalPrice += price;
			checkPrice(); 
				if (i > 0  && i < 5) {
				disableActivity(i, parseInt(array[i]), true, "gray");
					}
			}	else  {
				totalPrice -= price;
				checkPrice();
				if (i > 0  && i < 5) {
				disableActivity(i, parseInt(array[i]), false, "black");
					}
				}
			}
	
		function disableActivity(x, y, value, color) {
			if (activities[x].firstElementChild.checked === value) {
			activities[y].firstElementChild.disabled = value;
			activities[y].style.color = color;
					}
				}
			
	/////////////////////End of Activities selector function////////////////


//////////////////Payment selector function///////////////////
var paymentOptions = document.getElementById("payment");
paymentOptions.addEventListener("change", paymentCheck); 
var paymentDiv = document.getElementById("credit-card");
var paypalDiv = document.getElementById("paypalPaymentInfo");
var bitcoinDiv = document.getElementById("bitcoinPaymentInfo");

//functiion to reset all divs to hide allowing specific functions to show what they need to.
function hideDivs() {
	paymentDiv.style.display = "none";
	paypalPaymentInfo.style.display = "none";
	bitcoinPaymentInfo.style.display = "none";
}
hideDivs() 	//hide all divs upon load

var paymentDialog = document.createElement("dialog");

function paymentCheck() {
// if statements to show neccessary payment info fields.
	if (paymentOptions.value === "select_method")	{	
		hideDivs() 	
	} else if (paymentOptions.value === "paypal") {
		hideDivs() 
		paypalPaymentInfo.style.display = "inline";
	}  else if (paymentOptions.value === "bitcoin") {
		hideDivs() 
		bitcoinPaymentInfo.style.display = "inline";
	} else if (paymentOptions.value === "credit card") {
		hideDivs() 
		paymentDiv.style.display = "inline-block";
		checkCardPayment();
		checkExpiration();// run card validation if selected, called here to prevent submission without info
	}
	
	createDialog(false, "", payment, paymentDialog)
	
}
//////////////End of Payment selector function//////////////

////////////////////Validator  functions///////////////////////

////////Name validator

var nameInput = document.getElementById("name");
var nameDialog = document.createElement("dialog");
var loadMarker = 0; //This was created because upon load the keyup event would take place and the user would be told straight away that they have not entered anything. As soon as any key is pressed it will add one and the 'you have not entered anything' function can be allowed to run. keydown and keypress would have a one key delay when used on the eventlistner below.

nameInput.addEventListener("keyup", checkName);

function addInvalidClass(selectedElement, value) {
	selectedElement.classList.toggle("invalid", value);
} //adds/removes invalid class when called 

//creates the neccssary dialog box and links it to the selected input box, or if value is true closes said box;
function createDialog (value, message, field, dialogBox) {
	field.previousSibling.previousSibling.append(dialogBox); //we will append the dialogbox to the input required
	if (value === true) {
	dialogBox.textContent = message; //if value is true, the textContent of the dialog will the have the message passed through
	dialogBox.open = value; //then we will show the dialog box;
	
	} else {
		if (dialogBox.open === true) {	//close it if requirements are met and a dialogBox is already open.		
			dialogBox.close();
	
			}
		} 
	}

function checkName() {
	if (/^[a-zA-Z\s]*$/g.test(nameInput.value)) {
	createDialog(false, "", nameInput, nameDialog);
	addInvalidClass(nameInput, false);
	loadMarker++
	} else {
	createDialog(true, "Your name must only include letters", nameInput, nameDialog);
	addInvalidClass(nameInput, true);
	loadMarker++
		}
		if (loadMarker > 1) {
	if (nameInput.value.trim() === "") {
	createDialog(true, "You have not entered anything", nameInput, nameDialog);
	addInvalidClass(nameInput, true);
		}
	}
}

///////////Email validator
var emailDialog = document.createElement("dialog");
var emailInput = document.getElementById("mail"); //selects the email input as a variable
emailInput.addEventListener("keyup", checkEmail); // adds eventlistener to that variable 


function checkEmail() {
	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailInput.value)) { 
	createDialog(false, " ", emailInput, emailDialog);
	addInvalidClass(emailInput, false);
	loadMarker++
	} else {
	createDialog(true, "email address if formatted incorrectly", emailInput, emailDialog);
	addInvalidClass(emailInput, true);
	loadMarker++
		}
		if (emailInput.value.trim() === "") {
	createDialog(true, "You have not entered anything", emailInput, emailDialog);
	addInvalidClass(emailInput, true);
		}
	}
////////////////////////Credit Card Validator

//////1. card number validator			
var ccDialog = document.createElement("dialog");

var ccNum = document.getElementById("cc-num");
ccNum.placeholder = "xxxxxxxxxxxxxxxx";

var zipCode = document.getElementById("zip");
zipCode.placeholder = "xxxxx";

var cvv = document.getElementById("cvv");
cvv.placeholder = "xxx";

ccNum.addEventListener("keyup", checkCardPayment);
zipCode.addEventListener("keyup", checkCardPayment);
cvv.addEventListener("keyup", checkCardPayment);


function checkCardPayment () {
	if (/^[0-9]{16}$/.test(ccNum.value) && /^[0-9]{5}$/.test(zipCode.value) && /^[0-9]{3}$/.test(cvv.value) ) {
		createDialog(false, "", ccNum, ccDialog)
		addInvalidClass(ccNum, false); //toggle class
		addInvalidClass(zipCode, false); //toggle class
		addInvalidClass(cvv, false);//toggle class etc...
		loadMarker++
	} else {
		createDialog(true, "Incorrect formatting", ccNum, ccDialog);
		addInvalidClass(ccNum, true);
		addInvalidClass(zipCode, true);
		addInvalidClass(cvv, true);
		loadMarker++
	}
	
	if (ccNum.value.trim() === "" || zipCode.value.trim() === "" || cvv.value.trim() === "") {
	createDialog(true, "You have not entered anything", ccNum, ccDialog);
	addInvalidClass(ccNum, true);
	addInvalidClass(zipCode, true);
	addInvalidClass(cvv, true);
	loadMarker++
		}
}

//////2. Expiry date validator
var dateDialog = document.createElement("dialog");

var expirationMonth = document.getElementById("exp-month")
var expirationYear = document.getElementById("exp-year")
expirationMonth.addEventListener("click", checkExpiration);
expirationYear.addEventListener("click", checkExpiration);

currentYear = new Date().getFullYear();
currentMonth = new Date().getMonth();

function checkExpiration() {
	if (parseInt(expirationYear.value) === currentYear) {
		if (parseInt(expirationMonth.value)-1 <= currentMonth) {
			addInvalidClass(expirationMonth, true)
			addInvalidClass(expirationYear, true)
			createDialog(true, "Card date is expired", expirationYear, dateDialog)
			loadMarker++
		} else {
			addInvalidClass(expirationMonth, false)
			addInvalidClass(expirationYear, false)
			createDialog(false, "", expirationYear, dateDialog)
			loadMarker++
		}
	} else if (parseInt(expirationYear.value) < currentYear) {
			addInvalidClass(expirationMonth, true)
			addInvalidClass(expirationYear, true)
			createDialog(true, "Card date is expired", expirationYear, dateDialog)
			loadMarker++
		} else {
		addInvalidClass(expirationMonth, false)
			addInvalidClass(expirationYear, false)
			createDialog(false, "", expirationYear, dateDialog)
			loadMarker++
	}
}

var submitButton = document.querySelectorAll("button[type=submit]")[0];
submitButton.addEventListener("click", checkAll);

//////////////////End of Validator functions///////////////////

var arrayInput = [nameInput, emailInput, ccNum, zipCode, cvv, expirationMonth, expirationYear]
// this final function runs when the submit button is clicked
function checkAll() {
	if (loadMarker === 1) {
		event.preventDefault();
		}
	checkName();
	checkEmail();
	
var checkedCounter = 0
		for (i = 0; i <activities.length; i++) {
	 if (activities[i].children[0].checked === false){
		 checkedCounter++;
		 if (checkedCounter === 7) { //this is basically to say if the for loop hasn't reached all 7 activity options as false, dont run below code
			event.preventDefault();
			payment.scrollIntoView(0, 0);
			createDialog(true, "You have not chosen any activities", payment, paymentDialog) 
				} else {
					createDialog(false, "", payment, paymentDialog) 
				} 
			}
		}
			
		for (i = 0; i <activities.length; i++) {
		if (activities[i].children[0].checked === true && payment.value === "select_method") {
			event.preventDefault();
		payment.scrollIntoView(0, 0);
		createDialog(true, "You need to select a payment method", payment, paymentDialog) 
				} 
		}
		
		for (i = 0; i < arrayInput.length; i++) { 
				if (arrayInput[i].className === "invalid") { //this just goes through all the input functions to just check they don't have the "invalid" class
				event.preventDefault();
				arrayInput[i].scrollIntoView(0,0);	
				}	
			}
		}
