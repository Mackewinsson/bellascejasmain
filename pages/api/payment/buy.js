import nodemailer from 'nodemailer';
import FlowApi from 'flowcl-node-api-client';

// TODO: .env
const configFlow = {
    "apiKey": "27FA3AD1-188B-4EC2-BDFB-3D4L743BA5FA",
    "secretKey": "a22029936dd2a9c8056b33c41503ca76557ae9a8",
    "apiURL": "https://sandbox.flow.cl/api",
    "baseURL": "https://df6b-2803-c180-2002-7e5d-e40f-1992-dfdc-404d.ngrok.io/"
}

async function createOrderPayment() {
    // TODO: step one! save data into db or firebase .... create new method.
    const optional = {
        "rut": "9999999-9",
        "otroDato": "otroDato"
    };

    const params = {
        "commerceOrder": Math.floor(Math.random() * (2000 - 1100 + 1)) + 1100,
        "subject": "Pago de prueba",
        "currency": "CLP",
        "amount": 5000,
        "email": "efuentealba@json.cl",
        "paymentMethod": 9,
        "urlConfirmation": configFlow.baseURL + "api/payment/payment-confirm",
        "urlReturn": configFlow.baseURL + "result",
        "optional": optional
    };

    const serviceName = "payment/create";

    try {
        const flowApi = new FlowApi(configFlow);
        let response = await flowApi.send(serviceName, params, "POST");
        const redirect = response.url + "?token=" + response.token;
        return { error: false, payment_link: redirect };
        } catch(error) {
        return { error: true, payment_link: null };
    }
}

export async function emailServiceSending() {

    let testAccount = await nodemailer.createTestAccount();
    
    // TODO: .env
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: "bar@example.com, baz@example.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

export default async function handler(req, res) {
    // TODO : add params from post api.
    const order = await createOrderPayment();
    if (!order.error) {
        //res.redirect(order.payment_link);
        res.status(200).json(order);
    } else {
        res.status(400).json({ paid_error: 'error generate new payment' });
    }
}