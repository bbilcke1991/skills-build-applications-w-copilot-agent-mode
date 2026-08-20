const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const apiOrigin = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export const apiBaseUrl = `${apiOrigin}/api`

export function buildApiUrl(resourceNameOrEndpoint) {
  if (resourceNameOrEndpoint.startsWith('/api/')) {
    return `${apiOrigin}${resourceNameOrEndpoint}`
  }

  return `${apiBaseUrl}/${resourceNameOrEndpoint}/`
}

export function normalizeCollection(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (Array.isArray(payload?.results)) {
    return payload.results
  }

  if (Array.isArray(payload?.data)) {
    return payload.data
  }

  if (Array.isArray(payload?.items)) {
    return payload.items
  }

  if (Array.isArray(payload?.docs)) {
    return payload.docs
  }

  return []
}

export async function fetchCollection(resourceName) {
  const response = await fetch(buildApiUrl(resourceName))

  if (!response.ok) {
    throw new Error(`Unable to load ${resourceName}: ${response.status}`)
  }

  return normalizeCollection(await response.json())
}