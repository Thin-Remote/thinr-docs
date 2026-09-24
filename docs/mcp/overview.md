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
- **Fleet-aware by design.** Every tool accepts optional `device_id`, `user` and `profile` arguments, so a single running server addresses any device in any of your configured environments, without restarts.

This changes what "remote management" means in practice: instead of translating a hunch into commands, you describe the outcome ("find out why store 14 keeps dropping offline and fix it") and the agent inspects, diagnoses and acts with the same primitives you'd use by hand.

## What it exposes

More than eighty tools, grouped by capability:

| Area | Examples |
|------|----------|
| Discovery | `thinr_devices`, `thinr_device_info`, `thinr_profiles` |
| Shell and files | `thinr_exec`, `thinr_read`, `thinr_push`, `thinr_ls`, `thinr_rm`, `thinr_mv` |
| Resources and properties | `thinr_resource_call`, `thinr_property_get`, `thinr_property_set` |
| Monitoring and alarms | `thinr_monitoring`, `thinr_bucket_read`, `thinr_alarm_rules`, `thinr_alarm_instances` |
| Provisioning and updates | `thinr_agent_install_command`, `thinr_update`, `thinr_device_set_product` |
| Products and fleet | `thinr_products`, `thinr_product_exec`, `thinr_product_script_write`, `thinr_product_metric_set` |
| Playbooks | `thinr_playbook_validate`, `thinr_product_playbook_run`, `thinr_product_playbook_rollout` |
| Access tokens | `thinr_token_create`, `thinr_device_token_list` |

The complete list, with what each tool does, is in the [tool catalog](./tool-catalog).

## Next

- [Connect your client](./connect-your-client): Claude Code, Claude Desktop, Cursor, or any MCP client.
- [Drive your fleet with AI](/getting-started/ai-assistant): a guided first session with real examples.
- [Best practices](./best-practices): running agents safely and effectively.
