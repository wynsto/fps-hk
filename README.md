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

# Table 4.2A & 4.2B: Merchant Account Information

| ID    | Name                          | Length        | Presence | Remarks                                                                 |
|-------|-------------------------------|---------------|----------|-------------------------------------------------------------------------|
| 02–03 | Reserved for Visa             | Var. up to 99 | M (Mandatory) | One or more data objects (IDs 02–51) must be included                  |
| 04–05 | Reserved for Mastercard       | Var. up to 99 | M (Mandatory) | Reserved for Mastercard use                                             |
| 06–08 | Reserved by EMVCo             | Var. up to 99 | M (Mandatory) | Reserved by EMVCo                                                       |
| 09–10 | Reserved for Discover         | Var. up to 99 | M (Mandatory) | Reserved for Discover use                                               |
| 11–12 | Reserved for Amex             | Var. up to 99 | M (Mandatory) | Reserved for American Express use                                       |
| 13–14 | Reserved for JCB              | Var. up to 99 | M (Mandatory) | Reserved for JCB use                                                    |
| 15–16 | Reserved for UnionPay         | Var. up to 99 | M (Mandatory) | Reserved for UnionPay use                                               |
| 17–25 | Reserved by EMVCo             | Var. up to 99 | M (Mandatory) | Reserved by EMVCo                                                       |
| 26    | Reserved for FPS (Hong Kong)  | Var. up to 99 | M (Mandatory) | Reserved for the Faster Payment System in Hong Kong                     |
| 27–31 | Reserved by WG (Hong Kong)    | —             | —        | Reserved for future use in Hong Kong                                    |
| 32–51 | Reserved for Payment Operators| —             | —        | Dynamically used by payment operators in Hong Kong                      |



# Table 4.2B: Data Object ID Allocation in Merchant Account Information Template (IDs "26" to "51")

| ID    | Name                          | Format | Length        | Presence | Remarks                                                                 |
|-------|-------------------------------|--------|---------------|----------|-------------------------------------------------------------------------|
| 00    | Globally Unique Identifier    | ans    | Var. up to 32 | M (Mandatory) | Identifies the payment operator using this template. Value can be:      |
|       |                               |        |               |          | • Application Identifier (AID)                                          |
|       |                               |        |               |          | • UUID without hyphen (-) separators                                    |
|       |                               |        |               |          | • Reverse domain name                                                   |
| 27–31 | Reserved by WG (Hong Kong)    | —      | —             | —        | Reserved for future use in Hong Kong                                    |
| 32–51 | Reserved for Payment Operators| —      | —             | —        | Dynamically used by payment operators in Hong Kong                      |
| 01–99 | Payment Network Specific      | S      | Optional      | O (Optional) | Additional data objects defining Merchant Account Information specific to the operator |


# Table 4.3A: Additional Merchant Information

| ID  | Name                                | Format | Length        | Presence | Remarks                                                                 |
|-----|-------------------------------------|--------|---------------|----------|-------------------------------------------------------------------------|
| 52  | Merchant Category Code              | N      | 04            | M (Mandatory) | Put a dummy code “0000” if the payment operator does not use this info |
| 58  | Country Code                        | ans    | 02            | M (Mandatory) | ISO country code                                                        |
| 59  | Merchant Name                       | ans    | Var. up to 25 | M (Mandatory) | Merchant’s registered name                                              |
| 60  | Merchant City                       | ans    | Var. up to 15 | M (Mandatory) | Merchant’s city                                                         |
| 61  | Postal Code                         | ans    | Var. up to 10 | O (Optional)  | Merchant’s postal/ZIP code                                              |
| 64  | Merchant Information – Language Template | S | Var. up to 99 | O (Optional)  | Template with other primitive data objects (see EMV QRCPS for details)  |


# Table 4.3B: Data Fields for Merchant Information – Language Template (ID “64”)

| ID   | Name                                | Format | Length        | Presence | Remarks                                |
|------|-------------------------------------|--------|---------------|----------|----------------------------------------|
| 00   | Language Preference                 | ans    | 02            | M (Mandatory) | Indicates language code preference      |
| 01   | Merchant Name — Alternate Language  | S      | Var. up to 25 | M (Mandatory) | Merchant name in alternate language     |
| 02   | Merchant City — Alternate Language  | S      | Var. up to 15 | O (Optional)  | Merchant city in alternate language     |
| 03–99 | RFU for EMVCo                      | S      | Var. up to 99 | —            | Data objects reserved for EMVCo         |



# Table 4.4: Transaction Value

| ID  | Name                          | Format | Length       | Presence | Remarks                                                                 |
|-----|-------------------------------|--------|--------------|----------|-------------------------------------------------------------------------|
| 53  | Transaction Currency          | N      | 03           | M (Mandatory) | Numeric code based on ISO 4217, e.g. “344” for HKD                      |
| 54  | Transaction Amount            | ans    | Var. up to 13| C (Conditional) | Amount of the transaction                                               |
| 55  | Tip or Convenience Indicator  | N      | 02           | O (Optional)   | Indicates tip or convenience fee type                                   |
| 56  | Value of Convenience Fee Fixed| ans    | Var. up to 13| C (Conditional) | Fixed convenience fee value                                             |
| 57  | Value of Convenience Fee %    | ans    | Var. up to 05| C (Conditional) | Percentage-based convenience fee value                                  |


# Table 4.5: Additional Data
ID SubID
Name Format Length Presence
“62”

| ID   | Field Name                        | Format / Length         | Mandatory / Optional | Notes                                      |
|------|-----------------------------------|-------------------------|----------------------|--------------------------------------------|
| 01   | Bill Number                       | ans, variable up to 25  | O (Optional)         | Identifies a bill or invoice                |
| 02   | Mobile Number                     | ans, variable up to 25  | O (Optional)         | Payee’s mobile number linked to FPS         |
| 03   | Store Label                       | ans, variable up to 25  | O (Optional)         | Identifies a store or merchant location     |
| 04   | Loyalty Number                    | ans, variable up to 25  | O (Optional)         | Used for loyalty program identifiers        |
| 05   | Reference Label                   | ans, variable up to 25  | O (Optional)         | Merchant or transaction reference           |
| 06   | Customer Label                    | ans, variable up to 25  | O (Optional)         | Customer-specific identifier                |
| 07   | Terminal Label                    | ans, variable up to 25  | O (Optional)         | Identifies the payment terminal             |
| 08   | Purpose of Transaction            | ans, variable up to 25  | O (Optional)         | Describes reason for payment                |
| 09   | Additional Consumer Data Request  | ans, variable up to 25  | O (Optional)         | Requests extra consumer info                |
| 10–49 | Reserved for EMVCo               | S (Structured)          | O (Optional)         | Reserved fields for EMVCo standard use      |
| 50   | Reserved for FPS                  | S (Structured)          | O (Optional)         | Hong Kong FPS-specific reserved field       |
| 51–55 | Reserved for WG                  | S (Structured)          | O (Optional)         | Working Group reserved fields               |
| 56   | Reserved for Hong Kong            | S (Structured)          | O (Optional)         | Dynamically used by HK payment operators    |
| 99   | Payment System Operators (HK)     | S (Structured)          | O (Optional)         | Reserved for Hong Kong payment system ops   |
