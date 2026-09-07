---
title: Internal dashboards & web tools
description: Reach Grafana, Jenkins, or any internal web app without a reverse proxy or static IP.
---

# Internal dashboards & web tools

Admin panels, Grafana, Jenkins, and custom internal apps usually bind to `localhost` or a private LAN address, so they never appear on the public internet. ThinRemote opens a short-lived HTTP tunnel to that service on demand: the device dials the target itself, and the relay port lives on the ThinRemote server. Press Ctrl+C to close it when you are done.

## The problem

Publishing an internal dashboard means standing up a reverse proxy, requesting a static IP, and punching a hole in the firewall. That is slow to set up, easy to forget, and leaves an attack surface open long after the review is over. Nothing on the device should have to listen on a public port just so one person can look at a graph.

## How ThinRemote fits

- Tunnel Grafana running on the device's `localhost:3000` and open the printed relay URL in your browser:

```bash
thinr device http <id> 3000
```

- Reach a Jenkins controller on the device's LAN the same way (the device connects to it for you):

```bash
thinr device http <id> 8080
```

- Confirm the service is actually up before tunneling:

```bash
thinr device exec <id> "curl -sf localhost:3000/api/health"
```

- Since the tunnel is short-lived, no proxy or firewall rule is left behind: press Ctrl+C to close it.

## Related

- [HTTP tunneling](/cli/http-tunneling)
- [Device agent tunnels](/device-agent/tunnels)
- [Exec commands](/cli/exec-commands)
- [TCP & TLS tunneling](/cli/tcp-tls-tunneling)
