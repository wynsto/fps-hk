import React, {useEffect, useState, useRef} from "react"

import fps from 'fps-hk'

import QRCodeStyling from "qr-code-styling";
 
const qrCode = new QRCodeStyling({
  width: 300,
  height: 300,
  // image:
  //   "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
  // dotsOptions: {
  //   color: "#4267b2",
  //   type: "rounded"
  // },
  // imageOptions: {
  //   crossOrigin: "anonymous",
  //   margin: 20
  // }
});


const pageStyles = {
  color: "#232129",
  padding: 96,
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
}
const headingStyles = {
  marginTop: 0,
  marginBottom: 64,
  maxWidth: 320,
}
const headingAccentStyles = {
  color: "#663399",
}
const paragraphStyles = {
  marginBottom: 48,
}
const codeStyles = {
  color: "#8A6534",
  padding: 4,
  backgroundColor: "#FFF4DB",
  fontSize: "1.25rem",
  borderRadius: 4,
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

const badgeStyle = {
  color: "#fff",
  backgroundColor: "#088413",
  border: "1px solid #088413",
  fontSize: 11,
  fontWeight: "bold",
  letterSpacing: 1,
  borderRadius: 4,
  padding: "4px 6px",
  display: "inline-block",
  position: "relative",
  top: -2,
  marginLeft: 10,
  lineHeight: 1,
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
  const ref = useRef(null);

  useEffect(() => {
    qrCode.append(ref.current);
  }, []);

  useEffect(() => {
    fps.reset()
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
    if (amount) {
      fps.setTransactionAmount(amount);
    }
    // fps.setTransactionCurrency(currency);
    // fps.setReferenceLabel("ABCD");
    const string = fps.generate();
    console.log(string);
    qrCode.update({
      data: string
    });
  }, [url, amount, countryCode, proxyId, proxyType, currency]);

  const onUrlChange = (event) => {
    event.preventDefault();
    setUrl(event.target.value);
  };

  const onProxyIdChange = (event) => {
    event.preventDefault();
    setProxyId(event.target.value);
  };

  const onProxyIdTypeChange= (event) => {
    setProxyType(event.target.value);
  };

  const onAmountChange= (event) => {
    event.preventDefault();
    setAmount(event.target.value);
  };

  const onCountryCodeChange= (event) => {
    setCountryCode(event.target.value);
  };

  const onBankCodeChange= (event) => {
    setBankCode(event.target.value);
  };


  const onCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };


  const onExtensionChange = (event) => {
    setFileExt(event.target.value);
  };

  const onDownloadClick = () => {
    qrCode.download({
      extension: fileExt
    });
  };
  
  return (
    <main style={pageStyles}>
      <h1 style={headingStyles}>
        轉數快（FPS）二維碼在線生成器Faster Payment System(FPS) QR Code Generator 
      </h1>
      <p style={paragraphStyles}>
        
      </p>
      <div>
        金額 Amount: <input placeholder="Amount" value={amount} onChange={onAmountChange} />
      </div>
     
      <select onChange={onProxyIdTypeChange} value={proxyType}>
        <option value="Number">手機號碼 Mobile Number</option>
        <option value="Email">郵箱 Email</option>
        <option value="FPSID">轉數快號碼 FPS ID</option>
      </select>
      <div>
      {
        proxyType === 'Number' &&
        <select onChange={onCountryCodeChange} value={countryCode}>
          <option value="+852">+852</option>
          <option value="+86">+86</option>
        </select>
      }
        <input placeholder={"Please input " + proxyType} value={proxyId} onChange={onProxyIdChange} />
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
      <select onChange={onCurrencyChange} value={currency}>
        <option value="344">HKD</option>
        <option value="156">CNY</option>
      </select>

      </div>


      <select onChange={onExtensionChange} value={fileExt}>
        <option value="png">PNG</option>
        <option value="jpeg">JPEG</option>
        <option value="webp">WEBP</option>
      </select>
      <button onClick={onDownloadClick}>Download</button>

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
              {link.badge && (
                <span style={badgeStyle} aria-label="New Badge">
                  NEW!
                </span>
              )}
              <p style={descriptionStyle}>{link.description}</p>
            </span>
          </li>
        ))}
      </ul>
      <img
        alt="Gatsby G Logo"
        src="data:image/svg+xml,%3Csvg width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 2a10 10 0 110 20 10 10 0 010-20zm0 2c-3.73 0-6.86 2.55-7.75 6L14 19.75c3.45-.89 6-4.02 6-7.75h-5.25v1.5h3.45a6.37 6.37 0 01-3.89 4.44L6.06 9.69C7 7.31 9.3 5.63 12 5.63c2.13 0 4 1.04 5.18 2.65l1.23-1.06A7.959 7.959 0 0012 4zm-8 8a8 8 0 008 8c.04 0 .09 0-8-8z' fill='%23639'/%3E%3C/svg%3E"
      />
    </main>
  )
}

export default IndexPage

export const Head = () => <title>轉數快二維碼在線生成器 Faster Payment System(FPS) QR Code Generator </title>
