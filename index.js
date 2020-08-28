'use strict';

var currentCharacter = 1;
const apiKey = '3108457009190775';

//display characters and information on page
function displayResults(responseJson) {
  $('#results-list').empty();
  for (let i=0;i<responseJson.results.length;i++){
    $('#results-list').append(
      `<li class="item"> 
      <h3 class>${responseJson.results[i].name}</h3>  
      <img src="${responseJson.results[i].image.url}" class="results-img">
      <ul>
        <li class="realName">True Identity:<br> ${responseJson.results[i].biography['full-name']} (${responseJson.results[i].appearance.race})</li>
        <li>Height: <br>${responseJson.results[i].appearance.height}</li>
        <li>Weight: <br>${responseJson.results[i].appearance.weight}</li>
      </ul>
      <h4 class="powerStats">Power Stats</h4>
      <ul>
        <li>Intelligence: ${responseJson.results[i].powerstats.intelligence}</li>
        <li>Strength: ${responseJson.results[i].powerstats.strength}</li>
        <li>Speed: ${responseJson.results[i].powerstats.speed}</li>
      </ul>
      <ul>  
        <li>Durability: ${responseJson.results[i].powerstats.durability}</li>
        <li>Power: ${responseJson.results[i].powerstats.power}</li>
        <li>Combat: ${responseJson.results[i].powerstats.combat}</li>
      </ul>
        <button type="button" id="assoc-button" class="button assoc-button">Super Team(s)</button>
      </li>`
      )}; 
  $('#results').removeClass('hidden');
  $('#js-error-message').empty()
  teamButton();
};

//find character user inputs
function findCharacter(query) {
  var userCharacter = $('input').val();
  fetch('https://www.superheroapi.com/api.php/'+apiKey+'/search/'+userCharacter)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => {
      currentCharacter = responseJson.results[0].id
      displayResults(responseJson)
      })
    .catch(err => {
      $('#results').addClass('hidden');
      $('#results-list').empty();
      $('#js-error-message').text(`${userCharacter} Character Not Found. Try adding a dash ("-") (i.e. Spider-man).`);
    });
}

// watch form
function watchForm(){
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    findCharacter(searchTerm);
  });
}

$(watchForm);

// find super teams
function findTeams(){
  let url = `https://www.superheroapi.com/api.php/${apiKey}/${currentCharacter}/connections`;
  fetch(url)
    .then (response => {
        return response.json();
    })
    .then (responseJson => {
      console.log(responseJson);
      displayTeams(responseJson);
    })
    .catch (err => console.log(err)
    )
}

// display super team
function displayTeams(){
  $('#associates').empty();
  for (let i=0;i<responseJson.results.length;i++){
    $('#associates').append(
    `<li class="item"> 
      <h3 class>${responseJson.results[i].connections.group-affiliation}</h3>  
    </li>`
    )}; 
  $('#associates').removeClass('hidden');
}

// watch super team button
function teamButton(){
    $('#assoc-button').click(event => {
    event.preventDefault();
    findTeams();
  });
}
