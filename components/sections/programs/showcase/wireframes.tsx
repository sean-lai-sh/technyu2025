'use client'

import React from 'react'
import { useReducedMotion } from 'framer-motion'

export function HeroWireframe() {
  const shouldReduceMotion = useReducedMotion()
  return (
    <svg viewBox="0 0 480 480" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
      <circle cx="240" cy="240" r="200" stroke="#EDEDED" strokeWidth="0.6" strokeDasharray="3 8" opacity="0.2" />
      <circle cx="240" cy="240" r="160" stroke="#EDEDED" strokeWidth="0.5" opacity="0.12" />
      <g opacity="0.85">
        <line x1="240" y1="60" x2="380" y2="170" stroke="#EDEDED" strokeWidth="1.2" opacity="0.7" />
        <line x1="240" y1="60" x2="100" y2="170" stroke="#EDEDED" strokeWidth="1.2" opacity="0.7" />
        <line x1="240" y1="60" x2="240" y2="390" stroke="#EDEDED" strokeWidth="0.8" opacity="0.35" />
        <line x1="380" y1="170" x2="420" y2="305" stroke="#EDEDED" strokeWidth="1.2" opacity="0.7" />
        <line x1="100" y1="170" x2="60" y2="305" stroke="#EDEDED" strokeWidth="1.2" opacity="0.7" />
        <line x1="380" y1="170" x2="100" y2="170" stroke="#EDEDED" strokeWidth="1.2" opacity="0.7" />
        <line x1="380" y1="170" x2="240" y2="390" stroke="#EDEDED" strokeWidth="1" opacity="0.5" />
        <line x1="100" y1="170" x2="240" y2="390" stroke="#EDEDED" strokeWidth="1" opacity="0.5" />
        <line x1="420" y1="305" x2="60" y2="305" stroke="#EDEDED" strokeWidth="1.2" opacity="0.7" />
        <line x1="420" y1="305" x2="240" y2="390" stroke="#EDEDED" strokeWidth="1.2" opacity="0.7" />
        <line x1="60" y1="305" x2="240" y2="390" stroke="#EDEDED" strokeWidth="1.2" opacity="0.7" />
        <line x1="380" y1="170" x2="60" y2="305" stroke="#EDEDED" strokeWidth="0.5" opacity="0.25" />
        <line x1="100" y1="170" x2="420" y2="305" stroke="#EDEDED" strokeWidth="0.5" opacity="0.25" />
        <line x1="240" y1="60" x2="420" y2="305" stroke="#EDEDED" strokeWidth="0.5" opacity="0.22" />
        <line x1="240" y1="60" x2="60" y2="305" stroke="#EDEDED" strokeWidth="0.5" opacity="0.22" />
      </g>
      <circle cx="240" cy="60" r="5" fill="#EDEDED" />
      <circle cx="380" cy="170" r="5" fill="#EDEDED" />
      <circle cx="100" cy="170" r="5" fill="#EDEDED" />
      <circle cx="420" cy="305" r="5" fill="#EDEDED" />
      <circle cx="60" cy="305" r="5" fill="#EDEDED" />
      <circle cx="240" cy="390" r="5" fill="#EDEDED" />
      <circle cx="240" cy="225" r="8" fill="#B300FF" opacity="0.9">
        {!shouldReduceMotion && (
          <>
            <animate attributeName="r" values="7;10;7" dur="3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.7;1;0.7" dur="3s" repeatCount="indefinite" />
          </>
        )}
      </circle>
      <circle cx="240" cy="225" r="28" fill="#B300FF" opacity="0.05" />
      <g opacity="0.07" stroke="#EDEDED" strokeWidth="0.5">
        <line x1="60" y1="240" x2="420" y2="240" />
        <line x1="240" y1="60" x2="240" y2="420" />
        <circle cx="240" cy="240" r="80" />
        <circle cx="240" cy="240" r="140" />
      </g>
    </svg>
  )
}

