const { response, request } = require('express');

const getNotFound = async (req = request, res = response) => {
  return res.status(404).json({
    msg: 'Error 404, the requested resource does not exist',
  });
};

const postNotFound = async (req = request, res = response) => {
  return res.status(404).json({
    msg: 'Error 404, the requested resource does not exist',
  });
};

const putNotFound = async (req = request, res = response) => {
  return res.status(404).json({
    msg: 'Error 404,  the requested resource does not exist',
  });
};

const deleteNotFound = async (req = request, res = response) => {
  return res.status(404).json({
    msg: 'Error 404,  the requested resource does not exist',
  });
};

module.exports = {
  getNotFound,
  postNotFound,
  putNotFound,
  deleteNotFound,
};
