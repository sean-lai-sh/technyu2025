import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '', // Add your project ID
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  // token: process.env.NEXT_PUBLIC_SANITY_API_TOKEN || '',
  apiVersion: '2024-01-01', // Use current date in YYYY-MM-DD format
  useCdn: true, // Set to false if you need real-time data
})
