import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/cases/list',
    method: 'get',
    params: query
  })
}

export function fetchTestcaseAll(query) {
  return request({
    url: '/cases/list',
    method: 'get',
    params: query
  })
}

export function casesAdd(query) {
  return request({
    url: '/cases/add',
    method: 'post',
    params: query
  })
}

export function fetchTestcase(id) {
  return request({
    url: '/cases/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: 'cases/pv',
    method: 'get',
    params: { pv }
  })
}

export function createCase(data) {
  return request({
    url: '/cases/create',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/cases/update',
    method: 'post',
    data
  })
}
