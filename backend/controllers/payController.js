import dotenv from "dotenv";
import Stripe from "stripe";

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_KEY);

export const sendInvoice = async (name, email) => {
  try {
    // const { email } = req.body;

    const product = await stripe.products.create({
      name: "Entry Fee",
    });

    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: 100,
      currency: "usd",
    });

    let customer = await stripe.customers.list({
      email: email,
      limit: 1
    })
    customer = customer.data.length == 0 ? await stripe.customers.create({
      name,
      email,
    }) : customer.data[0]

    // const customer = await stripe.customers.create({
    //   name: "Vignesh Sreedhar",
    //   email: "vigneshsreedhar2002@gmail.com",
    // });

    const invoice = await stripe.invoices.create({
      customer: customer.id,
      collection_method: "send_invoice",
      days_until_due: 30,
    });

    const invoiceItem = await stripe.invoiceItems.create({
      customer: customer.id,
      price: price.id,
      invoice: invoice.id,
    });

    const finalizedInvoice = await stripe.invoices.finalizeInvoice(invoice.id);

    // send the invoice
    const sentInvoice = await stripe.invoices.sendInvoice(finalizedInvoice.id);

    // res.status(200).json({ message: "Invoice sent successfully." });
  } catch (error) {
    console.error("Error sending invoice:", error);
    // res.status(500).json({ error: "Failed to send invoice." });
  }
};
