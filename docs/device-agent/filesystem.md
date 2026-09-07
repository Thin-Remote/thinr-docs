---
title: Filesystem
description: Browse and transfer files on any device, bounded by OS permissions.
---

# Filesystem

The agent exposes the device's filesystem for browsing and transfer: list directories, read and write files, upload, download, create directories, delete and move.

## Scope

The resource serves the **entire filesystem by default**; there is no agent-side chroot or allowlist. The boundary is the agent user's OS permissions: root sees everything, a user install sees what that user sees. If you want a narrower scope, run the agent as a dedicated unprivileged user and let the permission system you already audit do the scoping. See [architecture and security](./architecture-and-security).

## Using it

```bash
thinr device ls edge-gw-17 /etc/app
thinr device read edge-gw-17 /etc/app/config.yaml
thinr device push edge-gw-17 ./config.yaml /etc/app/
thinr device pull edge-gw-17 /var/log/app.log ./
```

Use `push`/`pull` for real files and `read`/`write` for quick inline content. The same operations are available in the web console's file explorer, and as MCP tools (`thinr_ls`, `thinr_read`, `thinr_push`, …) for AI assistants.

Deploying the same file to a whole fleet? `thinr product push` uploads in parallel to every device of a product; see the [file management workflow](/cli/file-management).
