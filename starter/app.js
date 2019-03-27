

// BUDGET CONTROLLER 
var budgetController = (function() {

// creating a DATA type using fucntion Constructor using .this

var Expense = function(id, description, value) {
    this.id = id; 
    this.description = description; 
    this.value = value; 
}; 

var Income = function(id, description, value) {
    this.id = id; 
    this.description = description; 
    this.value = value; 
}; 

// DATA structure

var data = {
    allItems: {
        exp: [],
        inc: []
    },
    totals: {
        exp: 0,
        inc: 0
    }
  };


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


var setupEventListeners = function() {
    var DOM = UICtrl.getDOMstrings(); // makes the above DOMstring useable in this function as well   

    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function(event){
        if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem(); 
        }
    });
  }

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

return {
    init: function() {
        console.log('Application has started'); 
        setupEventListeners(); 
    }
};


})(budgetController, UIController);


controller.init(); 