import { db } from '@vercel/postgres';
 

const client = await db.connect();

async function listInvoices() {
    const invoices = await client.sql`
    SELECT invoices.amount, customers.name
FROM invoices
JOIN customers ON invoices.customer_id = customers.id
WHERE invoices.amount = 666;
    `;
    return invoices;
}   

export async function GET() {
    try {
      await client.sql`BEGIN`;
   const invoices =  await listInvoices();
      await client.sql`COMMIT`;
  
      return Response.json({ message: 'successfully request ', invoices });
    } catch (error) {
      await client.sql`ROLLBACK`;
      return Response.json({ error }, { status: 500 });
    }
  }
