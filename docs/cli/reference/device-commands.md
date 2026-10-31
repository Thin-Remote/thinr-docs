---
title: "thinr device"
description: Complete reference for device-scoped commands.
---

# `thinr device`

Pattern: `thinr device <verb> <device> [args…] [options]`, with nested nouns for what hangs from a device (`thinr device property get <device> <property>`, `thinr device resource call <device> <resource>`).

Every data-producing action accepts `-j, --json` (see [JSON envelope](./json-envelope)). Options listed below are action-specific.

## Discovery and status

### `list`

List devices with their online state, id, name, type and product.

| Option | Meaning |
|--------|---------|
| `--search <text>` | Text to look for in ids and names. |
| `--filter <key=value>` | Filter (repeatable): `product`, `type`, `asset_type`, `asset_group`, `project`, `labels`, or a field of the records. |
| `--count <n>` · `--index <n>` | Page size and offset of the first record. |

```bash
thinr device list
thinr device list --search revpi
thinr device list --filter product=edge-gateways
```

### `get <device>`

Show the device record as JSON. Options: `-f, --field <path>` prints one field (dot path), `-o, --output <file>` writes the JSON to a file.

### `status <device>`

Connection stats (uptime, tx/rx, last-seen) plus the latest monitoring sample.

```bash
thinr device status edge-gw-17 --json
```

## Terminal

### `console <device>`

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

### `exec <device> <command…>`

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

### `property`

| Action | Purpose |
|--------|---------|
| `property list <device>` | List the device's property records. |
| `property get <device> <property>` | Print the property record as JSON, with its value under `value`. |
| `property set <device> <property> <value>` | Set the value (created when missing). The value is parsed as JSON, falling back to a raw string. |
| `property delete <device> <property>` | Delete a property. Asks for confirmation unless `-y`. |

`property get` takes `-f, --field <path>` to print one field; paths start at the record, so the value's fields are under `value` (e.g. `-f value.setpoint`). `property create`, `update`, `clone` and `describe` are also available for the full record.

```bash
thinr device property list edge-gw-17
thinr device property get edge-gw-17 config -f value.setpoint
thinr device property set edge-gw-17 config '{"setpoint": 21.5}'
```

### `resource`

| Action | Purpose |
|--------|---------|
| `resource list <device>` | List the resources the connected device exposes, with their inputs and outputs. |
| `resource call <device> <resource>` | Call a resource. With `--from` or `--set` it runs it with that input; without, it reads its output. |

`resource call` options:

| Option | Meaning |
|--------|---------|
| `-s, --set <key=value>` | Input field (repeatable). Values are parsed as JSON when they are; dots nest (`data.source=resource`). |
| `--from <file>` | JSON input from a file, or `-` for stdin. |
| `-f, --field <path>` | Extract a sub-field from the result. |
| `-o, --output <file>` | Write the answer to a file. |

```bash
thinr device resource list edge-gw-17
thinr device resource call edge-gw-17 update -s action=check
```

See [Properties vs resources](/getting-started/properties-vs-resources) for when to use which.

## Logs

### `logs <device>`

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

Checking for and applying agent updates lives under [`thinr agent`](./agent-commands): `thinr agent check <device>`, `thinr agent update <device>`, and `thinr agent update --all` for whole-fleet rollouts with canary and batching.

## Lifecycle

### `create`, `update`, `clone`

`create [device]` registers a device, `update <device>` changes fields of its record (fields left out are kept) and `clone <device> <new-id>` copies it under a new id. They take the record fields from `-n, --name`, `-d, --description`, `-s, --set <key=value>` (repeatable) and `--from <file>`; `create` also takes `-t, --type` (default `Generic`), `-c, --credentials` and `-p, --product`. `describe` prints the fields, examples and permissions of a device as the server's API defines them.

### `set-product <device> <product>`

Assign the device to a product (`""` unassigns it).

### `delete <device>`

Delete the device record from the platform. This is irreversible, so it prompts for confirmation unless `-y, --yes` is passed.

## Exit codes

`0` on success, `1` on failure, `130` on Ctrl+C. `exec` exits with the remote command's exit code. See [Error codes](./error-codes).
