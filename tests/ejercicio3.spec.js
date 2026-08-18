/*
Ejercicio 3 - Seleccionar un elemento al azar : 
 
En este ejercicio, seleccionará un elemento al azar de Teléfonos 
 
 Vaya a https://www.demoblaze.com/  
1 Seleccione un elemento aleatorio de la categoría Teléfonos: 
2 Haga una assert 
3 Haga clic en el botón Añadir a la cesta 
4 Cerrar alerta 
5 Ir a la cesta 
6 Haga clic en Realizar pedido 
7 Rellenar el pedido 
8 Haga clic en Comprar 
9 Haga assert sobre su Compra ( EL TEXTO “THANK YOU FOR YOUR PURCHASE!”) 
*/
// @ts-check
const { test, expect } = require('@playwright/test');
const { log } = require('node:console');

test.describe('Ejercicio 3: Validación de seccion telefonos', () => {

    test('Comprueba que todos los elementos del menú telefonos están presentes y son correctos', async ({ page }) => {
        
        //El usuario navega a la página web de Demoblaze
        await page.goto('https://www.demoblaze.com/');

        //1. Seleccionar un elemento aleatorio
        
        // Click en la categoría Phones
        await page.getByRole('link', { name: 'Phones' }).click();

        // Click en la categoría Phones controlando la petición de red (AJAX)
        // 1. Preparamos la promesa que escucha la petición de la base de datos de teléfonos
        const respuestaPromesa = page.waitForResponse(response => 
            response.url().includes('bycat') && response.status() === 200
        );

        // Hacemos clic en la categoría
        await page.getByRole('link', { name: 'Phones' }).click();

        // Esperamos a que la petición termine con éxito (los teléfonos ya están en el HTML)
        await respuestaPromesa;

        //  Por seguridad añadimos una pequeña espera extra para asegurar el renderizado
        const enlacesProductos = page.locator('.hrefch');
        await expect(enlacesProductos.first()).toBeVisible();

        // 5. Ahora sí, contamos con total seguridad de que SOLO hay teléfonos en pantalla
        const cantidad = await enlacesProductos.count();
        const aleatorio = Math.floor(Math.random() * cantidad);

        const enlaceElegido = enlacesProductos.nth(aleatorio);
        const nombreProducto = await enlaceElegido.textContent() ?? '' ;
        const nombreLimpio = nombreProducto.trim();
        console.log('Teléfono seleccionado al azar: ', nombreProducto);

        await enlaceElegido.click();

        //2. Asert sobre el articulo seleccionado
        const nombreSeleccionado = page.locator('.name');
        await expect(nombreSeleccionado).toHaveText(nombreLimpio);

        //3-4. Click en añadir a la cesta y Cerrar alerta
        //esperamos al evento dialog
        const dialogPromise = page.waitForEvent('dialog');

        await page.getByRole('link', {name: 'Add to cart'}).click()
        const dialog = await dialogPromise;

        expect(dialog.message()).toBe('Product added');
        await dialog.accept();

        //5. Ir a la cesta
        const cesta = page.getByRole('link',{name: 'Cart', exact: true}) 
        await expect(cesta).toBeVisible();
        await cesta.click();
        await expect(page).toHaveURL(/cart\.html/);

        //6. Click en realizar pedido
        const pedido = page.getByRole('button',{name: 'Place Order'}).click();

        //7. Rellenar pedido name-country-city-credit card-month-year
        await page.locator('#name').fill('Uve');
        await page.locator('#country').fill('Spain');
        await page.locator('#city').fill('Manresa');
        await page.locator('#card').fill('084885');
        await page.locator('#month').fill('August');
        await page.locator('#year').fill('2026');

        //8. Click en comprar
        await page.getByRole('button', { name: 'Purchase' }).click();
        

        //9. Hacer assert sobre la compra realizada
        const mensaje = page.getByRole('heading',{name: 'Thank you for your purchase!'});
        await expect(mensaje).toBeVisible();

        await page.getByRole('button', {name: 'OK'}).click();
    });

});