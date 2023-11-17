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
    <h1>Cargar Movimiento</h1>
    <form on:submit|preventDefault={handleSubmit}>
    <label for="tipo">Tipo</label>
    <input type="text" id="tipo" name="tipo" >
    <label for="concepto">Concepto</label>
    <input type="text" id="concepto" name="concepto">
    <label for="monto">Monto</label>
    <input type="number" id="monto" name="monto">
    <button type="submit">Cargar</button>
    </form>
</div>