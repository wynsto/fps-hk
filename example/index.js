import fps from '../index.js';
import qrimage from 'qr-image';
import http from 'http';

http.createServer(function (req, res) {
    if (req.url == '/') {
        // fps.setMerchantID("0000001"); // FPS ID
        fps.setMerchantMobileNumber("+852-12345678"); 
        fps.setBankCode("004"); // only works when using mobile number and email for addressing, for default bank leave this field black
        // fps.setMerchantEmail("test@gmail.com");
        // fps.setBillNumber("0002");
        // fps.setStoreLabel("0003");
        // fps.setLoyaltyNumber("0004");
        // fps.setCustomerLabel("0005");
        // fps.setTerminalLabel("0006");
        // fps.setPurposeOfTransaction("0007");
        // fps.setMobileNumber("12345678");
        fps.setTransactionAmount("1");
        // fps.setReferenceLabel("ABCD");
        const string = fps.generate();
        console.log(string);
        const code = qrimage.image(string, { type: 'png' });
        res.setHeader('Content-type', 'image/png');  //sent qr image to client side
        code.pipe(res);
    }
}).listen(8080);
