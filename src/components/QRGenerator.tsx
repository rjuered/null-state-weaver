
import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useUser } from '@/context';
import { useToast } from '@/hooks/use-toast';
import { useLocation } from 'react-router-dom';

// Import smaller components
import QRContentCard from './qr/QRContentCard';
import QRTypeSelector from './qr/QRTypeSelector';
import QRContentInput from './qr/QRContentInput';

// Lazy load non-critical components
const QRStyleCard = lazy(() => import('./qr/QRStyleCard'));
const QRLogoCard = lazy(() => import('./qr/QRLogoCard'));
const QRPreviewCard = lazy(() => import('./qr/QRPreviewCard'));
const QRActionButtons = lazy(() => import('./qr/QRActionButtons'));

// Loading fallback component
const LoadingFallback = () => (
  <div className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
    <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
    <div className="h-24 bg-gray-100 rounded mb-4"></div>
  </div>
);

const QRGenerator = ({ type = 'url' }) => {
  const [qrType, setQrType] = useState(type);
  const [qrValue, setQrValue] = useState('');
  const [qrURL, setQrURL] = useState('');
  const [generated, setGenerated] = useState(false);
  const [dotColor, setDotColor] = useState('#8A3FFC');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [logo, setLogo] = useState<string | null>(null);
  const [dotSize, setDotSize] = useState(70);
  const [cornerRadius, setCornerRadius] = useState(0);
  const [level, setLevel] = useState('H');
  const [imageFormat, setImageFormat] = useState('svg');
  const location = useLocation();

  // Get the QR type from URL if available
  const searchParams = new URLSearchParams(location.search);
  const urlType = searchParams.get('type');
  
  useEffect(() => {
    if (urlType) {
      setQrType(urlType);
    }
  }, [urlType]);

  const { isLoggedIn, incrementQRCount, subscription, canAddLogo } = useUser();
  const { toast } = useToast();

  // Generate QR code automatically for paid plans, but not for free ones
  // Using debounce to avoid unnecessary re-renders
  useEffect(() => {
    if (!qrValue || subscription === 'free') return;
    
    const timeoutId = setTimeout(() => {
      generateQRCode();
    }, 500);
    
    return () => clearTimeout(timeoutId);
  }, [qrValue, dotColor, backgroundColor, logo, dotSize, cornerRadius, level, subscription]);

  const generateQRCode = () => {
    if (qrValue === '') {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a value to generate a QR code",
      });
      return false;
    }

    if (!isLoggedIn && !generated) {
      toast({
        title: "Notice",
        description: "Sign in to save your QR codes",
      });
    }

    // If user is logged in, increment QR count
    if (isLoggedIn && !generated) {
      const success = incrementQRCount();
      if (!success) {
        return false;
      }
    }
    
    setGenerated(true);
    setQrURL(qrValue);
    return true;
  };

  const handleManualGenerate = () => {
    generateQRCode();
  };

  const handleContentChange = (value: string) => {
    setQrValue(value);
    // Only automatic generation for paid plans
    if (subscription !== 'free') {
      setGenerated(false);
    } else {
      // For free plan, reset the generated state but don't generate automatically
      setGenerated(false);
      setQrURL('');
    }
  };

  const handleTypeChange = (type: string) => {
    setQrType(type);
    // Reset generated state and value when changing type
    setGenerated(false);
    setQrValue('');
    setQrURL('');
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <QRTypeSelector 
              qrType={qrType} 
              onSelectType={handleTypeChange}
            />

            <QRContentInput
              qrType={qrType}
              qrValue={qrValue}
              handleContentChange={handleContentChange}
            />
            
            {/* Show the manual generate button only for free plan users */}
            {subscription === 'free' && (
              <button 
                onClick={handleManualGenerate}
                className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white rounded-full py-3 px-4 flex items-center justify-center font-medium"
              >
                Generate QR Code
              </button>
            )}
          </div>
          
          <Suspense fallback={<LoadingFallback />}>
            <QRStyleCard
              dotColor={dotColor}
              backgroundColor={backgroundColor}
              dotSize={dotSize}
              cornerRadius={cornerRadius}
              level={level}
              imageFormat={imageFormat}
              setDotColor={setDotColor}
              setBackgroundColor={setBackgroundColor}
              setDotSize={setDotSize}
              setCornerRadius={setCornerRadius}
              setLevel={setLevel}
              setImageFormat={setImageFormat}
              subscription={subscription}
            />
          </Suspense>
          
          {/* Logo options */}
          <Suspense fallback={<LoadingFallback />}>
            <QRLogoCard 
              logo={logo}
              setLogo={setLogo}
              subscription={subscription}
            />
          </Suspense>
        </div>

        <div>
          <Suspense fallback={<LoadingFallback />}>
            <QRPreviewCard
              generated={generated}
              qrValue={qrValue}
              qrURL={qrURL}
              subscription={subscription}
              dotColor={dotColor}
              backgroundColor={backgroundColor}
              logo={logo}
              level={level}
              cornerRadius={cornerRadius}
              dotSize={dotSize}
            />
          </Suspense>
          
          <Suspense fallback={<LoadingFallback />}>
            <QRActionButtons
              generated={generated}
              qrValue={qrValue}
              qrURL={qrURL}
              subscription={subscription}
              imageFormat={imageFormat}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default QRGenerator;
