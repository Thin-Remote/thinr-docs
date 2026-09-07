---
title: Connect your client
description: Register the ThinRemote MCP server with Claude Code, Claude Desktop, Cursor, or any MCP client.
---

# Connect your client

The MCP server ships inside the CLI, so the only prerequisite is having [`thinr` installed and authenticated](/cli/install). If `thinr device list` works in your terminal, you're one registration away from an AI-operable fleet. Your client launches the server itself (as `thinr mcp`, over stdio); there is no daemon to keep running.

## Claude Code

```bash
claude mcp add thinr -s user -- thinr mcp
```

`-s user` makes it available in every project. For a per-project setup that travels with the repo, use `-s project` instead, which writes a `.mcp.json` your teammates can share.

## Claude Desktop

Add the server to `claude_desktop_config.json` (Settings → Developer → Edit Config):

```json
{
  "mcpServers": {
    "thinr": {
      "command": "thinr",
      "args": ["mcp"]
    }
  }
}
```

## Cursor

Add the same entry to `~/.cursor/mcp.json` (or the project's `.cursor/mcp.json`):

```json
{
  "mcpServers": {
    "thinr": {
      "command": "thinr",
      "args": ["mcp"]
    }
  }
}
```

## Any other MCP client

The pattern is always the same: a stdio server with `command: thinr` and `args: ["mcp"]`. No ports, no URL, no API key in the config; credentials come from the CLI's own profile store.

## Verify it

Restart the client and ask:

> List my ThinRemote devices.

**You should see** a call to the `thinr_devices` tool answering with the same devices `thinr device list` shows. From there, continue with [Drive your fleet with AI](/getting-started/ai-assistant) for a real working session.

## Troubleshooting

- **The client can't find `thinr`.** GUI apps on macOS launch without your shell's `PATH`, so desktop clients may not see the npm global bin. Use the absolute path in `command` (find it with `which thinr`).
- **Tools fail with auth errors.** The server uses the CLI's active profile; make sure `thinr device list` works in a terminal first, and re-authenticate with `thinr` if the token was revoked.
- **Several environments.** The server follows the default profile. Pin a different one by setting `THINR_PROFILE` in the client's `env` block, or let the assistant pass `profile` per tool call; see [`thinr profile`](/cli/reference/profile-commands).
