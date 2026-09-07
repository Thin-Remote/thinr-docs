---
title: CLI & MCP overview
description: The thinr CLI and its built-in MCP server, one tool with two faces.
---

# CLI & MCP

`thinr` is the command-line pillar of ThinRemote: one Node.js tool that drives your whole fleet from the terminal, and doubles as an **MCP server** so AI assistants can drive it too. Same credentials, same capabilities, two faces.

## What you can do with it

| Workflow | Commands |
|----------|----------|
| [Shells](./ssh-and-console) | `thinr device console`, or tunneled SSH with your own client |
| [Run commands](./exec-commands) | `thinr device exec`, fleet-wide with `thinr product exec` |
| [Move files](./file-management) | `push`, `pull`, `ls`, `read`, `write`, `mkdir`, `rm`, `mv` |
| [Tunnels](./tcp-tls-tunneling) | `tcp`, `tls` and [`http`](./http-tunneling) proxies to anything the device reaches |
| Fleet operations | [`thinr fleet upgrade`](/cli/reference/fleet-commands), [playbooks](/cli/reference/playbook-commands), product fan-out |
| [Automation](./json-and-automation) | `--json` envelopes, stable error codes, real exit codes |

Everything is built to be scripted: data-producing commands emit a [JSON envelope](/cli/reference/json-envelope), errors carry [stable codes](/cli/reference/error-codes), and exit codes compose with `set -e` and CI pipelines.

## The MCP server

The same binary, started with `thinr mcp`, exposes the platform as typed tools for Claude Code, Claude Desktop, Cursor, or any MCP client: devices, exec, files, tunnels, monitoring, products, playbooks and alarms. One running server reaches any device in any of your configured environments.

Start with the [MCP overview](/mcp/overview), or jump straight to the hands-on [Drive your fleet with AI](/getting-started/ai-assistant).

## Where to go

- **Install it**: [Install the CLI](./install) (npm, two minutes).
- **Use it**: the workflows in the sidebar, starting with [SSH and console](./ssh-and-console).
- **Script it**: [JSON and automation](./json-and-automation).
- **Look something up**: the [reference](/cli/reference/global-options) covers every command, flag and contract.