export function CircuitWireframe() {
  return (
    <svg viewBox="0 0 300 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
      <rect x="20" y="20" width="260" height="200" rx="4" stroke="#EDEDED" strokeWidth="1" opacity="0.35" />
      <path d="M40 80 L120 80 L120 58 L200 58 L200 80 L260 80" stroke="#EDEDED" strokeWidth="1.5" opacity="0.7" />
      <path d="M40 145 L100 145 L100 162 L185 162 L185 145 L260 145" stroke="#EDEDED" strokeWidth="1.5" opacity="0.7" />
      <path d="M40 118 L260 118" stroke="#EDEDED" strokeWidth="0.8" strokeDasharray="4 3" opacity="0.28" />
      <path d="M80 40 L80 200" stroke="#EDEDED" strokeWidth="0.8" opacity="0.35" />
      <path d="M160 40 L160 200" stroke="#EDEDED" strokeWidth="0.8" opacity="0.35" />
      <path d="M240 40 L240 200" stroke="#EDEDED" strokeWidth="0.8" opacity="0.35" />
      <rect x="106" y="48" width="28" height="20" rx="2" stroke="#B300FF" strokeWidth="1.5" fill="none" />
      <circle cx="160" cy="118" r="15" stroke="#4DFF94" strokeWidth="1.5" fill="none" />
      <rect x="222" y="109" width="18" height="18" rx="2" stroke="#EDEDED" strokeWidth="1.5" fill="none" />
      <rect x="62" y="134" width="18" height="18" rx="2" stroke="#EDEDED" strokeWidth="1.5" fill="none" />
      <circle cx="80" cy="80" r="4" stroke="#EDEDED" strokeWidth="1" fill="none" />
      <circle cx="80" cy="80" r="2" fill="#EDEDED" opacity="0.7" />
      <circle cx="240" cy="145" r="4" stroke="#EDEDED" strokeWidth="1" fill="none" />
      <circle cx="240" cy="145" r="2" fill="#EDEDED" opacity="0.7" />
      <circle cx="160" cy="58" r="4" stroke="#EDEDED" strokeWidth="1" fill="none" />
      <circle cx="160" cy="58" r="2" fill="#EDEDED" opacity="0.7" />
      <circle cx="120" cy="58" r="3" fill="#B300FF" opacity="0.72" />
    </svg>
  )
}

export function RocketWireframe() {
  return (
    <svg viewBox="0 0 300 270" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
      <path d="M150 28 L192 102 L192 184 L150 214 L108 184 L108 102 Z" stroke="#EDEDED" strokeWidth="1.5" fill="none" opacity="0.8" />
      <path d="M150 28 L150 102" stroke="#EDEDED" strokeWidth="0.8" opacity="0.45" />
      <path d="M128 72 Q150 50 172 72" stroke="#EDEDED" strokeWidth="0.8" opacity="0.38" />
      <path d="M118 92 Q150 65 182 92" stroke="#EDEDED" strokeWidth="0.8" opacity="0.38" />
      <path d="M108 122 L192 122" stroke="#EDEDED" strokeWidth="0.8" opacity="0.38" />
      <path d="M108 152 L192 152" stroke="#EDEDED" strokeWidth="0.8" opacity="0.38" />
      <path d="M130 102 L130 184" stroke="#EDEDED" strokeWidth="0.8" opacity="0.38" />
      <path d="M170 102 L170 184" stroke="#EDEDED" strokeWidth="0.8" opacity="0.38" />
      <path d="M108 162 L78 202 L108 186" stroke="#EDEDED" strokeWidth="1.5" fill="none" opacity="0.7" />
      <path d="M192 162 L222 202 L192 186" stroke="#EDEDED" strokeWidth="1.5" fill="none" opacity="0.7" />
      <path d="M132 208 L142 234 L158 234 L168 208" stroke="#EDEDED" strokeWidth="1.2" fill="none" opacity="0.8" />
      <circle cx="150" cy="134" r="12" stroke="#EDEDED" strokeWidth="1.2" fill="none" />
      <circle cx="150" cy="134" r="6" stroke="#4DFF94" strokeWidth="1" fill="none" opacity="0.72" />
      <path d="M142 234 Q150 256 158 234" stroke="#4DFF94" strokeWidth="1.5" fill="none" opacity="0.72" />
      <path d="M145 234 Q150 244 155 234" stroke="#B300FF" strokeWidth="1" fill="none" opacity="0.55" />
      {[{ cx: 50, cy: 55 }, { cx: 262, cy: 38 }, { cx: 68, cy: 185 }, { cx: 252, cy: 165 }].map((star, index) => (
        <circle key={index} cx={star.cx} cy={star.cy} r="1.5" fill="#EDEDED" opacity="0.48" />
      ))}
    </svg>
  )
}

