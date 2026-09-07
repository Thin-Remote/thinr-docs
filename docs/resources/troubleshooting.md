---
title: Troubleshooting
description: Diagnose common installation and connectivity issues.
---

# Troubleshooting

## Agent side

- **Agent not showing up in the console**
  Check the service: `systemctl status thinr-agent`. Verify outbound connectivity to `*.thinremote.io:443`.

- **TLS errors on LAN / dev environments**
  Set `THINR_INSECURE=1` when connecting to a self-signed server. Localhost and 127.0.0.1 are always accepted.

## CLI side

- **`not_configured` error**
  No profile saved yet. Run `thinr` without arguments to authenticate.

- **`unauthorized` error**
  Token expired or missing permissions. Re-authenticate or request the needed role.

## Planned content

- Verbose logging (`-v`, `-vv`)
- Systemd log inspection
- Common network failure modes
- Filing a support ticket with the right info
