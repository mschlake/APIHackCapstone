'use strict';

var currentCharacter = 1;
const apiKey = '3108457009190775';

//display characters and information on page
function displayResults(responseJson) {
  $('#results-list').empty();
  for (let i=0;i<responseJson.results.length;i++){
    $('#results-list').append(
      `<li class="item"> 
      <h3>${responseJson.results[i].name}</h3>
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
        <button type="button" id="${responseJson.results[i].id}" class="button teamButton js-assoc-button">Super Team(s)</button>
      </li>
      <div id="${responseJson.results[i].id}teams" class="hidden">
      <section id="${responseJson.results[i].id}associates">
          <ul id="associate-list" class="group">
          </ul>
      </section>
      </div>`
      ); 
  let currentCharacter = responseJson.results[i].id
  teamButton(currentCharacter);
  }
  $('#results').removeClass('hidden');
  $('#js-error-message').empty()
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
      displayResults(responseJson)
      })
    .catch(err => {
      $('#results').addClass('hidden');
      $('#results-list').empty();
      $('#js-error-message').text(`${userCharacter} Character Not Found. Try adding a dash ("-") (i.e. Spider-man).`);
    });
}

// find super teams
function findTeams(newCharacter){
  let url = `https://www.superheroapi.com/api.php/${apiKey}/${newCharacter}/connections`;
  fetch(url)
    .then (response => {
      return response.json();
    })
    .then (responseJson => {
      if(responseJson){
        displayTeams(responseJson, newCharacter);
      }
    })
    .catch (err => {
      console.log(err);
      $('#js-error-message').text(`No Super Teams found for ${userCharacter} Character.`);
    });
}

// display super team
function displayTeams(data, newCharacter){
  $(`#${newCharacter}associates`).empty();
  let groupAffiliation = data["group-affiliation"].split(",");
  for (let i=0;i<groupAffiliation.length;i++){
  $(`#${newCharacter}associates`).append(
    `<li class="item"> 
      <h3 class="superTeams">${groupAffiliation[i]}</h3>  
    </li>`
  )};
  $(`#${newCharacter}teams`).removeClass('hidden');
  $('#js-error-message').empty();
}

// watch super team button
function teamButton(currentCharacter){
    $('button').on('click', event => {
    findTeams(event.target.id);
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