export function NetworkGrowthWireframe() {
  return (
    <svg viewBox="0 0 300 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
      <g opacity="0.1" stroke="#EDEDED" strokeWidth="0.5">
        {[40, 90, 140, 190, 240].map((x) => <line key={x} x1={x} y1="40" x2={x} y2="225" />)}
        {[80, 120, 160, 200].map((y) => <line key={y} x1="20" y1={y} x2="280" y2={y} />)}
      </g>
      <path d="M40,205 L90,178 L140,152 L190,112 L240,70" fill="#4DFF94" fillOpacity="0.03" stroke="none" />
      <polyline points="40,205 90,178 140,152 190,112 240,70" stroke="#EDEDED" strokeWidth="2" fill="none" opacity="0.7" />
      <line x1="40" y1="40" x2="40" y2="225" stroke="#EDEDED" strokeWidth="1.5" opacity="0.55" />
      <line x1="40" y1="225" x2="262" y2="225" stroke="#EDEDED" strokeWidth="1.5" opacity="0.55" />
      {[{ cx: 40, cy: 205 }, { cx: 90, cy: 178 }, { cx: 140, cy: 152 }].map((point, index) => (
        <circle key={index} cx={point.cx} cy={point.cy} r="5" fill="#EDEDED" />
      ))}
      <circle cx="190" cy="112" r="6" fill="#4DFF94" opacity="0.72" />
      <circle cx="240" cy="70" r="7" fill="#4DFF94" />
      <circle cx="240" cy="70" r="18" fill="#4DFF94" opacity="0.06" />
      <line x1="40" y1="205" x2="90" y2="178" stroke="#B300FF" strokeWidth="0.8" strokeDasharray="3 4" opacity="0.45" />
      <line x1="90" y1="178" x2="140" y2="152" stroke="#B300FF" strokeWidth="0.8" strokeDasharray="3 4" opacity="0.45" />
      <line x1="140" y1="152" x2="190" y2="112" stroke="#4DFF94" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.45" />
      <line x1="190" y1="112" x2="240" y2="70" stroke="#4DFF94" strokeWidth="1.2" opacity="0.55" />
    </svg>
  )
}

