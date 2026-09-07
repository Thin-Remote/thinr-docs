---
title: Remote dev & testing environments
description: Give developers secure, short-lived access to staging and preview apps without making them public.
---

# Remote dev & testing environments

Staging servers and preview apps should never sit on the public internet, but developers, QA, and reviewers still need to reach them. ThinRemote opens a short-lived HTTP tunnel to the dev server on demand: the device dials the app itself, the relay port lives on the ThinRemote server, and Ctrl+C tears it all down when review is over.

## The problem

Making a staging box reachable usually means a public DNS record, a load balancer, and a firewall exception that outlives the sprint. That is a standing risk for an environment full of half-finished features and test credentials, and it invites the wrong traffic to a place that was never meant to be seen.

## How ThinRemote fits

- Expose a dev server on the device's `localhost:5173` for a quick review, then share the printed URL:

```bash
thinr device http <id> 5173
```

- Reach a preview app the build produced on another port:

```bash
thinr device http <id> 8000
```

- Kick a fresh build or restart the app before you tunnel in:

```bash
thinr device exec <id> "npm run build && pm2 restart preview"
```

- Push a fixture or config file into the environment, or pull an artifact back out:

```bash
thinr device push <id> ./seed.sql /srv/app/seed.sql
```

- The tunnel is short-lived, so nothing stays exposed after the review: press Ctrl+C to close it.

## Related

- [HTTP tunneling](/cli/http-tunneling)
- [File management](/cli/file-management)
- [Exec commands](/cli/exec-commands)
- [Device agent tunnels](/device-agent/tunnels)
