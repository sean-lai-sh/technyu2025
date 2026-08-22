import React from 'react'
import { ArrowUpRight } from 'lucide-react'

/**
 * A single AI destination. The final link is built as:
 *   `${urlPrefix}${encodeURIComponent(prompt)}`
 * so `urlPrefix` should end with whatever query key the provider expects
 * (almost always `?q=`). Swap these out per provider as needed.
 */
export type AiProvider = {
  /** Brand name, e.g. "ChatGPT" */
  name: string
  /** Button label, e.g. "Ask ChatGPT" */
  label: string
  /** Path to the brand logo (lives in /public). Recolored via CSS mask. */
  logo: string
  /** Base URL up to and including the query key; the encoded prompt is appended */
  urlPrefix: string
}

/**
 * Renders a monochrome logo recolored to the current text color via CSS mask,
 * so the brand marks inherit the button's white/72 → white hover state.
 */
function LogoMask({ src, className }: { src: string; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={className}
      style={{
        display: 'inline-block',
        backgroundColor: 'currentColor',
        WebkitMaskImage: `url(${src})`,
        maskImage: `url(${src})`,
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
      }}
    />
  )
}

/**
 * Default destinations. Each `urlPrefix` ends with `?q=` — edit these to point
 * at whatever endpoint you want per provider.
 */
export const DEFAULT_AI_PROVIDERS: AiProvider[] = [
  {
    name: 'ChatGPT',
    label: 'Ask ChatGPT',
    logo: '/ai-logos/chatgpt.svg',
    urlPrefix: 'https://chatgpt.com/?q=',
  },
  {
    name: 'Claude',
    label: 'Ask Claude',
    logo: '/ai-logos/claude.svg',
    urlPrefix: 'https://claude.ai/new?q=',
  },
  {
    name: 'Perplexity',
    label: 'Ask Perplexity',
    logo: '/ai-logos/perplexity.svg',
    urlPrefix: 'https://www.perplexity.ai/search?q=',
  },
]

const DEFAULT_PROMPT =
  'Tell me why Tech@NYU the club is a great choice for a tech student.'

type AskAiProps = {
  /** The question handed to each AI. */
  prompt?: string
  /** Provider destinations. Defaults to ChatGPT / Claude / Perplexity. */
  providers?: AiProvider[]
}

const AskAi = ({ prompt = DEFAULT_PROMPT, providers = DEFAULT_AI_PROVIDERS }: AskAiProps) => {
  const encodedPrompt = encodeURIComponent(prompt)

  return (
    <section className="w-[100svw] px-5 py-8 pb-16 md:px-10 md:py-12 lg:px-[5vw]">
      <div className="relative border border-white/10 bg-surface-raised px-6 py-12 shadow-[0_36px_120px_rgba(0,0,0,0.42)] md:px-10 md:py-16">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/48">
            Don&apos;t take our word for it
          </p>
          <h2 className="mt-4 text-display-3 font-display-semibold text-white">
            Still deciding if Tech@NYU is right for you?
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/72 md:text-lg">
            Let ChatGPT, Claude, or Perplexity do the thinking. Tap a button and ask your
            favorite AI why Tech@NYU is worth a tech student&apos;s time.
          </p>

          <div className="mt-9 flex flex-col flex-wrap items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            {providers.map((provider) => (
              <a
                key={provider.name}
                href={`${provider.urlPrefix}${encodedPrompt}`}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center justify-center gap-2.5 border border-white/20 px-6 py-4 text-sm font-medium text-white transition-[transform,background-color,border-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-0.5 hover:bg-white/10 active:scale-[0.97]"
              >
                <LogoMask
                  src={provider.logo}
                  className="h-[18px] w-[18px] text-white/72 transition-colors duration-200 group-hover:text-white"
                />
                <span>{provider.label}</span>
                <ArrowUpRight className="h-4 w-4 text-white/40 transition-all duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AskAi
