document.addEventListener('DOMContentLoaded', ()=>{
  addIngredient()
  addSteps()
})

//function that adds ingredients to ingredient list
function addIngredient(){
  const ingredientBtn = document.querySelector('#ingredient_add')
  const ingredientField = document.querySelector('#recipe_ingredients')
  const ul = document.querySelector('#list_of_ingredients')

    ingredientBtn.addEventListener('click', (event)=>{
      event.preventDefault()
      if(ingredientField.value != ''){
      const li = document.createElement('li')
      li.className = 'ingredient'
      li.innerText = ingredientField.value
      ul.appendChild(li)
      ingredientField.value = ''
      }
  })
}

//function that adds steps to step list
function addSteps(){
  const stepsBtn = document.querySelector('#step_add')
  const stepsField = document.querySelector('#recipe_steps')
  const ol = document.querySelector('#list_of_steps')

    stepsBtn.addEventListener('click', (event)=>{
      event.preventDefault()
      if(stepsField.value != ''){
      const li = document.createElement('li')
      li.innerText = stepsField.value
      ol.appendChild(li)
      stepsField.value = ''
      }
    })
}


function submitNewRecipe(){
  const submitBtn = document.querySelector('.submit')
  submitBtn.addEventListener('submit', (event)=>{
    event.preventDefault()
    const recipeName = document.querySelector('#recipe_name').value
    const recipeImg = document.querySelector('#recipe_img').value
    const recipeIngredients = document.querySelector('#recipe_ingredient').value
    const recipeSteps = document.querySelector('#recipe_name').value
  })
}

function ingredientArray(){
  const listArray = document.querySelectorAll('.ingredient')
  const ingredientsArray = listArray.map(ingredient => ingredient.innerText)

  return ingredientsArray
}

//function to post new recipes to db.json
// function postNewRecipe(recipeName, recipeImg, recipeIngredients, recipeSteps){
//   if(recipeName != "" && recipeImg != "" && recipeIngredients != "" && recipeSteps != ""){
//     fetch('http://localhost:3000/recipes'),{
//       method: 'POST',
//       headers:
//       {
//       'Content-Type': 'application/json',
//        Accept: "application/json"
//       }
//       body: JSON.stringify({
//         'name':recipeName,
//         'image':recipeImg,
//         'ingredients': recipeIngredients,
//         'steps': recipeSteps
//       })
//     }
//     .then(resp=> resp.json())
//     .then(fetchRecipes) //need to create fetch for recipes
//     .catch((error)=> console.log('Error: ', error))
//   }
// }

// function fetchRecipes(){
//   fetch('http://localhost:3000/recipes')
//     .then(resp => resp.json())
//     .then(recipe => {
//       const card = document.createElement('div')
//       const h2 = document.createElement('h2')
//       const img = document.createElement('img')
//       const p = document.createElement('p')


//     })
// }

//need to create function to submit new toys which will feed the arguments for postNewRecipes()