'use strict';

var _ = require('lodash');
var shortid = require('shortid');

////////////////////////////////////////////////////////////////////////////////
// PROPERTIES
////////////////////////////////////////////////////////////////////////////////

// Defines an initial set of gamesystems 
var gamesystems = [];

////////////////////////////////////////////////////////////////////////////////
// PUBLIC FUNCTIONS
////////////////////////////////////////////////////////////////////////////////

function getGameSystems(params) {

  var gamesystemsResult = gamesystems.slice();

  // Filter by name
  if (params.name !== undefined) {
    gamesystemsResult = _.filter(gamesystems, { name: params.name });
  }

  // Order by name
  if (params.sort !== undefined) {
    if (params.sort === 'name') {
      gamesystemsResult = _.orderBy(gamesystemsResult, ['name'], ['asc']);
    } else if (params.sort === '-name') {
      gamesystemsResult = _.orderBy(gamesystemsResult, ['name'], ['desc']);
    }
  }

  return gamesystemsResult;
}

function getGameSystemById(id) {
  return gamesystems.find(element => {
    return element.id === id;
  });
}

function getGameSystemByName(name) {
  return gamesystems.find(element => {
    return element.name === name;
  });
}

function createGameSystem(gameSystemP) {

  var newGameSystem = {
    id: shortid.generate(),
    name: gameSystemP.name,
    description: gameSystemP.description,
    image: gameSystemP.image
  };

  gamesystems.push(newGameSystem);

  return getGameSystemById(newGameSystem.id);
}

function updateGameSystem(gameSystemP) {

  var idToSearch = gameSystemP.id;

  var gameSystemToUpdate = getGameSystemById(idToSearch);

  if (gameSystemToUpdate !== undefined) {
    gameSystemToUpdate.name = gameSystemP.name;
    gameSystemToUpdate.description = gameSystemP.description;
    gameSystemToUpdate.image = gameSystemP.image;
  }

  return gameSystemToUpdate;
}

function deleteGameSystem(id) {

  var idToSearch = id;

  var gameSystemToDelete = getGameSystemById(idToSearch);

  if (gameSystemToDelete !== undefined) {
    _.remove(gamesystems, function (element) {
      return element.id === gameSystemToDelete.id;
    });
    return true;
  } else {
    return false;
  }
}

function initDefaultGameSystems(gamesystemsSet) {
  gamesystems = gamesystemsSet.slice();
}

module.exports = {
  getGameSystems,
  getGameSystemById,
  getGameSystemByName,
  createGameSystem,
  updateGameSystem,
  deleteGameSystem,
  initDefaultGameSystems
}

