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
      const li = document.createElement('li')
      li.innerText = ingredientField.value
      ul.appendChild(li)
      ingredientField.value = ''
    })
}

//function that adds steps to step list
function addSteps(){
  const stepsBtn = document.querySelector('#step_add')
  const stepsField = document.querySelector('#recipe_steps')
  const ol = document.querySelector('#list_of_steps')

    stepsBtn.addEventListener('click', (event)=>{
      event.preventDefault()
      const li = document.createElement('li')
      li.innerText = stepsField.value
      ol.appendChild(li)
      stepsField.value = ''
    })
}

//function to post new recipes to db.json
function postNewRecipe(recipeName, recipeImg, recipeIngredients, recipeSteps){
  if(recipeName != "" && recipeImg != "" && recipeIngredients != "" && recipeSteps != ""){
    fetch('http://localhost:3000/recipes'),{
      method: 'POST',
      headers:
      {
      'Content-Type': 'application/json',
       Accept: "application/json"
      }
      body: JSON.stringify({
        'name':recipeName,
        'image':recipeImg,
        'ingredients': recipeIngredients,
        'steps': recipeSteps
      })
    }
    .then(resp=> resp.json())
    .then fetchRecipes() //need to create fetch for recipes
    .catch((error)=> console.log('Error: ', error))
  }
}