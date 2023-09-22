import request from '@/utils/request'

export function getRoleList(params) {
  return request({
    url: '/sys/role',
    method: 'get',
    params
  })
}

export function addRoleList(data) {
    return request({
      url: '/sys/role',
      method: 'post',
      data
    })
  }
  //获取详情
  export function getRoleDetail(id) {
    return request({
      url: `/sys/role/${id}`
    })
  }
//编辑
  export function updateRole(data) {
    return request({
      url: `/sys/role/${data.id}`,
      method: 'put',
      data
    })
  }
 //删除
  export function deleteRole(id) {
    return request({
      url: `/sys/role/${id}`,
      method: 'delete'
    })
  }

  // 获取权限
export function getPermissionList(params) {
  return request({
    url: '/sys/permission',
    params
  })
}

  // 给角色分配权限
export function assignPerm(data) {
  return request({
    url: '/sys/role/assignPrem',
    method: 'put',
    data
  })
}
