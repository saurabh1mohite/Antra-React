const API = (() => {
  const URL = "http://localhost:3000";
  const getCart = () => fetch(URL + '/cart').then((data) => data.json());

  const getInventory = () => fetch(URL + '/inventory').then((data) => data.json())

  const addToCart = (inventoryItem) => {
    // define your method to add an item to cart
  };

  const updateCart = (id, newAmount) => {
  };
  

  const deleteFromCart = (id) => {
    // define your method to delete an item in cart
  };

  const checkout = () => {
    // you don't need to add anything here
    return getCart().then((data) =>
      Promise.all(data.map((item) => deleteFromCart(item.id)))
    );
  };

  return {
    getCart,
    updateCart,
    getInventory,
    addToCart,
    deleteFromCart,
    checkout,
  };
})();

const Model = (() => {
  // implement your logic for Model
  class State {
    #onChange;
    #inventory;
    #cart;
    constructor() {
      this.#inventory = [];
      this.#cart = [];
    }
    get cart() {
      console.log('get cart called');
      return this.#cart;
    }

    get inventory() {
      console.log('get inventory called');
      return this.#inventory;
    }

    set cart(newCart) {
      console.log('set cart called - ', newCart);
      this.#cart = newCart;
      this.#onChange();
    }
    set inventory(newInventory) {
      console.log('set inventory called - ', newInventory);
      this.#inventory = newInventory;
      this.#onChange();
    }
    updateCart(id) {
      const n = this.#inventory.length;
      for (let i = 0; i < n; ++i) {
        if (this.#inventory[i]['id'] === id) {
          const n1 = this.#cart.length;
          let flag = false;
          for (let j=0; j < n1; ++j) {
            if (this.#cart[j]['id'] == id) {
              this.#cart[j]['id'] += this.#inventory[i]['id']
              flag = true;
              break
            }
          }
          if (! flag) {
            this.#cart.push(this.#inventory[i]);
          }
          this.#inventory[i]['count'] = Math.max(0, this.#inventory[i]['count'] + 1)
          break
        }
      }
      addToCart()
    }
    updateInventory(id, updateAmount) {
      console.log('Update Inventory called')
      const n = this.#inventory.length;
      console.log(id);
      for (let i = 0; i < n; ++i) {
        if (this.#inventory[i]['id'] === id) {
          this.#inventory[i]['count'] = Math.max(0, this.#inventory[i]['count'] + 1)
          break
        }
      }
      console.log(this.#inventory)
      this.#onChange()
    }

    subscribe(cb) {
      this.#onChange = cb;
    }
  }
  const {
    getCart,
    updateCart,
    getInventory,
    addToCart,
    deleteFromCart,
    checkout,
  } = API;
  return {
    State,
    getCart,
    updateCart,
    getInventory,
    addToCart,
    deleteFromCart,
    checkout,
  };
})();

const View = (() => {
  // implement your logic for View
  const inventoryEl = document.querySelector('.inventory-container ul');
  const cartEl = document.querySelector('.cart-wrapper ul');
  
  // renderTodos
  const renderCartItems = (cartItems) => {
    let cartItemsTemp = "";
    cartItems.forEach((cartItem) => {
      const content = cartItem.content;
      console.log(content);
      const liTemp = `<li cartItem-id="${cartItem.id}"><span>${content}</span><span> X ${cartItem.count}</span><button class="delete-btn" >Delete</button></li>`;
      cartItemsTemp += liTemp;
    });
    cartEl.innerHTML = cartItemsTemp;
  }

  //render todos
  const renderInventoryItems = (inventoryItems) => {
    let inventoryItemsTemp = "";
    inventoryItems.forEach((inventoryItem) => {
      const content = inventoryItem.content;
      console.log(content);
      const liTemp = `<li inventoryItem-id="${inventoryItem.id}"><span>${content}</span><button class="reduce-btn" >-</button><span>${inventoryItem.count}</span><button class="add-to-cart-btn" >+</button><button class="add-btn" >Add to cart</button></li>`;
      inventoryItemsTemp += liTemp;
    });
    inventoryEl.innerHTML = inventoryItemsTemp;
  }




  return {
    renderInventoryItems,
    renderCartItems,
    inventoryEl,
    cartEl
  };
})();

const Controller = ((model, view) => {
  // implement your logic for Controller
  const state = new model.State();

  const init = () => {
    model.getCart().then((data) => {
      carItems = data.map((item) => ({ ...item, count: 0 }));
      state.cart = carItems;
    });

    model.getInventory().then((data) => {
      const inventoryItems = data.map((item) => ({ ...item, count: 0 }));
      console.log(inventoryItems);
      state.inventory = inventoryItems;
    });
  };
  const handleUpdateAmount = () => {
    view.inventoryEl.addEventListener("click", (event) => {
      if (event.target.className !== "reduce-btn") return;
      console.log("reduce!");
      const id = parseInt(event.target.parentNode.getAttribute("inventoryItem-id"));
      state.updateInventory(id, -1);
    });

    view.inventoryEl.addEventListener("click", (event) => {
      if (event.target.className !== "add-btn") return;
      console.log("add!");
      const id = parseInt(event.target.parentNode.getAttribute("inventoryItem-id"));
      state.updateInventory(id, 1);
    });
  };

  const handleAddToCart = () => {
    view.inventoryEl.addEventListener("click", (event) => {
      if (event.target.className !== "add-to-cart-btn") return;
      console.log("add!");
      const id = parseInt(event.target.parentNode.getAttribute("inventoryItem-id"));
      state.updateCart(id)
      state.updateInventory(id, -Infinity);
    });
  };

  const handleDelete = () => {};

  const handleCheckout = () => {};
  const bootstrap = () => {
    handleAddToCart();
    handleDelete();
    handleUpdateAmount();
    handleCheckout();
    init();
    state.subscribe(() => {
      console.log("In subscribe - ", state.inventory);
      view.renderInventoryItems(state.inventory);
      view.renderCartItems(state.cart);
    });
  };
  return {
    bootstrap,
  };
})(Model, View);

Controller.bootstrap();
