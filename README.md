# BubblaV for Cursor

Connect [Cursor](https://cursor.com) to your **BubblaV** AI chatbot. Once installed, Cursor's agent can search your knowledge base, read analytics, surface content gaps, manage conversations and leads, tune your chatbot persona, and more — all over OAuth. No API key to manage.

This is a [Model Context Protocol](https://modelcontextprotocol.io/) plugin that connects Cursor to the BubblaV remote MCP server at `https://www.bubblav.com/mcp`.

## Install

Once listed on the Cursor Marketplace, click **Add to Cursor** on the BubblaV listing. The first time Cursor's agent calls a BubblaV tool, your browser opens the BubblaV OAuth consent screen. Sign in, pick the website you want Cursor to manage, and approve. Cursor handles the OAuth 2.1 + PKCE flow automatically — there are no secrets or tokens to copy.

### Install before it's listed (local)

```bash
# from this repo root
ln -s "$PWD" ~/.cursor/plugins/local/bubblav
```

Then restart Cursor and enable the BubblaV plugin.

> Don't have a BubblaV account yet? Create one (free) at [bubblav.com](https://www.bubblav.com) and add a website first.

## What you can do

Once connected, Cursor's agent has access to your chatbot's data and configuration:

- **Knowledge base** — search, add, delete, upload files, sync support tickets, and list knowledge sources.
- **Analytics & reports** — read reports, visitor insights, and hourly activity.
- **Conversations & leads** — list and search conversations, view unanswered questions, and export leads.
- **Insights** — most-asked questions, content gaps, and answerable questions.
- **Chatbot persona & widget** — read and update website settings, persona, and widget appearance.
- **Crawl sources & forms** — manage crawl URLs/sitemaps and build forms.
- **Handoff scenarios** (Pro+) — define when the bot hands off to a human.
- **Web scraping** — scrape a URL into your knowledge base.

## How it works

- The plugin declares a single remote MCP server pointing at `https://www.bubblav.com/mcp` (Cursor infers the Streamable-HTTP transport from the URL).
- On the first request the server returns `401` with a `WWW-Authenticate` header; Cursor discovers the OAuth endpoints via `/.well-known` and runs the authorization flow with PKCE + dynamic client registration (RFC 7591).
- The resulting access token is a long-lived BubblaV MCP key, stored locally. It never appears in the manifest.

## Validate before submitting

```bash
node scripts/validate-plugin.mjs
```

Checks the manifest is valid JSON, the plugin name matches Cursor's pattern, the logo is committed and referenced, and the MCP config points at the BubblaV server.

## Requirements

- A BubblaV account with at least one website.
- Cursor with MCP support enabled.

## Support

- Docs: [docs.bubblav.com](https://docs.bubblav.com)
- Email: [support@bubblav.com](mailto:support@bubblav.com)

## License

MIT
