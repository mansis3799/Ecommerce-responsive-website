var braintree = require("braintree");

var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: "sd89g7wp24wmpwmb",
    publicKey: "c4ykdxbfwxzc5fzt",
    privateKey: "cfcd372a3a77a2fd114f0bce823cff97"
  });

exports.getToken = (req,res) =>{
      gateway.clientToken.generate({ }).then((response)=>{
        console.log("Token generate");
        res.status(200).send(response);
      }).catch(err =>res.status(500).send(err))
   }

exports.processPayment = (req,res) =>{
    let nonceFromTheClient = req.body.paymentMethodNonce;
    let amountFromTheClient = req.body.amount
    gateway.transaction.sale({
        amount: amountFromTheClient,   
        paymentMethodNonce: nonceFromTheClient,
        options: {
          submitForSettlement: true
        }
      }).then((response)=>{
        console.log("All is good!",response);
        res.status(200).send(response);
      }).catch(err =>res.status(500).send(err))
}