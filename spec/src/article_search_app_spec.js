import ZAFClient from 'zendesk_app_framework_sdk';
import ArticleSearchApp from '../../src/javascripts/article_search_app';

describe('ArticleSearchApp', () => {
  let app;
  let client;

  beforeEach(() => {
    client = ZAFClient.init();
    app = new ArticleSearchApp(client, { metadata: {}, context: {} });
  });

  describe('onSearchKeyPressed', () => {
    beforeEach(() => {
      spyOn(app, 'searchArticles');
    });

    it('should search articles', () => {
      const e = {
        keyCode: 13,
        preventDefault: () => null
      };

      app.onSearchKeyPressed(e);

      expect(app.searchArticles).toHaveBeenCalled();
    });
  });


  describe('onSearchIconClicked', () => {
    beforeEach(() => {
      spyOn(app, 'searchArticles');
    });

    it('should search articles', () => {
      const e = {
        preventDefault: () => null
      };

      app.onSearchIconClicked(e);

      expect(app.searchArticles).toHaveBeenCalled();
    });
  });

  describe('onPageLinkClicked', () => {
    beforeEach(() => {
      spyOn(app, 'ajax');
    });

    it('should fetch articles', () => {
      const link = document.createElement('a');
      link.dataset.url = 'http://example.com';
      const e = {
        currentTarget: link,
        preventDefault: () => null
      };

      app.onPageLinkClicked(e);

      expect(app.ajax).toHaveBeenCalledWith('fetchArticles', 'http://example.com');
    });

  });

  describe('#searchArticles', () => {
    beforeEach(() => {
      spyOn(app, 'ajax').and.returnValue();
      spyOn(app, 'getSearchQuery').and.returnValue('test');
    });

    const query = 'domain';

    it('should query the articles', () => {
      const url = '/api/v2/help_center/articles/search.json?per_page=5&query=test';

      app.searchArticles();
      expect(app.ajax).toHaveBeenCalledWith("fetchArticles", url);
    });
  });

  describe('#loadResults', () => {
    beforeEach(() => {

    });
  });

  describe('#onShareButtonClicked', () => {
    beforeEach(() => {
      spyOn(app, 'shareToSupport');
      spyOn(app, 'shareToChat');
    });

    const shareButton = document.createElement('button');
    shareButton.dataset.url = 'http://example.com';
    const e = {
      currentTarget: shareButton,
      preventDefault: () => null
    };

    it('should call share to support', () => {
      spyOn(app, 'currentLocation').and.returnValue('ticket_sidebar');

      app.onShareButtonClicked(e);
      expect(app.shareToSupport).toHaveBeenCalledWith('http://example.com');
    });

    it('should call share to chat', () => {
      spyOn(app, 'currentLocation').and.returnValue('chat_sidebar');

      app.onShareButtonClicked(e);
      expect(app.shareToChat).toHaveBeenCalledWith('http://example.com');
    });
  });

  describe('#shareToSupport', () => {
    beforeEach(() => {
      spyOn(client, 'set');
    });
    const url = 'http://example.com/';

    it('should post the url to support comment box', () => {
      app.shareToSupport(url);

      expect(client.set).toHaveBeenCalledWith('comment.text', 'http://example.com/');
    });
  });

  describe('#shareToChat', () => {
    beforeEach(() => {
      spyOn(client, 'invoke');
    });

    const url = 'http://example.com/';

    it('should post the url to chat text area', () => {
      app.shareToChat(url);

      expect(client.invoke).toHaveBeenCalledWith('chat.postToChatTextArea', 'http://example.com/');
    });
  });
});
