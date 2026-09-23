---
title: Release channels
description: Choose between stable, main and develop channels for the agent.
---

# Release channels

The agent distributes binaries on three channels:

| Channel | Installer | Use for |
|---------|-----------|---------|
| `latest` (stable) | `install.sh` | Production deployments. |
| `main` | `install-main.sh` | Early adopters and internal staging. |
| `develop` | `install-develop.sh` | Bleeding-edge features; may break. |

Example:

```bash
# Install from main channel
curl -fsSL https://get.thinremote.io/install-main.sh | sh
```

## How updates work

Each channel publishes a metadata file at `https://get.thinremote.io/<channel>.json` containing the current version and a SHA256 checksum per architecture. To update, the agent:

1. Fetches the channel metadata and compares versions.
2. Downloads the binary for its architecture from `binaries/<channel>/`.
3. Verifies the SHA256 checksum.
4. Swaps the binary in place and exits, so the init system (systemd `Restart=always`, launchd `KeepAlive`, …) restarts it on the new version with the existing configuration.

You can drive this from the device, from your workstation, or across the whole fleet:

```bash
# on the device
thinr-agent update                       # check only (latest channel)
thinr-agent update --apply               # apply if available
thinr-agent update --channel develop --apply

# remotely, via the CLI
thinr device update check <deviceId>
thinr device update apply <deviceId> --channel main

# whole fleet, with canary and batches
thinr fleet upgrade --channel latest
```

See [`thinr fleet`](/cli/reference/fleet-commands) for the progressive rollout options, and the [update mechanism](/device-agent/reference/auto-update) for the agent-side details.

## Switching channels

A device is not permanently bound to a channel: the channel is simply a parameter of each update. To move a device from `latest` to `main`, apply one update from the new channel:

```bash
thinr device update apply <deviceId> --channel main
```

## Pinning a specific version

Every release is archived under its own version directory on the CDN (`binaries/v1.X.Y/`). The installer accepts a version tag in place of a channel name, which also serves as a rollback mechanism:

```bash
curl -fsSL https://get.thinremote.io/install.sh | CHANNEL=v1.2.3 sh
```

For a system install, set the variable on the `sudo` command line, since sudo resets the environment and would drop it otherwise:

```bash
curl -fsSL https://get.thinremote.io/install.sh | sudo CHANNEL=v1.2.3 sh
```

A pinned device stays on that version until you explicitly update it: version directories never change after release, while channel directories always track their head.
