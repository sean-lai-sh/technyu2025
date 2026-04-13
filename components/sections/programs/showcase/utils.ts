import { CtaSection, PortableTextBlock, ProgramSection, RolesSection, SanityProgram } from '@/lib/types'

export function toHeroTitle(value?: string): string {
  if (!value) return ''
  const words = value.trim().toUpperCase().split(/\s+/)
  if (words.length <= 1) return words[0] || ''
  if (words.length === 2) return `${words[0]}\n${words[1]}`
  const midpoint = Math.ceil(words.length / 2)
  return `${words.slice(0, midpoint).join(' ')}\n${words.slice(midpoint).join(' ')}`
}

export function portableTextToPlainText(blocks?: PortableTextBlock[]): string {
  if (!blocks?.length) return ''
  return blocks
    .flatMap((block) => block.children?.map((child) => child.text) ?? [])
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function getRolesSection(program?: SanityProgram | null): RolesSection | undefined {
  return program?.sections?.find((section: ProgramSection) => section._type === 'rolesSection') as RolesSection | undefined
}

export function getCtaSection(program?: SanityProgram | null): CtaSection | undefined {
  return program?.sections?.find((section: ProgramSection) => section._type === 'ctaSection') as CtaSection | undefined
}
