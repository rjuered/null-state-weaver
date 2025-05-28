
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { QrCode, Trash2, Calendar, AlertCircle } from "lucide-react";
import { useQRHistory } from "@/hooks/useQRHistory";
import { QRCodeSVG } from "qrcode.react";

const QRHistoryCard = () => {
  const { qrHistory, deleteQRFromHistory, clearHistory } = useQRHistory();

  // Validate QR data length to prevent crashes
  const validateQRData = (data: string, errorLevel: string = 'H') => {
    const maxLengths = {
      'L': 2953,
      'M': 2331,
      'Q': 1663,
      'H': 1273
    };
    
    const maxLength = maxLengths[errorLevel] || 1273;
    return data.length <= maxLength;
  };

  // Safe QR data with truncation if needed
  const getSafeQRData = (data: string, errorLevel: string = 'H') => {
    if (validateQRData(data, errorLevel)) {
      return data;
    }
    
    const maxLengths = {
      'L': 2953,
      'M': 2331,
      'Q': 1663,
      'H': 1273
    };
    
    const maxLength = maxLengths[errorLevel] || 1273;
    return data.substring(0, maxLength - 3) + '...';
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return 'Invalid date';
    }
  };

  const formatQRType = (type: string) => {
    const typeMap = {
      'url': 'Website',
      'text': 'Text',
      'email': 'Email',
      'phone': 'Phone',
      'sms': 'SMS',
      'wifi': 'WiFi',
      'vcard': 'Contact',
      'image': 'Image'
    };
    return typeMap[type] || type.charAt(0).toUpperCase() + type.slice(1);
  };

  if (qrHistory.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <QrCode className="mr-2 h-5 w-5" />
            QR Code History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <QrCode className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-500">No QR codes generated yet</p>
            <p className="text-sm text-gray-400 mt-2">Your generated QR codes will appear here</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="flex items-center">
          <QrCode className="mr-2 h-5 w-5" />
          QR Code History ({qrHistory.length})
        </CardTitle>
        {qrHistory.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={clearHistory}
            className="text-red-600 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Clear All
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 max-h-96 overflow-y-auto">
          {qrHistory.map((qr) => {
            const isDataValid = validateQRData(qr.url);
            const safeData = getSafeQRData(qr.url);
            
            return (
              <div key={qr.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex-shrink-0">
                  {isDataValid ? (
                    <div className="w-16 h-16 bg-white border rounded-lg flex items-center justify-center">
                      <QRCodeSVG
                        value={safeData}
                        size={56}
                        bgColor={qr.backgroundColor}
                        fgColor={qr.dotColor}
                        level="H"
                        includeMargin={false}
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 bg-red-50 border border-red-200 rounded-lg flex items-center justify-center">
                      <AlertCircle className="h-8 w-8 text-red-400" />
                    </div>
                  )}
                </div>
                
                <div className="flex-grow min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <Badge variant="secondary" className="text-xs">
                      {formatQRType(qr.type)}
                    </Badge>
                    {qr.hasLogo && (
                      <Badge variant="outline" className="text-xs">
                        Logo
                      </Badge>
                    )}
                    {!isDataValid && (
                      <Badge variant="destructive" className="text-xs">
                        Data Too Long
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {qr.content.length > 50 ? `${qr.content.substring(0, 50)}...` : qr.content}
                  </p>
                  
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <Calendar className="h-3 w-3 mr-1" />
                    {formatDate(qr.createdAt)}
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteQRFromHistory(qr.id)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default QRHistoryCard;
