---
title: ThinRemote vs VPN
description: How ThinRemote compares to VPNs, bastions and port-forwarding.
---

# ThinRemote vs VPN

Traditional remote access stacks require one or more of:

- A VPN concentrator and client software on every endpoint.
- Inbound firewall rules and port-forwarding on the device side.
- A bastion host in front of SSH.
- Dynamic DNS for devices on changing IPs.

ThinRemote replaces all of that with a single outbound agent and a cloud relay.

## Side by side

| | VPN | Bastion + SSH | Port-forwarding / DDNS | ThinRemote |
|---|---|---|---|---|
| Inbound ports on the device | No, but on the concentrator | Yes (22, at least on the bastion) | Yes | **No** |
| Works behind NAT / CGNAT / cellular | Often needs workarounds | Only with reachable IP | No | **Yes** |
| Network access granted | Whole subnet by default | Whole host | One port per rule | **Per resource, per device** |
| Per-device software | VPN client + config | sshd + key distribution | Router config per site | One static binary |
| Infrastructure you operate | Concentrator, IP plan, certs | Bastion host, key rotation | Router rules, DDNS | None |
| Identity model | Network-level (IP/cert) | SSH keys per host | None | Platform accounts, RBAC, revocable tokens |
| Audit trail | Connection-level | Per-host, if configured | None | Centralized, per session |
| Beyond shell access (files, metrics, tunnels, exec fan-out) | Bring your own tooling | Bring your own tooling | No | **Built in** |
| Scriptable / AI-operable API | No | Partially | No | **CLI with JSON output + MCP server** |

## The fundamental difference

A VPN answers the question *"how do I join this device's network?"*. That's the wrong granularity for fleet operations: joining the network means trusting the network, managing IP space, and still needing tooling for everything beyond connectivity.

ThinRemote answers *"how do I operate this device?"*. Each device exposes a small set of typed resources (terminal, files, exec, tunnels, metrics) over its own outbound connection. You get exactly the capability you need, scoped to one device, under one identity, with one audit trail. There is no network to join, so there is no lateral movement to worry about.

## Operational cost in practice

- **No field visits for connectivity**: a device that can reach the internet outbound is manageable, full stop. No on-site router config, no carrier-grade-NAT negotiations with the customer's IT.
- **No cert/key lifecycle on devices**: devices hold one revocable token, provisioned at install.
- **Tunneling when you do need a port**: for the cases a VPN actually solves (reaching a web panel, SSH with your own client), [tunneling](/cli/tcp-tls-tunneling) gives you a connectable endpoint on demand, without standing infrastructure.

## When a VPN still makes sense

If many machines must talk to each other continuously at the network layer (site-to-site links, distributed services meshing among themselves), that's a network problem, and a VPN (or overlay network) is the right tool. ThinRemote is for *operating fleets of devices*; the two can coexist.

Comparing against a mesh VPN like Tailscale specifically? That deserves its own page: [ThinRemote vs Tailscale](./vs-tailscale).
