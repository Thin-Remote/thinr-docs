---
title: How it works
description: End-to-end architecture of the agent, cloud, CLI and web console.
---

# How it works

Three pieces make up the ThinRemote stack:

1. **Agent**: a single static binary (`thinr-agent`) running on each managed device.
2. **Cloud**: the ThinRemote relay that brokers secure connections.
3. **Clients**: the `thinr` CLI, the web console, or any MCP-compatible AI agent.

## Connection model

- The agent opens an **outbound-only** TLS connection to the cloud over port 443: no inbound ports, no NAT configuration, no dynamic DNS. It works behind firewalls, CGNAT, and cellular links.
- Over that connection it speaks [IOTMP](https://iotmp.io), an open, binary, resource-oriented protocol: the agent registers a set of named resources (terminal, exec, filesystem, proxy, monitoring, update, custom scripts) that the platform can invoke.
- Clients never talk to devices directly. The CLI and web console call the cloud's REST/WebSocket API; the cloud routes each request to the target device through its existing tunnel and streams the response back.

## Life of a session

1. **Boot**: the init system starts `thinr-agent`, which loads its config (server, device id, device token).
2. **Connect**: the agent dials the cloud, authenticates with its device credentials, and registers its resources. The device shows as *connected*.
3. **Request**: you run `thinr device console <id>` (or click *Console* in the web console). The client opens a session against the cloud API; the cloud multiplexes a new stream onto the device's tunnel.
4. **Stream**: keystrokes, command output, file chunks, or proxied bytes flow bidirectionally over that stream. Multiple sessions (a console, a tunnel and a monitoring view) share one device connection.
5. **Teardown**: closing the client ends the stream; the device tunnel stays up for the next request.

## Tunneling

The agent's proxy resource turns any service reachable *from the device* into a connectable endpoint on the ThinRemote server:

- `thinr device tcp <id> [host:port]` for raw TCP (default `localhost:22`, ideal for SSH).
- `thinr device tls <id> [host:port]` for TLS endpoints (default `localhost:443`).
- `thinr device http <id> [host:port]` for HTTP, with automatic browser opening (default `localhost:80`).

The CLI asks the platform to open a relay port on your server (random in the 50000–51000 range, or pinned with `-p`). Every connection to that port is forwarded through the device's tunnel to the target, and the port is removed when you stop the command. The target doesn't need to run on the device itself: anything on the device's network works, which is how you reach a PLC's web panel or a router admin page sitting next to an edge gateway.

## Reconnection and failure modes

| Situation | Behavior |
|-----------|----------|
| Device loses connectivity | The agent retries the outbound connection with backoff until it's back. Active sessions drop; the device shows *disconnected* with its last-seen timestamp. |
| Agent process dies | The init system restarts it (`Restart=always` / `KeepAlive`). |
| Agent updates itself | The binary is swapped, the process exits, the init system restarts it on the new version. Expect a few seconds offline. |
| Device is offline when you call it | Commands fail fast with a clear error; fleet-wide operations skip offline devices by default (opt in with `--all`). |
| Cloud unreachable from your workstation | CLI commands fail with `network_error`; nothing on the device side is affected. |

## Where to go next

- [Architecture and security](/device-agent/architecture-and-security): trust model, credentials, transport
- [Quick Start](/getting-started/quick-start): set the three pieces up in minutes
- [ThinRemote vs VPN](./vs-vpn): how this model compares to traditional remote access
