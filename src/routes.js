import Inicio from './Rutas/Inicio.svelte'
import Acerca from './Rutas/Acerca.svelte'
import Contactos from './Rutas/Contactos.svelte'
import ErrorRuta from './Rutas/ErrorRuta.svelte'

const routes = {
    '/':Inicio,
    '/Acerca/:id/:nombre?':Acerca,
    '/Contactos':Contactos,
    '*':ErrorRuta
}

export default routes