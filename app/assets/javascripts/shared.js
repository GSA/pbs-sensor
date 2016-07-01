/*
 * Set up an application-wide namespace. Also, use the Garber-Irish implementation of page-specific JS.
 */

var PBS = {
  UTIL: {
    exec: function(controller, action) {
      var ns = PBS, action = (action === undefined) ? "init" : action;
      if (controller !== "" && ns[controller] && typeof ns[controller][action] == "function") {
        ns[controller][action]();
      }
    },
    init: function() {
      var body = document.body, controller = body.getAttribute( "data-controller" ), action = body.getAttribute( "data-action" );
      PBS.UTIL.exec("common");
      PBS.UTIL.exec(controller);
      PBS.UTIL.exec(controller, action);
    }
  }
};

$(document).ready(PBS.UTIL.init);
