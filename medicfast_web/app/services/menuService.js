app
//------------------------------
// TODO: API menu
// por lo pronto colocar aqui el menu para su Modelo, vease test1
//------------------------------
    .factory("menuService", function(authService) {

    var sections = [
        /*
        {
          title: 'Getting Started',
          state: 'getting-started',
          url: '/getting-started',
          type: 'link'
        }
        */
    ];

    sections.push({
        title: 'INICIO',
        state: 'app.inicio',
        type: 'link'
    });

     sections.push({
        //title: 'Sección ui',
        //type: 'heading',
        menu: [{
            title: 'Historial Medico',
            type: 'toggle',
            state: 'ui',
            menu_items: [{
                title: 'Funciones vitales',
                state: 'ui.test3',
                type: 'link'
            }, {
                title: 'registro paciente',
                state: 'ui.test2',
                type: 'link'
            }, {
                title: 'Diagnostico',
                state: 'ui.Diagnostico',
                type: 'link'
            }, {
                title: 'tratamiento',
                state: 'ui.test4',
                type: 'link'
            }, {
                title: 'suministracion de medicamento',
                state: 'ui.test5',
                type: 'link'
            },{
                title: 'derivacion',
                state: 'ui.test7',
                type: 'link'
            }, {
                title: 'descanso medico',
                state: 'ui.dir',
                type: 'link'
            }, ]
        }]
    });

    sections.push({
        //title: 'Sección ui',
        //type: 'heading',
        menu: [{
            title: 'MANTENIMIENTO',
            type: 'toggle',
            state: 'ui',
            menu_items: [{
                title: 'Trabajador',
                state: 'ui.test1',
                type: 'link'
            }, {
                title: 'Medicamentos',
                state: 'ui.test2',
                type: 'link'
            }, {
                title: 'CIE 10',
                state: 'ui.test3',
                type: 'link'
            } ]
        }]
    });

    sections.push({

        menu: [{
            title: 'REPORTES',
            type: 'toggle',
            state: 'auths.system',
            menu_items: [ {
                title: 'Estadistico',
                state: 'auths.system.ct',
                type: 'link'
            }, {
                title: 'Institucional',
                state: 'auths.system.permission',
                type: 'link'
            }, {
                title: 'Visitas y misiones',
                state: 'auths.system.menu',
                type: 'link'
            }, ]
        }]
    });

    authService.getMenu().then(function(r) {
        menu = r.data;
        console.log("menuService.authService.getMenu():" + JSON.stringify(menu));
        sections.push(

            menu
        );

    }, function(error) {
        console.log("error in menuService.authService.getMenu():" + JSON.stringify(error));
    });








    return {
        sections: sections,
    };
});
