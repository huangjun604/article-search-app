import BaseApp from "base_app";

// add these if needed
// import Base64 from 'base64';
// import helpers from 'helpers';

var App = {
  defaultState: "loading",

  requests: {
    fetchArticles: function(url) {
      return {
        url: url,
        type: 'GET'
      };
    }
  },

  events: {
    "app.created": "init",
    "app.willDestroy": "logClosedApp",
    "fetchArticles.done": "loadResults",
    "fetchArticles.error": "loadErrors",
    "keydown .search-input": "onSearchKeyPressed",
    "click .search-icon": "onSearchIconClicked",
    "click .post-link": "onPostButtonClicked",
    "click .page-link": "onPageLinkClicked"
  },

  async init() {
    this.switchTo("main");
  },

  logClosedApp() {
    console.log("Byebye.");
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

  onPostButtonClicked(e) {
    e.preventDefault();
    const url = e.currentTarget.dataset.url;
    switch (this.currentLocation()) {
      case 'ticket_sidebar':
        this.postToSupport(url);
        break;
      case 'chat_sidebar':
        this.postToChat(url);
        break;
    }
  },

  onPageLinkClicked(e) {
    e.preventDefault();
    const url = e.currentTarget.dataset.url;
    this.ajax("fetchArticles", url);
  },

  searchArticles() {
    const query = this.getSearchQuery();
    const url = '/api/v2/help_center/articles/search.json?per_page=5&query=' + query;
    this.$('.results').html(this.renderTemplate('loading'));

    this.ajax("fetchArticles", url);
  },

  loadResults(data) {
    this.zafClient.invoke('resize', { width: '100%', height: '380px' });
    var resultsTemplate = this.renderTemplate('results', data);
    this.$('.results').html(resultsTemplate);
  },

  loadErrors(error) {
    var errorTemplate = this.renderTemplate('error', data);
    this.$('.results').html(errorTemplate);
  },

  getSearchQuery() {
    return this.$('.search-bar').find('.search-input').val() || "\"\"";
  },

  postToSupport(url) {
    this.zafClient.set('comment.text', url);
  },

  postToChat(url) {
    this.zafClient.invoke('chat.postToChatTextArea', url);
  }
};

export default BaseApp.extend(App);
