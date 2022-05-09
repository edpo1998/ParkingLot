export const menus = [
    "usuarios", 
    "rol", 
    "caja", 
    "parqueos", 
    "contactos", 
    "conductores", 
    "vehiculos" ,
    "reportes",
    "nivel",
    "sector",
    "posicion"
 ]
 
export const sidebarItems = [
    {
      title: '👤 Usuarios',
      itemId: '/admin/usuarios',
      subNav: [
        {
          title: 'Agregar',
          itemId: '/admin/usuarios/add',
        },
        {
          title: 'Modificar',
          itemId: '/admin/usuarios/update',
        },
        {
          title: 'Listar',
          itemId: '/admin/usuarios/list',
        },
      ],
    },
    {
      title: '🛃 Roles',
      itemId: '/admin/roles',
      subNav: [
        {
          title: 'Crear ',
          itemId: '/admin/roles/add',
        },
        {
          title: 'Modificar',
          itemId: '/admin/roles/update',
        },
        {
          title: 'Listar',
          itemId: '/admin/roles/list',
        }
      ],
    },
    {
      title: '💼 Caja',
      itemId: '/admin/caja',
      subNav: [
        {
          title: 'Abrir ',
          itemId: '/admin/caja/open',
        },
        {
          title: 'Listar',
          itemId: '/admin/caja/list',
        }
      ],
    },
    {
      title: '🚗 Vehiculos',
      itemId: '/admin/vehiculos',
      subNav: [
        {
          title: 'Crear ',
          itemId: '/admin/vehiculos/add',
        },
        {
          title: 'Modificar',
          itemId: '/admin/vehiculos/update',
        },
        {
          title: 'Listar',
          itemId: '/admin/vehiculos/list',
        }
      ],
    },
    {
      title: '🛃 Parqueos',
      itemId: '/admin/estacion/',
      subNav: [
        {
          title: 'Crear ',
          itemId: '/admin/estacion/add',
        },
        {
          title: 'Modificar',
          itemId: '/admin/estacion/update',
        },
        {
          title: 'Listar',
          itemId: '/admin/estacion/list',
        }
      ],
    },
    {
      title: '🔺 Nivel',
      itemId: '/admin/niveles',
      subNav: [
        {
          title: 'Crear ',
          itemId: '/admin/niveles/add',
        },
        {
          title: 'Modificar',
          itemId: '/admin/niveles/update',
        },
        {
          title: 'Listar',
          itemId: '/admin/niveles/list',
        }
      ],
    },
    {
      title: '🔳 Sector',
      itemId: '/admin/sectores',
      subNav: [
        {
          title: 'Crear ',
          itemId: '/admin/sectores/add',
        },
        {
          title: 'Modificar',
          itemId: '/admin/sectores/update',
        },
        {
          title: 'Listar',
          itemId: '/admin/sectores/list',
        }
      ],
    },
    {
      title: '⤴️ Posicion',
      itemId: '/admin/posiciones',
      subNav: [
        {
          title: 'Crear ',
          itemId: '/admin/posiciones/add',
        },
        {
          title: 'Modificar',
          itemId: '/admin/posiciones/update',
        },
        {
          title: 'Listar',
          itemId: '/admin/posiciones/list',
        }
      ],
    },
    ,
    {
      title: '📒 Contactos',
      itemId: '/admin/contactos',
      subNav: [
        {
          title: 'Crear ',
          itemId: 'contactos_add',
        },
        {
          title: 'Modificar',
          itemId: 'contactos_update',
        },
        {
          title: 'Listar',
          itemId: 'contactos_listar',
        }
      ],
    },
    {
      title: '👦 Conductores',
      itemId: '/admin/conductores',
      subNav: [
        {
          title: 'Crear ',
          itemId: 'conductores_add',
        },
        {
          title: 'Modificar',
          itemId: 'conductores_update',
        },
        {
          title: 'Listar',
          itemId: 'conductores_listar',
        }
      ],
    },
    {
      title: '📃 Reportes',
      itemId: '/admin/reportes',
      subNav: [
        {
          title: 'Listar',
          itemId: 'reportes_listar',
        }
      ],
    },
  ]
