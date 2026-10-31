---
title: "thinr product"
description: Fan out operations across devices that belong to a product.
---

# `thinr product`

Pattern: `thinr product <verb> <product> [args…] [options]`, with nested nouns for what hangs from a product (`thinr product property get <product> <property>`, `thinr product metric set <product> <name>`).

The fan-out commands operate on every device of a product at once. By default they target **active (connected) devices only**; offline devices are skipped, since the server would reject calls to them anyway.

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

List every product, with its API resources. Options: `--search <text>`, `--filter <key=value>` (repeatable), `--count <n>`, `--index <n>`, `-c, --concurrency <n>`, `-j`.

### `get <product>`

Show a product as JSON. Options: `-f, --field <path>`, `-o, --output <file>`.

The other record verbs follow the same shape: `create`, `update`, `delete` (asks unless `-y`), `clone <product> <new-id>` and `describe`. `export <product>` writes the product with everything it depends on as one JSON document, and `apply --from <file>` creates or updates a product from that document.

### `status <product>`

Snapshot of every device in the product: connection status plus monitoring.

| Option | Meaning |
|--------|---------|
| `-w, --watch [seconds]` | Refresh continuously (default interval: 5s). Uses the alternate screen buffer, like `htop`. |
| `-g, --group <group>` · `-c, --concurrency <n>` | As above. |

```bash
thinr product status edge-gateways --watch 10
```

## Fan-out operations

### `exec <product> <command…>`

Run a shell command in parallel on every active device.

| Option | Meaning |
|--------|---------|
| `--timeout <seconds>` | Per-device timeout (default: 30). |
| `-g`, `-c`, `-a`, `--fail-fast`, `-j` | As above. |

Prints a status table (device, status, detail, duration) followed by per-device output blocks. In JSON mode, emits a `summary` block plus `results[]` with `stdout`, `stderr`, exit code, `timedOut` flag, and duration per device.

```bash
thinr product exec edge-gateways "systemctl restart app" -c 5 --timeout 60
```

### `device-property <product> <property>`

Read a property from every device. Options: `-f, --field <path>` dot-path extraction, plus `-g`, `-a`, `-j`.

```bash
thinr product device-property edge-gateways temperature -f data.celsius
```

### `device-resource <product> <resource>`

Call a resource on every active device. With `--from` or `--set` it runs the resource with that input; without, it reads its output. Options: `-s, --set <key=value>` (repeatable, values parsed as JSON when they are), `--from <file>` (JSON body, `-` for stdin), `-f, --field <path>`, plus `-g`, `-j`.

```bash
thinr product device-resource edge-gateways update -s action=check
```

### `push <product> <local-path> <remote-path>`

Upload a local file to every active device in parallel. Options: `-g`, `-c`, `-a`, `--fail-fast`, `-j`.

```bash
thinr product push edge-gateways ./config.yaml /etc/app/config.yaml
```

## Product properties (admin)

Properties attached to the product itself, not its devices:

| Action | Purpose |
|--------|---------|
| `property list <product>` | List product property records. |
| `property get <product> <property>` | Print the property record as JSON, with its value under `value` (so `-f` paths start there: `-f value.setpoint`). |
| `property set <product> <property> <value>` | Create or overwrite. The value is parsed as JSON, falling back to a raw string. |
| `property delete <product> <property>` | Delete. Asks for confirmation unless `-y`. |

`property create`, `update`, `clone` and `describe` are also available for the full record.

## Dashboard metrics

Metrics drive the fleet dashboard for a product:

| Action | Purpose |
|--------|---------|
| `metric list <product>` | List configured metrics. |
| `metric set <product> <name>` | Add or update a metric. |
| `metric delete <product> <name>` | Remove a metric. Asks for confirmation unless `-y`. |

`metric set` options:

| Option | Meaning |
|--------|---------|
| `-r, --resource <resource>` | **Required.** Product API resource the dashboard invokes. |
| `-l, --label <label>` | Human-readable label. |
| `-f, --field <field>` | Dot-path to the numeric value inside the response. |
| `-a, --aggregation <agg>` | Fleet aggregation: `sum`, `avg`, `max`, `min`, `count`, `top`, `none`, `distribution`. |
| `-v, --visualization <viz>` | Rendering hint: `kpi`, `bar`, `sparkline`, `list`. |
| `-i, --interval <seconds>` | Dashboard refresh interval. |
| `--unit <unit>` | Display unit suffix (e.g. `%`, `devices`). |
| `-j, --json` | JSON output. |

## Logs

Named log sources that `thinr device logs --source` can stream:

| Action | Purpose |
|--------|---------|
| `logs list <product>` | List configured log sources. |
| `logs get <product> <name>` | Show a single source with its full command, untruncated. |
| `logs create <product> <name>` | Add or replace a source. |
| `logs delete <product> <name>` | Remove a source (idempotent). Asks for confirmation unless `-y`. |
| `logs set-default <product> <name>` | Set the default source. |
| `logs presets` | List available rendering presets. |

`logs create` options:

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
| `playbook list <product>` | List registered playbooks. |
| `playbook upload <product> <name> [file]` | Upload a YAML (stdin when omitted or `-`). Validated against the schema first; `--skip-validation` bypasses, `-d, --description <text>` overrides the description. |
| `playbook download <product> <name>` | Print the YAML (or `-o, --output <file>`). |
| `playbook delete <product> <name>` | Delete (idempotent). Asks for confirmation unless `-y`. |
| `playbook run <product> <name>` | Run against one device or the fleet. |

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
