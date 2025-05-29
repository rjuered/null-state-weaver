
import React, { useState } from 'react';
import { Download, Copy, Share2, Facebook, Twitter, MessageCircle, Send, Instagram, Linkedin } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);
  const shouldShow = (generated || (qrValue && subscription !== 'free')) && qrURL;
  
  // Trigger ad in new tab (not separate window)
  const triggerAd = () => {
    try {
      const adWindow = window.open('https://www.profitableratecpm.com/i05a32zv3x?key=e8aa2d7d76baecb611b49ce0d5af754f', '_blank', 'noopener,noreferrer');
      if (adWindow) {
        adWindow.focus();
      }
    } catch (error) {
      console.log('Ad trigger failed:', error);
    }
  };

  // Convert QR code to image data URL for sharing
  const getQRCodeImageDataURL = (): Promise<string> => {
    return new Promise((resolve, reject) => {
      const svg = document.getElementById("qr-code-svg");
      if (!svg) {
        reject(new Error("QR code not found"));
        return;
      }

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
          const dataURL = canvas.toDataURL('image/png');
          resolve(dataURL);
        } else {
          reject(new Error("Canvas context not available"));
        }
        URL.revokeObjectURL(url);
      };
      
      img.onerror = () => {
        reject(new Error("Failed to load QR code image"));
        URL.revokeObjectURL(url);
      };
      
      img.src = url;
    });
  };
  
  const downloadQRCode = () => {
    // Trigger ad first
    triggerAd();
    
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
    // Trigger ad first
    triggerAd();
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(qrValue).then(() => {
        toast({
          title: "Copied",
          description: "QR code content copied to clipboard",
        });
      }).catch(() => {
        // Fallback
        const textArea = document.createElement("textarea");
        textArea.value = qrValue;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        toast({
          title: "Copied",
          description: "QR code content copied to clipboard",
        });
      });
    } else {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = qrValue;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      toast({
        title: "Copied",
        description: "QR code content copied to clipboard",
      });
    }
  };

  const shareToSocialMedia = async (platform: string) => {
    // Trigger ad first
    triggerAd();
    
    const shareText = `Check out my QR code: ${qrValue}`;
    const shareUrl = encodeURIComponent(qrValue);
    const encodedText = encodeURIComponent(shareText);
    
    let url = '';
    
    switch (platform) {
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodedText}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`;
        break;
      case 'whatsapp':
        url = `https://wa.me/?text=${encodedText}`;
        break;
      case 'telegram':
        url = `https://t.me/share/url?url=${shareUrl}&text=${encodedText}`;
        break;
      case 'instagram':
        // Instagram doesn't support direct URL sharing, try to copy QR image
        try {
          const imageDataURL = await getQRCodeImageDataURL();
          // For Instagram, we'll copy the content and suggest users to post the QR image
          copyQRCodeToClipboard();
          toast({
            title: "Content Copied for Instagram",
            description: "Content copied! You can download the QR image and post it on Instagram with this text.",
          });
        } catch (error) {
          copyQRCodeToClipboard();
          toast({
            title: "Content Copied",
            description: "Content copied! Download the QR image and share on Instagram.",
          });
        }
        return;
      default:
        return;
    }
    
    if (url) {
      const shareWindow = window.open(url, '_blank', 'noopener,noreferrer');
      if (shareWindow) {
        shareWindow.focus();
      }
      toast({
        title: "Shared",
        description: `Opened ${platform} sharing`,
      });
    }
    
    setIsShareMenuOpen(false);
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
          Copy Content
        </Button>
        
        <DropdownMenu open={isShareMenuOpen} onOpenChange={setIsShareMenuOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" className="w-full">
              <Share2 className="mr-2" size={16} />
              Share
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            <DropdownMenuItem onClick={() => shareToSocialMedia('whatsapp')}>
              <MessageCircle className="mr-2" size={16} />
              WhatsApp
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => shareToSocialMedia('facebook')}>
              <Facebook className="mr-2" size={16} />
              Facebook
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => shareToSocialMedia('telegram')}>
              <Send className="mr-2" size={16} />
              Telegram
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => shareToSocialMedia('twitter')}>
              <Twitter className="mr-2" size={16} />
              Twitter (X)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => shareToSocialMedia('linkedin')}>
              <Linkedin className="mr-2" size={16} />
              LinkedIn
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => shareToSocialMedia('instagram')}>
              <Instagram className="mr-2" size={16} />
              Instagram
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default QRActionButtons;
