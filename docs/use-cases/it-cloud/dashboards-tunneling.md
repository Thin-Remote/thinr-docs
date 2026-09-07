---
title: Internal dashboards and web tools
description: Expose internal Grafana, Jenkins, Kibana and similar tools to authorized users.
---

# Internal dashboards and web tools

Internal tools like Grafana, Jenkins, Kibana, or Airflow usually live on private networks. ThinRemote tunnels them to authorized users without exposing ports or running a VPN.

## What ThinRemote gives you

- `thinr device http <id>` opens an HTTP tunnel with a URL on your ThinRemote server.
- Per-user access controls, not shared credentials.
- Works equally for on-prem, cloud, or hybrid hosts.

## Planned content

- Step-by-step: expose a Grafana dashboard
- Role-based access patterns
