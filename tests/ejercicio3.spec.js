// @ts-check
const { test, expect } = require('@playwright/test');
const { log } = require('node:console');

test.describe('Ejercicio 3: Validación de seccion telefonos', () => {

    test('Comprueba que todos los elementos del menú telefonos están presentes y son correctos', async ({ page }) => {
        
        // GIVEN: El usuario navega a la página web de Demoblaze
        await page.goto('https://www.demoblaze.com/');

        //1. Seleccionar un elemento aleatorio
        
        // Click en la categoría Phones
        await page.getByRole('link', { name: 'Phones' }).click();

        // WHEN: El usuario solicita cargar la categoría de Teléfonos (Phones)
        // Click en la categoría Phones controlando la petición de red (AJAX)
        // 1. Preparamos la promesa que escucha la petición de la base de datos de teléfonos
        const respuestaPromesa = page.waitForResponse(response => 
            response.url().includes('bycat') && response.status() === 200
        );

        // Hacemos clic en la categoría
        await page.getByRole('link', { name: 'Phones' }).click();

        // THEN: Esperamos a que los datos de la red se reciban con éxito
        // Esperamos a que la petición termine con éxito (los teléfonos ya están en el HTML)
        await respuestaPromesa;

        // AND: Confirmamos que los elementos se han renderizado visualmente en el DOM
        //  Por seguridad añadimos una pequeña espera extra para asegurar el renderizado
        const enlacesProductos = page.locator('.hrefch');
        await expect(enlacesProductos.first()).toBeVisible();

        // WHEN: El usuario selecciona un teléfono completamente al azar de la lista
        // 5. Ahora sí, contamos con total seguridad de que SOLO hay teléfonos en pantalla
        const cantidad = await enlacesProductos.count();
        const aleatorio = Math.floor(Math.random() * cantidad);

        const enlaceElegido = enlacesProductos.nth(aleatorio);
        const nombreProducto = await enlaceElegido.textContent() ?? '' ;
        const nombreLimpio = nombreProducto.trim();
        console.log('Teléfono seleccionado al azar: ', nombreProducto);

        await enlaceElegido.click();

        // THEN: Se valida que la página de detalle muestra el nombre correcto del teléfono elegido
        //2. Asert sobre el articulo seleccionado
        const nombreSeleccionado = page.locator('.name');
        await expect(nombreSeleccionado).toHaveText(nombreLimpio);

        // WHEN: El usuario hace clic en "Add to cart" para añadir el teléfono a su cesta
        //3-4. Click en añadir a la cesta y Cerrar alerta
        //esperamos al evento dialog
        const dialogPromise = page.waitForEvent('dialog');

        await page.getByRole('link', {name: 'Add to cart'}).click()
        const dialog = await dialogPromise;

        // THEN: Se verifica que la alerta nativa del navegador confirma el guardado correcto
        expect(dialog.message()).toBe('Product added');
        await dialog.accept();

        // WHEN: El usuario navega a la sección de la Cesta (Cart)
        //5. Ir a la cesta
        const cesta = page.getByRole('link',{name: 'Cart', exact: true}) 
        await expect(cesta).toBeVisible();
        await cesta.click();

        // THEN: Se comprueba que la URL ha cambiado a la sección de la cesta de la compra
        await expect(page).toHaveURL(/cart\.html/);

        // WHEN: El usuario inicia la tramitación haciendo clic en "Place Order"
        //6. Click en realizar pedido
        await page.getByRole('button',{name: 'Place Order'}).click();

        // AND: Rellena todos los campos requeridos en el formulario de compra
        //7. Rellenar pedido name-country-city-credit card-month-year
        await page.locator('#name').fill('Uve');
        await page.locator('#country').fill('Spain');
        await page.locator('#city').fill('Manresa');
        await page.locator('#card').fill('084885');
        await page.locator('#month').fill('August');
        await page.locator('#year').fill('2026');

        // AND: Confirma la transacción haciendo clic en el botón de Comprar (Purchase)
        //8. Click en comprar
        await page.getByRole('button', { name: 'Purchase' }).click();
        
        // THEN: Se realiza la aserción final verificando el mensaje de éxito "Thank you for your purchase!"
        //9. Hacer assert sobre la compra realizada
        const mensaje = page.getByRole('heading',{name: 'Thank you for your purchase!'});
        await expect(mensaje).toBeVisible();

        // WHEN: El usuario cierra el flujo haciendo clic en el botón OK del modal final
        await page.getByRole('button', {name: 'OK'}).click();
    });

});