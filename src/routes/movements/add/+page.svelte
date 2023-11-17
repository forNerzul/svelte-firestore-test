<script lang=ts>
    import { addMovement } from '$lib/services/apiServices'
    import type { Movement } from '$lib/types/movement'
    const handleSubmit = async (event: SubmitEvent) => {
        try {
            const form = event.target as HTMLFormElement;
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries()) as Partial<Movement>;
            let movement: Movement;
            if (!data.tipo || !data.concepto || !data.monto){
                alert("Faltan datos requeridos");
                throw new Error("Faltan datos requeridos")
            } else {
                movement = {
                    tipo: data.tipo,
                    concepto: data.concepto,
                    monto: Number(data.monto)
                }
                await addMovement(movement);
                form.reset();
                alert("Movimiento cargado con exito")
            }
            

        } catch (error) {
            console.log(error);
        }

    }
</script>

<div class="container mx-auto max-w-5xl">
    <h1 class="text-3xl font-bold bg-lime-200 p-4">Cargar Movimiento</h1>
    <form on:submit|preventDefault={handleSubmit} class="flex flex-col gap-4 p-4 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="tipo">Tipo</label>
        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" id="tipo" name="tipo" >
        <label class="block text-gray-700 text-sm font-bold mb-2" for="concepto">Concepto</label>
        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" id="concepto" name="concepto">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="monto">Monto</label>
        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" id="monto" name="monto">
        <button class="bg-lime-500 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Cargar</button>
    </form>
</div>