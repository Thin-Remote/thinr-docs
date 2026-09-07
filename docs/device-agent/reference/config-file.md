---
title: Device agent config file
description: JSON configuration file format for the agent.
---

# Config file

Default locations, chosen by who runs the agent:

- Running as root: `/etc/thinr-agent/config.json`
- Running as a user: `~/.config/thinr-agent/config.json`

Override with `-c, --config <path>`.

## Format

```json
{
  "host": "acme.thinr.io",
  "device": {
    "id": "edge-gw-17",
    "name": "Store 14 · Madrid",
    "user": "acme",
    "token": "<encrypted>"
  },
  "version": "1.0.0",
  "verify_ssl": true
}
```

| Key | Meaning | Default |
|-----|---------|---------|
| `host` | Server the agent connects to. | required |
| `device.id` | Device identifier on the platform. | required |
| `device.name` | Human-friendly device name. | empty |
| `device.user` | Account the device belongs to. | required |
| `device.token` | Device credential, stored encrypted. | required |
| `version` | Config schema version. | `1.0.0` |
| `verify_ssl` | Validate the server's TLS certificate. | `true` |

## Handling

- The file is written by the installer (or `thinr-agent reconfigure`) with `0600` permissions; you rarely need to edit it by hand.
- The device token is never stored in plaintext. To rotate credentials, re-provision with `thinr-agent reconfigure` or `thinr-agent install --overwrite`.
- The agent reads the file at startup; after changing it, restart the service (`systemctl restart thinr-agent`).
