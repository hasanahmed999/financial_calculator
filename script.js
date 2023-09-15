// if age < 18: reply sorry , you must be at least 18 to open a TFSA, RRSP, or FHSA
currentTime = new Date()


const ageInput = document.getElementById('age')
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event
ageInput.addEventListener('input', checkAge);
const age_limit = document.getElementById('age_amount')
const TFSA_Amount = document.getElementById('TFSA_limit')
const FHSA_Amount = document.getElementById('FHSA_limit')

function checkAge(ageInput) {
    let ageValue = parseInt(ageInput.target.value)
    // TODO: debug
    if (isNaN(ageValue)) {
        age_limit.textContent = "Invalid input; number must be integer greater than 0";
    }

    // console.log(typeof(ageValue))
    if (ageValue < 18) {
        // TODO: figure out how to erase this when a valid date is inputted after an invalid date
        age_limit.textContent = "You are too young!";
        TFSA_Amount.textContent = "$0";
        FHSA_Amount.textContent = "$0";
    }

    else {
        age_limit.textContent = "";
        TFSA_Amount.textContent = "$".concat(TFSA_calculator(ageValue));
        FHSA_Amount.textContent = "$".concat(FHSA_calculator(ageValue));
    }
}

function FHSA_calculator(ageValue) {
    let FHSA = 8000 * (currentTime.getFullYear() - 2023 + 1);
    if (FHSA > 40000) {
        FHSA = 40000;
    }
    return FHSA;
}


function TFSA_calculator(ageValue) {
    let TFSA_contribution_room = 0
    // TODO: remove or just keep as information
    var dict = {
        '2023' : 6500,
        '2022' : 6000,    
        '2021' : 6000,    
        '2020' : 6000,
        '2019' : 6000,
        '2018' : 5500,
        '2017' : 5500,
        '2016' : 5500,
        '2015' : 10000,
        '2014' : 5500,
        '2013' : 5500,
        '2012' : 5000,
        '2011' : 5000,
        '2010' : 5000,
        '2009' : 5000,
    }

    // works backwards in terms of years
    const arr_amounts = [
        6500,
        6000,
        6000,
        6000,
        6000,
        5500,
        5500,
        5500,
        10000,
        5500,
        5500,
        5000,
        5000,
        5000,
        5000
    ]

    // age = 18, so we only read into the first element of the array
    // how should we mark the counter?
    let counter = 0
    while (ageValue >= 18) {
        TFSA_contribution_room += arr_amounts[counter];
        counter++;
        ageValue--;
        if (counter >= arr_amounts.length) {
            break;
        }
    }
    return TFSA_contribution_room
}