
import React from 'react';
import { Download, Copy, Share2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from '@/hooks/use-toast';

interface QRActionButtonsProps {
  generated: boolean;
  qrValue: string;
  qrURL: string;
  subscription: string;
  imageFormat?: string;
}

/**
 * Component for QR code action buttons
 */
const QRActionButtons = ({
  generated,
  qrValue,
  qrURL,
  subscription,
  imageFormat = 'svg'
}: QRActionButtonsProps) => {
  const { toast } = useToast();
  const shouldShow = (generated || (qrValue && subscription !== 'free')) && qrURL;
  
  const downloadQRCode = () => {
    const svg = document.getElementById("qr-code-svg");
    if (!svg) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate image",
      });
      return;
    }

    // For free users, always download as PNG
    const format = subscription === 'free' ? 'png' : imageFormat;
    
    if (format === 'svg') {
      // Download as SVG
      const svgData = new XMLSerializer().serializeToString(svg);
      const svgBlob = new Blob([svgData], { type: "image/svg+xml" });
      const url = URL.createObjectURL(svgBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "qrcode.svg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } else {
      // Download as PNG or JPEG
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();
      const svgData = new XMLSerializer().serializeToString(svg);
      const svgBlob = new Blob([svgData], { type: "image/svg+xml" });
      const url = URL.createObjectURL(svgBlob);
      
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          const downloadUrl = canvas.toDataURL(`image/${format === 'jpeg' ? 'jpeg' : 'png'}`);
          const link = document.createElement("a");
          link.href = downloadUrl;
          link.download = `qrcode.${format}`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
        URL.revokeObjectURL(url);
      };
      
      img.src = url;
    }
    
    toast({
      title: "Download started",
      description: `QR code downloaded as ${format.toUpperCase()}`,
    });
  };
  
  const copyQRCodeToClipboard = () => {
    const svg = document.getElementById("qr-code-svg");
    if (!svg) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to copy QR code",
      });
      return;
    }

    const svgData = new XMLSerializer().serializeToString(svg);
    navigator.clipboard.writeText(svgData);
    
    toast({
      title: "Copied",
      description: "QR code copied to clipboard",
    });
  };
  
  const shareQRCode = async () => {
    const svg = document.getElementById("qr-code-svg");
    if (!svg) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to share QR code",
      });
      return;
    }

    try {
      // For sharing, convert to PNG for better compatibility
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();
      const svgData = new XMLSerializer().serializeToString(svg);
      const svgBlob = new Blob([svgData], { type: "image/svg+xml" });
      const url = URL.createObjectURL(svgBlob);
      
      img.onload = async () => {
        canvas.width = img.width;
        canvas.height = img.height;
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          canvas.toBlob(async (blob) => {
            if (blob) {
              const file = new File([blob], "qrcode.png", { type: "image/png" });
              if (navigator.share) {
                try {
                  await navigator.share({
                    files: [file],
                    title: "QR Code",
                    text: "Check out my QR code!"
                  });
                  toast({
                    title: "Shared",
                    description: "QR code shared successfully",
                  });
                } catch (err: any) {
                  if (err.name !== 'AbortError') {
                    toast({
                      variant: "destructive",
                      title: "Share failed",
                      description: err.message || "Failed to share QR code",
                    });
                  }
                }
              } else {
                toast({
                  variant: "destructive",
                  title: "Error",
                  description: "Web Share API not supported in this browser",
                });
              }
            }
          }, 'image/png');
        }
        URL.revokeObjectURL(url);
      };
      
      img.src = url;
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to share QR code",
      });
    }
  };
  
  if (!shouldShow) return null;
  
  return (
    <div className="mt-6">
      <div className="flex flex-col space-y-2">
        <Button 
          onClick={downloadQRCode} 
          variant="secondary" 
          className="w-full"
        >
          <Download className="mr-2" size={16} />
          Download QR Code
        </Button>
        <Button 
          onClick={copyQRCodeToClipboard} 
          variant="secondary" 
          className="w-full"
        >
          <Copy className="mr-2" size={16} />
          Copy QR Code
        </Button>
        <Button 
          onClick={shareQRCode} 
          variant="secondary" 
          className="w-full"
        >
          <Share2 className="mr-2" size={16} />
          Share
        </Button>
      </div>
    </div>
  );
};

export default QRActionButtons;
