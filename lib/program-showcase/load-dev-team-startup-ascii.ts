import { readFile } from 'fs/promises'
import path from 'path'

const DEV_TEAM_ASCII_FILES = {
  'the-interface': 'the-interface.txt',
  'nozomio-labs': 'nozomio-labs.txt',
} as const

export async function loadDevTeamStartupAsciiArt(): Promise<Partial<Record<string, string>>> {
  const baseDir = path.join(process.cwd(), 'content', 'program-showcase', 'ascii')

  const entries = await Promise.all(
    Object.entries(DEV_TEAM_ASCII_FILES).map(async ([startupId, fileName]) => {
      try {
        const art = await readFile(path.join(baseDir, fileName), 'utf8')
        return [startupId, art] as const
      } catch (error) {
        console.error(`Failed to load ASCII art for ${startupId}:`, error)
        return [startupId, ''] as const
      }
    }),
  )

  return Object.fromEntries(entries)
}
