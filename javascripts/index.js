//Event listneer that starts up on load of DOM
document.addEventListener('DOMContentLoaded', () => {
  fetchRecipes()
  addIngredient()
  addSteps()
  submitNewRecipe()
  deleteList()
})

//removes ingredients or steps on doubleclick
function deleteList(){
  document.addEventListener('dblclick', (event) =>{
    if(event.target.className === 'ingredient' || event.target.className === 'step'){
      event.target.remove()
    }
  })
}

//function that adds ingredients to ingredient list
function addIngredient() {
  const ingredientBtn = document.querySelector('#ingredient_add')
  const ingredientField = document.querySelector('#recipe_ingredients')
  const ul = document.querySelector('#list_of_ingredients')

  ingredientBtn.addEventListener('click', (event) => {
    event.preventDefault()
    if (ingredientField.value != '') {
      const li = document.createElement('li')
      li.className = 'ingredient'
      li.innerText = ingredientField.value
      ul.appendChild(li)
      ingredientField.value = ''
    }
  })
}

//function that adds steps to step list
function addSteps() {
  const stepsBtn = document.querySelector('#step_add')
  const stepsField = document.querySelector('#recipe_steps')
  const ol = document.querySelector('#list_of_steps')

  stepsBtn.addEventListener('click', (event) => {
    event.preventDefault()
    if (stepsField.value != '') {
      const li = document.createElement('li')
      li.className = "step"
      li.innerText = stepsField.value
      ol.appendChild(li)
      stepsField.value = ''
    }
  })
}

//function to submit new recipes that will feed to post function
function submitNewRecipe() {
  document.addEventListener('submit', (event) => {
    event.preventDefault()
    const recipeName = document.querySelector('#recipe_name').value
    const recipeImg = document.querySelector('#recipe_img').value
    const recipeIngredients = ingredientArray()
    const recipeSteps = stepArray()

    postNewRecipe(recipeName, recipeImg, recipeIngredients, recipeSteps)

    document.querySelector('#list_of_ingredients').innerHTML = ""
    document.querySelector('#list_of_steps').innerHTML = ""

  })
}

// Adds all current ingredients listed into an array that will be used to post to db.json
function ingredientArray() {
  const listArray = document.querySelectorAll('.ingredient')
  const ingredientsArray = [...listArray].map(ingredient => ingredient.innerText) // use spread operator because the node list array selected from the DOM is not a typical array and can't use array methods on it.

  return ingredientsArray
}

// Adds all current steps listed into an array that will be used to post to db.json
function stepArray() {
  const listArray = document.querySelectorAll('.step')
  const stepsArray = [...listArray].map(ingredient => ingredient.innerText) // remove spread operator

  return stepsArray
}

// function to post new recipes to db.json
function postNewRecipe(recipeName, recipeImg, recipeIngredients, recipeSteps) {
  if (recipeName != "" && recipeImg != "" && recipeIngredients != "" && recipeSteps != "") {
    fetch('http://localhost:3000/recipes', {
      method: 'POST',
      headers:
      {
        'Content-Type': 'application/json',
        Accept: "application/json"
      },
      body: JSON.stringify({
        'name': recipeName,
        'image': recipeImg,
        'ingredients': recipeIngredients,
        'steps': recipeSteps,
      })
    })
      .then(resp => resp.json())
      .then(fetchRecipes)
      .catch((error) => console.log('Error: ', error))

    document.querySelector('#recipe_name').value = ''
    document.querySelector('#recipe_img').value = ''
  }
}

//function that fetches recipes when page is loaded or when new recipes are created
function fetchRecipes() {
  fetch('http://localhost:3000/recipes')
    .then(resp => resp.json())
    .then(recipes => {
      const recipeCollection = document.querySelector('#recipe_collection')
      recipeCollection.innerHTML = ''
      recipes.map(recipe => {
        //create all recipe elements
        const card = document.createElement('div')
        const h2 = document.createElement('h2')
        const h3Ingredient = document.createElement('h3')
        const h3Steps = document.createElement('h3')
        const img = document.createElement('img')
        const btn = document.createElement('button')

        //assign values to all recipe elements
        card.className = 'card'
        card.id = `id_${recipe.id}`
        h2.innerHTML = recipe.name
        img.src = recipe.image
        img.className = 'recipe_img'
        h3Ingredient.innerText = 'Ingredients'
        h3Steps.innerText = 'Recipe Steps'
        btn.innerText = 'Delete'
        btn.className = 'delete_btn'

        //append all elements to DOM
        recipeCollection.appendChild(card)
        card.appendChild(h2)
        card.appendChild(img)
        card.appendChild(h3Ingredient)
        const ul = document.createElement('ul')
        ul.className = 'steps'
        recipe.ingredients.forEach(ingredient => {
          const li = document.createElement('li')
          li.innerText = ingredient
          h3Ingredient.appendChild(ul)
          ul.appendChild(li)
        })

        card.appendChild(h3Steps)
        const ol = document.createElement('ol')
        ol.className = 'steps'
        recipe.steps.forEach(step => {
          const li = document.createElement('li')
          li.innerText = step
          h3Steps.appendChild(ol)
          ol.appendChild(li)
        })
        //add delete button with delete functionality
        card.appendChild(btn)
        btn.addEventListener('click', () => {
          fetchDelete(recipe.id)
        })
      })
    })
}

//delete fetch
function fetchDelete(id) {
  fetch(`http://localhost:3000/recipes/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(fetchRecipes)
}
