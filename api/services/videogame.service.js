'use strict';

var _ = require('lodash');

var gamesystemService = require('../services/gamesystem.service');
var videogameRepository = require('../repositories/videogame.repository');
var messageHelper = require('../helpers/message.helper');

////////////////////////////////////////////////////////////////////////////////
// CONSTANTS
////////////////////////////////////////////////////////////////////////////////

// Error Messages
const VG_SVC_ERR_CREATE_VG_ALREADY_EXISTS_WITH_SAME_NAME = 'Not possible to create videogame. Videogame exists yet for the same gamesystem';
const VG_SVC_ERR_CREATE_VG_GAMESYSTEM_NOT_FOUND = 'Gamesystem not found inserting a new videogame';
const VG_SVC_ERR_UPDATE_VG_VIDEOGAME_NOT_FOUND = 'Videogame not found updating a videogame';
const VG_SVC_ERR_DELETE_VG_VIDEOGAME_NOT_FOUND = 'Videogame not found deleting a videogame';

////////////////////////////////////////////////////////////////////////////////
// PUBLIC METHODS
////////////////////////////////////////////////////////////////////////////////

function getVideoGames(params) {
  var result = videogameRepository.getVideoGames(params);
  return result;
}

function getVideoGameById(id) {
  var result = videogameRepository.getVideoGameById(id);
  return result;
}

function createVideoGame(params) {

  var result;

  // Comprobamos si existe el gamesystem asociado
  var gamesystemFound = gamesystemService.getGameSystemByName(params.gamesystem);

  if (!_.isUndefined(gamesystemFound)) {

    // Comproamos que no exista para el mismo gamesystem el juego por nombre
    var videogamesFound = videogameRepository.getVideoGames({ name: params.name, gamesystem: params.gamesystem })

    if (videogamesFound.length == 0) {
      result = videogameRepository.createVideoGame(params);
    } else {
      result = messageHelper.buildErrorMessage(VG_SVC_ERR_CREATE_VG_ALREADY_EXISTS_WITH_SAME_NAME);
    }
  } else {
    result = messageHelper.buildErrorMessage(VG_SVC_ERR_CREATE_VG_GAMESYSTEM_NOT_FOUND);
  }
  return result;
}

function updateVideoGame(params) {

  var result = videogameRepository.updateVideoGame(params);
  if (_.isUndefined(result)) {
    result = messageHelper.buildErrorMessage(VG_SVC_ERR_UPDATE_VG_VIDEOGAME_NOT_FOUND);
  }
  return result;
}

function deleteVideoGame(id) {

  var bDeleted = videogameRepository.deleteVideoGame(id);
  
  if (bDeleted) {
    return true;
  } else {
    return messageHelper.buildErrorMessage(VG_SVC_ERR_DELETE_VG_VIDEOGAME_NOT_FOUND);
  }
}

module.exports = {
  getVideoGames,
  getVideoGameById,
  createVideoGame,
  updateVideoGame,
  deleteVideoGame,
  VG_SVC_ERR_CREATE_VG_ALREADY_EXISTS_WITH_SAME_NAME,
  VG_SVC_ERR_CREATE_VG_GAMESYSTEM_NOT_FOUND,
  VG_SVC_ERR_UPDATE_VG_VIDEOGAME_NOT_FOUND,
  VG_SVC_ERR_DELETE_VG_VIDEOGAME_NOT_FOUND
}