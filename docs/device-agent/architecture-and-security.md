---
title: Architecture and security
description: Trust model, encryption and access control in ThinRemote.
---

# Architecture and security

## Transport

- All device traffic is TLS-encrypted, outbound-only from the device, over port 443.
- The wire protocol is [IOTMP](https://iotmp.io), an open, binary, resource-oriented protocol published as an IETF Internet-Draft. There is nothing proprietary to trust blindly: the agent, its protocol client, and the CLI are [open source](https://github.com/Thin-Remote).
- No inbound ports required. Works behind NAT, corporate firewalls, CGNAT, and cellular networks.
- Server certificates are validated against the system CA bundle (the agent honors [`SSL_CERT_FILE` / `SSL_CERT_DIR`](/device-agent/reference/environment-variables), and falls back to embedded CA certificates on minimal systems).

## Authentication

**Devices** authenticate with their own three-part credentials (device id, account, and a long-lived device token), provisioned once at install time. The token is issued during installation in exchange for one of:

- an OAuth 2.0 device-flow approval in your browser,
- your username and password (used once, never stored), or
- a provisioning token (for [headless installs](/device-agent/headless-provisioning)).

**Users** authenticate to the platform via OAuth 2.0 device flow, credentials, or pre-issued bearer tokens. The CLI stores per-profile tokens at `~/.config/thinr-cli/config.json` and refreshes them transparently.

## Credentials on the device

- The only secret on a managed device is its own device token, stored in the agent [config file](/device-agent/reference/config-file) (`/etc/thinr-agent/config.json` or `~/.config/thinr-agent/config.json`) with `0600` permissions.
- No user passwords, browser sessions, or account-wide secrets ever persist on the device.
- A device token only grants access *as that device*. Compromising one device does not expose the rest of the fleet; revoke its token and re-provision to rotate.

## What the agent exposes

The agent registers a fixed set of resources over its connection. There is no generic "run anything" backdoor beyond what's listed:

| Resource | Purpose |
|----------|---------|
| `shell` | Interactive terminal sessions |
| `cmd` / `cmd_stream` | One-shot and streaming command execution |
| `filesystem` | Browse, read, write, upload, download files |
| `proxy` | TCP/TLS/HTTP tunneling to targets reachable from the device |
| `monitoring` | CPU, memory, disk and network metrics |
| `update` | Self-update check and apply |
| `scripts` | User-defined [custom scripts](/device-agent/custom-scripts) |
| `system` / `agent` | OS and agent version info |

## Privilege model

The agent runs with the privileges you give it, nothing more:

- A **system install (root)** allows full-device management: any file, any command, any port.
- A **user install** constrains everything to that user's OS permissions: its files, its processes.

Access control on the device is therefore delegated to the operating system, where it's already enforced and audited.

## Update integrity

Self-updates download over TLS from `get.thinremote.io`, and the binary's SHA256 checksum is verified against the channel metadata before the swap. A failed verification aborts the update and leaves the running binary untouched. See [release channels](/device-agent/channels).

## Access control on the platform

- Role-based access control (RBAC) for teams and customers.
- Admin impersonation via the `-u/--user` flag on the CLI, for operating on behalf of managed accounts.
- User tokens can be scoped and revoked from the web console at any time.
