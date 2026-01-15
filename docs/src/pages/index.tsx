import React, {useEffect, useState, useRef} from "react"

import fps from 'fps-hk'

import QRCodeStyling  from "qr-code-styling";

const pageStyles = {
  color: "#232129",
  padding: 96,
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
}
const paragraphStyles = {
  marginBottom: 48,
}
const listStyles = {
  marginBottom: 96,
  paddingLeft: 0,
}
const listItemStyles = {
  fontWeight: 300,
  fontSize: 24,
  maxWidth: 560,
  marginBottom: 30,
}

const linkStyle = {
  color: "#8954A8",
  fontWeight: "bold",
  fontSize: 16,
  verticalAlign: "5%",
}

const docLinkStyle = {
  ...linkStyle,
  listStyleType: "none",
  marginBottom: 24,
}

const descriptionStyle = {
  color: "#232129",
  fontSize: 14,
  marginTop: 10,
  marginBottom: 0,
  lineHeight: 1.25,
}

const docLink = {
  text: "Github",
  url: "https://github.com/wynsto/fps-hk",
  color: "#8954A8",
}

const links = [
  {
    text: "Npm",
    url: "https://www.npmjs.com/package/fps-hk",
    description:
      "fps-hk Npm",
    color: "#E95800",
  }
]

