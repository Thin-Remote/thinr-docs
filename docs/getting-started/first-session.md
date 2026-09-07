---
title: Your first session
description: A ten-minute guided tour of your first connected device.
---

# Your first session

You've [installed the agent](/device-agent/install) on a device and [authenticated the CLI](/cli/install) on your workstation. This page walks you through everything you can do with that one device, with the expected result at each step so you know you're on track.

## 1. Find your device

```bash
thinr device list
```

**You should see** a table with your device's id, name, and a *connected* status. If it shows as disconnected, give it a few seconds after install, or check the service with `thinr-agent status` on the device.

## 2. Check its vitals

```bash
thinr device status <deviceId>
```

**You should see** connection stats (uptime, transferred bytes, last-seen) followed by the latest monitoring sample: CPU, memory, disk and network. The agent collects these out of the box, with no configuration.

## 3. Open a terminal

```bash
thinr device console <deviceId>
```

**You should see** a shell prompt from the remote device. It's a real TTY: try `htop`, resize your terminal window, press Ctrl+C inside a command. Type `exit` to come back.

## 4. Run a command without a shell

For scripting and one-offs you don't need an interactive session:

```bash
thinr device exec <deviceId> "uname -a && uptime"
```

**You should see** the output streamed to your terminal, and your local exit code will match the remote command's. This is the building block for automation; add `--json` when a script needs structured output.

## 5. Transfer files

Send a file to the device and bring it back:

```bash
echo "hello from my workstation" > hello.txt
thinr device push <deviceId> hello.txt /tmp/
thinr device pull <deviceId> /tmp/hello.txt hello-back.txt
cat hello-back.txt
```

**You should see** the same content after the round trip. `read`, `ls`, `mkdir`, `rm` and `mv` complete the family; see [file management](/cli/file-management).

## 6. Tunnel to SSH

The agent can expose any service reachable from the device through a relay port on your ThinRemote server. The classic case is SSH:

```bash
thinr device tcp <deviceId>
```

**You should see** a line like `TCP proxy running on <your-server>:50701 → <deviceId> (localhost:22)`. In another terminal:

```bash
ssh <user>@<your-server> -p 50701
```

You're now using your own SSH client through ThinRemote, with no inbound port open on the device. The relay port exists only while the command runs; Ctrl+C removes it from the server. The same works for web panels (`thinr device http <deviceId> localhost:8080` prints a URL and opens your browser) and any TCP service; see [tunneling](/cli/tcp-tls-tunneling).

## 7. See it in the browser

Everything you just did from the CLI is also available in the web console: consoles, files, monitoring charts, and device settings, from any browser.

## Where to go next

- [Core concepts](./core-concepts): the vocabulary of the platform in one page.
- [Drive your fleet with AI](./ai-assistant): every step above is also an MCP tool your assistant can call.
- [Guides](/cli/ssh-and-console): deeper workflows (logs, monitoring and alarms, custom scripts, fleet operations).
- Onboarding more devices? Jump to [headless provisioning](/device-agent/headless-provisioning).
