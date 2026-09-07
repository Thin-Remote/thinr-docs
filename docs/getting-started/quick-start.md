---
title: Quick Start
description: From zero to a managed device and an AI assistant driving it, in under ten minutes.
---

# Quick Start

This is the guided path through the three pillars of ThinRemote: an agent on your device, the CLI on your workstation, and your AI assistant plugged into both. Each step here is the short version and links to its full page for options and troubleshooting.

## What you need

- **A ThinRemote instance.** This is the cloud side everything connects to, and the one thing that isn't a command on this page: instances are private and provisioned on request, so if you don't have one yet, [get in touch](https://thinremote.io/contact) and we'll set yours up. Keep its host at hand (the address where you open your web console): both the agent and the CLI authenticate against it.
- **A device to manage**: Linux or macOS, with outbound internet access. No inbound ports, no firewall changes.
- **A workstation** with Node.js ≥ 18.
- About ten minutes.

::: tip What am I installing?
The agent and CLI are open source and the underlying transport is an [open protocol](https://iotmp.io). If you want the short story on what's auditable and what we run as a service, see [what runs locally, what we run for you](/getting-started/what-is-thinremote#what-runs-locally-what-we-run-for-you). Otherwise, skip ahead.
:::

## The journey

<QuickStartJourney />

## 1. Install the agent on the device

```bash
curl -fsSL https://get.thinremote.io/install.sh | sh
```

The installer detects your system, registers the service, and walks you through authentication; when it asks, point it at **your instance** and approve from the browser.

**You should see** the installer finish with the service running, and the device appear in your web console.

Full version: [Install the agent](/device-agent/install), with root vs user mode, auth options and troubleshooting. Onboarding many devices? That's [headless provisioning](/device-agent/headless-provisioning).

## 2. Install and authenticate the CLI

On your workstation:

```bash
npm install -g @thinremote/thinr-cli
thinr
```

The first run asks for your instance host and signs you in through the browser.

**You should see** a confirmation that your profile was saved.

Full version: [Install the CLI](/cli/install), with token auth, multiple profiles and certificate troubleshooting.

## 3. Open your first session

```bash
thinr device list
thinr device console <deviceId>
```

**You should see** your device listed as *connected*, and the console drop you into a shell on it. Type `exit` to come back.

That's the loop working end to end: agent, instance and CLI. Continue with [Your first session](./first-session) for the guided tour (exec, file transfers, SSH tunnels, monitoring).

## 4. Connect your AI assistant

The CLI doubles as an MCP server. For Claude Code, one command wires it up:

```bash
claude mcp add thinr -s user -- thinr mcp
```

Then ask your assistant to list your devices.

Full version: [Drive your fleet with AI](./ai-assistant), with Cursor and Claude Desktop setup, a real example session, and the permissions model.

## Next steps

- [Your first session](./first-session): a guided tour of your new device (exec, files, tunnels, monitoring).
- [Drive your fleet with AI](./ai-assistant): your assistant operating real devices.
- [Core concepts](./core-concepts): the platform vocabulary in one page.
- Browse the [guides](/cli/ssh-and-console) for common workflows such as remote desktop, file transfers, tunneling or monitoring.
