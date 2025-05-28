
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QrCode, Calendar, ExternalLink, Trash2, AlertTriangle } from 'lucide-react';
import { useQRHistory } from '@/hooks/useQRHistory';
import { Button } from "@/components/ui/button";
import { useToast } from '@/hooks/use-toast';
import QRCodeReact from 'qrcode.react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const QRHistoryCard = () => {
  const { qrHistory, deleteQRFromHistory, clearHistory } = useQRHistory();
  const { toast } = useToast();

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

  const handleDelete = (id: string, type: string) => {
    deleteQRFromHistory(id);
    toast({
      title: "QR Code Deleted",
      description: `${getTypeLabel(type)} QR code has been removed from your history.`,
    });
  };

  const handleClearAll = () => {
    clearHistory();
    toast({
      title: "History Cleared",
      description: "All QR codes have been removed from your history.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <QrCode className="h-5 w-5" />
            QR Code History
          </CardTitle>
          {qrHistory.length > 0 && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm">
                  Clear All
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Clear All History</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete all your saved QR codes. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleClearAll} className="bg-red-600 hover:bg-red-700">
                    Clear All
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {qrHistory.length > 0 ? (
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {qrHistory.map((qr) => (
              <div key={qr.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50">
                {/* QR Code Preview */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 border rounded p-1 bg-white">
                    <QRCodeReact
                      value={qr.url}
                      size={56}
                      fgColor={qr.dotColor}
                      bgColor={qr.backgroundColor}
                      level="M"
                    />
                  </div>
                </div>
                
                {/* QR Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">{getTypeLabel(qr.type)}</span>
                    {qr.hasLogo && (
                      <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                        Logo
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 break-words">
                    {truncateContent(qr.content)}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                    <Calendar className="h-3 w-3" />
                    {formatDate(qr.createdAt)}
                  </div>
                </div>
                
                {/* Actions */}
                <div className="flex gap-2 flex-shrink-0">
                  {qr.url.startsWith('http') && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(qr.url, '_blank')}
                      title="Open link"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  )}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        title="Delete QR code"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete QR Code</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete this {getTypeLabel(qr.type)} QR code? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction 
                          onClick={() => handleDelete(qr.id, qr.type)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
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
