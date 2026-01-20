  'use server';
   import { z } from 'zod';
   import { sendTelegram } from '@/lib/telegram';
   
   const schema = z.object({
     name: z.string().min(2),
     phone: z.string().regex(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/),
   });
   
   export async function submitRequest(formData: FormData) {
     const result = schema.safeParse({
       name: formData.get('name'),
       phone: formData.get('phone'),
     });
     
     if (!result.success) throw new Error('Invalid input');
     
     await sendTelegram(result.data);
   }