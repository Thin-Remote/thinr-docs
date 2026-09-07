---
title: "thinr fleet"
description: Fleet-wide agent upgrades with canary and batches.
---

# `thinr fleet`

## `fleet upgrade`

Apply an agent update across every outdated device in the fleet, with a canary phase and progressive batches:

```bash
thinr fleet upgrade
thinr fleet upgrade -p edge-gateways -g staging --dry-run
thinr fleet upgrade --channel main --batch-size 10 -y
```

The command resolves the target release for the channel, lists the fleet, reads each device's agent version, shows a summary of what's outdated, and asks for confirmation. It then applies updates (one canary device first, then batches) and reports per-device results.

| Option | Meaning |
|--------|---------|
| `--channel <name>` | Release channel to target (default: `latest`). See [release channels](/device-agent/channels). |
| `-p, --product <id>` | Restrict to devices belonging to a product. |
| `-g, --group <id>` | Restrict to devices in an asset group. |
| `--batch-size <n>` | Devices updated in parallel once the canary passes (default: 5). |
| `--no-canary` | Skip the canary phase; batch from the start. |
| `--continue-on-error` | Keep rolling after a batch failure instead of aborting. |
| `--dry-run` | List what would be upgraded without sending update requests. |
| `-y, --yes` | Skip the confirmation prompt (required in non-interactive shells). |
| `-j, --json` | Output as a [JSON envelope](./json-envelope). |

For a single device, `thinr device update check/apply` does the same without orchestration; see [`thinr device`](./device-commands#agent-updates).
