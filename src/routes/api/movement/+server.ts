import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import {db} from '$lib/firebase'
import { writeBatch, collection, doc, type CollectionReference } from 'firebase/firestore';

export const POST: RequestHandler = async ({ request }) => {
	try {
        
		const rawPayload = await request.json();
        
		const batch = writeBatch(db);
        const movements: CollectionReference = collection(db, 'movements');
        const docRef = doc(movements);
        // const docRef = doc(collection(db, 'movements'));
    
        batch.set(docRef, rawPayload)
		await batch.commit();
		return json({ message: 'Movements added' });
	} catch (error) {
		console.error(error);
		return json({ error: 'Failed to add movements' }, { status: 500 });
	}
};