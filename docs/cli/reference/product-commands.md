---
title: "thinr product"
description: Fan out operations across devices that belong to a product.
---

# `thinr product`

Pattern: `thinr product <action> <productId> [args…] [options]`

Product commands operate on every device of a product at once. By default they target **active (connected) devices only**; offline devices are skipped, since the server would reject calls to them anyway.

## Common flags

These appear across most fan-out actions:

| Flag | Meaning |
|------|---------|
| `-j, --json` | Emit one envelope with `results[]`, one entry per device (see [JSON envelope](./json-envelope#product-scoped-commands)). |
| `-g, --group <group>` | Restrict to devices in an asset group. |
| `-c, --concurrency <n>` | Max parallel operations (default: 10). |
| `-a, --all` | Include offline devices. |
| `--fail-fast` | Stop dequeueing new devices as soon as one fails. |

## Discovery and status

### `list`

List every product, with enabled/disabled state and script count. Options: `-c, --concurrency <n>`.

### `status <productId>`

Snapshot of every device in the product: connection status plus monitoring.

| Option | Meaning |
|--------|---------|
| `-w, --watch [seconds]` | Refresh continuously (default interval: 5s). Uses the alternate screen buffer, like `htop`. |
| `-g, --group <group>` · `-c, --concurrency <n>` | As above. |

```bash
thinr product status edge-gateways --watch 10
```

## Fan-out operations

### `exec <productId> <command…>`

Run a shell command in parallel on every active device.

| Option | Meaning |
|--------|---------|
| `--timeout <seconds>` | Per-device timeout (default: 30). |
| `-g`, `-c`, `-a`, `--fail-fast`, `-j` | As above. |

Prints a status table (device, status, detail, duration) followed by per-device output blocks. In JSON mode, emits a `summary` block plus `results[]` with `stdout`, `stderr`, exit code, `timedOut` flag, and duration per device.

```bash
thinr product exec edge-gateways "systemctl restart app" -c 5 --timeout 60
```

### `property <productId> <propertyId>`

Read a property from every device. Options: `-f, --field <path>` dot-path extraction, plus `-g`, `-a`, `-j`.

```bash
thinr product property edge-gateways temperature -f data.celsius
```

### `resource <productId> <resource>`

Call a resource on every active device. Options: `-i, --input <key=value>` (repeatable), `-f, --field <path>`, plus `-g`, `-j`.

### `push <productId> <localPath> <remotePath>`

Upload a local file to every active device in parallel. Options: `-g`, `-c`, `-a`, `--fail-fast`, `-j`.

```bash
thinr product push edge-gateways ./config.yaml /etc/app/config.yaml
```

## Product properties (admin)

Properties attached to the product itself, not its devices:

| Action | Purpose |
|--------|---------|
| `property-list <productId>` | List product property names. |
| `property-get <productId> <propertyId>` | Read one. |
| `property-set <productId> <propertyId> <value>` | Create or overwrite. The value is parsed as JSON, falling back to a raw string. |
| `property-delete <productId> <propertyId>` | Delete (idempotent). |

## Dashboard metrics

Metrics drive the fleet dashboard for a product:

| Action | Purpose |
|--------|---------|
| `metric-list <productId>` | List configured metrics. |
| `metric-set <productId> <name>` | Add or update a metric. |
| `metric-delete <productId> <name>` | Remove a metric. |

`metric-set` options:

| Option | Meaning |
|--------|---------|
| `-r, --resource <resource>` | **Required.** Product API resource the dashboard invokes. |
| `-l, --label <label>` | Human-readable label. |
| `-f, --field <field>` | Dot-path to the numeric value inside the response. |
| `-a, --aggregation <agg>` | Fleet aggregation: `sum`, `avg`, `max`, `min`, `count`, `top`, `none`, `distribution`. |
| `-v, --visualization <viz>` | Rendering hint: `kpi`, `bar`, `sparkline`, `list`. |
| `-i, --interval <seconds>` | Dashboard refresh interval. |
| `--unit <unit>` | Display unit suffix (e.g. `%`, `devices`). |

## Logs

Named log sources that `thinr device logs --source` can stream:

| Action | Purpose |
|--------|---------|
| `logs list <productId>` | List configured log sources. |
| `logs show <productId> <name>` | Show a single source with its full command, untruncated. |
| `logs add <productId> <name>` | Add or replace a source. |
| `logs remove <productId> <name>` (alias `rm`) | Remove a source. |
| `logs set-default <productId> <name>` | Set the default source. |
| `logs presets` | List available rendering presets. |

`logs add` options:

| Option | Meaning |
|--------|---------|
| `-c, --command <cmd>` | **Required.** Shell command the agent executes for this source. |
| `--default` | Mark as the active default. |
| `--pattern <regex>` | Custom regex with named groups (`time`, `level`, `msg`) for structured rendering. |
| `--preset <name>` | Use a named rendering preset instead. |

## Playbooks

Playbooks stored on the product. See [`thinr playbook`](./playbook-commands) for authoring ad-hoc playbook files.

| Action | Purpose |
|--------|---------|
| `playbook list <productId>` | List registered playbooks. |
| `playbook upload <productId> <name> [file]` | Upload a YAML (stdin when omitted or `-`). Validated against the schema first; `--skip-validation` bypasses, `-d, --description <text>` overrides the description. |
| `playbook download <productId> <name>` | Print the YAML (or `-o, --output <file>`). |
| `playbook delete <productId> <name>` | Delete (idempotent). |
| `playbook run <productId> <name>` | Run against one device or the fleet. |

### `playbook run`

Requires exactly one of `-d, --device <id>` or `--fleet`.

Shared options: `-v, --var <key=value>` (repeatable, coerced to the declared type), `--vars-file <path>`, `--dry-run` (print the resolved plan), `--check` (contact devices read-only, report what would change), `-y, --yes`, `-j, --json`.

Fleet-mode options:

| Option | Meaning |
|--------|---------|
| `--batch-size <n>` | Devices attempted in parallel per batch (default: 5). |
| `--failure-threshold <p>` | Abort when the cumulative failure rate reaches P% (default: 10). |
| `-g, --group <id>` · `--filter <key=value>` | Device selection. |
| `--include-offline` | Include offline devices. |

Fleet runs write a persistent JSON report to `playbooks/runs/<timestamp>-<name>-<user>.json` in the product's file storage: resolved variables, per-device outcomes, and any abort reason.

```bash
thinr product playbook run edge-gateways nginx-config --device edge-gw-17 --check
thinr product playbook run edge-gateways nginx-config --fleet --batch-size 3 -y
```

## Partial failures

Fan-out commands don't stop on individual device errors (unless `--fail-fast`): each device reports its own outcome, and the run itself completes successfully. When scripting, don't rely on the process exit code to detect per-device failures; check `summary.failed` and `results[].ok` in the JSON output instead. The top-level `ok` reflects the command run, not unanimity.
