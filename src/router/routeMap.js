//主要为全部菜单结构和权限的配置，visible=true不在菜单显示，defaultDock=true会跳过lookUp权限默认在菜单显示
//permissionCode为权限映射码，若permissionCode未对应到用户权限则不显示也无跳转访问权限
//route和routeReg为匹配路由，二者必须有一个，若都有则为“或”逻辑
export default [{
    menu: '企业管理',
    permissionCode: 'enterprise',
    icon: '&#xe60a;',
    defaultDock: true,
    subMenu: [{
      menu: '企业列表',
      route: '/Enterprise',
      key: 'enterprise',
      permissionCode: 'enterprise',
      defaultDock: true
    }, ]
  },
  {
    menu: '工作台',
    permissionCode: 'mainDashboard',
    icon: '&#xe60a;',
    defaultDock: true,
    subMenu: [{
        menu: '工作台',
        route: '/Dashboard',
        key: 'dashboard',
        permissionCode: 'dashboard',
        defaultDock: true
      },
      {
        menu: '生产监控台',
        route: '/Dashboard/progress',
        key: 'progressDashboard',
        permissionCode: 'progressDashboard'
      }
    ]
  },
  {
    menu: '工单管理',
    defaultDock: true,
    permissionCode: 'order',
    icon: '&#xe602;',
    subMenu: [
      // {
      //   menu: '生产订单',
      //   route: '/OrderList',
      //   key: 'orderList',
      //   permissionCode: 'orderList'
      // },
      {
        menu: '工单管理',
        route: '/WorkOrderList',
        key: 'workOrderList',
        permissionCode: 'workOrderList'
      },
      {
        menu: '工单明细',
        routeReg: /^\/WorkOrderList\/WorkOrderDetailsList\/\w{1,}$/i,
        key: 'WorkOrderDetailsList',
        visible: true,
        permissionCode: 'WorkOrderDetailsList'
      }
    ]
  },
  // {
  //   menu: '工作令',
  //   permissionCode: 'workOrder',
  //   icon: '&#xe63c;',
  //   subMenu: [{
  //       menu: '工作令管理',
  //       route: '/WorkOrderList',
  //       key: 'workOrderList',
  //       permissionCode: 'workOrderList'
  //     }, {
  //       menu: '工作令新建',
  //       route: '/WorkOrderAdd',
  //       key: 'workOrderAdd',
  //       permissionCode: 'workOrderAdd'
  //     },
  //     {
  //       menu: '移交单管理',
  //       routeReg: /^\/workOrder\/transferOrder\/\w{1,}$/i,
  //       key: 'transferOrder',
  //       permissionCode: 'transferOrder'
  //     }
  //   ]
  // },
  // {
  //   menu: '生产设备',
  //   defaultDock: true,
  //   permissionCode: 'device"',
  //   icon: '&#xe61c;',
  //   subMenu: [{
  //       menu: '我的设备',
  //       route: '/MyDevice',
  //       key: 'myDevice',
  //       permissionCode: 'myDevice'
  //     },
  //     {
  //       menu: '添加设备',
  //       route: '/MyDevice/AddEquipment',
  //       key: 'addEquipment',
  //       visible: true,
  //       permissionCode: 'addEquipment'
  //     },
  //     {
  //       menu: '修改设备',
  //       routeReg: /^\/MyDevice\/EditEquipment\/\w{1,}$/i,
  //       key: 'editEquipment',
  //       visible: true,
  //       permissionCode: 'editEquipment'
  //     },
  //     {
  //       menu: '设备分类',
  //       route: '/DeviceCategory',
  //       key: 'deviceCategory',
  //       permissionCode: 'deviceCategory'
  //     },
  //     {
  //       menu: '设备监控',
  //       route: '/Monit',
  //       key: 'monit',
  //       permissionCode: 'monit'
  //     },
  //     {
  //       menu: '设备绑定',
  //       route: "/DeviceAdd",
  //       key: 'deviceAdd',
  //       permissionCode: 'deviceAdd'
  //     }
  //   ]
  // },
  // {
  //   menu: '工艺卡片',
  //   defaultDock: true,
  //   permissionCode: 'processCard',
  //   icon: '&#xe613;',
  //   subMenu: [{
  //       menu: '工艺卡片新建',
  //       route: '/ProcessCardAdd',
  //       key: 'processCardAdd',
  //       permissionCode: 'processCardAdd'
  //     },
  //     {
  //       menu: '工艺卡片管理',
  //       route: '/ProcessCardList',
  //       key: 'processCardList',
  //       permissionCode: 'processCard'
  //     }
  //   ]
  // },
  {
    menu: '工艺图纸',
    defaultDock: true,
    permissionCode: 'drawingsManager',
    icon: '&#xe704;',
    subMenu: [{
      menu: '工艺图纸',
      route: '/DrawingsList',
      key: 'drawingsList',
      permissionCode: 'drawings'
    }]
  },
  // {
  //   menu: '生产记录',
  //   defaultDock: true,
  //   permissionCode: 'history',
  //   icon: '&#xe915;',
  //   subMenu: [{
  //       menu: '生产记录管理',
  //       route: '/HistoryList',
  //       key: 'historyList',
  //       permissionCode: 'historyList'
  //     },
  //     {
  //       menu: '生产报表',
  //       route: '/Report',
  //       key: 'report',
  //       permissionCode: 'report'
  //     }
  //   ]
  // },
  {
    menu: '工种管理',
    defaultDock: true,
    permissionCode: 'processTypes',
    icon: '&#xe915;',
    subMenu: [{
      menu: '工种管理',
      route: '/ProcessTypes',
      key: 'ProcessTypes',
      permissionCode: 'ProcessTypes'
    }, ]
  },
  {
    menu: '员工管理',
    defaultDock: true,
    permissionCode: 'employee',
    icon: '&#xe915;',
    subMenu: [{
        menu: '员工管理',
        route: '/Employee',
        key: 'employee',
        permissionCode: 'employee'
      },
      {
        menu: '员工添加',
        route: '/Employee/AddEmployee',
        key: 'addEmployee',
        visible: true,
        permissionCode: 'addEmployee'
      },
      {
        menu: '员工修改',
        routeReg: /^\/Employee\/EditEmployee\/\w{1,}$/i,
        key: 'editEmployee',
        visible: true,
        permissionCode: 'editEmployee'
      },
    ]
  },
  {
    menu: '原材料管理',
    defaultDock: true,
    permissionCode: 'materialManagement',
    icon: '&#xe915;',
    subMenu: [{
      menu: '原材料管理',
      route: '/materialManagementList',
      key: 'materialManagementList',
      permissionCode: 'materialManagement'
    }, ]
  },
  {
    menu: '合作单位',
    defaultDock: true,
    permissionCode: 'Subcontract',
    icon: '&#xe915;',
    subMenu: [{
      menu: '合作单位',
      route: '/Subcontract',
      key: 'Subcontract',
      permissionCode: 'Subcontract'
    }, ]
  },
  {
    menu: '系统配置',
    defaultDock: true,
    permissionCode: 'system',
    icon: '&#xe915;',
    subMenu: [{
        menu: '组织机构',
        route: '/Organization',
        key: 'organization',
        permissionCode: 'organization'
      },
      {
        menu: '模块自定义',
        route: '/ModuleCustomization',
        key: 'ModuleCustomization',
        permissionCode: 'ModuleCustomization'
      },

      {
        menu: '角色权限',
        route: '/Authority',
        key: 'authority',
        permissionCode: 'authority'
      }, {
        menu: '权限添加',
        route: '/Authority/AddAuthority',
        key: 'addEmployee',
        visible: true,
        permissionCode: 'addEmployee'
      }, {
        menu: '权限修改',
        routeReg: /^\/Authority\/EditAuthority\/\w{1,}$/i,
        key: 'editEmployee',
        visible: true,
        permissionCode: 'editEmployee'
      },
    ]
  }
]
