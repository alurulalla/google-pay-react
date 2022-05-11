import GooglePayButton from '@google-pay/button-react';

const orderDetails = {
    type: 'sale',
    amount: 7900,
    tax_amount: 4,
    shipping_amount: 5,
    currency: 'USD',
    description: 'test transaction',
    order_id: '876542345',
    po_number: '7641937642',
    ip_address: '4.2.2.2',
    email_receipt: false,
    email_address: 'test@test.com'
}

const GooglePay = ({ shippingDetails, onSuccessPay }) =>
{
    return (
        <div className='App'>
            <GooglePayButton
                environment='TEST'
                paymentRequest={{
                    apiVersion: 2,
                    apiVersionMinor: 0,
                    allowedPaymentMethods: [
                        {
                            type: 'CARD',
                            parameters: {
                                allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                                allowedCardNetworks: ['MASTERCARD'],
                            },
                            tokenizationSpecification: {
                                type: 'PAYMENT_GATEWAY',
                                parameters: {
                                    gateway: 'fluidpay',
                                    gatewayMerchantId: 'pub_28zM072VFc3ZZfyzAziIbMxJv3J',
                                },
                            },
                        },
                    ],
                    merchantInfo: {
                        merchantId: 'rc9qq0es6l8t9c9qq0es6ln12efj0',
                        merchantName: 'Demo Merchant',
                    },
                    transactionInfo: {
                        totalPriceStatus: 'FINAL',
                        totalPriceLabel: 'Total',
                        totalPrice: orderDetails.amount.toString(),
                        currencyCode: orderDetails.currency,
                        countryCode: 'US',
                    },
                }}
                onLoadPaymentData={(paymentRequest) =>
                {
                    var myHeaders = new Headers();
                    myHeaders.append('Authorization', '28zM072VFc3ZZfyzAziIbMxJv3J');
                    myHeaders.append('Content-Type', 'application/json');
                    var body = JSON.stringify({ ...paymentRequest, shippingDetails, orderDetails });
                    const requestOptions = {
                        method: 'POST',
                        headers: myHeaders,
                        body,
                        redirect: 'follow',
                    };
                    fetch('api/transaction', requestOptions)
                        .then((result) => onSuccessPay())
                        .catch((error) => console.log('error', error));
                }}
                existingPaymentMethodRequired='false'
                buttonColor='default'
                buttonType='pay'
                buttonLocale='en'
            />
        </div>
    )
}

export default GooglePay;