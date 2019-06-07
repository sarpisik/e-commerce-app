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
