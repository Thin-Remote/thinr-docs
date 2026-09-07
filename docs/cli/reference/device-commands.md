---
title: "thinr device"
description: Complete reference for device-scoped commands.
---

# `thinr device`

Pattern: `thinr device <action> <deviceId> [args…] [options]`

Every data-producing action accepts `-j, --json` (see [JSON envelope](./json-envelope)). Options listed below are action-specific.

## Discovery and status

### `list [pattern]`

List devices, optionally filtered by a case-insensitive regex matched against id and name.

```bash
thinr device list
thinr device list revpi
thinr device list "^edge-|gateway"
```

### `status <deviceId>`

Connection stats (uptime, tx/rx, last-seen) plus the latest monitoring sample.

```bash
thinr device status edge-gw-17 --json
```

## Terminal

### `console <deviceId>`

Open an interactive terminal on the device, with full TTY passthrough, resize, and signal forwarding. Exit the remote shell to close the session.

## Tunnels

All three open a relay port on the ThinRemote server and forward its connections through the device to a target reachable *from the device* (not necessarily on it).

| Action | Default target | Options |
|--------|----------------|---------|
| `tcp <id> [target]` | `localhost:22` | `-p, --port <port>` relay port on the server (default: random in 50000–51000) |
| `tls <id> [target]` | `localhost:443` | `-p, --port <port>` |
| `http <id> [target]` | `localhost:80` | `-p, --port <port>` · `--no-open` don't open the browser |

```bash
thinr device tcp edge-gw-17                      # SSH: ssh admin@<server> -p <printed port>
thinr device tcp edge-gw-17 192.168.0.50:502     # a PLC next to the gateway
thinr device http edge-gw-17 localhost:3000      # web UI: prints a URL and opens your browser
```

The proxy lives on the server while the command runs; Ctrl+C deletes it. While it's up, whatever you expose is protected by the target service's own authentication (your SSH login, the panel's password), so prefer short-lived tunnels.

## Remote execution

### `exec <deviceId> <command…>`

Run a shell command on the device, streaming stdout/stderr live. The local process exits with the remote command's exit code.

| Option | Meaning |
|--------|---------|
| `-j, --json` | Buffer output and emit one `{stdout, stderr, exitCode}` envelope on exit. |
| `--legacy` | Use the non-streaming one-shot API (older agents). |

```bash
thinr device exec edge-gw-17 "uname -a"
thinr device exec edge-gw-17 "apt update && apt upgrade -y"
```

## Files

| Action | Purpose | Options |
|--------|---------|---------|
| `push <id> <local> <remote>` | Upload a file. Trailing `/` on remote keeps the source basename. | |
| `pull <id> <remote> <local>` | Download a file. | |
| `ls <id> [path]` | List a directory (default `/`). | `-a, --all` include dotfiles |
| `read <id> <path>` (alias `cat`) | Print a remote file to stdout. | |
| `write <id> <path> [content]` | Write inline content; reads stdin when omitted. Use `push` for large files. | |
| `mkdir <id> <path>` | Create a directory. | |
| `rm <id> <path>` | Delete a file or directory. | `-r, --recursive` (default) · `--no-recursive` fail on non-empty dirs |
| `mv <id> <src> <dst>` | Move or rename. | `-f, --force` overwrite destination |

```bash
thinr device push edge-gw-17 ./config.yaml /etc/app/
thinr device pull edge-gw-17 /var/log/app.log ./
echo "$CONFIG" | thinr device write edge-gw-17 /etc/app/env
```

## Properties and resources

### `property <deviceId> [propertyId]`

List the device's properties, or read one by name.

| Option | Meaning |
|--------|---------|
| `-f, --field <path>` | Extract a sub-field via dot path (e.g. `-f data.value`). |

### `resource <deviceId> [resource]`

List the device's resources, or call one by name.

| Option | Meaning |
|--------|---------|
| `-f, --field <path>` | Extract a sub-field from the result. |
| `-i, --input <key=value>` | Resource input parameter (repeatable). |

```bash
thinr device resource edge-gw-17                      # list
thinr device resource edge-gw-17 update -i action=check
```

See [Properties vs resources](/getting-started/properties-vs-resources) for when to use which.

## Logs

### `logs <deviceId>`

Tail or stream device logs: journalctl by default, a file with `--path`, or a product-configured source with `--source`.

| Option | Meaning |
|--------|---------|
| `-f, --follow` | Keep streaming until Ctrl+C. |
| `-n, --tail <n>` | Initial lines to show (default: 100). |
| `--unit <name>` | Filter by systemd unit (journalctl only). |
| `--since <when>` | Entries since a time expression (journalctl only). |
| `--path <file>` | Follow a file instead of journalctl. |
| `--source [name]` | Stream a [log source](/cli/reference/product-commands#logs) configured on the device's product (omit the name for the default). |
| `-j, --json` | Buffer and emit a single envelope. Incompatible with `--follow`. |

```bash
thinr device logs edge-gw-17 -f --unit nginx
thinr device logs edge-gw-17 --path /var/log/syslog -n 500
```

## Agent updates

| Action | Purpose | Options |
|--------|---------|---------|
| `update check <id>` | Report whether an agent update is available. | `--channel <name>` (default: `latest`) |
| `update apply <id>` | Apply the update; the service restarts on the new binary. | `--channel <name>` |

For whole-fleet rollouts with canary and batching, use [`thinr fleet upgrade`](./fleet-commands).

## Lifecycle

### `delete <deviceId>`

Delete the device record from the platform. This is irreversible, so it prompts for confirmation unless `-y, --yes` is passed.

## Exit codes

`0` on success, `1` on failure, `130` on Ctrl+C. `exec` exits with the remote command's exit code. See [Error codes](./error-codes).
