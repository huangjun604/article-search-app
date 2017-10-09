*Use of this software is subject to important terms and conditions as set forth in the License file*

# Article Search App

## Description

A Zendesk app that searches the knowledge base articles in help center, and shares in Zendesk Support and the Zendesk Chat.

## Requirements

You need to install or update the following packages to use this app:

- Node.js 6.3.x or later
- Ruby 2.0.x or later
- Zendesk Apps Tools(ZAT) 1.35.12 or later

## Configuration

### Install npm packages

To install the npm packages in your project folder:

```
$ npm install
```

### Install global packages

The app relies on the following global npm packages:

- webpack
- foreman
- karma-cli

To install the packages, run the following npm command:

```
$ npm install --global webpack foreman karma-cli
```

## Start app

To start the background process:

```
$ nf start
```

## Testing app locally

1. In a browser, open a ticket in the Zendesk Support agent interface. You'll need to sign in as an agent or administrator. The URL should look something like this:

https://subdomain.zendesk.com/agent/tickets/123

2. Append `?zat=true` to the ticket URL, and reload the page. The URL should look like this:

https://subdomain.zendesk.com/agent/tickets/123?zat=true

3. In your browser's Address bar, click the shield icon on the left (Chrome) or lock icon on the right (Firefox) and agree to load an unsafe script (Chrome) or to disable protection (Firefox). If you don't do this, the browser will block your app.

The app should appear in a panel on the right of the agent interface.

## Testing

```
karma start karma.conf.js
```

## Design

### Fetch articles

This app uses the `Help Center API` to query the articles.

```
Search Articles

GET /api/v2/help_center/articles/search.json?query={search_string}
```

### Post to Support and Chat

This app will check the current location in order to post the article links to related text area.

When location is support side bar, call set comment endpoint in `Support API`:

```
client.set('comment.text', value)
```

When location is chat side bar, call post chat data endpoint in `Chat API`:

```
client.invoke('chat.postToChatTextArea', value);
```

## Copyright

Copyright 2017 Stephen Huang
