import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/testcase/list',
    method: 'get',
    params: query
  })
}

export function fetchTestcase(id) {
  return request({
    url: '/testcase/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/testcase/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/testcase/create',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/testcase/update',
    method: 'post',
    data
  })
}