export function TabWireframe({ tabId }: { tabId: string }) {
  if (tabId === 'the-interface' || tabId === 'nozomio-labs' || tabId.startsWith('redacted-')) {
    return (
      <svg viewBox="0 0 360 280" fill="none" className="w-full h-full" aria-hidden="true">
        <rect x="24" y="24" width="312" height="232" rx="12" stroke="#EDEDED" strokeWidth="1.1" opacity="0.45" />
        <rect x="42" y="44" width="112" height="18" rx="9" fill={tabId.startsWith('redacted-') ? '#B300FF' : '#4DFF94'} fillOpacity={tabId.startsWith('redacted-') ? '0.11' : '0.14'} />
        <rect x="42" y="84" width="132" height="10" rx="5" fill="#EDEDED" fillOpacity="0.82" />
        <rect x="42" y="104" width="186" height="6" rx="3" fill="#EDEDED" fillOpacity="0.22" />
        <rect x="42" y="118" width="160" height="6" rx="3" fill="#EDEDED" fillOpacity="0.16" />
        <rect x="42" y="132" width="144" height="6" rx="3" fill="#EDEDED" fillOpacity="0.16" />
        <rect x="42" y="168" width="276" height="1" fill="#EDEDED" fillOpacity="0.12" />
        <rect x="42" y="188" width="84" height="12" rx="6" fill="#EDEDED" fillOpacity="0.1" />
        <rect x="138" y="188" width="84" height="12" rx="6" fill="#EDEDED" fillOpacity="0.1" />
        <rect x="234" y="188" width="84" height="12" rx="6" fill="#EDEDED" fillOpacity="0.1" />
        <path d="M250 78 L296 78 L296 122" stroke="#EDEDED" strokeWidth="1" opacity="0.25" strokeDasharray="4 4" />
        <circle cx="296" cy="122" r="10" stroke={tabId.startsWith('redacted-') ? '#B300FF' : '#4DFF94'} strokeWidth="1.5" fill="none" />
        <circle cx="296" cy="122" r="4" fill={tabId.startsWith('redacted-') ? '#B300FF' : '#4DFF94'} opacity="0.72" />
      </svg>
    )
  }

  if (tabId === 'cli') {
    return (
      <svg viewBox="0 0 360 280" fill="none" className="w-full h-full" aria-hidden="true">
        <rect x="20" y="20" width="320" height="240" rx="8" stroke="#EDEDED" strokeWidth="1.2" opacity="0.65" />
        <rect x="20" y="20" width="320" height="34" stroke="#EDEDED" strokeWidth="1.2" fill="none" opacity="0.4" />
        {[44, 60, 76].map((cx, index) => (
          <circle key={index} cx={cx} cy="37" r="5" stroke="#EDEDED" strokeWidth="1" fill="none" opacity="0.4" />
        ))}
        <text x="36" y="76" fill="#4DFF94" fontSize="11" fontFamily="monospace" opacity="0.9">$ claude build --spec ./plan.md</text>
        <text x="36" y="100" fill="#EDEDED" fontSize="11" fontFamily="monospace" opacity="0.55">  → Analyzing specification...</text>
        <text x="36" y="120" fill="#EDEDED" fontSize="11" fontFamily="monospace" opacity="0.55">  → Scaffolding components...</text>
        <text x="36" y="140" fill="#4DFF94" fontSize="11" fontFamily="monospace" opacity="0.85">  ✓ Generated 12 files</text>
        <text x="36" y="160" fill="#4DFF94" fontSize="11" fontFamily="monospace" opacity="0.85">  ✓ Tests passing (47/47)</text>
        <text x="36" y="185" fill="#B300FF" fontSize="11" fontFamily="monospace" opacity="0.9">$ _</text>
        <rect x="47" y="175" width="7" height="13" fill="#B300FF" opacity="0.9" />
      </svg>
    )
  }

  if (tabId === 'web') {
    return (
      <svg viewBox="0 0 360 280" fill="none" className="w-full h-full" aria-hidden="true">
        <rect x="20" y="20" width="320" height="240" rx="6" stroke="#EDEDED" strokeWidth="1.2" opacity="0.65" />
        <rect x="20" y="20" width="320" height="36" stroke="#EDEDED" strokeWidth="1.2" fill="none" opacity="0.38" />
        <rect x="70" y="28" width="220" height="20" rx="3" stroke="#EDEDED" strokeWidth="0.8" fill="none" opacity="0.35" />
        {[38, 54].map((cx, index) => (
          <circle key={index} cx={cx} cy="38" r="5" stroke="#EDEDED" strokeWidth="1" fill="none" opacity="0.35" />
        ))}
        <rect x="36" y="72" width="288" height="32" rx="3" stroke="#4DFF94" strokeWidth="1" fill="#4DFF94" fillOpacity="0.04" opacity="0.6" />
        <rect x="36" y="116" width="130" height="110" rx="3" stroke="#EDEDED" strokeWidth="0.8" fill="#B300FF" fillOpacity="0.03" opacity="0.4" />
        <line x1="36" y1="116" x2="166" y2="226" stroke="#EDEDED" strokeWidth="0.6" opacity="0.18" />
        <line x1="166" y1="116" x2="36" y2="226" stroke="#EDEDED" strokeWidth="0.6" opacity="0.18" />
        <rect x="178" y="116" width="146" height="50" rx="3" stroke="#EDEDED" strokeWidth="0.8" fill="none" opacity="0.38" />
        <rect x="178" y="176" width="146" height="50" rx="3" stroke="#EDEDED" strokeWidth="0.8" fill="none" opacity="0.38" />
      </svg>
    )
  }

  if (tabId === 'ml') {
    return (
      <svg viewBox="0 0 360 280" fill="none" className="w-full h-full" aria-hidden="true">
        {[70, 110, 150, 190, 230].map((y, index) => (
          <circle key={`in${index}`} cx="60" cy={y} r="12" stroke="#EDEDED" strokeWidth="1.2" fill="none" opacity="0.7" />
        ))}
        {[90, 130, 170, 210].map((y, index) => (
          <g key={`h1${index}`}>
            <circle cx="150" cy={y} r="12" stroke="#B300FF" strokeWidth="1.2" fill="none" opacity="0.7" />
            <circle cx="150" cy={y} r="5" fill="#B300FF" opacity="0.28" />
          </g>
        ))}
        {[100, 150, 200].map((y, index) => (
          <g key={`h2${index}`}>
            <circle cx="240" cy={y} r="12" stroke="#4DFF94" strokeWidth="1.2" fill="none" opacity="0.7" />
            <circle cx="240" cy={y} r="5" fill="#4DFF94" opacity="0.28" />
          </g>
        ))}
        {[130, 170].map((y, index) => (
          <circle key={`out${index}`} cx="320" cy={y} r="12" stroke="#EDEDED" strokeWidth="1.5" fill="none" opacity="0.9" />
        ))}
        {[70, 110, 150, 190, 230].flatMap((inputY) =>
          [90, 130, 170, 210].map((hiddenY) => (
            <line key={`${inputY}-${hiddenY}`} x1="72" y1={inputY} x2="138" y2={hiddenY} stroke="#EDEDED" strokeWidth="0.3" opacity="0.18" />
          )),
        )}
        {[90, 130, 170, 210].flatMap((hiddenY) =>
          [100, 150, 200].map((hiddenTwoY) => (
            <line key={`hh-${hiddenY}-${hiddenTwoY}`} x1="162" y1={hiddenY} x2="228" y2={hiddenTwoY} stroke="#B300FF" strokeWidth="0.3" opacity="0.18" />
          )),
        )}
        {[100, 150, 200].flatMap((hiddenY) =>
          [130, 170].map((outputY) => (
            <line key={`ho-${hiddenY}-${outputY}`} x1="252" y1={hiddenY} x2="308" y2={outputY} stroke="#4DFF94" strokeWidth="0.5" opacity="0.3" />
          )),
        )}
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 360 280" fill="none" className="w-full h-full" aria-hidden="true">
      <line x1="80" y1="240" x2="80" y2="60" stroke="#EDEDED" strokeWidth="2" opacity="0.7" />
      {[240, 180, 120, 60].map((y) => (
        <g key={y}>
          <circle cx="80" cy={y} r="8" stroke="#EDEDED" strokeWidth="1.5" fill="none" />
          <circle cx="80" cy={y} r="4" fill="#EDEDED" />
        </g>
      ))}
      <path d="M80,180 Q120,180 140,150 L200,150" stroke="#4DFF94" strokeWidth="1.5" fill="none" opacity="0.8" />
      <line x1="200" y1="150" x2="200" y2="90" stroke="#4DFF94" strokeWidth="1.5" opacity="0.8" />
      <path d="M200,90 Q200,60 240,60 L280,60" stroke="#4DFF94" strokeWidth="1.5" fill="none" opacity="0.8" />
      {[150, 120, 90].map((y) => (
        <g key={y}>
          <circle cx="200" cy={y} r="7" stroke="#4DFF94" strokeWidth="1.5" fill="none" />
          <circle cx="200" cy={y} r="4" fill="#4DFF94" opacity="0.8" />
        </g>
      ))}
      <path d="M280,60 Q310,60 310,90 L310,100 Q310,120 280,120" stroke="#B300FF" strokeWidth="1.2" fill="none" opacity="0.7" strokeDasharray="4 3" />
      <circle cx="280" cy="120" r="6" stroke="#B300FF" strokeWidth="1.2" fill="none" />
      <circle cx="280" cy="120" r="3" fill="#B300FF" opacity="0.72" />
      <rect x="100" y="52" width="60" height="16" rx="2" stroke="#EDEDED" strokeWidth="0.8" fill="none" opacity="0.35" />
      <rect x="220" y="52" width="60" height="16" rx="2" stroke="#4DFF94" strokeWidth="0.8" fill="none" opacity="0.45" />
    </svg>
  )
}
