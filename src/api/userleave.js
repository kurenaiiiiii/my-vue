import request from '@/utils/request'

export function getinstance(page, size) {
  return request({
    url: `/user/process/instance/${page}/${size}`,
    method: 'get'
  })
}
