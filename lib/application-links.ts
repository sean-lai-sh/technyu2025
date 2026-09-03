import applicationLinks from './application-links.json'

export type ApplicationRoleLinkConfig = {
  link: string
  status?: boolean
}

export type ApplicationLinkConfig = {
  status: boolean
  link: string
  roles?: Record<string, ApplicationRoleLinkConfig>
}

export const applicationLinksByProgram =
  applicationLinks as Record<string, ApplicationLinkConfig>

export const getApplicationLink = (programName: string): ApplicationLinkConfig => {
  const config = applicationLinksByProgram[programName]

  if (!config) return { status: false, link: '' }

  return {
    ...config,
    status: Boolean(config.status && config.link.trim()),
  }
}

export const getRoleApplicationLink = (
  programName: string,
  roleTitle: string
): { status: boolean; link: string } => {
  const program = applicationLinksByProgram[programName]
  if (!program) return { status: false, link: '' }

  const role = program.roles?.[roleTitle]

  if (role) {
    const link = role.link ?? ''
    const status = role.status ?? program.status ?? false

    return {
      status: link ? status : false,
      link
    }
  }

  return { status: false, link: '' }
}
