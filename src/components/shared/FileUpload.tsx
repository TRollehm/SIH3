import React, { useCallback, useRef, useState } from 'react';
import { Upload, X } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
  onRemove: () => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, selectedFile, onRemove }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  }, [onFileSelect]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileSelect(e.target.files[0]);
    }
  }, [onFileSelect]);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="w-full">
      {!selectedFile ? (
        <div
          className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center transition-colors ${
            isDragging ? 'border-olive-500 bg-olive-50' : 'border-gray-300 hover:border-olive-400 bg-surface'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Upload className="w-10 h-10 text-olive-600 mb-4" />
          <h3 className="text-lg font-medium text-text-primary mb-1">Drop your tender specification here</h3>
          <p className="text-sm text-text-secondary mb-4">or</p>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 bg-white border border-border text-text-primary rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-olive-500 transition-colors mb-3"
          >
            Browse files
          </button>
          <p className="text-xs text-text-secondary">PDF, DOCX, TXT — Maximum 25 MB</p>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
            accept=".pdf,.docx,.txt"
          />
        </div>
      ) : (
        <div className="border border-border rounded-lg p-4 bg-surface flex items-center justify-between">
          <div className="flex items-center space-x-3 overflow-hidden">
            <div className="bg-olive-100 p-2 rounded">
              <Upload className="w-5 h-5 text-olive-700" />
            </div>
            <div className="truncate">
              <p className="text-sm font-medium text-text-primary truncate">{selectedFile.name}</p>
              <p className="text-xs text-text-secondary">
                {formatFileSize(selectedFile.size)} • Computing pages...
              </p>
            </div>
          </div>
          <button
            onClick={onRemove}
            className="p-1.5 text-text-secondary hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
            title="Remove file"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};
