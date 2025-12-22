'use server'

import { adminAuth } from '@/lib/firebase/admin';
import { cookies } from 'next/headers';

export async function getUsernameAction() {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session')?.value;

    if (!sessionCookie) {
        return null;
    };

    try {
        const decodedClaims = await adminAuth.verifySessionCookie(
            sessionCookie,
            true
        );
        return decodedClaims.name || null;
    }
    catch (error) {
        console.error('Error retrieving user information:', error);
        return null;
    }
}
