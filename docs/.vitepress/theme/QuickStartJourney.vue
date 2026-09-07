<template>
  <div
    class="qs-journey"
    role="img"
    aria-label="The Quick Start journey: install the agent on your device and the CLI on your workstation, both connect to your ThinRemote instance; then open sessions and plug your AI assistant in through MCP."
  >
    <svg viewBox="40 45 870 315" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="qs-card" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stop-color="#1e293b" />
          <stop offset="100%" stop-color="#0b1220" />
        </linearGradient>
        <radialGradient id="qs-halo">
          <stop offset="0%" stop-color="#1F8EFE" stop-opacity="0.3" />
          <stop offset="70%" stop-color="#1F8EFE" stop-opacity="0" />
        </radialGradient>
        <filter id="qs-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      <!-- connections -->
      <path id="qs-p1" d="M 254 160 C 300 160, 330 160, 372 160" fill="none" stroke="#334155" stroke-width="1.5" stroke-dasharray="4 4" />
      <path id="qs-p2" d="M 706 160 C 660 160, 630 160, 588 160" fill="none" stroke="#334155" stroke-width="1.5" stroke-dasharray="4 4" />
      <path id="qs-p3" d="M 706 184 C 620 220, 340 220, 254 184" fill="none" stroke="#1e293b" stroke-width="1.5" stroke-dasharray="4 4" />
      <path id="qs-p4" d="M 862 224 L 862 296" fill="none" stroke="#14532d" stroke-width="1.5" stroke-dasharray="3 3" />

      <text x="313" y="144" text-anchor="middle" font-family="system-ui" font-size="13" fill="#94a3b8">TLS · outbound-only</text>
      <text x="647" y="144" text-anchor="middle" font-family="system-ui" font-size="13" fill="#94a3b8">TLS</text>
      <text x="872" y="264" font-family="ui-monospace,monospace" font-size="12.5" fill="#94a3b8">MCP</text>

      <!-- moving traffic -->
      <circle r="4" fill="#1F8EFE" filter="url(#qs-glow)">
        <animateMotion dur="3s" repeatCount="indefinite"><mpath href="#qs-p1" /></animateMotion>
      </circle>
      <circle r="4" fill="#1F8EFE" filter="url(#qs-glow)">
        <animateMotion dur="3s" repeatCount="indefinite" begin="1.5s"><mpath href="#qs-p1" /></animateMotion>
      </circle>
      <circle r="4" fill="#1F8EFE" filter="url(#qs-glow)">
        <animateMotion dur="3s" repeatCount="indefinite" begin="0.7s"><mpath href="#qs-p2" /></animateMotion>
      </circle>
      <circle r="4" fill="#1F8EFE" filter="url(#qs-glow)">
        <animateMotion dur="3s" repeatCount="indefinite" begin="2.2s"><mpath href="#qs-p2" /></animateMotion>
      </circle>
      <circle r="4" fill="#22c55e" filter="url(#qs-glow)">
        <animateMotion dur="4s" repeatCount="indefinite"><mpath href="#qs-p3" /></animateMotion>
      </circle>
      <circle r="4" fill="#22c55e" filter="url(#qs-glow)">
        <animateMotion dur="4s" repeatCount="indefinite" begin="2s"><mpath href="#qs-p3" /></animateMotion>
      </circle>
      <circle r="3.5" fill="#22c55e" filter="url(#qs-glow)">
        <animateMotion dur="2.2s" repeatCount="indefinite"><mpath href="#qs-p4" /></animateMotion>
      </circle>

      <!-- step 1: the device -->
      <g transform="translate(60, 100)">
        <rect width="190" height="120" rx="10" fill="url(#qs-card)" stroke="#1F8EFE" stroke-width="1.5" />
        <rect x="16" y="20" width="64" height="22" rx="2" fill="#030712" stroke="#334155" stroke-width="1" />
        <text x="48" y="35" text-anchor="middle" font-family="ui-monospace,monospace" font-size="10" fill="#f1f5f9">GW-42</text>
        <circle cx="94" cy="26" r="2.5" fill="#22c55e" />
        <circle cx="104" cy="26" r="2.5" fill="#22c55e" />
        <circle cx="114" cy="26" r="2.5" fill="#eab308" />
        <text x="126" y="30" font-family="system-ui" font-size="8" fill="#64748b">LINK</text>
        <rect x="16" y="52" width="24" height="14" rx="1" fill="none" stroke="#475569" stroke-width="1" />
        <rect x="44" y="52" width="24" height="14" rx="1" fill="none" stroke="#475569" stroke-width="1" />
        <rect x="72" y="52" width="24" height="14" rx="1" fill="none" stroke="#475569" stroke-width="1" />
        <rect x="100" y="52" width="48" height="14" rx="1" fill="none" stroke="#475569" stroke-width="1" />
        <text x="16" y="96" font-family="ui-monospace,monospace" font-size="11.5" fill="#1F8EFE">thinr-agent</text>
        <circle cx="158" cy="92" r="3" fill="#22c55e">
          <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
        </circle>
        <text x="166" y="96" font-family="system-ui" font-size="10" fill="#94a3b8" text-anchor="start">on</text>
        <circle cx="0" cy="0" r="15" fill="#1F8EFE" stroke="#030712" stroke-width="2" />
        <text x="0" y="5" text-anchor="middle" font-family="system-ui" font-size="15" font-weight="700" fill="#ffffff">1</text>
        <text x="95" y="148" text-anchor="middle" font-family="system-ui" font-size="16" fill="#94a3b8">your device</text>
      </g>

      <!-- the instance -->
      <g transform="translate(480, 160)">
        <circle cx="0" cy="0" r="110" fill="url(#qs-halo)" />
        <rect x="-105" y="-42" width="210" height="84" rx="42" fill="#0b1220" stroke="#1F8EFE" stroke-width="2" />
        <g transform="translate(-12, -30)">
          <rect x="0" y="0" width="9" height="9" rx="2" fill="#1F8EFE" />
          <rect x="13" y="0" width="9" height="9" rx="2" fill="#1F8EFE" />
          <rect x="0" y="13" width="9" height="9" rx="2" fill="#1F8EFE" />
          <rect x="13" y="13" width="9" height="9" rx="2" fill="#1F8EFE" />
        </g>
        <text x="0" y="12" text-anchor="middle" font-family="ui-monospace,monospace" font-size="16" font-weight="700" fill="#f1f5f9">acme.thinr.io</text>
        <text x="0" y="31" text-anchor="middle" font-family="system-ui" font-size="12" fill="#94a3b8">your instance · web console</text>
      </g>

      <!-- step 2: the workstation -->
      <g transform="translate(710, 100)">
        <rect width="190" height="120" rx="10" fill="url(#qs-card)" stroke="#1F8EFE" stroke-width="1.5" />
        <rect x="0" y="0" width="190" height="24" rx="10" fill="#030712" />
        <rect x="0" y="12" width="190" height="12" fill="#030712" />
        <circle cx="14" cy="12" r="3.5" fill="#ef4444" />
        <circle cx="28" cy="12" r="3.5" fill="#eab308" />
        <circle cx="42" cy="12" r="3.5" fill="#22c55e" />
        <text x="180" y="16" text-anchor="end" font-family="ui-monospace,monospace" font-size="10" fill="#64748b">thinr</text>
        <text x="12" y="44" font-family="ui-monospace,monospace" font-size="11" fill="#22c55e">$</text>
        <text x="22" y="44" font-family="ui-monospace,monospace" font-size="11" fill="#e2e8f0">thinr device list</text>
        <text x="12" y="62" font-family="ui-monospace,monospace" font-size="10" fill="#94a3b8">gw-42</text>
        <circle cx="62" cy="59" r="3" fill="#22c55e" />
        <text x="70" y="62" font-family="ui-monospace,monospace" font-size="10" fill="#94a3b8">connected</text>
        <text x="12" y="82" font-family="ui-monospace,monospace" font-size="11" fill="#1F8EFE">$</text>
        <rect x="22" y="74" width="6" height="10" fill="#1F8EFE">
          <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite" />
        </rect>
        <text x="12" y="106" font-family="ui-monospace,monospace" font-size="11.5" fill="#1F8EFE">thinr CLI</text>
        <circle cx="0" cy="0" r="15" fill="#1F8EFE" stroke="#030712" stroke-width="2" />
        <text x="0" y="5" text-anchor="middle" font-family="system-ui" font-size="15" font-weight="700" fill="#ffffff">2</text>
        <text x="95" y="148" text-anchor="middle" font-family="system-ui" font-size="16" fill="#94a3b8">your workstation</text>
      </g>

      <!-- step 3: the session -->
      <g transform="translate(385, 248)">
        <circle cx="0" cy="0" r="15" fill="#1F8EFE" stroke="#030712" stroke-width="2" />
        <text x="0" y="5" text-anchor="middle" font-family="system-ui" font-size="15" font-weight="700" fill="#ffffff">3</text>
        <text x="24" y="5" font-family="system-ui" font-size="16" fill="#94a3b8">console · exec · tunnels</text>
      </g>

      <!-- step 4: the AI assistant -->
      <g transform="translate(710, 300)">
        <rect width="190" height="46" rx="12" fill="#0b1220" stroke="#22c55e" stroke-width="1.5" />
        <text x="20" y="30" font-family="system-ui" font-size="17" fill="#22c55e">✦</text>
        <text x="38" y="29" font-family="system-ui" font-size="14" fill="#f1f5f9">your AI assistant</text>
        <circle cx="0" cy="0" r="15" fill="#22c55e" stroke="#030712" stroke-width="2" />
        <text x="0" y="5" text-anchor="middle" font-family="system-ui" font-size="15" font-weight="700" fill="#ffffff">4</text>
      </g>
    </svg>
  </div>
</template>

<style scoped>
.qs-journey {
  margin: 24px 0;
  padding: 20px 16px 8px;
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
  background: linear-gradient(180deg, #0f172a 0%, #020617 100%);
}
.qs-journey svg {
  width: 100%;
  height: auto;
  display: block;
}
</style>
