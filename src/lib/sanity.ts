import { createClient } from 'next-sanity';

export const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: 'production',
    apiVersion: '2026-06-23',
    useCdn: false, // Отключи CDN, чтобы изменения были видны сразу
});