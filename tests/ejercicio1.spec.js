// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Ejercicio 1: Validación del Menú de Navegación Superior', () => {

    test('Compruba que todos los elementos del menú están presentes y son correctos', async ({ page }) => {
        
        //El usuario navega a la página web de Demoblaze
        await page.goto('https://www.demoblaze.com/');

        //Se realizan las aserciones para verificar cada elemento de navegación

        // 1. Validar el enlace de "Home" (Inicio). Buscamos por el rol de enlace y su nombre.
        const linkHome = page.getByRole('link', { name: 'Home' });
        await expect(linkHome).toBeVisible();

        // 2. Validar el enlace de "Contacto" (Contact)
        const linkContacto = page.getByRole('link', { name: 'Contact' });
        await expect(linkContacto).toBeVisible();

        // 3. Validar el enlace de "Acerca de" (About us)
        const linkAcercaDe = page.getByRole('link', { name: 'About us' });
        await expect(linkAcercaDe).toBeVisible();

        // 4. Validar el enlace de "Cesta" (Cart)
        const linkCesta = page.getByRole('link', { name: 'Cart', exact: true });
        await expect(linkCesta).toBeVisible();

        // 5. Validar el enlace de "Iniciar sesión" (Log in)
        const linkLogin = page.getByRole('link', { name: 'Log in' });
        await expect(linkLogin).toBeVisible();

        // 6. Validar el enlace de "Registrarse" (Sign up)
        const linkSignUp = page.getByRole('link', { name: 'Sign up' });
        await expect(linkSignUp).toBeVisible();
    });

});
