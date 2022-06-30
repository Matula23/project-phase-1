document.addEventListener('DOMContentLoaded', ()=>{
  addIngredient()
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