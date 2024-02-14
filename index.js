// Import the readline module for handling user input in the console
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin, // Read from standard input (keyboard)
  output: process.stdout, // Write to standard output (console)
});

let groceryListArr = [
  {
    name: "apple",
    quantity: 2,
    price: 1.25,
    bought: "false",
  },
];

function start() {
  displayList();

  rl.question(
    "What would you like to do (1.add item to list 2.remove item from list 3.set bought staus for item) ",
    (answer) => {
      if (answer === "1") {
        addItem();
      } else if (answer === "2") {
        rl.question("What is the items name: ", (name) => {
          removeItem(name);
        });
      } else if (answer === "3") {
        rl.question("What is the items name: ", (name) => {
          setBoughtSatus(name);
        });
      } else {
        end();
      }
    }
  );
};

function displayList() {
  for (let i = 0; i < groceryListArr.length; i++) {
    console.log(
      `Name: ${groceryListArr[i].name}
      Quantity: ${groceryListArr[i].quantity} 
      Price: ${groceryListArr[i].price} 
      Bought: ${groceryListArr[i].bought}`
    );
  }
};

function Item(name = "", quantity = 0, price = 0, bought = false) {
  this.name = name;
  this.quantity = quantity;
  this.price = price;
  this.bought = bought;
};

function addItem() {
  rl.question("Enter the item's name: ", (answer) => {
    let newItem = new Item();
    newItem.name = answer;
    console.log(newItem);

    rl.question("Enter the item's price (in USD): ", (answer) => {
      newItem.price = parseInt(answer);
      console.log(newItem);

      rl.question("Enter the quantity of the item: ", (answer) => {
        newItem.quantity = parseInt(answer);
        console.log(newItem);

        rl.question("Has the item been bought (yes or no): ", (answer) => {
          if (answer === "yes") {
            newItem.bought = true;
          } else if (answer === "no") {
            newItem.bought = false;
          }
          console.log(newItem);
          groceryListArr.push(newItem);

          start();
        });
      });
    });
  });
}

function removeItem(name) {
  for (let i = 0; i < groceryListArr.length; i++) {
    if (groceryListArr[i].name === name) {
      let foundItemIndex = i;
      groceryListArr.splice(foundItemIndex, 1);
      console.log("That item has been removed");
      start();
    } else {
      console.log("Couldn't find that item");
    }
    start();
  }
}

function setBoughtSatus(name) {
  console.log(name);
  for (let i = 0; i < groceryListArr.length; i++) {
    if (groceryListArr[i].name === name) {
      console.log(groceryListArr[i].bought);
      if (groceryListArr[i].bought === "true") {
        groceryListArr[i].bought = "false";
      } else {
        groceryListArr[i].bought = "true";
      }
      console.log("That item's bought status has been updated");
      console.log(groceryListArr);
      start();
    } else {
      console.log("Couldn't find that item");
    }
    start();
  }
}

function end() {
  rl.close();
}

start();
