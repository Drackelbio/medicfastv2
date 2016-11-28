app

    .factory("topico2Service", function($resource, configTopico2) {
    var url = configTopico2.topico2Url;
    return {

        Historia: $resource(url + "historias/:id/", { 'id': '@id' }, {
            "update": { method: 'PUT' },

        }),

        Medicamento: $resource(url + "medicamentos/:id/", { 'id': '@id' }, {
            "update": { method: 'PUT' },
            }),

        Tratamiento: $resource(url + "tratamientos/:id/", { 'id': '@id' }, {
            "update": { method: 'PUT' },
            }),

        Consulta: $resource(url + "consultas/:id/", { 'id': '@id' }, {
            "update": { method: 'PUT' },
            }),

        Diagnostico: $resource(url + "diagnosticos/:id/", { 'id': '@id' }, {
            "update": { method: 'PUT' },
            }),

        Especificacionreceta: $resource(url + "especificacionrecetas/:id/", { 'id': '@id' }, {
            "update": { method: 'PUT' },
            }),


       };
});
