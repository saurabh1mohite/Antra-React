const items = [
    {
      name: "apple",
      category: "fruit"
    },
    {
      name: "Cucumber",
      category: "vegetable"
    },
    {
      name: "Banana",
      category: "fruit"
    },
    {
      name: "Celery",
      category: "vegetable"
    },
    {
      name: "orange",
      category: "fruit"
    },
    {
      name: "sausage",
      category: "meat"
    },
    {
      name: "bacon",
      category: "meat"
    }
  ];


function getCategories(items) {
    const select_categories = document.getElementById("category");
    
    for (let item of items) {
        console.log(item)
        const option = document.createElement('option');
        option.value = item
        option.text = item
        console.log(option)
        select_categories.appendChild(option)
    }
}


function getItems(category, items) {
    select_items = document.getElementById('item')
    select_items.innerHTML = ''
    console.log(select_items)
    items.forEach(item => {
        if (item['category'] === category) {
            console.log(category, item)
            const option = document.createElement('option')
            option.value = item['name']
            option.text = item['name']
            select_items.appendChild(option)
        }
    })
}

function setHeading(text) {
    const heading = document.getElementById('heading')
    heading.innerHTML = text
}

document.addEventListener('DOMContentLoaded', function() {
    const select_items = document.getElementById('item')
    const select_categories = document.getElementById('category')
    
    let categories = new Set()
    items.forEach(item => {
        categories.add(item['category'])
    })
    
    getCategories(categories);
    getItems(select_categories.value, items)
    setHeading(select_items.value)
    
    select_categories.addEventListener('change', function() {
        getItems(select_categories.value, items)
    })
    select_items.addEventListener('change', function() {
        setHeading(select_items.value)
    })
  });