
// Dynamically add food item (Instruction 1)

const items = [
    {
      type: "burger",
      category: "Burger ",
      image:
        "https://www.seriouseats.com/thmb/e16lLOoVEix_JZTv7iNyAuWkPn8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__recipes__images__2014__09__20140918-jamie-olivers-comfort-food-insanity-burger-david-loftus-f7d9042bdc2a468fbbd50b10d467dafd.jpg",
      title: "Hot Naga Burger",
      description:
        "No grill, no problemo! Here's how to make an incredible burger indoors on the stove. An optional quick seasoning mix takes it to the next level",
      CartButton: "Add To Cart",
      id: 1,
    },
  
    {
      type: "coffee",
      category: "Coffee",
      image:
        "https://insanelygoodrecipes.com/wp-content/uploads/2020/07/Cup-Of-Creamy-Coffee-500x375.png",
      title: "Hot Coffee",
      description:
        "Coffee is a beverage prepared from roasted coffee beans. Darkly colored, bitter, and slightly acidic, coffee has a stimulating effect on humans, primarily due to its caffeine content. ",
      CartButton: "Add To Cart",
      id: 2,
    },
  
    {
      type: "burger",
      category: "Burger ",
      image:
        "https://www.thecookierookie.com/wp-content/uploads/2023/04/featured-stovetop-burgers-recipe.jpg",
      title: "Chicken Burger",
      description:
        "No grill, no problemo! Here's how to make an incredible burger indoors on the stove. An optional quick seasoning mix takes it to the next level",
      CartButton: "Add To Cart",
      id: 3,
    },
    {
      type: "coffee",
      category: "Coffee ",
      image:
        "https://www.whiskaffair.com/wp-content/uploads/2021/04/Chocolate-Cold-Coffee-2-3.jpg",
      title: "Cold Coffee",
      description:
        "Cold coffee is my top beverage to sip on hot summer days. I make a lot of versions but this chocolate cold coffee has become my recent favorite",
      CartButton: "Add To Cart",
      id: 4,
    },
    {
      type: "burger",
      category: "Burger ",
      image:
        "https://mcdonalds.com.au/sites/mcdonalds.com.au/files/MCD_Category_Burgers_750x536_2023-0405.png",
      title: "Jumboo Burger",
      description:
        "Satisfy your ultimate hunger. Take two quarter pounds* of 100% Aussie beef, then complete the tasty picture with cheese, onions, tangy mustard and pickles. Bet your mouth is watering right now.",
      CartButton: "Add To Cart",
      id: 5,
    }
  ];

  // function for showing food , which returns html code for food card  (Instruction 1 (b))
  
  function showFood(food) {
    return ` <div class="item col-md-6 col-lg-4 p-3" data-category="coffee">
    <div class="card">
      <div class="img-container">
        <img src="${food.image}" alt="Coffee" />
        <span class="category-pill">${food.category}</span>
      </div>
      <div class="card-body">
        <h5 class="card-title">${food.title}</h5>
        <p class="card-text">${food.description}</p>
    
    
        <button class="addToCartBtn btn w-100">${food.CartButton}</button>
      </div>
    </div>
    </div>
    `;
  }

  // Select all the required DOM elements

  var allitems = document.querySelector("#iits-items");
  var searchFrom = document.querySelector("#searchForm");
  var searchVal = document.querySelector("#iits-searchBox");
  var carttext = document.getElementById("iits-cart_counter");
  var minusbtn = document.getElementById("cart_dec");
  const allToggleBtn = document.getElementById("all_toggle");
  const coffeeToggleBtn = document.getElementById("coffee_toggle");
  const burgerToggleBtn = document.getElementById("burger_toggle");
  var adminBtn = document.getElementById("iits-adminBtn");
  var additemform = document.getElementById("iits-adminSection");
  var cancelBtn = document.getElementById("iits-cancelBtn");
  const addNewItemForm = document.getElementById("iits-addNewForm");
  const title = document.querySelector("#name");
  const image = document.querySelector("#pic");
  const description = document.querySelector("#desc");
  const type = document.querySelector("#typeItem");
  const developerName = document.getElementById('iits-developer');
  let searchValLocal = "";


  // Render all item for Dom and also use for Both search and filter 
  
  function renderitems(elements) {
    allitems.innerHTML = "";
    elements.map(function (food) {
      if (food.title.toLowerCase().includes(searchValLocal.toLowerCase())) {  // // Adjustment for searching (normalization) [Instruction 2(a)]
        allitems.innerHTML += showFood(food);
      }
    });
    if (allitems.innerHTML == "")
      allitems.innerHTML = `<span class="bg-danger text-white py-2 rounded">Nothing Found</span>`;

    // Increment by 1 when click 'Add to Cart ' button , I put it here to make it work after any checking like searching , filtering , adding new item [Instruction 4, 9(b) ] 

    increment();
  }
  

  // Search functionality  
  
  searchFrom.addEventListener("submit", function (e) {
    e.preventDefault();
    searchValLocal = searchVal.value;
    const updatedData = items.filter((item) =>
      item.title.toLowerCase().includes(searchValLocal) 
    );
  
    renderitems(updatedData);
  });
  
  // initial rendering call
  renderitems(items);
  
  // Add click event listeners to the filter radio buttons
  allToggleBtn.addEventListener("click", handleCategoryToggle);
  coffeeToggleBtn.addEventListener("click", handleCategoryToggle);
  burgerToggleBtn.addEventListener("click", handleCategoryToggle);
  
  // Function to handle item filtering based on selected category [Instruction 3]

  function handleCategoryToggle(e) {
    const selectedCategory = e.target.value;
  
    console.log(selectedCategory);
  
    let filteredItems = [];
  
    if (selectedCategory === "all") {
      filteredItems = [...items];
    } else {
      filteredItems = items.filter(function (item) {
        return item.type === selectedCategory;
      });
    }
  
    renderitems(filteredItems);
  }
  
  //increment cart text after clicking "Add to cart" button  [Instruction 4]

  function increment() {
    let addToCart = document.querySelectorAll(".addToCartBtn");
    addToCart.forEach(function (btn) {
      btn.addEventListener("click", function () {
        carttext.textContent = parseInt(carttext.textContent) + 1;

        localStorage.setItem('CartCounter', carttext.textContent); // // Store in local Storage
        localStorage.getItem('CartCounter');
      });
    });
  }

  // Decrement Cart Text when press Minius (-) button [Instruction 5]
  
  minusbtn.addEventListener("click", function () {
    if (parseInt(carttext.textContent) > 0) {                   // Cart Counter always be less than Zero [Instruction 5(a)]
      carttext.textContent = parseInt(carttext.textContent) - 1;

      localStorage.setItem('CartCounter', carttext.textContent); // Store in local Storage
        localStorage.getItem('CartCounter');
    }
  });
  


  // Initailly admin form will be hidden 
  hideForm();

  // Function for hiddig admin form

    function hideForm() {
    additemform.style.display = "none";
  }

