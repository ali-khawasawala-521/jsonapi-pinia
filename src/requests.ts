import { getUrl } from './utils'
import type { ApiConf, ResourceObject, NewResourceObject } from './types'

let apiConf: ApiConf = {
  baseUrl: 'http://localhost'
}

export const setApiConf = (conf: ApiConf) => {
  apiConf = conf
}

export const indexRequest = async (
  resourceType: string,
  queryParams: { [key: string]: any } = {},
  headers: Headers = new Headers()
) => {
  const url = getUrl(apiConf.baseUrl || '', `/${resourceType}`)
  headers.append('Content-Type', 'application/vnd.api+json')
  const conf = { method: 'GET', headers }
  Object.keys(queryParams).forEach((key) =>
    url.searchParams.append(key, queryParams[key])
  )
  const response = await fetch(url.href, conf)
  if (!response.ok) {
    throw new Error(
      `Api call failed with status: ${response.status} and message: ${response.statusText}`
    )
  }
  return response.json()
}

export const getRequest = async (
  resourceType: string,
  id: string,
  queryParams: { [key: string]: any } = {},
  headers: Headers = new Headers()
) => {
  const url = getUrl(apiConf.baseUrl || '', `/${resourceType}/${id}`)
  headers.append('Content-Type', 'application/vnd.api+json')
  const conf = { method: 'GET', headers }
  Object.keys(queryParams).forEach((key) =>
    url.searchParams.append(key, queryParams[key])
  )
  const response = await fetch(url.href, conf)
  if (!response.ok) {
    throw new Error(
      `Api call failed with status: ${response.status} and message: ${response.statusText}`
    )
  }
  return response.json()
}

export const createRequest = async (
  resourceType: string,
  body: NewResourceObject,
  headers: Headers = new Headers()
) => {
  const url = getUrl(apiConf.baseUrl || '', `/${resourceType}`)
  headers.append('Content-Type', 'application/vnd.api+json')
  const conf = { method: 'POST', headers, body: JSON.stringify(body) }
  const response = await fetch(url.href, conf)
  if (!response.ok) {
    throw new Error(
      `Api call failed with status: ${response.status} and message: ${response.statusText}`
    )
  }
  // The server can respond with a 201 Created and include the document or 204 No Content and no document
  if (response.status === 204) return ''
  return response.json()
}

export const updateRequest = async (
  resourceType: string,
  id: string,
  body: ResourceObject,
  headers: Headers = new Headers()
) => {
  const url = getUrl(apiConf.baseUrl || '', `/${resourceType}/${id}`)
  headers.append('Content-Type', 'application/vnd.api+json')
  const conf = { method: 'PATCH', headers, body: JSON.stringify(body) }
  const response = await fetch(url.href, conf)
  if (!response.ok) {
    throw new Error(
      `Api call failed with status: ${response.status} and message: ${response.statusText}`
    )
  }
  // The server can respond with a 200 OK and include the document or 204 No Content and no document
  if (response.status === 204) return ''
  return response.json()
}

export const deleteRequest = async (
  resourceType: string,
  id: string,
  headers: Headers = new Headers()
) => {
  const url = getUrl(apiConf.baseUrl || '', `/${resourceType}/${id}`)
  headers.append('Content-Type', 'application/vnd.api+json')
  const conf = { method: 'DELETE', headers }
  const response = await fetch(url.href, conf)
  if (!response.ok) {
    throw new Error(
      `Api call failed with status: ${response.status} and message: ${response.statusText}`
    )
  }
  return response.json()
}
