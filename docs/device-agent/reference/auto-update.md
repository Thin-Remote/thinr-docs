---
title: Update mechanism
description: How agent updates are checked, verified and applied.
---

# Update mechanism

The agent updates itself **on demand**, not on a background schedule: nothing changes on your devices until you (or your automation) ask for it. An update can be triggered from three places, all driving the same mechanism:

```bash
thinr-agent update --apply               # on the device
thinr device update apply <deviceId>     # remotely, one device
thinr fleet upgrade                      # whole fleet, canary + batches
```

## Update flow

1. The agent fetches the manifest for the requested channel (`https://get.thinremote.io/<channel>.json`) and compares the advertised version with its own. The check has a 30-second timeout.
2. If newer, it downloads the binary for its architecture from `binaries/<channel>/` (5-minute timeout, so slow links are fine).
3. It verifies the binary's SHA256 checksum against the manifest. A mismatch aborts the update and leaves the running binary untouched.
4. It swaps the binary at its install path and exits. The [init system](./supported-init-systems) restarts the service, which comes back on the new version with the existing configuration. Expect a few seconds offline per device.

## CDN layout

```
get.thinremote.io/
├── install.sh                    # stable channel installer
├── install-main.sh               # main channel installer
├── install-develop.sh            # develop channel installer
├── latest.json                   # { "version": "v1.X.Y", "checksums": { … } }
├── main.json
├── develop.json
└── binaries/
    ├── latest/                   # stable release binaries
    ├── main/                     # latest main build
    ├── develop/                  # latest develop build
    └── v1.X.Y/                   # immutable per-version archive
```

## Channels, pinning and rollback

The channel is a parameter of each update, not a device-side setting, and versioned directories are immutable, which is what makes rollback possible. See [release channels](/device-agent/channels) for switching channels and pinning a version.

## Troubleshooting

- **The update reports `up_to_date` but you expected a release**: check the channel manifest (`curl https://get.thinremote.io/latest.json`); if the release was just cut, the CDN may not have the new manifest yet.
- **Checksum verification fails**: usually a CDN propagation race between the manifest and the binary; retry after a few minutes. The agent never installs a binary that fails verification.
- **The device didn't come back after an update**: the init system restarts the service automatically; if it's down, check `systemctl status thinr-agent` on the device. The previous binary can always be restored by [installing a pinned version](/device-agent/channels#pinning-a-specific-version).
