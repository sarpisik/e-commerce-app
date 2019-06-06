module.exports = {
  rejectHandler,
  userCredentialsToSend
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
