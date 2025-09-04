import React, { useState } from 'react';
import { QRCodeCanvas} from 'qrcode.react';


export const QRCodeGenerator = ({ data }) => {
  const [qrData, setQrData] = useState(data);

  
    return (
      <div>
        <QRCodeCanvas value={qrData} />
      </div>
    );
  };