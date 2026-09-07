---
title: Core concepts
description: The vocabulary of the ThinRemote platform in one page.
---

# Core concepts

ThinRemote has a small vocabulary of its own. This page defines each term once, with links to go deeper. Skim it now, come back when a word looks unfamiliar.

## Device and device agent

A **device** is anything running the **device agent** (`thinr-agent`): an industrial gateway, a Raspberry Pi, a cloud VM, a Mac. The agent is a single static binary that connects out to the platform and exposes the device's capabilities (terminal, files, exec, tunnels, metrics). One device, one agent, one outbound connection. Not to be confused with the AI agents that [drive the fleet over MCP](/getting-started/ai-assistant). See [how it works](/getting-started/how-it-works).

## Product

A **product** groups devices of the same kind and gives them shared configuration: log sources, dashboard metrics, scripts, playbooks. It's also the unit of fan-out: `thinr product exec` runs a command on every device of the product at once. If you manage three hundred vending machines, "vending-machine" is a product. See [products and groups](/getting-started/products-and-groups).

## Asset group

A **group** is a label that slices devices within (or across) products: `staging`, `region-emea`, `customer-acme`. Most fleet commands accept `-g, --group` to narrow their scope.

## Property

A **property** is structured state stored on the platform for a device or product: a config blob, a reported version, an arbitrary JSON document. Properties persist whether the device is online or not. See [properties vs resources](/getting-started/properties-vs-resources).

## Resource

A **resource** is a live, typed endpoint the agent exposes while connected: read a sensor, trigger an action, query a status. Calling a resource talks to the device in real time; reading a property talks to the platform. That distinction is the single most useful thing to remember on this page.

## Playbook

A **playbook** is a YAML document describing a procedure or desired state to apply across devices: check a condition, copy files, run steps, verify. Playbooks support variables, dry runs, read-only check mode, and progressive fleet rollouts with batches and failure thresholds. See [`thinr playbook`](/cli/reference/playbook-commands).

## Release channel

Agents update on demand from one of three **channels**: `latest` (stable), `main`, or `develop`. A version can also be pinned. See [release channels](/device-agent/channels).

## Profile

A **profile** is a saved CLI login: server, account, token. You'll only need more than one if you work against several accounts or environments; then `thinr profile use` or `--profile` switch between them. See [`thinr profile`](/cli/reference/profile-commands).

## MCP server

The CLI doubles as an **MCP server** (`thinr mcp`), exposing devices, exec, files, tunnels, products, playbooks and alarms as typed tools that AI assistants like Claude or Cursor can call. See the [MCP overview](/mcp/overview).

## Web console

The browser counterpart to the CLI: device list, remote consoles, file browser, monitoring charts, alarms, and team management.