const IndexPage = () => {
  const [url, setUrl] = useState("https://wynsto.github.io/fps-hk/");
  const [fileExt, setFileExt] = useState("png");
  const [currency, setCurrency] = useState("344");
  const [amount, setAmount] = useState(0);
  const [countryCode, setCountryCode] = useState('+852');
  const [proxyId, setProxyId] = useState('');
  const [bankCode, setBankCode] = useState('');
  const [proxyType, setProxyType] = useState('Number');
  const [billRefNo, setBillRefNo] = useState('');

  const ref = useRef<HTMLDivElement>(null);
  const qrCodeRef = useRef<any>(null);

    

  useEffect(() => {
    // Only create once
    if (!qrCodeRef.current) {
      qrCodeRef.current = new QRCodeStyling({
        width: 300,
        height: 300
      });
      qrCodeRef.current.append(ref.current);
    }
  }, []);

  useEffect(() => {
    fps.reset()
    fps.setTransactionCurrency(currency)
    switch (proxyType) {
      case 'Number':
        const mobileNumber = `${countryCode}-${proxyId}`
        console.log(mobileNumber)
        fps.setMerchantMobileNumber(mobileNumber);
        break;
      case 'Email':
        fps.setMerchantEmail(proxyId);
        break;
      case 'FPSID':
        fps.setMerchantID(proxyId);
        break;
    }
    // fps.setMerchantID("0000001"); // FPS ID
    // fps.setMerchantMobileNumber("+852-12345678"); 
    // fps.setBankCode("004"); // only works when using mobile number and email for addressing, for default bank leave this field black
    // // fps.setMerchantEmail("test@gmail.com");
    // // fps.setBillNumber("0002");
    // // fps.setStoreLabel("0003");
    // // fps.setLoyaltyNumber("0004");
    // // fps.setCustomerLabel("0005");
    // // fps.setTerminalLabel("0006");
    // // fps.setPurposeOfTransaction("0007");
    // // fps.setMobileNumber("12345678");
    if (bankCode) {
      fps.setBankCode(bankCode);
    }
    if (amount) {
      fps.setTransactionAmount(amount);
    }
    if (billRefNo) {
      fps.setBillNumber(billRefNo)
    }
    
    // fps.setTransactionCurrency(currency);
    // fps.setReferenceLabel("ABCD");
    const string = fps.generate();
    console.log(string);
    if (qrCodeRef.current) {
      qrCodeRef.current.update({
        data: string
      });
    }
  }, [url, amount, countryCode, bankCode, billRefNo, proxyId, proxyType, currency]);

  const onUrlChange = (event: { preventDefault: () => void; target: { value: React.SetStateAction<string>; }; }) => {
    event.preventDefault();
    setUrl(event.target.value);
  };

  const onProxyIdChange = (event: { preventDefault: () => void; target: { value: React.SetStateAction<string>; }; }) => {
    event.preventDefault();
    setProxyId(event.target.value);
  };

  const onProxyIdTypeChange= (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setProxyType(event.target.value);
  };

  const onAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(event.target.value));
  };

  const onCountryCodeChange= (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setCountryCode(event.target.value);
  };

  const onBankCodeChange= (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setBankCode(event.target.value);
  };

  const onBillRefNoChange= (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setBillRefNo(event.target.value);
  };


  const onCurrencyChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setCurrency(event.target.value);
  };


  const onExtensionChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setFileExt(event.target.value);
  };

  const onDownloadClick = () => {
    if (qrCodeRef.current) {
      qrCodeRef.current.download({
        extension: fileExt
      });
    }
  };
  
  return (
    <main style={pageStyles}>
      <h1 className="text-2xl font-bold m-2">
        轉數快（FPS）二維碼在線生成器Faster Payment System(FPS) QR Code Generator 
      </h1>
      <p style={paragraphStyles}>
        
      </p>
      <div>
        金額 Amount: <input placeholder="Amount" value={amount} onChange={onAmountChange} />
      </div>
      <div>
        <select onChange={onCurrencyChange} value={currency}>
          <option value="344">HKD</option>
          <option value="156">CNY</option>
        </select>
      </div>
     
      <select onChange={onProxyIdTypeChange} value={proxyType}>
        <option value="Number">手機號碼 Mobile Number</option>
        <option value="Email">郵箱 Email</option>
        <option value="FPSID">轉數快號碼 FPS ID</option>
      </select>
      <div>
      {
        proxyType === 'Number' &&
        <select className="inline-block" onChange={onCountryCodeChange} value={countryCode}>
          <option value="+852">+852</option>
          <option value="+86">+86</option>
        </select>
      }
        <input className="inline-block" placeholder={"Please input " + proxyType} value={proxyId} onChange={onProxyIdChange} />
      </div>

      {
        (proxyType === 'Number' || proxyType === 'Email') &&
        <div>
          
          <p>如果採用登記的默認銀行收款請留空 </p>
          <p>Leave bank code blank if you want to receive money through default registered bank</p>
          <input placeholder="銀行編號 Bank Code" value={bankCode} onChange={onBankCodeChange} />
        </div>
      }
      <div>
        <input className="inline-block" placeholder={"帳單編號 Bill No"} value={billRefNo} onChange={onBillRefNoChange} />
      </div>
      <div>
        <p>二維碼 </p>
        <select onChange={onExtensionChange} value={fileExt}>
          <option value="png">PNG</option>
          <option value="jpeg">JPEG</option>
          <option value="webp">WEBP</option>
        </select>
        <button onClick={onDownloadClick}>下載二維碼 Download</button>
      </div>
      <div ref={ref} />
      <ul style={listStyles}>
        <li style={docLinkStyle}>
          <a
            style={linkStyle}
            href={`${docLink.url}?utm_source=starter&utm_medium=start-page&utm_campaign=minimal-starter`}
          >
            {docLink.text}
          </a>
        </li>
        {links.map(link => (
          <li key={link.url} style={{ ...listItemStyles, color: link.color }}>
            <span>
              <a
                style={linkStyle}
                href={`${link.url}?utm_source=starter&utm_medium=start-page&utm_campaign=minimal-starter`}
              >
                {link.text}
              </a>
              <p style={descriptionStyle}>{link.description}</p>
            </span>
          </li>
        ))}
      </ul>
    </main>
  )
}

export default IndexPage

export const Head = () => <title>轉數快二維碼在線生成器 Faster Payment System(FPS) QR Code Generator </title>
