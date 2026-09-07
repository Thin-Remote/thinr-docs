---
title: Multi-cloud & hybrid infrastructure
description: One CLI and one AI assistant across AWS, Azure, on-prem and more, without agent sprawl.
---

# Multi-cloud & hybrid infrastructure

Resources spread across AWS, Azure, on-prem racks, and edge sites each come with their own console, network, and access model. ThinRemote gives you one outbound-only agent and one CLI across all of them, so a machine is reachable the same way whether it lives in a public cloud VPC or a closet. There is no vendor lock-in and no separate access stack per provider.

## The problem

Every provider ships its own bastion, its own session manager, and its own identity plumbing. Stitching them together means juggling profiles, jump hosts, and half a dozen agents, and the on-prem boxes still need a VPN that none of the cloud tools understand.

## How ThinRemote fits

- Group machines that belong together (by cloud, region, or role) into a product, then run one command across the whole fleet:

```bash
thinr product exec <productId> "uptime" -g azure-west
```

- Check the state of every device in a product at a glance:

```bash
thinr product status <productId>
```

- Reach any single machine identically, wherever it runs:

```bash
thinr device console <id>
```

- Roll a coordinated agent update across every provider at once:

```bash
thinr fleet upgrade
```

- Point the built-in MCP server at an AI assistant to operate across all providers from one place: see the AI assistant guide.

## Related

- [Products and groups](/getting-started/products-and-groups)
- [Exec commands](/cli/exec-commands)
- [AI assistant](/getting-started/ai-assistant)
- [JSON and automation](/cli/json-and-automation)
