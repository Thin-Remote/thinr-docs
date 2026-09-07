---
title: Properties vs resources
description: The two ways a device exposes state and behaviour, and when to use each.
---

# Properties vs resources

A device exposes two kinds of things, and knowing which is which is the single most useful distinction on the platform.

- A **property** is stored state, kept on the platform in the device record. Reading it talks to the platform.
- A **resource** is a live operation the agent runs while connected. Calling it talks to the device, right now.

If the device is offline you can still read its last properties; you cannot call its resources.

## Properties

A property is a named value (any JSON shape: a string, a number, an object) persisted on the device record. It survives restarts and disconnections, and it's visible from the dashboard.

Use properties for state that should outlive a session: configuration, reported firmware version, the site a device sits in, a customer reference, the result of the last maintenance run.

```bash
thinr device property edge-gw-17                 # list this device's properties
thinr device property edge-gw-17 firmware        # read one
thinr device property edge-gw-17 firmware -f version   # drill into a sub-field
```

The CLI reads properties; writing them is a platform operation, done from the web console or with the MCP tool `thinr_property_set` (the value replaces the property wholesale). Persisting structured state this way is the right alternative to running a command and parsing its output every time you need it.

## Resources

A resource is a typed endpoint the agent registers while it's connected: it runs something on the device and returns a result. The agent ships built-in resources (like `monitoring`), and every [custom script](/device-agent/custom-scripts) you add becomes one too.

Use resources for actions and live reads: restart a service, read a sensor, run a diagnostic, query the current disk usage.

```bash
thinr device resource edge-gw-17                       # list resources, with their schemas
thinr device resource edge-gw-17 monitoring            # call one
thinr device resource edge-gw-17 update -i action=check   # call with typed input
```

Because resources are typed (they can advertise an input and output schema), the web console renders proper form fields for them and AI assistants can call them safely.

## Which one?

Ask whether you're storing a fact or triggering behaviour.

| You want to… | Use a |
|--------------|-------|
| Remember which firmware a device reported | property |
| Record the site or customer a device belongs to | property |
| Restart a service or reboot | resource |
| Read a live sensor or current metric | resource |
| Expose "cash level" so you can chart and alarm on it | resource ([custom script](/device-agent/custom-scripts)) |

A useful pattern combines both: a resource computes or fetches a live value, and you persist the important results as properties so they're queryable across the fleet even when devices are offline. Both scale to whole fleets through [products](./products-and-groups).
