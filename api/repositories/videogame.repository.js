'use strict';

var _ = require('lodash');
var shortid = require('shortid');

////////////////////////////////////////////////////////////////////////////////
// PROPERTIES
////////////////////////////////////////////////////////////////////////////////

// Defines an initial set of gamesystems 
var videogames = [];

////////////////////////////////////////////////////////////////////////////////
// PUBLIC FUNCTIONS
////////////////////////////////////////////////////////////////////////////////

function getVideoGames(params) {

  var videogamesResult = videogames.slice();

  // Filter by name
  if (params.name !== undefined) {
    videogamesResult = _.filter(videogamesResult, { name: params.name });
  }
  // Filter by developer
  if (params.developer !== undefined) {
    videogamesResult = _.filter(videogamesResult, { developer: params.developer });
  }
  // Filter by game system
  if (params.gamesystem !== undefined) {
    videogamesResult = _.filter(videogamesResult, { gamesystem: params.gamesystem });
  }
  // Filter by genre
  if (params.genre !== undefined) {
    videogamesResult = _.filter(videogamesResult, { genre: params.genre });
  }
  // Filter by year
  if (params.year !== undefined) {
    videogamesResult = _.filter(videogamesResult, { year: params.year });
  }

  // Order by field
  if (params.sort !== undefined) {

    var direction;
    var nameField;

    if (_.startsWith(params.sort, '-')) {
      direction = 'desc';
      nameField = params.sort.substring(1);
    } else {
      direction = 'asc';
      nameField = params.sort;
    }

    videogamesResult = _.orderBy(videogamesResult, [nameField], [direction]);

  }

  // Returning only specific fields
  if (params.fields !== undefined) {
    videogamesResult = stripVideoGames(params.fields, videogamesResult);
  }

  return videogamesResult;
}

function getVideoGameById(id) {
  return videogames.find(element => {
    return element.id === id;
  });
}

function getVideoGameByName(name) {
  return videogames.find(element => {
    return element.name === name;
  });
}

function createVideoGame(videogameP) {

  var newVideoGame = {
    id: shortid.generate(),
    name: videogameP.name,
    developer: videogameP.developer,
    gamesystem: videogameP.gamesystem,
    genre: videogameP.genre,
    year: videogameP.year,
    image: videogameP.image
  };

  videogames.push(newVideoGame);

  return getVideoGameById(newVideoGame.id);
}

function updateVideoGame(params) {

  var idToSearch = params.id;
  var videogameToUpdate = getVideoGameById(idToSearch);

  if (videogameToUpdate !== undefined) {
    videogameToUpdate.name = params.name;
    videogameToUpdate.developer = params.developer;
    videogameToUpdate.gamesystem = params.gamesystem;
    videogameToUpdate.genre = params.genre;
    videogameToUpdate.year = params.year;
  }

  return videogameToUpdate;
}

function deleteVideoGame(id) {

  var idToSearch = id;

  var videogameToDelete = getVideoGameById(idToSearch);

  if (videogameToDelete !== undefined) {
    _.remove(videogames, function (element) {
      return element.id === videogameToDelete.id;
    });
    return true;
  } else {
    return false;
  }
}

function stripVideoGames(fields, videogames) {

  var arrayFields = fields.split(',');

  var strippedVideoGameResults = _.map(videogames, function (videogame) {
    return _.pick(videogame, arrayFields);
  });

  return strippedVideoGameResults;
}

function initDefaultVideoGames(videogamesSet) {
  videogames = videogamesSet.slice();
}

module.exports = {
  getVideoGames,
  getVideoGameById,
  getVideoGameByName,
  createVideoGame,
  updateVideoGame,
  deleteVideoGame,
  initDefaultVideoGames
}
