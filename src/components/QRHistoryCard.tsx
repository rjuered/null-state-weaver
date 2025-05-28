
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QrCode, Calendar, ExternalLink } from 'lucide-react';
import { useQRHistory } from '@/hooks/useQRHistory';
import { Button } from "@/components/ui/button";

const QRHistoryCard = () => {
  const { qrHistory } = useQRHistory();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTypeLabel = (type: string) => {
    const typeLabels: { [key: string]: string } = {
      url: 'Website URL',
      text: 'Text',
      email: 'Email',
      wifi: 'WiFi',
      contact: 'Contact',
      location: 'Location',
      event: 'Event',
      image: 'Image',
      app: 'App Store',
      sms: 'SMS'
    };
    return typeLabels[type] || type;
  };

  const truncateContent = (content: string, maxLength: number = 50) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <QrCode className="h-5 w-5" />
          QR Code History
        </CardTitle>
      </CardHeader>
      <CardContent>
        {qrHistory.length > 0 ? (
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {qrHistory.map((qr) => (
              <div key={qr.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-8 h-8 rounded"
                    style={{ backgroundColor: qr.dotColor }}
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{getTypeLabel(qr.type)}</span>
                      {qr.hasLogo && (
                        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                          Logo
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">
                      {truncateContent(qr.content)}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(qr.createdAt)}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  {qr.url.startsWith('http') && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(qr.url, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <QrCode className="h-12 w-12 text-gray-300 mx-auto mb-2" />
            <p className="text-gray-500">No QR codes created yet</p>
            <p className="text-sm text-gray-400">Your generated QR codes will appear here</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QRHistoryCard;
