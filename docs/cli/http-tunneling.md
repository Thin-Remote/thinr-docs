---
title: HTTP tunneling
description: Open remote web UIs in your browser through the platform.
---

# HTTP tunneling

Open an HTTP tunnel to any web service reachable from the device (on `localhost` or its private LAN):

```bash
# Default: target localhost:80
thinr device http <deviceId>

# Specific port
thinr device http <deviceId> 8080

# Specific address reachable from the device
thinr device http <deviceId> http://192.168.1.45:8080

# An HTTPS target
thinr device http <deviceId> https://localhost:9443
```

The CLI prints the tunnel URL on your ThinRemote server and (by default) opens it in your browser. Add `--no-open` to suppress the browser launch; `-p <port>` to pin the server-side port, which keeps the URL stable across runs.

The tunnel lives until you press Ctrl+C; while it's up, whatever the target exposes is protected by its own login. The plumbing is the agent's [tunnels feature](/device-agent/tunnels): the device dials the target, nothing listens on it.

## Typical targets

Anything with a web UI that was never meant to be on the internet:

- **Dashboards**: Grafana (`3000`), Node-RED (`1880`), Portainer (`9000`).
- **Embedded panels**: a router's admin page, a PLC's web server, a camera, all addressed by their LAN IP next to the device.
- **Your own app** during development or debugging.

```bash
thinr device http edge-gw-17 3000                      # Grafana on the device
thinr device http edge-gw-17 http://192.168.1.1        # the site router's admin UI
```

## Multiple tunnels

Each tunnel is independent: run several commands in parallel (one per terminal, or backgrounded in scripts) and each gets its own relay port.

## Not HTTP?

Databases, MQTT, custom protocols: use [TCP/TLS tunneling](./tcp-tls-tunneling). SSH specifically has [its own workflow](./ssh-and-console).
