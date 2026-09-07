<template>
  <div class="pillars-section">
    <h2 class="pillars-title">How it all fits together</h2>
    <p class="pillars-subtitle">
      Three pillars, one platform. You drive your fleet from a terminal, an AI assistant or a browser — always
      through the ThinRemote cloud, which speaks to a lightweight agent running on every device.
    </p>

    <div class="pillars-diagram">
      <svg
        viewBox="0 0 960 520"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="ThinRemote architecture: CLI and Web Console talk to the ThinRemote cloud, which talks to the agent running on each device."
      >
        <defs>
          <linearGradient id="tr-card" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stop-color="#1e293b" />
            <stop offset="100%" stop-color="#0b1220" />
          </linearGradient>
          <radialGradient id="tr-cloud-halo">
            <stop offset="0%" stop-color="#1F8EFE" stop-opacity="0.35" />
            <stop offset="70%" stop-color="#1F8EFE" stop-opacity="0" />
          </radialGradient>
          <filter id="tr-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <path id="tr-p1" d="M 250 160 C 340 160, 390 240, 435 250" fill="none" stroke="#334155" stroke-width="1.5" stroke-dasharray="4 4" />
        <path id="tr-p2" d="M 250 360 C 340 360, 390 280, 435 270" fill="none" stroke="#334155" stroke-width="1.5" stroke-dasharray="4 4" />
        <path id="tr-p3" d="M 605 260 C 680 260, 720 260, 790 260" fill="none" stroke="#334155" stroke-width="1.5" stroke-dasharray="4 4" />

        <circle r="4" fill="#1F8EFE" filter="url(#tr-glow)">
          <animateMotion dur="3s" repeatCount="indefinite"><mpath href="#tr-p1" /></animateMotion>
        </circle>
        <circle r="4" fill="#1F8EFE" filter="url(#tr-glow)">
          <animateMotion dur="3s" repeatCount="indefinite" begin="1.5s"><mpath href="#tr-p1" /></animateMotion>
        </circle>
        <circle r="4" fill="#1F8EFE" filter="url(#tr-glow)">
          <animateMotion dur="3.4s" repeatCount="indefinite" begin="0.5s"><mpath href="#tr-p2" /></animateMotion>
        </circle>
        <circle r="4" fill="#1F8EFE" filter="url(#tr-glow)">
          <animateMotion dur="3.4s" repeatCount="indefinite" begin="2s"><mpath href="#tr-p2" /></animateMotion>
        </circle>
        <circle r="4" fill="#22c55e" filter="url(#tr-glow)">
          <animateMotion dur="2.8s" repeatCount="indefinite"><mpath href="#tr-p3" /></animateMotion>
        </circle>
        <circle r="4" fill="#22c55e" filter="url(#tr-glow)">
          <animateMotion dur="2.8s" repeatCount="indefinite" begin="1.4s"><mpath href="#tr-p3" /></animateMotion>
        </circle>

        <g transform="translate(70, 95)">
          <rect width="180" height="130" rx="10" fill="url(#tr-card)" stroke="#1F8EFE" stroke-width="1.5" />
          <rect x="0" y="0" width="180" height="26" rx="10" fill="#030712" />
          <rect x="0" y="13" width="180" height="13" fill="#030712" />
          <circle cx="14" cy="13" r="3.5" fill="#ef4444" />
          <circle cx="28" cy="13" r="3.5" fill="#eab308" />
          <circle cx="42" cy="13" r="3.5" fill="#22c55e" />
          <text x="170" y="17" text-anchor="end" font-family="ui-monospace,monospace" font-size="9" fill="#64748b">thinr</text>
          <text x="12" y="48" font-family="ui-monospace,monospace" font-size="10" fill="#22c55e">$</text>
          <text x="22" y="48" font-family="ui-monospace,monospace" font-size="10" fill="#e2e8f0">thinr device</text>
          <text x="12" y="62" font-family="ui-monospace,monospace" font-size="10" fill="#e2e8f0">  console nyc-1</text>
          <text x="12" y="80" font-family="ui-monospace,monospace" font-size="9" fill="#94a3b8">Connected.</text>
          <text x="12" y="96" font-family="ui-monospace,monospace" font-size="9" fill="#1F8EFE">user@nyc-1:~$</text>
          <rect x="92" y="89" width="6" height="9" fill="#1F8EFE">
            <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite" />
          </rect>
          <text x="90" y="122" text-anchor="middle" font-family="system-ui" font-size="12" font-weight="600" fill="#f1f5f9">CLI &amp; MCP</text>
        </g>

        <g transform="translate(70, 295)">
          <rect width="180" height="130" rx="10" fill="url(#tr-card)" stroke="#1F8EFE" stroke-width="1.5" />
          <rect x="0" y="0" width="180" height="22" rx="10" fill="#030712" />
          <rect x="0" y="11" width="180" height="11" fill="#030712" />
          <circle cx="10" cy="11" r="2.5" fill="#ef4444" />
          <circle cx="20" cy="11" r="2.5" fill="#eab308" />
          <circle cx="30" cy="11" r="2.5" fill="#22c55e" />
          <rect x="42" y="5" width="130" height="12" rx="2" fill="#1e293b" />
          <text x="48" y="14" font-family="ui-monospace,monospace" font-size="7.5" fill="#64748b">console.thinremote.io</text>
          <rect x="6" y="28" width="38" height="92" rx="3" fill="#030712" />
          <rect x="10" y="34" width="30" height="5" rx="1" fill="#1F8EFE" />
          <rect x="10" y="44" width="24" height="4" rx="1" fill="#334155" />
          <rect x="10" y="52" width="26" height="4" rx="1" fill="#334155" />
          <rect x="10" y="60" width="20" height="4" rx="1" fill="#334155" />
          <rect x="10" y="68" width="28" height="4" rx="1" fill="#334155" />
          <text x="50" y="38" font-family="system-ui" font-size="8" fill="#f1f5f9">Devices</text>
          <rect x="50" y="44" width="122" height="1" fill="#1e293b" />
          <g transform="translate(50, 50)">
            <circle cx="5" cy="5" r="3" fill="#22c55e" />
            <rect x="12" y="2" width="72" height="5" rx="1" fill="#475569" />
            <rect x="92" y="2" width="28" height="5" rx="1" fill="#1F8EFE" opacity="0.6" />
          </g>
          <g transform="translate(50, 66)">
            <circle cx="5" cy="5" r="3" fill="#22c55e" />
            <rect x="12" y="2" width="60" height="5" rx="1" fill="#475569" />
            <rect x="92" y="2" width="28" height="5" rx="1" fill="#1F8EFE" opacity="0.6" />
          </g>
          <g transform="translate(50, 82)">
            <circle cx="5" cy="5" r="3" fill="#64748b" />
            <rect x="12" y="2" width="66" height="5" rx="1" fill="#475569" />
            <rect x="92" y="2" width="28" height="5" rx="1" fill="#334155" opacity="0.6" />
          </g>
          <text x="90" y="122" text-anchor="middle" font-family="system-ui" font-size="12" font-weight="600" fill="#f1f5f9">Web Console</text>
        </g>

        <g transform="translate(520, 260)">
          <circle cx="0" cy="0" r="115" fill="url(#tr-cloud-halo)" />
          <rect x="-85" y="-52" width="170" height="104" rx="52" fill="#0b1220" stroke="#1F8EFE" stroke-width="2" />
          <g transform="translate(-12, -32)">
            <rect x="0" y="0" width="10" height="10" rx="2" fill="#1F8EFE" />
            <rect x="14" y="0" width="10" height="10" rx="2" fill="#1F8EFE" />
            <rect x="0" y="14" width="10" height="10" rx="2" fill="#1F8EFE" />
            <rect x="14" y="14" width="10" height="10" rx="2" fill="#1F8EFE" />
          </g>
          <text x="0" y="11" text-anchor="middle" font-family="system-ui" font-size="15" font-weight="700" fill="#f1f5f9">Thin<tspan fill="#1F8EFE">Remote</tspan></text>
          <text x="0" y="30" text-anchor="middle" font-family="system-ui" font-size="10" fill="#94a3b8">cloud · IOTMP broker</text>
        </g>

        <g transform="translate(790, 110)">
          <rect x="0" y="0" width="130" height="70" rx="4" fill="#0b1220" stroke="#1F8EFE" stroke-width="1.3" />
          <circle cx="8" cy="8" r="1.8" fill="none" stroke="#334155" stroke-width="1" />
          <circle cx="122" cy="8" r="1.8" fill="none" stroke="#334155" stroke-width="1" />
          <circle cx="8" cy="62" r="1.8" fill="none" stroke="#334155" stroke-width="1" />
          <circle cx="122" cy="62" r="1.8" fill="none" stroke="#334155" stroke-width="1" />
          <rect x="16" y="12" width="50" height="18" rx="2" fill="#061a10" stroke="#22c55e" stroke-width="1" />
          <text x="41" y="25" text-anchor="middle" font-family="ui-monospace,monospace" font-size="8" fill="#22c55e">PLC-01</text>
          <circle cx="76" cy="17" r="2" fill="#22c55e" />
          <circle cx="84" cy="17" r="2" fill="#eab308" />
          <circle cx="92" cy="17" r="2" fill="#1F8EFE" />
          <text x="103" y="20" font-family="system-ui" font-size="6.5" fill="#64748b">RUN</text>
          <text x="103" y="28" font-family="system-ui" font-size="6.5" fill="#64748b">I/O</text>
          <line x1="14" y1="40" x2="116" y2="40" stroke="#1e293b" stroke-width="1" />
          <g fill="#1F8EFE">
            <circle cx="20" cy="52" r="2" />
            <circle cx="30" cy="52" r="2" />
            <circle cx="40" cy="52" r="2" />
            <circle cx="50" cy="52" r="2" />
            <circle cx="60" cy="52" r="2" />
            <circle cx="70" cy="52" r="2" />
            <circle cx="80" cy="52" r="2" />
            <circle cx="90" cy="52" r="2" />
            <circle cx="100" cy="52" r="2" />
            <circle cx="110" cy="52" r="2" />
          </g>
          <text x="65" y="86" text-anchor="middle" font-family="system-ui" font-size="12" fill="#94a3b8">Industrial PLC</text>
        </g>

        <g transform="translate(790, 220)">
          <rect x="0" y="0" width="130" height="70" rx="4" fill="#0b1220" stroke="#1F8EFE" stroke-width="1.3" />
          <g fill="#eab308">
            <rect x="10" y="6" width="1.8" height="6" />
            <rect x="15" y="6" width="1.8" height="6" />
            <rect x="20" y="6" width="1.8" height="6" />
            <rect x="25" y="6" width="1.8" height="6" />
            <rect x="30" y="6" width="1.8" height="6" />
            <rect x="35" y="6" width="1.8" height="6" />
            <rect x="40" y="6" width="1.8" height="6" />
            <rect x="45" y="6" width="1.8" height="6" />
            <rect x="50" y="6" width="1.8" height="6" />
            <rect x="55" y="6" width="1.8" height="6" />
            <rect x="60" y="6" width="1.8" height="6" />
            <rect x="65" y="6" width="1.8" height="6" />
            <rect x="70" y="6" width="1.8" height="6" />
            <rect x="75" y="6" width="1.8" height="6" />
          </g>
          <rect x="44" y="22" width="32" height="30" rx="2" fill="#030712" stroke="#334155" stroke-width="1" />
          <text x="60" y="41" text-anchor="middle" font-family="ui-monospace,monospace" font-size="7" fill="#64748b">SoC</text>
          <rect x="48" y="26" width="3" height="3" fill="none" stroke="#475569" stroke-width="0.5" />
          <rect x="69" y="26" width="3" height="3" fill="none" stroke="#475569" stroke-width="0.5" />
          <rect x="48" y="47" width="3" height="3" fill="none" stroke="#475569" stroke-width="0.5" />
          <rect x="69" y="47" width="3" height="3" fill="none" stroke="#475569" stroke-width="0.5" />
          <rect x="88" y="22" width="32" height="12" rx="1" fill="none" stroke="#475569" stroke-width="1" />
          <text x="104" y="31" text-anchor="middle" font-family="ui-monospace,monospace" font-size="6" fill="#64748b">ETH</text>
          <rect x="88" y="38" width="15" height="10" rx="1" fill="none" stroke="#475569" stroke-width="1" />
          <rect x="105" y="38" width="15" height="10" rx="1" fill="none" stroke="#475569" stroke-width="1" />
          <circle cx="14" cy="52" r="2.5" fill="#22c55e" />
          <circle cx="22" cy="52" r="2.5" fill="#eab308" />
          <rect x="30" y="50" width="10" height="5" rx="0.5" fill="none" stroke="#334155" stroke-width="0.8" />
          <text x="65" y="86" text-anchor="middle" font-family="system-ui" font-size="12" fill="#94a3b8">Single-board computer</text>
        </g>

        <g transform="translate(790, 330)">
          <line x1="108" y1="12" x2="108" y2="-8" stroke="#1F8EFE" stroke-width="1.5" />
          <circle cx="108" cy="-10" r="2.5" fill="#1F8EFE" />
          <path d="M 96 -4 Q 108 -16 120 -4" fill="none" stroke="#1F8EFE" stroke-width="1" stroke-dasharray="2 2" opacity="0.6">
            <animate attributeName="opacity" values="0.2;0.7;0.2" dur="2s" repeatCount="indefinite" />
          </path>
          <path d="M 90 0 Q 108 -20 126 0" fill="none" stroke="#1F8EFE" stroke-width="1" stroke-dasharray="2 2" opacity="0.4">
            <animate attributeName="opacity" values="0.1;0.5;0.1" dur="2s" repeatCount="indefinite" begin="0.5s" />
          </path>
          <rect x="0" y="12" width="130" height="58" rx="4" fill="#0b1220" stroke="#1F8EFE" stroke-width="1.3" />
          <rect x="10" y="22" width="52" height="18" rx="2" fill="#030712" stroke="#334155" stroke-width="1" />
          <text x="36" y="34" text-anchor="middle" font-family="ui-monospace,monospace" font-size="7.5" fill="#f1f5f9">GW-42</text>
          <circle cx="72" cy="27" r="2" fill="#22c55e" />
          <circle cx="80" cy="27" r="2" fill="#22c55e" />
          <circle cx="88" cy="27" r="2" fill="#eab308" />
          <text x="98" y="30" font-family="system-ui" font-size="6.5" fill="#64748b">LINK</text>
          <rect x="10" y="46" width="18" height="12" rx="1" fill="none" stroke="#475569" stroke-width="1" />
          <rect x="32" y="46" width="18" height="12" rx="1" fill="none" stroke="#475569" stroke-width="1" />
          <rect x="54" y="46" width="18" height="12" rx="1" fill="none" stroke="#475569" stroke-width="1" />
          <rect x="76" y="46" width="40" height="12" rx="1" fill="none" stroke="#475569" stroke-width="1" />
          <text x="65" y="86" text-anchor="middle" font-family="system-ui" font-size="12" fill="#94a3b8">IoT gateway</text>
        </g>

        <text x="855" y="448" text-anchor="middle" font-family="system-ui" font-size="15" font-weight="700" fill="#f1f5f9">Device Agent</text>
        <text x="855" y="466" text-anchor="middle" font-family="system-ui" font-size="12" fill="#94a3b8">Linux · macOS · embedded</text>

        <text x="345" y="198" text-anchor="middle" font-family="system-ui" font-size="12" fill="#94a3b8">TLS 1.3</text>
        <text x="345" y="322" text-anchor="middle" font-family="system-ui" font-size="12" fill="#94a3b8">HTTPS · WSS</text>
        <text x="697" y="246" text-anchor="middle" font-family="system-ui" font-size="12" fill="#94a3b8">outbound-only</text>
        <text x="697" y="276" text-anchor="middle" font-family="system-ui" font-size="12" fill="#94a3b8">IOTMP · TLS 1.3</text>
      </svg>
    </div>
  </div>
</template>

<style scoped>
.pillars-section {
  max-width: 1152px;
  margin: 0 auto;
  padding: 3rem 1.5rem 1rem;
}
.pillars-title {
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 700;
  text-align: center;
  margin: 0 0 0.75rem;
}
.pillars-subtitle {
  text-align: center;
  max-width: 680px;
  margin: 0 auto 2.5rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}
.pillars-diagram {
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
}
.pillars-diagram svg {
  width: 100%;
  height: auto;
  display: block;
}
</style>
