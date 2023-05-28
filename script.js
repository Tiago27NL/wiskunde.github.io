const numbers = [];
function disableScroll() {
    // Sla positie scrollen op
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  
    // scrollen uit
    window.onscroll = function() {
      window.scrollTo(scrollLeft, scrollTop);
    };
  }
  
  disableScroll();

function randomGetal(minimaal, maximaal) {
    return Math.round(Math.random() * (maximaal - minimaal) + minimaal);
}


function generate() {
    numbers.length = 0;
    var checkboxes = document.querySelectorAll(".container .card .card-inner [name='operator']");
    var operator;
    var checkedCheckboxes = [];

    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            checkedCheckboxes.push(checkboxes[i]);
        }
    }
    
    if (checkedCheckboxes.length === 0) {
        // No checkbox is checked
        return alert("Select an operator");
    }
    
    var minimaal = document.querySelectorAll(".container .card .card-inner [name='minNumber']")[0].value;
    var maximaal = document.querySelectorAll(".container .card .card-inner [name='maxNumber']")[0].value;
    if (!minimaal || !maximaal) return alert("Vul een getal in bij minimaal en/of maximaal");
    if (maximaal >= 1000) return alert("De getallen mogen niet groter of gelijk zijn aan 1000");
    if (minimaal >= 500) return alert("Het antwoord op de gegenereerde sommen mag niet groter of gelijk zijn aan 1000 en 500 + 500 = 1000 dus dit mag niet");

    for (let i = 0; i < 5; i++) {
        document.querySelector(`.container .card .card-inner [name= "som${i + 1}"]`).style.color = "white" 
        document.querySelector(`.container .card .card-inner [name= "inputSom${i + 1}"]`).value = " ";

        var antwoord;
        var counter = 0; // Counter variable to limit iterations
        // operator.length = 0

        var randomIndex = Math.floor(Math.random() * checkedCheckboxes.length);
        operator = checkedCheckboxes[randomIndex].parentNode.textContent.trim();
        // console.log(operator)

        var randomOperatorIndex = Math.floor(Math.random() * operator.length);
        var randomOperator = operator[randomOperatorIndex]

        while (true) {
            var random1 = randomGetal(minimaal, maximaal);
            var random2 = randomGetal(minimaal, maximaal);

            // Check if the generated numbers are within the desired range
            if (random1 < minimaal,maximaal && random2 < minimaal,maximaal && random1 + random2 < maximaal && random1 + random2 > minimaal && random1 - random2 < maximaal && random1 - random2 > minimaal && random1 * random2 < maximaal && random1 * random2 > minimaal && random1 / random2 < maximaal && random1 / random2 > minimaal) {
                var eindSom = `${random1} ${randomOperator} ${random2} = `;

                switch (randomOperator) {
                    case "+":
                        antwoord = `${random1} + ${random2}`;
                        break;
                    case "-":
                        antwoord = `${random1} - ${random2}`;
                        break;
                    case "*":
                        antwoord = `${random1} * ${random2}`;
                        break;

                    case "/":
                        antwoord = `${random1} / ${random2}`;
                        antwoord = eval(antwoord).toFixed(2);
                        break;
                }

                break; // Exit the while loop if the numbers are within range
            }

            counter++; // Increment the counter

            if (counter >= 500) {
                // Break the loop if it exceeds a certain threshold
                alert("Could not find a suitable answer within the limit.");
                return;
            }
        }

        numbers.push(eval(antwoord));
        document.querySelector(`.container .card .card-inner [name="som${i + 1}"]`).innerHTML = eindSom;
    }

}

function controleer(){
    for(i = 0; i < 5; i++){
        var inputAntwoorden = document.querySelectorAll(`.container .card .card-inner [name= "inputSom${i + 1}"]`)[0].value;
        if(inputAntwoorden == numbers[i]) document.querySelector(`.container .card .card-inner [name= "som${i + 1}"]`).style.color = "green" 
        else document.querySelector(`.container .card .card-inner [name= "som${i + 1}"]`).style.color = "red"
    }
            
}