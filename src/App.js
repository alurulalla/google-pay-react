import GooglePayButton from "@google-pay/button-react";

function App() {
  return (
    <div className="App">
      <GooglePayButton
        environment="TEST"
        paymentRequest={{
          apiVersion: 2,
          apiVersionMinor: 0,
          allowedPaymentMethods: [
            {
              type: "CARD",
              parameters: {
                allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                allowedCardNetworks: ["MASTERCARD"],
              },
              tokenizationSpecification: {
                type: "PAYMENT_GATEWAY",
                parameters: {
                  gateway: "fluidpay",
                  gatewayMerchantId: "api_28w0Fn8jNJHoTBv8cVpA4NgO074",
                },
              },
            },
          ],
          merchantInfo: {
            merchantId: "c9qq0es6lr8t9n12efj0",
            merchantName: "Demo Merchant",
          },
          transactionInfo: {
            totalPriceStatus: "FINAL",
            totalPriceLabel: "Total",
            totalPrice: "1.00",
            currencyCode: "USD",
            countryCode: "US",
          },
        }}
        onLoadPaymentData={(paymentRequest) => {
          console.log("Success", paymentRequest);
          var myHeaders = new Headers();
          myHeaders.append("Authorization", "");
          myHeaders.append("Content-Type", "application/json");
          var jsonString = JSON.stringify(paymentRequest);
          const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: jsonString,
            redirect: "follow",
          };
          fetch("api/transaction", requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.log("error", error));
        }}
        existingPaymentMethodRequired="false"
        buttonColor="default"
        buttonType="pay"
        buttonLocale="en"
      />
    </div>
  );
}

export default App;
