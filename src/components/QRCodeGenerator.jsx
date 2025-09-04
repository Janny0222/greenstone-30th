import React from 'react';
import { QRCodeCanvas} from 'qrcode.react';


export const QRCodeGenerator = ({ data }) => {
 
    return (
      <div>
        <QRCodeCanvas value={data} />
      </div>
    );
  };