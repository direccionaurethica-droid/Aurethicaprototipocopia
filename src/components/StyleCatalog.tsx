/**
 * StyleCatalog - Catálogo premium de estilos de cabello
 * Organizado por: Últimos, Icónicos, Recomendados
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, Share2, Search, Filter, Sparkles, TrendingUp, Star, User } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { toast } from './PremiumToast';

interface StyleCatalogProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile?: {
    faceShape?: string;
    hairType?: string;
    skinTone?: string;
  };
  onSelectStyle?: (style: Style) => void;
}

interface Style {
  id: string;
  name: string;
  category: 'corte' | 'color' | 'mixto';
  image: string;
  description: string;
  difficulty: 'fácil' | 'medio' | 'difícil';
  duration: string;
  price: string;
  tags: string[];
  trending?: boolean;
  iconic?: boolean;
  recommended?: boolean;
  compatibility?: number; // 0-100
}

export function StyleCatalog({ isOpen, onClose, userProfile, onSelectStyle }: StyleCatalogProps) {
  const [activeTab, setActiveTab] = useState<'latest' | 'iconic' | 'recommended'>('latest');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'corte' | 'color' | 'mixto'>('all');
  const [favorites, setFavorites] = useState<string[]>([]);

  // Mock data - Estilos
  const styles: Style[] = [
    // ÚLTIMOS
    {
      id: '1',
      name: 'Butterfly Cut',
      category: 'corte',
      image: '🦋',
      description: 'Corte en capas con volumen natural, perfecto para dar movimiento y textura',
      difficulty: 'medio',
      duration: '1h 15min',
      price: '75€',
      tags: ['tendencia', 'volumen', 'capas'],
      trending: true,
      recommended: true,
      compatibility: 95
    },
    {
      id: '2',
      name: 'Balayage Caramelo',
      category: 'color',
      image: '🍯',
      description: 'Mechas naturales en tonos caramelo y miel para un look luminoso',
      difficulty: 'difícil',
      duration: '2h 30min',
      price: '145€',
      tags: ['natural', 'luminoso', 'mechas'],
      trending: true,
      compatibility: 88
    },
    {
      id: '3',
      name: 'Wolf Cut Moderno',
      category: 'corte',
      image: '🐺',
      description: 'Híbrido entre shag y mullet, rebelde y con actitud',
      difficulty: 'medio',
      duration: '1h 30min',
      price: '85€',
      tags: ['rebelde', 'moderno', 'atrevido'],
      trending: true,
      recommended: true,
      compatibility: 82
    },
    {
      id: '4',
      name: 'Babylights Rubio',
      category: 'color',
      image: '☀️',
      description: 'Mechas superfinas que imitan el cabello aclarado por el sol',
      difficulty: 'difícil',
      duration: '3h',
      price: '165€',
      tags: ['natural', 'rubio', 'verano'],
      trending: true,
      compatibility: 76
    },

    // ICÓNICOS
    {
      id: '5',
      name: 'Bob Clásico',
      category: 'corte',
      image: '✂️',
      description: 'Corte atemporal a la altura de la mandíbula, elegante y versátil',
      difficulty: 'fácil',
      duration: '45min',
      price: '60€',
      tags: ['clásico', 'elegante', 'versátil'],
      iconic: true,
      recommended: true,
      compatibility: 92
    },
    {
      id: '6',
      name: 'Pixie Cut',
      category: 'corte',
      image: '🧚',
      description: 'Corte corto y atrevido, para personalidades audaces',
      difficulty: 'medio',
      duration: '1h',
      price: '70€',
      tags: ['corto', 'atrevido', 'fácil mantenimiento'],
      iconic: true,
      compatibility: 68
    },
    {
      id: '7',
      name: 'Balayage Clásico',
      category: 'color',
      image: '🎨',
      description: 'Técnica francesa de iluminación natural, el favorito de siempre',
      difficulty: 'difícil',
      duration: '2h 30min',
      price: '140€',
      tags: ['francés', 'natural', 'luminoso'],
      iconic: true,
      recommended: true,
      compatibility: 90
    },
    {
      id: '8',
      name: 'Long Layers',
      category: 'corte',
      image: '💇',
      description: 'Capas largas que añaden movimiento sin perder longitud',
      difficulty: 'fácil',
      duration: '1h',
      price: '65€',
      tags: ['capas', 'largo', 'movimiento'],
      iconic: true,
      recommended: true,
      compatibility: 94
    },

    // MÁS RECOMENDADOS
    {
      id: '9',
      name: 'Shag Texturizado',
      category: 'corte',
      image: '✨',
      description: 'Corte despeinado con textura y volumen, ideal para tu tipo de cabello',
      difficulty: 'medio',
      duration: '1h 20min',
      price: '80€',
      tags: ['textura', 'volumen', 'moderno'],
      recommended: true,
      compatibility: 96
    },
    {
      id: '10',
      name: 'Copper Glow',
      category: 'color',
      image: '🔥',
      description: 'Tonos cobrizos cálidos que realzan tu tono de piel',
      difficulty: 'medio',
      duration: '2h',
      price: '125€',
      tags: ['cobre', 'cálido', 'vibrante'],
      recommended: true,
      compatibility: 91
    },
    {
      id: '11',
      name: 'Curtain Bangs + Capas',
      category: 'mixto',
      image: '🎭',
      description: 'Flequillo cortina con capas suaves, perfecto para tu fisionomía',
      difficulty: 'medio',
      duration: '1h 30min',
      price: '85€',
      tags: ['flequillo', 'capas', 'favorecedor'],
      recommended: true,
      compatibility: 98
    },
    {
      id: '12',
      name: 'Caramel Highlights',
      category: 'color',
      image: '🌰',
      description: 'Reflejos caramelo que complementan tus rasgos naturales',
      difficulty: 'medio',
      duration: '2h 15min',
      price: '130€',
      tags: ['caramelo', 'reflejos', 'natural'],
      recommended: true,
      compatibility: 93
    }
  ];

  const toggleFavorite = (styleId: string) => {
    setFavorites(prev => 
      prev.includes(styleId) 
        ? prev.filter(id => id !== styleId)
        : [...prev, styleId]
    );
  };

  const handleSelectStyle = (style: Style) => {
    onSelectStyle?.(style);
    toast.success(`¡Estilo seleccionado!`, {
      description: `${style.name} - ${style.price}`,
      duration: 3000
    });
  };

  const filteredStyles = styles
    .filter(style => {
      // Filtrar por tab
      if (activeTab === 'latest' && !style.trending) return false;
      if (activeTab === 'iconic' && !style.iconic) return false;
      if (activeTab === 'recommended' && !style.recommended) return false;

      // Filtrar por categoría
      if (selectedFilter !== 'all' && style.category !== selectedFilter) return false;

      // Filtrar por búsqueda
      if (searchQuery && !style.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !style.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !style.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      // Ordenar por compatibilidad en recomendados
      if (activeTab === 'recommended') {
        return (b.compatibility || 0) - (a.compatibility || 0);
      }
      return 0;
    });

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-md flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="bg-black rounded-2xl shadow-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden border border-[#D4AF37]/20"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#D4AF37] via-[#C9A24F] to-[#D4AF37] p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-3xl text-black mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Catálogo de Estilos
                </h2>
                <p className="text-black/80 text-sm">
                  Descubre el look perfecto para ti
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-12 h-12 rounded-full bg-black/20 hover:bg-black/30 transition-all duration-300 flex items-center justify-center group"
                aria-label="Cerrar catálogo"
              >
                <X className="w-6 h-6 text-black group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-black/60" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar estilos, técnicas, tendencias..."
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-black/20 text-black placeholder:text-black/60 border border-black/20 focus:outline-none focus:border-black/40"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                />
              </div>
              <div className="flex gap-2">
                {(['all', 'corte', 'color', 'mixto'] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setSelectedFilter(filter)}
                    className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                      selectedFilter === filter
                        ? 'bg-black text-[#D4AF37]'
                        : 'bg-black/20 text-black hover:bg-black/30'
                    }`}
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    {filter === 'all' ? 'Todos' : filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-[#0a0a0a] border-b border-[#D4AF37]/20">
            <div className="flex gap-1 p-2">
              <button
                onClick={() => setActiveTab('latest')}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                  activeTab === 'latest'
                    ? 'bg-gradient-to-r from-[#FF2D95] to-[#C9A24F] text-white'
                    : 'text-[#E8E6E3] hover:bg-white/5'
                }`}
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                <TrendingUp className="w-4 h-4" />
                Últimos
                <Badge className="bg-[#FF2D95] text-white border-0">
                  {styles.filter(s => s.trending).length}
                </Badge>
              </button>
              <button
                onClick={() => setActiveTab('iconic')}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                  activeTab === 'iconic'
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#C9A24F] text-black'
                    : 'text-[#E8E6E3] hover:bg-white/5'
                }`}
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                <Star className="w-4 h-4" />
                Icónicos
                <Badge className="bg-[#D4AF37] text-black border-0">
                  {styles.filter(s => s.iconic).length}
                </Badge>
              </button>
              <button
                onClick={() => setActiveTab('recommended')}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                  activeTab === 'recommended'
                    ? 'bg-gradient-to-r from-[#C9A24F] to-[#D4AF37] text-black'
                    : 'text-[#E8E6E3] hover:bg-white/5'
                }`}
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                <Sparkles className="w-4 h-4" />
                Para Ti
                <Badge className="bg-[#C9A24F] text-black border-0">
                  {styles.filter(s => s.recommended).length}
                </Badge>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(95vh-280px)] bg-black">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {filteredStyles.length === 0 ? (
                  <div className="col-span-full text-center py-12">
                    <p className="text-[#6E7276] text-lg">No se encontraron estilos</p>
                  </div>
                ) : (
                  filteredStyles.map((style, index) => (
                    <motion.div
                      key={style.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card className="bg-[#0a0a0a] border-[#D4AF37]/20 hover:border-[#D4AF37]/40 transition-all duration-300 overflow-hidden group">
                        {/* Emoji/Image Header */}
                        <div className="relative bg-gradient-to-br from-[#D4AF37]/20 to-[#FF2D95]/20 p-8 flex items-center justify-center">
                          <span className="text-6xl group-hover:scale-110 transition-transform duration-300">
                            {style.image}
                          </span>
                          {style.compatibility && activeTab === 'recommended' && (
                            <div className="absolute top-3 right-3 bg-[#C9A24F] text-black px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                              <User className="w-3 h-3" />
                              {style.compatibility}% Match
                            </div>
                          )}
                          <button
                            onClick={() => toggleFavorite(style.id)}
                            className="absolute top-3 left-3 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 transition-all duration-300 flex items-center justify-center"
                          >
                            <Heart 
                              className={`w-5 h-5 transition-all duration-300 ${
                                favorites.includes(style.id)
                                  ? 'fill-[#FF2D95] text-[#FF2D95]'
                                  : 'text-white'
                              }`}
                            />
                          </button>
                        </div>

                        <div className="p-5">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h4 className="text-lg text-[#E8E6E3] mb-1 group-hover:text-[#D4AF37] transition-colors">
                                {style.name}
                              </h4>
                              <div className="flex items-center gap-2 text-xs text-[#6E7276]">
                                <span className="capitalize">{style.category}</span>
                                <span>•</span>
                                <span>{style.duration}</span>
                              </div>
                            </div>
                            <Badge 
                              className={`${
                                style.difficulty === 'fácil' 
                                  ? 'bg-green-500/20 text-green-400 border-green-500/30'
                                  : style.difficulty === 'medio'
                                    ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                                    : 'bg-red-500/20 text-red-400 border-red-500/30'
                              }`}
                            >
                              {style.difficulty}
                            </Badge>
                          </div>

                          <p className="text-sm text-[#6E7276] mb-4 line-clamp-2">
                            {style.description}
                          </p>

                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {style.tags.slice(0, 3).map((tag) => (
                              <span 
                                key={tag}
                                className="px-2 py-1 bg-[#D4AF37]/10 text-[#D4AF37] rounded-md text-xs"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-xl text-[#D4AF37]">
                              {style.price}
                            </span>
                            <Button
                              onClick={() => handleSelectStyle(style)}
                              className="bg-gradient-to-r from-[#C9A24F] to-[#D4AF37] text-black hover:from-[#D4AF37] hover:to-[#C9A24F]"
                              size="sm"
                            >
                              Seleccionar
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
