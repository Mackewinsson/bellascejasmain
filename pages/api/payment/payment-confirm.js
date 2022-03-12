import FlowApi from 'flowcl-node-api-client';
import { emailServiceSending } from './buy';

// TODO: .env
const configFlow = {
    "apiKey": "27FA3AD1-188B-4EC2-BDFB-3D4L743BA5FA",
    "secretKey": "a22029936dd2a9c8056b33c41503ca76557ae9a8",
    "apiURL": "https://sandbox.flow.cl/api",
    "baseURL": "https://df6b-2803-c180-2002-7e5d-e40f-1992-dfdc-404d.ngrok.io/"
}

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const params = req.body;
        let payload = {
            token: params.token
        };
    
        let serviceName = "payment/getStatus";
        const flowApi = new FlowApi(configFlow);
        let response = await flowApi.send(serviceName, payload, "GET");

        console.log('DATA CHECK PAYMENT', response);

        /* DATA CHECK PAYMENT {
            flowOrder: 881754,
            commerceOrder: '1785',
            requestDate: '2022-03-12 06:48:10',
            status: 2,
            subject: 'Pago de prueba',
            currency: 'CLP',
            amount: '5000',
            payer: 'efuentealba@json.cl',
            optional: null,
            pending_info: { media: null, date: null },
            paymentData: {
                date: '2022-03-12 06:48:47',
                media: 'Webpay',
                conversionDate: null,
                conversionRate: null,
                amount: '5000.00',
                fee: '160.00',
                balance: 4810,
                transferDate: '2022-03-14 00:00:00',
                currency: 'CLP',
                taxes: 30
            },
            merchantId: null
        } */
        
    
        if (response.status !== 2) {
            // payment fail
            console.log('Payment error');
        } else {
            // payment success: here should be update data payment status and send the email
            // Ej. updatePayment();
            emailServiceSending();
        }
        res.status(200).json(params);   
    }
}