// Add event to the admin button (username and password checking , if right then admin form will be shown ) [Instruction 6]

  adminBtn.addEventListener("click", formhandling);
  
  function formhandling() {
    var enteredUsername = prompt("Please Enter Your Username : ");
    var enteredPassword = prompt("Please Enter Your Password : ");
  
    var correctUsername = "iits";
    var correctpassword = "23";
  
    if (
      enteredUsername == correctUsername &&
      enteredPassword == correctpassword
    ) {
      additemform.style.display = "block";    // If correct then admin form will be shown [Instruction 7]
    } else {
      alert("Wrong Credentials"); // IF not correct then Showing Alert [Instruction 8(a)]
    }
  }

  // Close form Button 

  cancelBtn.addEventListener("click", function () {
    additemform.style.display = "none";  // hide the form [Instruction 7(a)]
  });
  
// Add event in the admin form submit button  [Handle form submission  [Instruction 9]]

  addNewItemForm.addEventListener("submit", function (e) {
    e.preventDefault();
    addNewItem();
  });

  // Function for add New Item [Instruction 9]
   
  function addNewItem ()
  {
    //checking whether the array is empty or not , if empty then last id will be 0 otherwise last id will be array's last id 
    let lastObj = items[items.length - 1];
    let lastId = 0;
    if (lastObj != undefined) {
      let lastId = lastObj.id;
    }
  // input value from the admin form will be store in this array 'newObj'
    let newObj = {
      type: type.value,
      category: type.value,
      image: image.value,
      title: title.value,
      description: description.value,
      id: lastId + 1,
      CartButton: "Add to Cart",
    };
  
    //Check Wheather every feilds is fill up or not , if not then it will be shown a alert 
  
    if (                       // User cant submit form without not only choosing type but also fill up all of the feilds [Instruction 9(c)]
      type.value === "" ||
      image.value === "" ||
      title.value === "" ||
      description.value === ""
    ) {
      alert(" Please Fill Up Every Feilds");
    }
  
    //If yes then item will be added and then clear the form and hide the form also

    else {
      items.push(newObj);  // It will push to the older array name items , thats why it will render in the same way and as a result it will be shown same as older items [Instruction 9(a)]
      renderitems(items);
      clearForm();
      newObj = "";
    }
  }

//function for clear the admin form , used for after submiting

  function clearForm() {
    description.value = "";
    title.value = "";
    image.value = "";
    type.value = "";
  }

  // Adding Developer Name 

  developerName.textContent = 'Md. Fazlah Karim Alvee';