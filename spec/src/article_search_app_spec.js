import ZAFClient from 'zendesk_app_framework_sdk';
import ArticleSearchApp from '../../src/javascripts/article_search_app';

describe('ArticleSearchApp', () => {
  let app;
  let client;

  beforeEach(() => {
    client = ZAFClient.init();
    app = new ArticleSearchApp(client, { metadata: {}, context: {} });
  });

  describe('#searchArticles', () => {
    beforeEach(() => {
      spyOn(app, 'ajax').and.returnValue();
    });

    const query = 'domain';

    it('should query the articles', () => {

    });
  });

  describe('#shareToSupport', () => {
    beforeEach(() => {
      spyOn(client, 'set');
    });

    it('should post the url to support comment box', () => {
      const shareButton = document.createElement('button');
      shareButton.dataset.url = 'http://example.com/';

      const e = {
        currentTarget: shareButton,
        preventDefault: () => null
      };

      app.shareToSupport(e);

      expect(client.set).toHaveBeenCalledWith('comment.text', 'http://example.com/');
    });
  });

  describe('#shareToChat', () => {
    beforeEach(() => {
      spyOn(client, 'invoke');
    });

    it('should post the url to chat text area', () => {
      const shareButton = document.createElement('button');
      shareButton.dataset.url = 'http://example.com/';

      const e = {
        currentTarget: shareButton,
        preventDefault: () => null
      };

      app.shareToChat(e);

      expect(client.invoke).toHaveBeenCalledWith('chat.postToChatTextArea', 'http://example.com/');
    });
  });
});
