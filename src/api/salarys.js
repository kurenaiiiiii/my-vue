import request from '@/utils/request'

export function getSalarys(params) {
    return request({
      url: '/sys/user',
      method: 'get',
      params
    })
  }
//   /api/company/department

export function getDepartment() {
    return request({
      url: '/company/department',
      method: 'get',
      
    })
  }

  // /cfg/atte/item

  
// export function getDepartmentData(id) {
//   return request({
//     url: `/company/department/${id}`,
//     method: 'get',
   
//   })
// }


//   /salarys/list


export function getDepartmentData(params) {
  return request({
    url: `/sys/user`,
    method: 'get',
    params
  })
}
