---
title: "thinr agent"
description: Check for and apply ThinRemote agent updates, on one device or across the fleet with canary and batches.
---

# `thinr agent`

Pattern: `thinr agent <verb> [<device>] [options]`

## `agent check <device>`

Report whether a newer agent release is available for a device.

| Option | Meaning |
|--------|---------|
| `--channel <name>` | Release channel to compare against (default: `latest`). See [release channels](/device-agent/channels). |
| `-j, --json` | Output as a [JSON envelope](./json-envelope). |

```bash
thinr agent check edge-gw-17
thinr agent check edge-gw-17 --channel main
```

## `agent update <device>`

Apply the update on one device; the service restarts on the new binary.

| Option | Meaning |
|--------|---------|
| `--channel <name>` | Release channel to install from (default: `latest`). |
| `-j, --json` | Output as a [JSON envelope](./json-envelope). |

```bash
thinr agent update edge-gw-17
thinr agent update edge-gw-17 --channel main
```

## `agent update --all`

Apply an agent update across every outdated device in the fleet, with a canary phase and progressive batches:

```bash
thinr agent update --all
thinr agent update --all -p edge-gateways -g staging --dry-run
thinr agent update --all --channel main --batch-size 10 -y
```

The command resolves the target release for the channel, lists the fleet, reads each device's agent version, shows a summary of what's outdated, and asks for confirmation. It then applies updates (one canary device first, then batches) and reports per-device results.

| Option | Meaning |
|--------|---------|
| `--channel <name>` | Release channel to target (default: `latest`). |
| `-p, --product <id>` | Restrict to devices belonging to a product. |
| `-g, --group <id>` | Restrict to devices in an asset group. |
| `--batch-size <n>` | Devices updated in parallel once the canary passes (default: 5). |
| `--no-canary` | Skip the canary phase; batch from the start. |
| `--continue-on-error` | Keep rolling after a batch failure instead of aborting. |
| `--dry-run` | List what would be updated without sending update requests. |
| `-y, --yes` | Skip the confirmation prompt (required in non-interactive shells). |
| `-j, --json` | Output as a [JSON envelope](./json-envelope). |

`-p`, `-g`, `--batch-size`, `--no-canary`, `--continue-on-error`, `--dry-run` and `-y` only apply together with `--all`.

See the [update mechanism](/device-agent/reference/auto-update) for what happens on the device side.
