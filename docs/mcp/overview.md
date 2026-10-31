---
title: MCP server overview
description: The CLI's built-in MCP server, and why your fleet is AI-operable out of the box.
---

# MCP server overview

The `thinr` CLI ships a built-in [Model Context Protocol](https://modelcontextprotocol.io/) server that exposes your whole fleet as typed tools for AI assistants: Claude Code, Claude Desktop, Cursor, or any MCP-compatible client.

::: tip Nothing to install or run
The MCP server **is** the CLI: if you've [installed and authenticated `thinr`](/cli/install), the server is ready. You don't run it by hand either; your MCP client launches `thinr mcp` for you (over stdio) once you've [registered it](./connect-your-client).
:::

## Why it matters

- **No bespoke integration code.** The tools are already there: one registration command and your assistant operates real devices. Anything you'd otherwise script against the API, an agent can compose on the fly.
- **Same auth and access control.** The server acts under your profile's token, so an assistant can do exactly what you can do from the CLI, nothing more. Roles, scoping and revocation apply identically.
- **Fleet-aware by design.** Every tool accepts optional `user` and `profile` arguments, and records are addressed by `ids`, so a single running server reaches any device in any of your configured environments, without restarts.

This changes what "remote management" means in practice: instead of translating a hunch into commands, you describe the outcome ("find out why store 14 keeps dropping offline and fix it") and the agent inspects, diagnoses and acts with the same primitives you'd use by hand.

## What it exposes

Eight tools reach everything: `thinr_resource_describe`, `_list`, `_get`, `_create`, `_update`, `_delete`, `_clone` and `_call`. What a call touches is set by its **type** (a device, a file on a device, a product script, a bucket's time series…), the **ids** that locate the record, and, for `thinr_resource_call`, the **action**:

| To… | The assistant calls |
|-----|---------------------|
| Find devices | `thinr_resource_list` type `device`, with `search` or `filter` |
| Run a command | `thinr_resource_call` type `device`, action `exec`: one device, a list, a product or group, or the whole fleet |
| Read and write files | type `device_fs`, ids `{device, path}`; actions `move`, `push`, `pull` |
| Read live metrics | `thinr_resource_call` type `device_resource`, action `call`, ids `{device, resource: "monitoring"}` |
| Query history | `thinr_resource_list` type `bucket_data`, ids `{bucket}` |
| Triage alarms | types `alarm_rule` and `alarm_instance` |
| Extend devices with scripts | types `device_script` and `product_script` |
| Change the fleet safely | type `product_playbook`, actions `validate`, `run`, `rollout` |
| Update the agent | `thinr_resource_call` type `device`, action `agent_update` |

The assistant learns the rest from the server: `thinr_resource_describe` lists every type with its actions and ready-to-send examples. Calls that would act on many devices at once answer with their targets first and only run once confirmed, and `thinr mcp --read-only` serves only what reads. The [tool catalog](./tool-catalog) has the details.

## Next

- [Connect your client](./connect-your-client): Claude Code, Claude Desktop, Cursor, or any MCP client.
- [Drive your fleet with AI](/getting-started/ai-assistant): a guided first session with real examples.
- [Best practices](./best-practices): running agents safely and effectively.
