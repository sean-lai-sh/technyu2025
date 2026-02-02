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

export const getApplicationLink = (programName: string): ApplicationLinkConfig =>
  applicationLinksByProgram[programName] ?? { status: false, link: '' }

export const getRoleApplicationLink = (
  programName: string,
  roleTitle: string
): { status: boolean; link: string } => {
  const program = getApplicationLink(programName)
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
