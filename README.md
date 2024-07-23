
## node-hk-fps
A Nodejs module that help to generate QR code content string of the Hong Kong Faster Payment System. Please refer the [blog](https://medium.com/@ryanchanplc/understanding-the-qr-code-used-in-hong-kong-faster-payment-system-6cc1671405d2)


**NOTE: this package only support FPS ID (MerchantID), it doesnt support mobile number / email as recipient identifier. The mobile number is just a field in Additional Data in CommonQR Code Specification.**



## Installation

Install with npm
```  
npm install fps-hk
```
and in your code
```javascript
var  fps = require('fps-hk')
```

## Usage

```javascript
//import module
// fps.setMerchantID("0000001"); Proxy ID only works on mobile phone number or email address
fps.setMerchantMobileNumber("+852-12345678"); 
fps.setBankCode("004");
// fps.setMerchantEmail("test@gmail.com");
fps.setBillNumber("0002");
fps.setStoreLabel("0003");
fps.setLoyaltyNumber("0004");
fps.setCustomerLabel("0005");
fps.setTerminalLabel("0006");
fps.setPurposeOfTransaction("0007");
fps.setMobileNumber("12345678");
fps.setTransactionAmount("5000");
fps.setReferenceLabel("ABCD");
var string = fps.generate();
var code = qrimage.image(string, { type: 'png' });
res.setHeader('Content-type', 'image/png');  //sent qr image to client side
code.pipe(res);

//generate qr content string
var  qrContent = fps.generate();
```

## Example
```
cd ./example
npm install
node index.js
```
visit `http://localhost:8080`

## License
[MIT](https://github.com/ryanchanplc/node-fps-hk/blob/master/LICENSE)

## Useful Links
Please find the specification of the QR Code used in FPS at:
[https://fps.hkicl.com.hk/eng/fps/merchants/qr_code.php](https://fps.hkicl.com.hk/eng/fps/merchants/qr_code.php)

The QR Code content string used in FPS contains the **CRC16 CCITT** check sum.
Please find more details at: [http://www.sunshine2k.de/articles/coding/crc/understanding_crc.html](http://www.sunshine2k.de/articles/coding/crc/understanding_crc.html)
