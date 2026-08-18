// @ts-check
const { test, expect} = require('@playwright/test');

test.describe('Ejercicio 2: Añadir a la cesta', ()=>{

    test('Comprueba que los elementos de la categoria portatiles funcionen correctamente', async ({ page })=>{
        
        // GIVEN: El usuario navega a la página de inicio de Demoblaze
        await page.goto('https://www.demoblaze.com/');
        
        //1. Validar enlace a portatiles
        const linkPortatiles = page.getByRole('link', { name: 'Laptops'});
        await expect(linkPortatiles).toBeVisible();
        
        // WHEN: El usuario hace clic en la sección de Portátiles (Laptops)
        await linkPortatiles.click();

        // AND: Selecciona el artículo "Sony vaio i7" para ver su detalle
        //2. Validar seleccionar un articulo
        const articulo = page.getByRole('link', {name: 'Sony vaio i7'});
        await expect(articulo).toBeVisible();
        //click en articulo
        await articulo.click();

        // WHEN: Hace clic en añadir el producto a la cesta
        //3. Validar añadir un articulo
        //esperamos al evento dialog
        const dialogPromise = page.waitForEvent('dialog');
        //añadir producto
        await page.getByRole('link', {name: 'Add to cart'}).click();
        
        // THEN: Se valida que emerge una alerta del navegador con el texto de confirmación
        //escuchar evento dialog
        const dialog = await dialogPromise;
        expect( dialog.message()).toBe('Product added');
        
        // WHEN: El usuario cierra la alerta aceptándola
        //4. Cerrar alerta
        await dialog.accept();

        // AND: Navega hacia la sección de la Cesta (Cart)
        //5. Validar enlace a la Cesta y verificar el cambio de url correcto
        const cesta = page.getByRole('link', {name: 'Cart', exact: true});
        await expect(cesta).toBeVisible();
        await cesta.click();

        // THEN: Se verifica que la dirección URL cambia correctamente a la página del carrito
        await expect(page).toHaveURL(/cart\.html/);

        // AND: Se comprueba que el portátil seleccionado está físicamente visible en la cesta
        //6. Validar borrado de articulo
        const productoBorrar = page.getByText('Sony vaio i7')
        //comprobar que el producto esta en la cesta
        await expect(productoBorrar).toBeVisible();

        // WHEN: El usuario hace clic en el enlace para eliminar el artículo
        const borrado = page.getByRole('link', {name: 'Delete'});
        
        await borrado.click();

        // THEN: Se realiza la aserción final confirmando que el producto ha desaparecido de la pantalla
        //7. Assert sobre el producto borrado
        // toBeHidden espera de forma asíncrona a que el elemento desaparezca del DOM
        await expect(productoBorrar).toBeHidden();

    });
});