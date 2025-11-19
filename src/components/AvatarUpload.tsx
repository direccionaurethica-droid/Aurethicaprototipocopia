import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Upload, X, Check, Camera, Sparkles, ChevronLeft } from 'lucide-react';
import { Button } from './ui/button';

interface AvatarUploadProps {
  onComplete: (photos: File[]) => void;
  onBack?: () => void;
}

export function AvatarUpload({ onComplete, onBack }: AvatarUploadProps) {
  const [uploadedPhotos, setUploadedPhotos] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const REQUIRED_PHOTOS = 10;

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    const newFiles = Array.from(files).slice(0, REQUIRED_PHOTOS - uploadedPhotos.length);
    const validFiles = newFiles.filter(file => file.type.startsWith('image/'));

    if (validFiles.length > 0) {
      setUploadedPhotos(prev => [...prev, ...validFiles]);

      // Crear previews
      validFiles.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          setPreviews(prev => [...prev, e.target?.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const removePhoto = (index: number) => {
    setUploadedPhotos(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (uploadedPhotos.length === REQUIRED_PHOTOS) {
      onComplete(uploadedPhotos);
    }
  };

  const progress = (uploadedPhotos.length / REQUIRED_PHOTOS) * 100;

  return (
    <div className="min-h-screen bg-black py-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Botón de atrás */}
        {onBack && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-6"
          >
            <button
              onClick={onBack}
              className="group relative overflow-hidden px-6 py-3 rounded-2xl transition-all duration-500 hover:scale-105 active:scale-95 chrome-gigi-button"
            >
              {/* Contenido del botón */}
              <div className="relative flex items-center gap-2 text-black font-medium z-10">
                <motion.div
                  animate={{ x: [0, -3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <ChevronLeft className="w-5 h-5 drop-shadow-lg" />
                </motion.div>
                <span className="drop-shadow-lg tracking-wide">Atrás</span>
              </div>
            </button>
          </motion.div>
        )}
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-[#FF2D95] text-white px-6 py-3 rounded-full mb-6">
            <Camera className="w-5 h-5" />
            <span>Crea tu Avatar Digital</span>
          </div>

          <h1 className="text-[#D4AF37] mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            ¡Ya casi terminamos!
          </h1>
          <p className="text-[#A8A6A3] max-w-2xl mx-auto">
            Sube 10 fotos tuyas desde diferentes ángulos para que podamos crear tu avatar personalizado. 
            Así podrás probar diferentes cortes y colores de cabello antes de decidirte.
          </p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-[#A8A6A3]">
              {uploadedPhotos.length} de {REQUIRED_PHOTOS} fotos
            </span>
            <span className="text-sm text-[#D4AF37]">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
              className="h-full bg-gradient-to-r from-[#D4AF37] to-[#FF2D95]"
            />
          </div>
        </motion.div>

        {/* Upload Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
              isDragging
                ? 'border-[#FF2D95] bg-[#FF2D95]/5'
                : uploadedPhotos.length >= REQUIRED_PHOTOS
                ? 'border-[#D4AF37] bg-[#D4AF37]/5'
                : 'border-[#D4AF37]/30 hover:border-[#D4AF37]/50 bg-[#0a0a0a]'
            }`}
          >
            {uploadedPhotos.length >= REQUIRED_PHOTOS ? (
              <div className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-[#D4AF37]/20 rounded-full flex items-center justify-center">
                  <Check className="w-8 h-8 text-[#D4AF37]" />
                </div>
                <h3 className="text-[#E8E6E3]">¡Perfecto!</h3>
                <p className="text-[#A8A6A3]">
                  Has subido todas las fotos necesarias
                </p>
              </div>
            ) : (
              <>
                <Upload className="w-12 h-12 mx-auto mb-4 text-[#D4AF37]/60" />
                <h3 className="text-[#E8E6E3] mb-2">
                  Arrastra tus fotos aquí
                </h3>
                <p className="text-sm text-[#A8A6A3] mb-4">
                  o haz click para seleccionar
                </p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleFileSelect(e.target.files)}
                  className="hidden"
                  id="photo-upload"
                  disabled={uploadedPhotos.length >= REQUIRED_PHOTOS}
                />
                <label htmlFor="photo-upload">
                  <Button
                    type="button"
                    onClick={() => document.getElementById('photo-upload')?.click()}
                    disabled={uploadedPhotos.length >= REQUIRED_PHOTOS}
                  >
                    Seleccionar fotos
                  </Button>
                </label>
              </>
            )}
          </div>
        </motion.div>

        {/* Photo Grid */}
        {uploadedPhotos.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <h3 className="mb-4 text-[#E8E6E3]">Tus fotos</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <AnimatePresence mode="popLayout">
                {previews.map((preview, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    layout
                    className="relative aspect-square rounded-xl overflow-hidden bg-[#1a1a1a] shadow-md group border border-[#D4AF37]/20"
                  >
                    <img
                      src={preview}
                      alt={`Foto ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => removePhoto(index)}
                      className="absolute top-2 right-2 w-8 h-8 bg-[#FF2D95] text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:scale-110 transform"
                      aria-label="Eliminar foto"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                      #{index + 1}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Placeholder boxes */}
              {Array.from({ length: REQUIRED_PHOTOS - uploadedPhotos.length }).map((_, index) => (
                <div
                  key={`placeholder-${index}`}
                  className="aspect-square rounded-xl bg-[#0a0a0a] border-2 border-dashed border-[#D4AF37]/20 flex items-center justify-center"
                >
                  <Camera className="w-8 h-8 text-[#D4AF37]/30" />
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-[#0a0a0a] rounded-xl p-6 mb-8 border border-[#D4AF37]/20"
        >
          <h4 className="flex items-center gap-2 text-[#E8E6E3] mb-4">
            <Sparkles className="w-5 h-5 text-[#D4AF37]" />
            Consejos para mejores resultados
          </h4>
          <ul className="space-y-2 text-sm text-[#A8A6A3]">
            <li className="flex items-start gap-2">
              <span className="text-[#D4AF37] mt-1">✓</span>
              <span>Incluye fotos desde diferentes ángulos (frente, perfil, 3/4)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#D4AF37] mt-1">✓</span>
              <span>Asegúrate de tener buena iluminación natural</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#D4AF37] mt-1">✓</span>
              <span>Evita usar accesorios que cubran tu rostro (gafas de sol, sombreros)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#D4AF37] mt-1">✓</span>
              <span>Usa fotos recientes y de alta calidad</span>
            </li>
          </ul>
        </motion.div>

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <Button
            onClick={handleSubmit}
            disabled={uploadedPhotos.length < REQUIRED_PHOTOS}
            size="lg"
            className="gap-2"
          >
            <Sparkles className="w-5 h-5" />
            Generar mi Avatar
          </Button>
          {uploadedPhotos.length < REQUIRED_PHOTOS && (
            <p className="text-sm text-[#A8A6A3] mt-4">
              Sube {REQUIRED_PHOTOS - uploadedPhotos.length} fotos más para continuar
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
