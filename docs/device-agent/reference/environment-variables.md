---
title: Device agent environment variables
description: Environment variables recognized by the agent at runtime.
---

# Environment variables

The agent is deliberately light on environment configuration: everything operational lives in the [config file](./config-file) or comes from [CLI flags](./cli-flags). The variables it honors:

| Variable | Purpose |
|----------|---------|
| `SSL_CERT_FILE` | Path to a CA certificate bundle. If unset, the agent auto-detects the system bundle (the usual Debian/RHEL/Alpine/Arch paths) and falls back to embedded CA certificates on minimal systems. |
| `SSL_CERT_DIR` | Path to a CA certificate directory; same auto-detection applies. |
| `HOME` | Used to resolve user-mode paths (`~/.config/thinr-agent/…`). |
| `USER` | Used to detect the current user during installation. |
| `TERM`, `TERM_PROGRAM`, `VTE_VERSION` | Terminal detection for colored interactive output; no effect on service behavior. |

For a systemd service, set variables in an override file:

```bash
systemctl edit thinr-agent
# [Service]
# Environment=SSL_CERT_FILE=/path/to/bundle.pem
```

There is no environment variable for the config path; use the `-c, --config` flag in the service unit if you need a non-default location.
