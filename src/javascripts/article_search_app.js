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
    "keydown .search-input": "onSearchKeyPressed",
    "click .search-icon": "onSearchIconClicked",
    "click .insert-link": "onShareButtonClicked"
  },

  async init() {

    this.switchTo("main");
    $.ajax({
      url: 'https://assets.zendesk.com/apps/sdk-assets/css/1/index.svg',
      cache: false
      }).done(function(data) {
        const div = document.createElement('div');
        div.innerHTML = new XMLSerializer().serializeToString(data.documentElement);
        document.body.insertBefore(div, document.body.childNodes[0]);
    });
  },

  logClosedApp() {
    console.log("About to close the app.");
  },

  onSearchKeyPressed(e) {
    if (e.keyCode == 13) {
      e.preventDefault();
      this.searchArticles();
    }
  },

  onSearchIconClicked(e) {
    e.preventDefault();
    this.searchArticles();
  },

  onShareButtonClicked(e) {
    e.preventDefault();
    const url = e.currentTarget.dataset.url;
    switch (this.currentLocation()) {
      case 'ticket_sidebar':
        this.shareToSupport(url);
        break;
      case 'chat_sidebar':
        this.shareToChat(url);
        break;
    };
  },

  searchArticles() {
    const query = this.getSearchQuery();
    this.$('.results').html(this.renderTemplate('loading'));
    this.ajax("searchArticles", query).done(function(data) {
      this.zafClient.invoke('resize', { width: '100%', height: '400px' });
      var resultsTemplate = this.renderTemplate('results', data);
      this.$('.results').html(resultsTemplate);
    });
  },

  getSearchQuery() {
    return this.$('.search-bar').find('.search-input').val() || "\"\"";
  },

  shareToSupport(url) {
    this.zafClient.set('comment.text', url);
  },

  shareToChat(url) {
    this.zafClient.invoke('chat.postToChatTextArea', url);
  }
};

export default BaseApp.extend(App);
