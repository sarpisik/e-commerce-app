module.exports = {
  rejectHandler,
  userCredentialsToSend,
  setArrayEvent
};

function rejectHandler(respond, message) {
  respond.success = false;
  respond.message = message;
  return respond;
}

function userCredentialsToSend(respond, userResult) {
  const attributesToSendClient = [
    'email',
    'userName',
    'favorites',
    'lastLogin',
    'cart'
  ];
  attributesToSendClient.forEach(credential => {
    respond[credential] = userResult[credential];
  });
  return respond;
}

function setArrayEvent(action, array, product) {
  if (product instanceof Array) {
    return {
      $pull: {
        [array]: {
          _id: {
            $in: product
          }
        }
      }
    };
  }

  return action === 'remove'
    ? {
        $pull: {
          [array]: {
            _id: product._id
          }
        }
      }
    : {
        $push: {
          [array]: product
        }
      };
}
