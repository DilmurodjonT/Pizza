let formPizza = document.querySelector("#pizza-form");
let userInput = document.querySelector("#name-input");
let errorName = document.querySelector(".error-name");
let phoneInput = document.querySelector("#number-input");
let errorNumber = document.querySelector(".error-number");
let addressInput = document.querySelector("#address-input");
let errorAddress = document.querySelector(".error-address");
let $root = document.querySelector(".root");
let submitBtn = document.querySelector(".submit-btn");
let sizePizza = document.querySelector(".submit-btn");
let openBtn = document.querySelector(".submit-btn");
let modal = document.querySelector(".modal");
let closeBtn = document.querySelector(".close-btn");

let ordersArr = [];

let order = {
  username: "",
  phoneNumber: "",
  address: "",
  thickness: "",
  size: "",
  onPizza: [],
  addPizza: [],
  total: 0,
};

/////////////////////Error
userInput.addEventListener("input", function (e) {
  let userValue = e.target.value;
  if (userValue.length < 4) {
    errorName.classList.remove("error-name_hid");
    order.username = "";
  } else if (userValue.length >= 4) {
    errorName.classList.add("error-name_hid");
    order.username = e.target.value;
    check();
  }
});

phoneInput.addEventListener("input", function (e) {
  let phoneNumber = e.target.value;
  if (phoneNumber.length < 8) {
    errorNumber.classList.remove("error-number_hid");
    order.phoneNumber = "";
  } else if (phoneNumber.length >= 8) {
    errorNumber.classList.add("error-number_hid");
    order.phoneNumber = e.target.value;
    check();
  }
});

addressInput.addEventListener("input", function (e) {
  let addressValue = e.target.value;
  if (addressValue.length < 12) {
    errorAddress.classList.remove("error-address_hid");
    order.address = "";
  } else if (addressValue.length >= 12) {
    errorAddress.classList.add("error-address_hid");
    order.address = e.target.value;
    check();
  }
});

//////////////////////////
formPizza.addEventListener("change", function (e) {
  if (e.target.name === "dough-pizza") {
    if (e.target.value === "none") {
      order.thickness = "";
    } else {
      order.thickness = e.target.value;
      check();
    }
  } else if (e.target.type === "radio") {
    order.size = e.target.value;
    check();
  } else if (e.target.type === "checkbox") {
    let checkboxValue = e.target.value;

    if (e.target.name === "pizzaType") {
      if (e.target.checked) {
        order.onPizza.push(e.target.value);
      } else {
        order.onPizza.forEach(function (element, index) {
          if (element === checkboxValue) {
            order.onPizza.splice(index, index + 1);
          }
        });
      }
      check();
    } else if (e.target.name === "addPizzaType") {
      if (e.target.checked) {
        order.addPizza.push(e.target.value);
      } else {
        order.addPizza.forEach(function (element, index) {
          if (element === checkboxValue) {
            order.addPizza.splice(index, index + 1);
          }
        });
      }
    }
  }
});

//////////////////modal
submitBtn.addEventListener("click", (event) => {
  //modal.classList.add("modal-show");
  event.preventDefault();

  if (order.thickness === "Thin") {
    order.total = 10;
  } else if (order.thickness === "Medium") {
    order.total = 12;
  } else if (order.thickness === "Thick") {
    order.total = 15;
  }

  if (order.size === "25") {
    order.total += 10;
  } else if (order.size === "30") {
    order.total += 12;
  } else if (order.size === "35") {
    order.total += 15;
  }

  if (order.onPizza.length !== 0) {
    order.total += order.onPizza.length * 5;
  }

  if (order.addPizza.length !== 0) {
    order.total += order.addPizza.length * 3;
  }

  ordersArr.push(order);

  order = {
    username: "",
    phoneNumber: "",
    address: "",
    thickness: "",
    size: "",
    onPizza: [],
    addPizza: [],
    total: 0,
  };

  $root.innerHTML = "";
  let htmlText = "";
  for (let i = 0; i < ordersArr.length; i++) {
    let obj = ordersArr[i];

    htmlText += '<li class="item">';
    htmlText += '<p class="user-client">Order Number: ' + (i + 1) + "</p>";
    htmlText += '<p class="user-client">Username: ' + obj.username + "</p>";
    htmlText +=
      '<p class="user-client">PhoneNumber:  ' + obj.phoneNumber + "</p>";
    htmlText += '<p class="user-client">Address: ' + obj.address + "</p>";
    htmlText += '<p class="user-client">Thickness: ' + obj.thickness + "</p>";
    htmlText += '<p class="user-client">Size: ' + obj.size + "</p>";
    let str1 = "";
    for (let i = 0; i < obj.onPizza.length; i++) str1 += obj.onPizza[i] + " ";
    htmlText += '<p class="user-client">OnPizza: ' + str1 + "</p>";
    let str2 = "";
    for (let i = 0; i < obj.addPizza.length; i++) str2 += obj.addPizza[i] + " ";
    htmlText += '<p class="user-client">AddPizza: ' + str2 + "</p>";
    htmlText += '<p class="user-client">Total: ' + obj.total + "</p>";
    htmlText += "</li>";

    $root.innerHTML = htmlText;
  }
  submitBtn.classList.add("btn-disable");
});

function check() {
  if (
    order.username !== "" &&
    order.phoneNumber !== "" &&
    order.address !== "" &&
    order.thickness !== "" &&
    order.size !== "" &&
    order.onPizza.length !== 0
  ) {
    submitBtn.classList.remove("btn-disable");
  }
}

///////////////////////////////
openBtn.addEventListener("click", () => {
  modal.classList.add("modal-show");
});
closeBtn.addEventListener("click", () => {
  modal.classList.remove("modal-show");
});
