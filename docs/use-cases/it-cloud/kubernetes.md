---
title: Kubernetes clusters
description: Access Kubernetes nodes and services without kubectl exec gymnastics.
---

# Kubernetes clusters

Running an agent on each Kubernetes node gives you low-level access when `kubectl exec` isn't enough: kernel logs, node-level diagnostics, hardware inspection.

## What ThinRemote gives you

- Direct node access without jump hosts.
- TCP tunneling to expose the API server or services through a relay port on the server.
- Cluster-wide scripts via products.

## Planned content

- DaemonSet installation pattern
- Accessing kubectl through a ThinRemote TCP tunnel
