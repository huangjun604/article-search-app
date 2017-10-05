import BaseApp from "base_app";

// add these if needed
// import Base64 from 'base64';
// import helpers from 'helpers';

var App = {
  defaultState: "loading",

  requests: {
    searchArticles: function(params) {
      return {
        url: '/api/v2/help_center/articles/search.json?query=' + params,
        type: 'GET'
      };
    }
  },

  events: {
    "app.created": "init",
    "app.willDestroy": "logClosedApp",
    "click #submit-button": "searchArticles"
  },

  async init() {
    this.switchTo("main");
  },

  renderMain({ user }) {
    this.switchTo("main", user);
  },

  logClosedApp() {
    console.log("About to close the app.");
  },

  searchArticles() {
    var params = this.$('.search-bar').find('.search-box').val();
    this.ajax("searchArticles", params).done(function(data) {
      var resultsTemplate = this.renderTemplate('results', data);
      this.$('.results').html(resultsTemplate);
    });
  }
};

export default BaseApp.extend(App);
