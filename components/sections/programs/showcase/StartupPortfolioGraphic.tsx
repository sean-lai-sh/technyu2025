import AsciiSignalLogo from './AsciiSignalLogo'
import { TabWireframe } from './wireframes'

type StartupPortfolioGraphicProps = {
  startupId: string
  asciiArt?: string
}

export default function StartupPortfolioGraphic({ startupId, asciiArt }: StartupPortfolioGraphicProps) {
  if ((startupId === 'the-interface' || startupId === 'nozomio-labs' || startupId === 'avantis') && asciiArt?.trim()) {
    return (
      <AsciiSignalLogo
        art={asciiArt}
        tone="green"
        scale={startupId === 'nozomio-labs' ? 1.25 : startupId === 'avantis' ? 1.05 : 1}
      />
    )
  }

  if (startupId === 'redacted-03') {
    return (
      <svg viewBox="0 0 520 360" fill="none" className="h-full w-full" aria-hidden="true">
        <g opacity="0.14" stroke="#EDEDED" strokeWidth="0.8">
          {[90, 170, 250, 330, 410].map((x) => <line key={x} x1={x} y1="52" x2={x} y2="306" />)}
          {[88, 146, 204, 262].map((y) => <line key={y} x1="52" y1={y} x2="468" y2={y} />)}
        </g>
        <circle cx="118" cy="108" r="18" stroke="#EDEDED" strokeWidth="1.2" opacity="0.7" />
        <circle cx="224" cy="170" r="18" stroke="#B300FF" strokeWidth="1.4" opacity="0.65" />
        <circle cx="326" cy="118" r="18" stroke="#EDEDED" strokeWidth="1.2" opacity="0.7" />
        <circle cx="406" cy="230" r="18" stroke="#B300FF" strokeWidth="1.4" opacity="0.65" />
        <line x1="136" y1="116" x2="206" y2="162" stroke="#EDEDED" strokeWidth="1" opacity="0.22" />
        <line x1="242" y1="162" x2="308" y2="126" stroke="#B300FF" strokeWidth="1.1" opacity="0.32" />
        <line x1="340" y1="130" x2="392" y2="216" stroke="#EDEDED" strokeWidth="1" opacity="0.22" />
        <rect x="104" y="236" width="312" height="46" rx="10" fill="#080808" fillOpacity="0.86" stroke="#EDEDED" strokeWidth="1.1" opacity="0.46" />
        <rect x="132" y="252" width="74" height="12" rx="6" fill="#EDEDED" fillOpacity="0.08" />
        <rect x="222" y="252" width="74" height="12" rx="6" fill="#EDEDED" fillOpacity="0.08" />
        <rect x="312" y="252" width="74" height="12" rx="6" fill="#EDEDED" fillOpacity="0.08" />
        <text x="260" y="96" textAnchor="middle" fill="#E6C7FF" fontSize="13" fontFamily="Arial, sans-serif" letterSpacing="4.5" opacity="0.8">
          STEALTH NETWORK
        </text>
      </svg>
    )
  }

  return <TabWireframe tabId={startupId} />
}
