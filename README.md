# BubblaV for Cursor

Manage your [BubblaV](https://www.bubblav.com) AI chatbot from Cursor. BubblaV is an AI chatbot for businesses: it answers your customers' questions 24/7 with what you teach it, and hands chats to your team when needed.

With this plugin, Cursor's agent can add the chat widget to the site you are building, check how your chatbot performs, find the questions it could not answer, teach it new knowledge, review conversations and leads, and change its persona and widget. The plugin connects to the BubblaV remote [MCP](https://modelcontextprotocol.io/) server at `https://www.bubblav.com/mcp` over OAuth. You do not need an API key.

## Install

**From the Cursor Marketplace.** Open the BubblaV listing on the [Cursor Marketplace](https://cursor.com/marketplace) and select **Add to Cursor**, or search for BubblaV in **Customize**.

**Before the listing is live (local).** Clone this repository and link it into your local plugins folder:

```bash
git clone https://github.com/bubblav-org/bubblav-cursor.git
ln -s "$PWD/bubblav-cursor" ~/.cursor/plugins/local/bubblav
```

Restart Cursor and turn on the BubblaV plugin in **Customize**.

## Connect your account

The first time the agent calls a BubblaV tool, your browser opens the BubblaV sign-in page.

1. Sign in to BubblaV, or create an account.
2. Select the chatbot (website) that Cursor can manage. If you do not have a website, you can create a chatbot without one.
3. Approve the request.

Cursor runs the OAuth 2.1 flow with PKCE for you. There are no secrets or tokens to copy.

## What you can do

- **Install the widget**: get the embed code for your chatbot and add it to your project.
- **Check performance**: conversations, resolution rate, ratings, and response times for any date range.
- **Find gaps**: questions your chatbot could not answer, content gaps, and the questions people ask most.
- **Teach your chatbot**: add or remove knowledge, upload documents, add pages and sitemaps to crawl, and check crawl status.
- **Review conversations**: list, read, and search conversations, captured leads, and visitor insights.
- **Configure**: change the chatbot persona and instructions, the chat widget, the AI search widget, forms, flows, and custom webhook tools.

Example prompts:

- "Add the BubblaV chat widget to this Next.js app."
- "Which questions could my chatbot not answer last week?"
- "Create a custom tool that looks up order status from our API."

## Skills included

- **`add-chat-widget`**: gets the embed snippet for your chatbot and shows where to put it in your site or framework. The agent can add the snippet to your project files when you ask.
- **`manage-custom-tools`**: creates, updates, lists, deletes, and turns on or off the custom webhook tools that your chatbot can call during a conversation.

## Data and privacy

- **What the plugin contains**: one MCP server declaration (`mcp.json`), two skills (Markdown files), a logo, and a validation script for maintainers (`scripts/validate-plugin.mjs`). Cursor does not run the script. The plugin has no hooks or rules, and it does not read your environment variables or local files on its own.
- **Where data goes**: the plugin sends requests only to `https://www.bubblav.com/mcp`. A request contains the tool name and the arguments that the agent sends for your request.
- **What data comes back**: data from the BubblaV chatbot that you authorized. This includes analytics, knowledge content, settings, and conversations. Conversations and leads can contain your visitors' names, email addresses, and messages.
- **Access**: one connection gives access to one chatbot. BubblaV creates an API key labeled **Cursor** in your account for the connection. To disconnect, revoke that key in the BubblaV dashboard.
- **Audit log**: BubblaV logs every tool call. See **Integrations → MCP Settings → Audit Logs** in the dashboard.
- **Custom tools**: when you create a custom webhook tool, BubblaV's servers call the URL that you give, during visitor conversations. For `bearer` and `hmac` tools, BubblaV shows the secret key one time, in the tool response.
- **Policies**: [Privacy Policy](https://www.bubblav.com/privacy) · [Terms of Service](https://www.bubblav.com/terms)

## Validate before you submit

```bash
node scripts/validate-plugin.mjs
```

The script checks that the manifest is valid JSON, the plugin name matches Cursor's pattern, the logo is committed and referenced, and the MCP config points at the BubblaV server.

## Requirements

- A BubblaV account. You can create one during the sign-in step.
- Cursor with plugin and MCP support.

## Support

- Setup guide: [docs.bubblav.com/user-guide/integrations/cursor](https://docs.bubblav.com/user-guide/integrations/cursor)
- Tool reference: [docs.bubblav.com/developer-guide/mcp-server](https://docs.bubblav.com/developer-guide/mcp-server)
- Email: [support@bubblav.com](mailto:support@bubblav.com)

## License

MIT. See [LICENSE](LICENSE).
