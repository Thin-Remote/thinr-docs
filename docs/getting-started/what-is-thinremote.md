---
title: What is ThinRemote?
description: Overview of the ThinRemote platform and the problems it solves.
---

# What is ThinRemote?

ThinRemote is a secure remote access and device management platform for Linux and macOS systems, from embedded IoT nodes to cloud servers.

It replaces VPNs, bastions, and port-forwarding setups with a single lightweight agent that establishes an outbound-only TLS connection to the ThinRemote cloud. From there you can open shells, tunnel services, transfer files, run scripts, and monitor metrics, all without exposing any inbound port.

## What you can do with it

- **Open a terminal on any device**: interactive consoles from the CLI or the browser, plus [tunneled SSH](/cli/ssh-and-console) for your own client.
- **Run commands at fleet scale**: [exec](/cli/exec-commands) on one device or fan out across a whole product with concurrency, timeouts and per-device results.
- **Reach internal services**: [TCP, TLS and HTTP tunnels](/cli/tcp-tls-tunneling) to anything reachable from the device, like web panels, databases, or PLCs on the local network.
- **Move files**: [push, pull and browse](/cli/file-management) remote filesystems.
- **Monitor and alert**: built-in [CPU, memory, disk and network metrics](/device-agent/monitoring-and-alarms) with alarm rules.
- **Keep agents current**: [one-command agent updates](/device-agent/channels) with checksums, channels, and staged fleet rollouts.
- **Let AI operate the fleet**: the CLI ships an [MCP server](/mcp/overview) exposing all of the above as typed tools for Claude, Cursor, and custom agents.

## What runs locally, what we run for you

The software you install on your own devices is open. The agent ([`Thin-Remote/thinr-agent`](https://github.com/Thin-Remote/thinr-agent)), its underlying IOTMP Linux client ([`thinger-io/IOTMP-Linux`](https://github.com/thinger-io/IOTMP-Linux)), and the command-line tooling with the built-in MCP server ([`Thin-Remote/thinr-cli`](https://github.com/Thin-Remote/thinr-cli)) ship with their source, build scripts, and cross-compilation toolchains. Anyone can audit them, rebuild their own binaries, or bake them into custom OS images.

The transport isn't proprietary either. ThinRemote speaks [IOTMP](https://iotmp.io) (the Internet of Things Message Protocol), an open binary, resource-oriented protocol published as an IETF Internet-Draft (`draft-bustamante-iotmp`). Its wire format and encoding (PSON) are publicly specified.

What we run as a service is the central platform: the web console, long-term persistence, multi-device orchestration, team access controls, and everything you'd otherwise host, monitor, and scale yourself. In short: the software on your fleet is yours to audit and compile; the platform is the SaaS that spares you from operating the backend.

## What you'll find in this section

- [How it works](./how-it-works): end-to-end architecture
- [Architecture and security](/device-agent/architecture-and-security): trust model and transport
- [ThinRemote vs VPN](./vs-vpn): how we differ from traditional remote access
- [ThinRemote vs Tailscale](./vs-tailscale): a network layer vs an operations layer
- [Drive your fleet with AI](/getting-started/ai-assistant): let AI agents operate your fleet
