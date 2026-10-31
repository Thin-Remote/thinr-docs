---
title: FAQ
description: Common questions about ThinRemote.
---

# FAQ

## Does ThinRemote require opening any inbound port on my device?

No. The agent opens a single outbound TLS connection to the cloud relay and verifies the server's certificate. No inbound port is ever required.

## Does ThinRemote work behind corporate firewalls and NAT?

Yes. The agent uses regular HTTPS-friendly outbound connections, so it works anywhere a browser can reach the internet.

## Which operating systems are supported?

Linux (kernel 2.6+, any distribution) and macOS 15.0+. See [Supported architectures](/device-agent/reference/supported-architectures).

## Is my data encrypted end-to-end?

Every leg is encrypted in transit with TLS, and the agent verifies the server's certificate. The relay terminates those connections to route them, so for a service that must stay end-to-end encrypted, reach it through a [TCP or TLS tunnel](/cli/tcp-tls-tunneling): the service's own TLS passes through untouched.

## Can I run ThinRemote on my own infrastructure (private cloud)?

Yes. Enterprise plans include single-tenant private cloud instances.

## Planned content

- Pricing and plans overview
- Data residency
- Uptime and SLAs
