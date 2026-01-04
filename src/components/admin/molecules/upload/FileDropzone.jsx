import React from "react";
import { UploadCloud, Music, Image as ImageIcon } from "lucide-react";

const FileDropzone = ({
    file,
    onFileChange,
    accept,
    type = "file", // 'file' or 'image'
    label = "Upload File",
    subLabel = "",
    className = "",
    currentPreviewUrl = null // For displaying existing images in edit mode
}) => {
    const isImage = type === "image";

    // Helper to determine what to show
    const showPreview = file && isImage;
    const showFileDetails = file && !isImage;
    const showCurrentPreview = !file && currentPreviewUrl && isImage;
    const showPlaceholder = !file && !currentPreviewUrl;

    return (
        <div className={`w-full h-48 border-2 border-dashed border-white/20 rounded-xl bg-black/20 hover:bg-black/40 transition flex flex-col items-center justify-center cursor-pointer relative ${className}`}>
            <input
                type="file"
                accept={accept}
                onChange={onFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />

            {/* Uploaded Image Preview */}
            {showPreview && (
                <div className="text-center relative w-full h-full overflow-hidden rounded-lg">
                    <img
                        src={URL.createObjectURL(file)}
                        alt="Preview"
                        className="w-full h-full object-cover"
                    />
                </div>
            )}

            {/* Existing Image Preview (Edit Mode) */}
            {showCurrentPreview && (
                <div className="text-center relative w-full h-full overflow-hidden rounded-lg group">
                    <img
                        src={currentPreviewUrl}
                        alt="Current"
                        className="w-full h-full object-cover opacity-70 group-hover:opacity-50 transition"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <p className="text-xs text-white opacity-0 group-hover:opacity-100 transition font-medium bg-black/50 px-3 py-1 rounded-full">
                            Click to Replace
                        </p>
                    </div>
                </div>
            )}

            {/* File Details (Audio/Doc) */}
            {showFileDetails && (
                <div className="text-center">
                    <Music size={40} className="mx-auto text-green-400 mb-2" />
                    <p className="text-white font-medium truncate max-w-[200px] px-2">{file.name}</p>
                    <p className="text-white/50 text-sm">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
            )}

            {/* Standard Placeholder */}
            {showPlaceholder && (
                <div className="text-center text-white/50">
                    {isImage ? (
                        <ImageIcon size={40} className="mx-auto mb-2" />
                    ) : (
                        <UploadCloud size={40} className="mx-auto mb-2" />
                    )}
                    <p>{label}</p>
                    <p className="text-xs mt-1">{subLabel}</p>
                </div>
            )}
        </div>
    );
};

export default FileDropzone;
