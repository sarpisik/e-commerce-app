module.exports = {
  rejectHandler
};

function rejectHandler(respond, message) {
  respond.success = false;
  respond.message = message;
  return respond;
}
