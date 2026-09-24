---
title: Agent updates
description: Every way to check and apply agent updates, from the device to the whole fleet.
---

# Agent updates

The agent updates **on demand**: nothing changes on a device until you (or your automation) ask for it. All entry points drive the same verified mechanism, so pick whichever fits the moment.

## Am I on the latest?

Every check reports the same two numbers: what the device runs and what the channel currently offers.

```bash
thinr device update check <deviceId>     # from your workstation
thinr-agent update                       # on the device, checks without applying
```

```json
{ "current": "v1.6.6", "latest": "v1.6.8", "status": "update_available" }
```

`status` is `up_to_date` when they match. For the installed version alone, `thinr-agent --version` on the device.

To see what a channel offers without involving any device, read its manifest. Handy in a script, or when deciding whether an upgrade round is worth it:

```bash
curl -s https://get.thinremote.io/latest.json    # also main.json, develop.json
```

It carries the version and the SHA256 of every architecture's binary, which is the same manifest the agent verifies against when it updates itself.

Across a fleet, `thinr fleet upgrade --dry-run` lists every outdated device without changing anything. See [fleet commands](/cli/reference/fleet-commands).

## On the device itself

The installed binary manages its own updates:

```bash
thinr-agent update                          # check only (latest channel)
thinr-agent update --apply                  # apply if available
thinr-agent update --channel main --apply   # from a specific channel
```

Useful over an SSH session, in a local cron job, or baked into your own provisioning scripts.

## From your workstation

```bash
thinr device update check <deviceId>
thinr device update apply <deviceId> [--channel latest]
```

`--channel` chooses between `latest`, `main`, and `develop`. See [release channels](./channels).

## Across the fleet

For many devices, don't loop over them yourself: `thinr fleet upgrade` resolves what's outdated and rolls out with a canary first, then parallel batches, aborting if too many fail:

```bash
thinr fleet upgrade --dry-run               # see what would be upgraded
thinr fleet upgrade -p edge-gateways -y     # one product, no prompt
```

Full options in the [`thinr fleet` reference](/cli/reference/fleet-commands).

## From anything that can call a resource

Updates are also exposed as a regular device resource named `update`, so the web console, the REST API, and AI assistants (the `thinr_update` MCP tool) can drive them too:

```bash
thinr device resource <deviceId> update -i action=check
```

## How it works

1. When an update is requested, the agent fetches the channel manifest (`https://get.thinremote.io/<channel>.json`) and compares versions.
2. If newer, it downloads the binary for its architecture.
3. The binary is verified against the SHA256 checksum in the manifest; a mismatch aborts and leaves the running binary untouched.
4. The agent swaps the binary and exits; the init system restarts it on the new version, with the existing configuration. Expect a few seconds offline.

The deeper details (timeouts, CDN layout, troubleshooting) live in the [update mechanism reference](./reference/auto-update).

## Pinning and rollback

Channel directories track their head, but every release is also archived immutably per version. Installing a pinned version is both the pinning and the rollback procedure; see [release channels](./channels#pinning-a-specific-version).
