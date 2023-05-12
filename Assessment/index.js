const API = (() => {
  const URL = "http://localhost:3000";
  const getCart = () => fetch(URL + '/cart').then((data) => data.json());

  const getInventory = () => fetch(URL + '/inventory').then((data) => data.json())

  const addToCart = (item) => {
    return fetch(URL + '/cart', {
        method: "POST",
        body: JSON.stringify(item),
        headers: {
            "Content-Type": "application/json",
        },
    }).then((data) => data.json());
};

  const updateCart = (id, newAmount) => {
    return fetch(URL + '/cart/' + id, {
      method: "PUT",
      body: JSON.stringify(newAmount),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((data) => data.json());
  };
  

  const deleteFromCart = (id) => {
    return fetch(URL + "/cart/" + id, { method: "DELETE" }).then((data) => data.json());
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
    updateInventory(id, updateAmount) {
      console.log('Update Inventory called')
      const n = this.#inventory.length;
      console.log(id);
      for (let i = 0; i < n; ++i) {
        if (this.#inventory[i]['id'] === id) {
          this.#inventory[i]['count'] = Math.max(0, this.#inventory[i]['count'] + updateAmount)
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
  const checkoutBtn = document.querySelector('.checkout-btn');
  
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
      const liTemp = `<li inventoryItem-id="${inventoryItem.id}"><span>${content}</span><button class="reduce-btn" >-</button><span>${inventoryItem.count}</span><button class="add-btn" >+</button><button class="add-to-cart-btn" >Add to cart</button></li>`;
      inventoryItemsTemp += liTemp;
    });
    inventoryEl.innerHTML = inventoryItemsTemp;
  }




  return {
    renderInventoryItems,
    renderCartItems,
    inventoryEl,
    cartEl,
    checkoutBtn
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
      // state.updateCart(id)
      cartInsertObj = state.inventory.filter((item) => item.id === id)[0]
      if (state.cart.filter((item => item.id === id)).length !== 0) {
        // put
        console.log('PUT')
        cartExistingObj = state.cart.filter((item => item.id === id))[0]
        cartExistingObj['count'] += cartInsertObj['count']
        model.updateCart(cartInsertObj).then((data) => {
          state.cart = [cartExistingObj, ...state.cart.filter((item) => item.id !== id)]
          state.updateInventory(id, -Infinity);
        })
      } else {
        //post
        console.log('POST')
        model.addToCart(cartInsertObj).then((data) => {
          state.cart = [data, ...state.cart]
          state.updateInventory(id, -Infinity);
        })
  
      }


    });
  };

  const handleDelete = () => {
    view.cartEl.addEventListener("click", (event) => {
      if (event.target.className !== "delete-btn") return;
      console.log("delete!");
      const id = parseInt(event.target.parentNode.getAttribute("cartItem-id"));
      console.log(id)
      model.deleteFromCart(id).then((data) => {
        state.cart = state.cart.filter((item) => item.id !== id);
      });

    });
  };

  const handleCheckout = () => {
    // Call the checkout function from the model
    view.checkoutBtn.addEventListener("click", (event) => {
      console.log('checkout')
      event.preventDefault()
      if (event.target.className !== "checkout-btn") return;
      model.checkout().then(() => {
        state.cart = []
        console.log("Checkout successful");
      });
    });
  };

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
