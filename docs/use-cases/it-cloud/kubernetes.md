---
title: Container & Kubernetes clusters
description: Run kubectl through a tunnel and reach individual nodes without exposing the API server.
---

# Container & Kubernetes clusters

Reach individual nodes, run `kubectl` through a tunnel, or debug a misbehaving pod without ever exposing the API server to the internet. ThinRemote tunnels straight to the cluster's control plane or to any node from a node in the cluster, so the API stays private. It works the same for a self-hosted cluster in a datacenter and a K3s box out at the edge.

## The problem

Giving an operator `kubectl` access usually means a public API endpoint, a load balancer, and a set of firewall rules, or a full VPN into the cluster network. Exposing the API server widens the blast radius of any leaked credential, and edge clusters behind NAT often cannot be reached from a laptop at all.

## How ThinRemote fits

- Tunnel to the Kubernetes API (port 6443) through a relay port on the server, then point `kubectl` at it:

```bash
thinr device tcp <id> 6443
kubectl --server https://127.0.0.1:<printed port> get pods -A
```

- Open a shell on a node to inspect the container runtime directly:

```bash
thinr device console <id>
```

- Debug a pod without leaving your terminal:

```bash
thinr device exec <id> "kubectl logs -n prod deploy/api --tail=100"
```

- Reach a NodePort or an in-cluster service over an HTTP tunnel instead:

```bash
thinr device http <id> 30080
```

- Both tunnels are short-lived, so the API server never stays exposed: close them with Ctrl+C.

## Related

- [TCP & TLS tunneling](/cli/tcp-tls-tunneling)
- [Exec commands](/cli/exec-commands)
- [SSH and console](/cli/ssh-and-console)
- [HTTP tunneling](/cli/http-tunneling)
- [Products and groups](/getting-started/products-and-groups)
