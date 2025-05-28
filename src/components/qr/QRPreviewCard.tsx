
import React from 'react';
import { QrCode } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { QRCodeSVG } from "qrcode.react";

interface QRPreviewCardProps {
  generated: boolean;
  qrValue: string;
  qrURL: string;
  subscription: string;
  dotColor: string;
  backgroundColor: string;
  logo: string | null;
  level: string;
  cornerRadius: number;
  dotSize: number;
}

/**
 * Card component for QR code preview
 */
const QRPreviewCard = ({
  generated,
  qrValue,
  qrURL,
  subscription,
  dotColor,
  backgroundColor,
  logo,
  level,
  cornerRadius,
  dotSize
}: QRPreviewCardProps) => {
  const shouldShowQR = generated && qrURL;
  
  // Calculate the size based on dot size percentage
  const calculatedSize = Math.max(200, Math.min(400, 200 + (dotSize * 2)));
  
  // Ensure error correction level is valid
  const validLevel = ['L', 'M', 'Q', 'H'].includes(level) ? level as "L" | "M" | "Q" | "H" : 'H';
  
  return (
    <Card className="shadow-sm">
      <CardContent className="p-6 flex flex-col items-center">
        <h3 className="text-lg font-bold mb-4">QR Preview</h3>
        
        {shouldShowQR ? (
          <div className="flex justify-center items-center">
            <QRCodeSVG
              id="qr-code-svg"
              value={qrURL}
              size={calculatedSize}
              bgColor={backgroundColor}
              fgColor={dotColor}
              level={validLevel}
              includeMargin={true}
              style={{ borderRadius: `${cornerRadius}px` }}
              imageSettings={logo ? {
                src: logo,
                excavate: true,
                height: Math.max(40, calculatedSize * 0.15),
                width: Math.max(40, calculatedSize * 0.15),
              } : undefined}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg h-64 w-full">
            <QrCode size={64} className="text-gray-300 mb-2" />
            <p className="text-gray-400">QR Preview</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QRPreviewCard;
