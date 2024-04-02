
const apiKey = 'e5cfe44c0768408d9e73c1cdb85bbf1b';
const searchInput = document.getElementById('searchInput');
const searchNum = document.getElementById('searchNum');
const cuisineSelect = document.getElementById('cuisineSelect');
const dietSelect = document.getElementById('dietSelect');
const searchButton = document.getElementById('searchButton');
const recipeContainer = document.getElementById('recipeContainer');

searchButton.addEventListener('click', function () {
    let query = searchInput.value.trim();
    // Lists all if no specifier
    if (query === '') {
        query = ''; 
    }

    let query2 = searchNum.value.trim();
    // Sets auto to 100 if nothing entered
    if (query2 === '') {
        query2 = 100;
    }
    
    let cuisineSelect = document.getElementById('cuisineSelect');
    let query3 = cuisineSelect.options[cuisineSelect.selectedIndex].value;
    // Lists all types if no specifier
    if (query3 === '') {
        query3 = '';
    }
    
    let dietSelect = document.getElementById('dietSelect');
    let query4 = dietSelect.options[dietSelect.selectedIndex].value;
    // Lists all types if no specifier
    if (query4 === '') {
        query4 = '';
    }
    
    const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=${query2}&cuisine=${query3}&diet=${query4}&apiKey=${apiKey}`;

    fetch(apiUrl)
        .then(response => {
            // Error Check
            if (!response.ok) {
                alert('Error fetching recipes.');
                throw new Error('Error fetching recipes.');
            }
            return response.json();
        })
        .then(data => {
            recipeContainer.innerHTML = '';
            getRecipes(data.results);
        })
        .catch(error => {
            console.error('There was a problem with your fetch operation:', error);
        });
});
// Lists all the recipes that fit criteria
function getRecipes(recipes) {
    recipeContainer.classList.add('recipe-container');
    recipeContainer.innerHTML = '';

    recipes.forEach(recipe => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        // Whats shown for it
        recipeDiv.innerHTML = `
            <h3>${recipe.title}</h3>
            <img src="${recipe.image}">
            <br>
            <button onclick="getRecipeDetails(${recipe.id})">Recipe Details</button>
        `;
        recipeContainer.appendChild(recipeDiv);
    });
}
// Gets more info on it
function getRecipeDetails(recipeId) {
    const apiUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}&includeNutrition=false`;
    
    fetch(apiUrl)
        .then(response => {
            // Error Check
            if (!response.ok) {
                alert('Error fetching recipe details.');
                throw new Error('Error fetching recipe details.');
            }
            return response.json();
        })
        .then(data => {
            // Display recipe details in separate container
            displayRecipeDetails(data);
        })
        .catch(error => {
            console.error('There was a problem with fetching recipe details:', error);
        });
}
// Makes elements to display recipe details info in formatted way
function displayRecipeDetails(recipeData) {
    const recipeDetailsContainer = document.getElementById('recipeDetailsContainer');
    recipeDetailsContainer.innerHTML = '';

    const titleElement = document.createElement('h2');
    titleElement.textContent = recipeData.title;

    const imageElement = document.createElement('img');
    imageElement.src = recipeData.image;

    const ingredientsList = document.createElement('ul.k');
    recipeData.extendedIngredients.forEach(ingredient => {
        const listItem = document.createElement('li');
        listItem.textContent = `${ingredient.name}: ${ingredient.amount} ${ingredient.unit}`;
        ingredientsList.appendChild(listItem);
    });

    const instructionsElement = document.createElement('p.z');
    instructionsElement.innerHTML = recipeData.instructions;

    recipeDetailsContainer.appendChild(titleElement);
    recipeDetailsContainer.appendChild(imageElement);
    
    const brElement = document.createElement('br');
    const instructionsText = document.createTextNode("Ingredients:");
    recipeDetailsContainer.appendChild(brElement);
    recipeDetailsContainer.appendChild(instructionsText);
    
    recipeDetailsContainer.appendChild(ingredientsList);
    
    const instructionsText2 = document.createTextNode("Instructions:");
    const brElement2 = document.createElement('br');
    recipeDetailsContainer.appendChild(brElement2);
    recipeDetailsContainer.appendChild(instructionsText2);
    
    recipeDetailsContainer.appendChild(instructionsElement);
}
