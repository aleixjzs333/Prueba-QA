/*En este ejercicio, navegará a una URL suministrada, Navegue a   https://www.demoblaze.com/  
1. Haga clic en Portátiles 
2. Seleccione un artículo: 
Hacer una assert del title o el articulo.
3 Haga clic en el botón Añadir a la cesta ( añade un artículo)
4 Cerrar alerta 
5 Ir a la cesta 
6 Borrar artículo 
7 Hacer una assert  sobre el borrado del artículo.
*/
// @ts-check
const { test, expect} = require('@playwright/test');

test.describe('Ejercicio 2: Añadir a la cesta', ()=>{

    test('Comprueba que los elementos de la categoria portatiles funcionen correctamente', async ({ page })=>{
        
        await page.goto('https://www.demoblaze.com/');
        
        //1. Validar enlace a portatiles
        const linkPortatiles = page.getByRole('link', { name: 'Laptops'});
        await expect(linkPortatiles).toBeVisible();
        //click en portatiles
        await linkPortatiles.click();

        //2. Validar seleccionar un articulo
        const articulo = page.getByRole('link', {name: 'Sony vaio i7'});
        await expect(articulo).toBeVisible();
        //click en articulo
        await articulo.click();

        //3. Validar añadir un articulo
        //esperamos al evento dialog
        const dialogPromise = page.waitForEvent('dialog');
        //añadir producto
        await page.getByRole('link', {name: 'Add to cart'}).click();
        //escuchar evento dialog
        const dialog = await dialogPromise;
        expect( dialog.message()).toBe('Product added');
        
        //4. Cerrar alerta
        await dialog.accept();

        //5. Validar enlace a la Cesta y verificar el cambio de url correcto
        const cesta = page.getByRole('link', {name: 'Cart', exact: true});
        
        await expect(cesta).toBeVisible();
        await cesta.click();
        await expect(page).toHaveURL(/cart\.html/);

        //6. Validar borrado de articulo
        const productoBorrar = page.getByText('Sony vaio i7')
        //comprobar que el producto esta en la cesta
        await expect(productoBorrar).toBeVisible();

        const borrado = page.getByRole('link', {name: 'Delete'});
        
        await borrado.click();
        //7. Assert sobre el producto borrado
        // toBeHidden espera de forma asíncrona a que el elemento desaparezca del DOM
        await expect(productoBorrar).toBeHidden();

    });
});