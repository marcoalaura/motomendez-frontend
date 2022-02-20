'use strict';

const Errors = {
    '401': 'No se pudo realizar la operación.',
    '412': 'No se pudo realizar la operación.',
    '403': 'Su sesión ha caducado o no tiene los permisos necesarios.',
    '404': 'No existe el recurso solicitado.',
    '407': 'Necesita configurar su Proxy para poder usar el sistema.',
    '408': 'El servidor no responde intente más tarde.',
    '409': 'Los datos no son válidos',
    '410': 'El recurso solicitado ya no está disponible y no lo estará de nuevo.',
    '500': 'Se produjo un error en el servidor, inténtelo más tarde.',
    '502': 'El sistema no está disponible en estos momentos, inténtelo más tarde.',
    '503': 'El sistema se encuentra en mantenimiento en estos momentos, vuelva a intentarlo más tarde por favor.',
    // '504': 'Gateway timeout - Tiempo de espera agota.', // Esto debe ser implementado en el frontend para reintentar las peticiones
    'connection': 'No se pudo establecer conexión con el servidor.',
    'cancelRequest': 'Petición cancelada.',
    'validation': 'Error de validación'
};

export default Errors;