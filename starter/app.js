

// BUDGET CONTROLLER 
var budgetController = (function() {

//Some cod

})(); 


// UI CONTROLLER
var UIController = (function() {

// to secure that the class for the values is saved (.add__type, .add__description, .add__value)

var DOMstring = {
  inputType: '.add__type',
  inputDescription: '.add__description',
  inputValue: '.add__value', 
  inputBtn: '.add__btn'
};

return {
    getInput: function() {
        return {
            type: document.querySelector(DOMstring.inputType).value,
            description: document.querySelector(DOMstring.inputDescription).value,
            value: document.querySelector(DOMstring.inputValue).value

        };
    },

    getDOMstrings: function() {
      return DOMstring; 
    }
};

})(); 




// GLOBAL APP CONTROLLER // this runs the two fucntions above based on action 
var controller = (function(budgetCtrl, UICtrl) {

var DOM = UICtrl.getDOMstrings(); // makes the above DOMstring useable in this function as well 

var ctrlAddItem = function() {

// 1. Get the field input data

var input = UICtrl.getInput();
console .log(input);


// 2. Add the item to the controller 

// 3. Add the item to the UI

// 4. Calculate the budget 

// 5. Display the budget on the UI 

}

document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

document.addEventListener('keypress', function(event){
 
 if (event.keyCode === 13 || event.which === 13) {
     ctrlAddItem(); 
  }

  });

})(budgetController, UIController);


