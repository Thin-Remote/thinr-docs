---
title: FAQ
description: Common questions about ThinRemote.
---

# FAQ

## Does ThinRemote require opening any inbound port on my device?

No. The agent opens a single outbound TLS 1.3 connection to the cloud relay. No inbound port is ever required.

## Does ThinRemote work behind corporate firewalls and NAT?

Yes. The agent uses regular HTTPS-friendly outbound connections, so it works anywhere a browser can reach the internet.

## Which operating systems are supported?

Linux (kernel 2.6+, any distribution) and macOS 15.0+. See [Supported architectures](/device-agent/reference/supported-architectures).

## Is my data encrypted end-to-end?

Yes. TLS 1.3 is used for transport; the relay never sees plaintext payloads.

## Can I run ThinRemote on my own infrastructure (private cloud)?

Yes. Enterprise plans include single-tenant private cloud instances.

## Planned content

- Pricing and plans overview
- Data residency
- Uptime and SLAs
