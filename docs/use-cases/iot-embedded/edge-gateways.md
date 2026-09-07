---
title: Edge Gateways & Compute Nodes
description: Reach Node-RED, local ML, and data pipelines on edge nodes securely and on demand.
---

# Edge Gateways & Compute Nodes

Edge gateways aggregate sensor data, run local ML inference, and host flows in tools like Node-RED. They need routine maintenance: editing a flow, restarting a model server, or checking a pipeline, often on constrained hardware in a hard-to-reach spot. ThinRemote makes each node reachable on demand without leaving anything listening on the public internet.

## The problem

These nodes usually sit on private or cellular networks with no inbound access, so the local dashboards are invisible from your desk. Running a permanent VPN or an exposed port on a low-resource device wastes scarce CPU and widens the attack surface. Field visits for a config tweak are not worth the trip.

## How ThinRemote fits

- Open the Node-RED editor (or Grafana, or a Jupyter server) in your browser through an on-demand HTTP tunnel that only exists while you need it:

```bash
thinr device http edge-node-17 1880
```

- Restart a local inference service or data collector without a full reboot:

```bash
thinr device exec edge-node-17 "systemctl restart inference-server"
```

- Tail the aggregation pipeline live to confirm data is flowing:

```bash
thinr device logs edge-node-17 -f
```

- Drop in a shell for deeper work when a flow misbehaves:

```bash
thinr device console edge-node-17
```

## At fleet scale

Treat a gateway family as a product and roll a new model file or flow to every node, then restart the service across the group in batches:

```bash
thinr product push edge-fleet ./model-v3.onnx /opt/models/
thinr product exec edge-fleet "systemctl restart inference-server" -g region-eu
```

## Related

- [HTTP tunneling](/cli/http-tunneling)
- [Device tunnels](/device-agent/tunnels)
- [Exec commands](/cli/exec-commands)
- [Monitoring and alarms](/device-agent/monitoring-and-alarms)
- [Products and groups](/getting-started/products-and-groups)
