## hk-fps

This project is forked from [node-hk-fps](https://github.com/ryanchanplc/node-fps-hk)

A Nodejs module that help to generate QR code content string of the Hong Kong Faster Payment System. Please refer the [blog](https://medium.com/@ryanchanplc/understanding-the-qr-code-used-in-hong-kong-faster-payment-system-6cc1671405d2)

added support for mobile number and email address.

[FPS QR code generate page](https://wynsto.github.io/fps-hk/)

Hong Kong

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
'//import module
// fps.reset()
// fps.setMerchantID("0000001"); FPS ID 
// only works on mobile phone number or email address
fps.setMerchantMobileNumber("+852-12345678"); 
fps.setBankCode("004"); // only works on mobile phone number or email address
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
const string = fps.generate();
const code = qrimage.image(string, { type: 'png' });
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

[Faster Payment System qr code online generation](https://wynsto.github.io/fps-hk/)

https://wynsto.github.io/fps-hk/

Please find the specification of the QR Code used in FPS at:
[https://fps.hkicl.com.hk/eng/fps/merchants/qr_code.php](https://fps.hkicl.com.hk/eng/fps/merchants/qr_code.php)

The QR Code content string used in FPS contains the **CRC16 CCITT** check sum.
Please find more details at: [http://www.sunshine2k.de/articles/coding/crc/understanding_crc.html](http://www.sunshine2k.de/articles/coding/crc/understanding_crc.html)

[Hong Kong Common_QR_Code_Specification](https://www.hkma.gov.hk/media/eng/doc/key-functions/financial-infrastructure/infrastructure/retail-payment-initiatives/Common_QR_Code_Specification.pdf)
[Implementation_Guideline_on_Common_QR_Code](https://www.hkma.gov.hk/media/eng/doc/key-functions/financial-infrastructure/infrastructure/retail-payment-initiatives/Implementation_Guideline_on_Common_QR_Code.pdf)

Table 4.5: Additional Data
ID SubID
Name Format Length Presence

Remarks

“62”
“01” Bill Number ans var. up to “25” O
“02” Mobile Number ans var. up to “25” O
“03” Store Label ans var. up to “25” O
“04” Loyalty Number ans var. up to “25” O
“05” Reference Label ans var. up to “25” O
“06” Customer Label ans var. up to “25” O
“07” Terminal Label ans var. up to “25” O
“08” Purpose of
Transaction
ans var. up to “25” O
“09” Additional
Consumer Data
Request
ans var. up to “25” O
“10” –
“49”
Reserved for
EMVCo
S O
“50” Reserved for
FPS
S O
“51” –
“55”
Reserved for the
WG
S O
“56” – Reserved for
Hong Kong
S O Dynamically used by
payment operators for use in
