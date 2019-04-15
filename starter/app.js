// BUDGET CONTROLLER 
var budgetController = (function() {

// creating a DATA type using fucntion Constructor using (.this)

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

// To calculate sum of totals 
var calculateTotal = function(type) {

    var sum = 0; 
    data.allItems[type].forEach(function(cur){
        sum += cur.value; 
 });
 
 data.totals[type] = sum; 
 // example of above calc 
//  sum = 0 
//  [200, 400, 100]
//  sum = 0 + 200
//  sum = 200 + 400
//  sum = 600 + 100 = 700
};

// DATA structure (GLOBAL DATA OBJECT)

var data = {
    allItems: {
        exp: [],
        inc: []
    },
    totals: {
        exp: 0,
        inc: 0
    }, 
    budget: 0, 
    percentage: -1
  };

// If item is "exp" or "inc" a new item will be pushed to the allItems array above 
  return {
      addItem: function(type, des, val) {
          var newItem, ID; 
          
          //[1 2 3  4 5], next ID = 6
          //[1 2  4 6 8], next ID = 9
          // ID = last ID + 1

          // Create new ID 
          if (data.allItems[type].length > 0) {
          ID = data.allItems[type][data.allItems[type].length - 1].id + 1; 
          } else {
              ID = 0; 
          }
          
          // Create new item based on 'inc' or 'exp' type
          if (type === 'exp') {
              newItem = new Expense(ID, des, val); 
           } else if (type === 'inc') {
               newItem = new Income(ID, des, val); 
           }   
          
          // Push it into our data structure 
           data.allItems[type].push(newItem); 
          // Return the new element 
         return newItem;   
     },


        deleteItem: function(type, id) {
            var ids, index; 
            // .map creates a new array 
            ids = data.allItems[type].map(function(current){
                return current.id;
            });

            index = ids.indexOf(id); 

            if  (index !== -1) {
                data.allItems[type].splice(index, 1);
            }
        },

        calculateBudget: function(){
        // Calculate total income and expenses 
        calculateTotal('exp');
        calculateTotal('inc'); 
        // Calculate  the budget: income - expenses 
        data.budget = data.totals.inc - data.totals.exp;
        // Calculate the percentage of income that we spent 
        if (data.totals.inc > 0) {
        data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
             // Expense = 100 and income 300, spent 33.333% = 100/300 = 0.3333 * 100
        } else {
            data.percentage = -1;
        }
     },
   
        getBudget: function() {
            return {
                budget: data.budget,
                totalInc: data.totals.inc, 
                totalExp: data.totals.exp, 
                percentage: data.percentage
            }
        }, 

        testing: function() {
            console.log(data); 
        }
}; 
})(); 

//-----------------------------------------------------------------------

// UI CONTROLLER

var UIController = (function() {

// to secure that the class for the values is saved (.add__type, .add__description, .add__value)

var DOMstrings = {
  inputType: '.add__type',
  inputDescription: '.add__description',
  inputValue: '.add__value', 
  inputBtn: '.add__btn', 
  incomeContainer: '.income__list', 
  expensesContainer: '.expenses__list',
  budgetLabel: '.budget__value',
  incomeLabel: '.budget__income--value', 
  expensesLabel: '.budget__expenses--value', 
  percentageLabel: '.budget__expenses--percentage',
  container: '.container'
};

return {
    getInput: function() {
        return {
            type: document.querySelector(DOMstrings.inputType).value,
            description: document.querySelector(DOMstrings.inputDescription).value,
            value: parseFloat(document.querySelector(DOMstrings.inputValue).value)

        };
    },

    addListItem: function(obj, type) {
    var html, newHtml, element; 
    // 1. Create HTML sting with placeholder text / compress html from the income/expense structure

   //INCOME 
   if (type === 'inc'){
    element = DOMstrings.incomeContainer; 
        html ='<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
    } else if (type === 'exp'){
    element = DOMstrings.expensesContainer; 
   //EXPENSE
   html ='<div class="item clearfix" id="exp-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__percentage">21%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>'
   }
    // 2. Reaplace the placeholder text with some actual data

    newHtml = html.replace('%id%', obj.id); 
    newHtml = newHtml.replace('%description%', obj.description); 
    newHtml = newHtml.replace('%value%', obj.value);  

    // 3. Insert the HTML into the DOM
    document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);   
    
},


deleteListItem: function(selectorID) {

var el = document.getElementById(selectorID); 
el.parentNode.removeChild(el); 

},

    // TO CLEAR ITEMS
    clearFields: function() {
     var fields, fieldsArr; 

    fields = document.querySelectorAll(DOMstrings.inputDescription +  ', ' + DOMstrings.inputValue); 
    fieldsArr = Array.prototype.slice.call(fields); 
    fieldsArr.forEach(function(current, index, array) {
        current.value = ""; 
      });
    // sets the focude "blink selector | " back to the description filed
    fieldsArr[0].focus(); 
}, 
displayBudget: function(obj) {

document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget; 
document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc; 
document.querySelector(DOMstrings.expensesLabel).textContent = obj.totalExp;  

if (obj.percentage > 0) {
    document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + "%"; 
} else {
    document.querySelector(DOMstrings.percentageLabel).textContent = "---"; 
}
},

    getDOMstrings: function() {
      return DOMstrings; 
    }
};
})(); 


//------------------------------------------------------------------------------


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
    // To delete items 
    document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem); 
};

var updateBudget = function() {
// 1. Calculate the budget 
budgetCtrl.calculateBudget(); 
// 2. Return the budget 
var budget = budgetCtrl.getBudget(); 
// 3. Display the budget on the UI
UICtrl.displayBudget(budget);
console.log(budget); 
}

// var DOM = UICtrl.getDOMstrings(); // makes the above DOMstring useable in this function as well 
var ctrlAddItem = function() {
    var input, newItem; 
// 1. Get the field input data
input = UICtrl.getInput();
console.log(input);

if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
// 2. Add the item to the controller 
newItem = budgetCtrl.addItem(input.type, input.description, input.value); 
// 3. Add the item to the UI
UICtrl.addListItem(newItem, input.type); 
// 4. Clear the fields 
UICtrl.clearFields();  
// 5. Calculate the budget budget
updateBudget(); 

   } 
};

// TO Delete items from the list //
var ctrlDeleteItem = function(event) {

var itemID, splitID, type, ID;
itemID = event.target.parentNode.parentNode.parentNode.parentNode.id; 

if (itemID){
    //inc-1
    splitID = itemID.split('-'); 
    type = splitID[0];
    ID = parseInt(splitID[1]); 

    // 1. delete the item from the data structure
    budgetCtrl.deleteItem(type, ID); 

    // 2. Delete the item from UI 
    UICtrl.deleteListItem(itemID);

    // 3. Update and show the new budget 
    updateBudget(); 
}

}; 

return {
    init: function() {
        console.log('Application has started'); 
        UICtrl.displayBudget({
            budget: 0,
            totalInc: 0, 
            totalExp: 0, 
            percentage: -1
        });
        setupEventListeners(); 

    }
};
})(budgetController, UIController);
controller.init(); 


//---------------------------------------------- NOTES (TO DO LIST) -----------------------------------

// Part 2 to do List 

// 1. Add event handler
// 2. Delete the item from our data structure 
// 3. Delete the items to the UI 
// 4. Re-calculate budget 
// 5. Update the UI
