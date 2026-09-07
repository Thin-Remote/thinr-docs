---
title: Tunnels
description: Reach any service the device can reach, with nothing listening on it.
---

# Tunnels

Tunnels turn services reachable *from the device* into connectable endpoints, without opening a single port on the device. The classic case is SSH, but anything works: a web panel on `localhost`, or a PLC, camera or router sitting next to the device on its local network.

## Behavior

- When a tunnel opens, the **agent dials the target itself**: any `address:port` the device can reach is fair game, not just services on the device.
- **Nothing ever listens on the device.** The connectable endpoint is a relay port on the ThinRemote server, created on demand and removed when you close the tunnel.
- The device-side connection is plain TCP, so any protocol rides through it: SSH, HTTPS, Modbus, VNC, a database wire protocol.
- While a tunnel is up, whatever you exposed is protected by the target service's own authentication (your SSH login, the panel's password), so prefer short-lived tunnels.

## Using it

```bash
thinr device tcp edge-gw-17                      # SSH (default target localhost:22)
thinr device tcp edge-gw-17 192.168.0.50:502     # a PLC next to the gateway
thinr device http edge-gw-17 localhost:3000      # web UI: prints a URL, opens your browser
```

Each command prints the relay endpoint (`<your-server>:<port>`) and keeps it open until Ctrl+C. Full options and the TLS variant in the [TCP/TLS](/cli/tcp-tls-tunneling) and [HTTP](/cli/http-tunneling) tunneling workflows.
