---
title: Drive your fleet with AI
description: Connect Claude, Cursor or any MCP client and operate your devices in natural language.
---

# Drive your fleet with AI

The `thinr` CLI doubles as an [MCP server](https://modelcontextprotocol.io/). Once you point your AI assistant at it, every operation from [Your first session](./first-session) (and many more) becomes a tool the assistant can call: list devices, read metrics, run commands, transfer files, manage alarms, roll out playbooks.

## Before you start

The MCP server is the same `thinr` binary; there is nothing extra to install. You only need:

1. The [CLI installed and authenticated](/cli/install).
2. A working setup, which you can confirm with:

```bash
thinr device list
```

If that prints your devices, the MCP server will work too: it uses the same profile and token.

## Connect your assistant

For **Claude Code**, register it once:

```bash
claude mcp add thinr -s user -- thinr mcp
```

For **Cursor**, add an entry to `~/.cursor/mcp.json`:

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

The same `command`/`args` pattern works for Claude Desktop and any other MCP client.

::: tip The client can't find `thinr`?
GUI apps on macOS launch without your shell's `PATH`, so desktop clients like Claude Desktop may not see the npm global bin. Point `command` at the absolute path instead (find it with `which thinr`).
:::

Restart the assistant and check the wiring by asking:

> List my ThinRemote devices.

**You should see** the assistant call the `thinr_devices` tool and answer with the same devices `thinr device list` shows.

## A real session

Here is what day-to-day use looks like. Suppose a fleet of gateways and a disk filling up somewhere:

> **You:** Which of my devices are running low on disk?
>
> The assistant calls `thinr_devices` and reads monitoring data for each one, then answers: "edge-gw-17 is at 92% on `/`. The rest are below 60%."
>
> **You:** What's eating the space on edge-gw-17?
>
> It runs `du` through the `thinr_exec` tool and reports: "4.1 GB of rotated logs under `/var/log`, and 1.8 GB in `/var/cache/apt`."
>
> **You:** Clean both up, then show me the disk again.
>
> It executes the cleanup, reads monitoring again, and confirms: "Disk usage is down to 58%."

Nothing here was pre-scripted: the assistant composes the same primitives you used in [Your first session](./first-session). Other prompts that work out of the box:

- "Pull `/etc/nginx/nginx.conf` from store-14 and explain what it does."
- "Tail the logs of edge-gw-17 and tell me why the app keeps restarting."
- "Run `systemctl restart app` on every device of the retail-pos product and give me a summary."
- "Is there any agent update pending across the fleet?"

## Permissions and safety

The assistant acts under your profile's token: it can do exactly what you can do with the CLI, nothing more. A few habits help when handing tools to an AI:

- Your MCP client asks for confirmation before tool calls by default; keep that on for tools that modify state (`thinr_exec`, `thinr_rm`, rollouts).
- For cautious setups, create a separate [profile](/cli/reference/profile-commands) backed by a token with narrower permissions, and pass `profile` per call or set `THINR_PROFILE` for the server.
- Every tool accepts optional `device`, `user` and `profile` arguments, so one running server can address any device in any of your environments.

## Going deeper

- [MCP overview](/mcp/overview): how the server fits the platform.
- [Tool catalog](/mcp/tool-catalog): every tool the server exposes.
- [Setup with Claude Code](/mcp/connect-your-client) and [Setup with Cursor](/mcp/connect-your-client): client-specific configuration.
- [Best practices](/mcp/best-practices): patterns for safe and effective AI operation.
