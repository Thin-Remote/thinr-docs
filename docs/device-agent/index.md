---
title: Device agent overview
description: The lightweight agent that connects each device to ThinRemote.
---

# Device agent

`thinr-agent` is the piece of ThinRemote that lives on your devices: a single static binary that opens one outbound TLS connection to your instance and exposes the device's capabilities as typed resources. No inbound ports, no kernel modules, no virtual network interfaces, no runtime dependencies.

Not to be confused with AI agents: this is the *device* agent. The AI side of ThinRemote lives in the [MCP server](/getting-started/ai-assistant), which talks to devices through the platform like any other client.

## What it gives you

Once the agent is running, every one of these works out of the box on that device:

| Capability | What you get |
|------------|--------------|
| [Terminal](./terminal) | Interactive shell sessions from the CLI or the browser. |
| [Exec](./command-execution) | One-shot and streaming command execution, scriptable with JSON output. |
| [Files](./filesystem) | Browse, read, write, upload and download. |
| [Tunnels](./tunnels) | TCP, TLS and HTTP proxies to anything reachable from the device. |
| Monitoring | CPU, memory, disk and network metrics, feeding dashboards and [alarms](/device-agent/monitoring-and-alarms). |
| Updates | One-command [binary updates](/device-agent/reference/auto-update) with checksum verification. |
| Custom scripts | Your own scripts exposed as [typed, callable resources](/device-agent/reference/custom-scripts-spec). |

## Footprint

- One fully-static binary under 10 MB, no dependencies to install.
- 16 Linux architectures (x86, ARM, MIPS, PowerPC, RISC-V) plus Intel and Apple Silicon macOS; Linux kernel 2.6 and up. See [supported architectures](/device-agent/reference/supported-architectures).
- Runs as root for full-device management, or as an unprivileged user with that user's permissions.
- Integrates with systemd, launchd, OpenRC, SysV and Upstart. See [supported init systems](/device-agent/reference/supported-init-systems).

## Where to go

- **Install it**: [interactive](/device-agent/install) for one device, [headless](/device-agent/headless-provisioning) for fleets, [channels](/device-agent/channels) to choose what it runs.
- **Trust it**: [architecture and security](./architecture-and-security) covers the connection model, credentials and privilege model.
- **Use its features**: [terminal](./terminal), [exec](./command-execution), [files](./filesystem), [tunnels](./tunnels), [monitoring](./monitoring-and-alarms), [custom scripts](./custom-scripts) and [updates](./agent-updates).
- **Look something up**: the [reference](/device-agent/reference/cli-flags) has every flag, variable, config key and contract.
