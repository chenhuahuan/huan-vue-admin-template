import request from '@/utils/request'
export function fetchTableData(query) {
  return request({
    url: '/api/test/',
    method: 'GET',
    params: query
  })
}
