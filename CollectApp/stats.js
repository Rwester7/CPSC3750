const apiKey = 'e5cfe44c0768408d9e73c1cdb85bbf1b';

fetch('https://api.spoonacular.com/stats/usage?apiKey=' + apiKey)
  .then(response => {
    if (!response.ok) {
      throw new Error('Error fetching usage statistics');
    }
    return response.json();
  })
  .then(data => {
    console.log('Usage Statistics:', data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
