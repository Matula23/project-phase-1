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