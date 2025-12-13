import { useEffect, useState } from 'react';
import { alcoholService, Alcohol } from '../services/alcoholService';
import { consumptionService } from '../services/consumptionService';
import { favoriteService } from '../services/favoriteService';
import { useAuthStore } from '../store/authStore';
import { getFormatsForType } from '../utils/alcoholFormats';
import Toast from '../components/Toast';
import LoadingSpinner from '../components/LoadingSpinner';
import FloatingActionButton from '../components/FloatingActionButton';
import './Catalogue.css';

export default function Catalogue() {
  const {} = useAuthStore();
  const [alcohols, setAlcohols] = useState<Alcohol[]>([]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedAlcohol, setSelectedAlcohol] = useState<Alcohol | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedFormat, setSelectedFormat] = useState<{ name: string; volume: number } | null>(null);
  const [adding, setAdding] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' | 'warning' } | null>(null);
  const [sortBy, setSortBy] = useState<'name' | 'alcoholRate' | 'price'>('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [quickAdd, setQuickAdd] = useState<string | null>(null);

  useEffect(() => {
    loadAlcohols();
    loadFavorites();
  }, [search, typeFilter, sortBy, showFavoritesOnly]);

  const loadAlcohols = async () => {
    try {
      const filters: any = {};
      if (search) filters.search = search;
      if (typeFilter) filters.type = typeFilter;
      const data = await alcoholService.getAll(filters);
      let filtered = data.alcohols || [];
      
      if (showFavoritesOnly) {
        filtered = filtered.filter((a: Alcohol) => favorites.has(a.id));
      }
      
      // Trier les alcools
      const sorted = [...filtered].sort((a, b) => {
        switch (sortBy) {
          case 'alcoholRate':
            return b.alcoholRate - a.alcoholRate;
          case 'price':
            return (b.price || 0) - (a.price || 0);
          case 'name':
          default:
            return a.name.localeCompare(b.name);
        }
      });
      
      setAlcohols(sorted);
    } catch (error) {
      console.error('Error loading alcohols:', error);
      setToast({ message: 'Erreur lors du chargement du catalogue', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const loadFavorites = async () => {
    try {
      const favs = await favoriteService.getAll();
      setFavorites(new Set(favs.map(f => f.id)));
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  const toggleFavorite = async (alcohol: Alcohol) => {
    try {
      if (favorites.has(alcohol.id)) {
        await favoriteService.remove(alcohol.id);
        setFavorites(prev => {
          const newSet = new Set(prev);
          newSet.delete(alcohol.id);
          return newSet;
        });
        setToast({ message: `${alcohol.name} retiré des favoris`, type: 'info' });
      } else {
        await favoriteService.add(alcohol.id);
        setFavorites(prev => new Set(prev).add(alcohol.id));
        setToast({ message: `${alcohol.name} ajouté aux favoris`, type: 'success' });
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      setToast({ message: 'Erreur lors de la modification des favoris', type: 'error' });
    }
  };

  const handleAddConsumption = async () => {
    if (!selectedAlcohol || !selectedFormat) return;
    setAdding(true);
    try {
      await consumptionService.create({
        alcoholId: selectedAlcohol.id,
        quantity: quantity,
        volumeConsumed: selectedFormat.volume,
        format: selectedFormat.name
      });
      setShowAddModal(false);
      setSelectedAlcohol(null);
      setSelectedFormat(null);
      setQuantity(1);
      setQuickAdd(null);
      setToast({ message: 'Consommation ajoutée avec succès !', type: 'success' });
    } catch (error: any) {
      setToast({ message: error.response?.data?.error || 'Erreur lors de l\'ajout', type: 'error' });
    } finally {
      setAdding(false);
    }
  };

  const handleQuickAdd = async (alcohol: Alcohol) => {
    setQuickAdd(alcohol.id);
    const formats = getFormatsForType(alcohol.type);
    if (formats.length > 0) {
      try {
        await consumptionService.create({
          alcoholId: alcohol.id,
          quantity: 1,
          volumeConsumed: formats[0].volume,
          format: formats[0].name
        });
        setQuickAdd(null);
        setToast({ message: `${alcohol.name} ajouté !`, type: 'success' });
      } catch (error: any) {
        setToast({ message: error.response?.data?.error || 'Erreur', type: 'error' });
        setQuickAdd(null);
      }
    } else {
      openAddModal(alcohol);
      setQuickAdd(null);
    }
  };

  const openAddModal = (alcohol: Alcohol) => {
    setSelectedAlcohol(alcohol);
    const formats = getFormatsForType(alcohol.type);
    if (formats.length > 0) {
      setSelectedFormat(formats[0]); // Sélectionner le premier format par défaut
    }
    setShowAddModal(true);
  };

  const alcoholTypes = [
    'BEER', 'WINE', 'VODKA', 'WHISKY', 'RUM', 'GIN', 'TEQUILA',
    'CHAMPAGNE', 'COGNAC', 'LIQUEUR', 'CIDER', 'OTHER'
  ];

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      BEER: 'Bière',
      WINE: 'Vin',
      VODKA: 'Vodka',
      WHISKY: 'Whisky',
      RUM: 'Rhum',
      GIN: 'Gin',
      TEQUILA: 'Tequila',
      CHAMPAGNE: 'Champagne',
      COGNAC: 'Cognac',
      LIQUEUR: 'Liqueur',
      CIDER: 'Cidre',
      OTHER: 'Autre'
    };
    return labels[type] || type;
  };

  if (loading) {
    return (
      <div className="catalogue">
        <div className="catalogue-header">
          <h1>Catalogue des Alcools</h1>
        </div>
        <LoadingSpinner size="lg" text="Chargement du catalogue..." />
      </div>
    );
  }

  return (
    <div className="catalogue">
      <div className="catalogue-header">
        <h1>Catalogue des Alcools</h1>
        <p>Recherchez et ajoutez vos consommations</p>
      </div>

      <div className="catalogue-controls">
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Rechercher..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
          {search && (
            <button 
              onClick={() => setSearch('')}
              className="clear-search"
              aria-label="Effacer la recherche"
            >
              ✕
            </button>
          )}
        </div>

        <div className="controls-row">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`filter-toggle ${showFilters ? 'active' : ''}`}
          >
            {showFilters ? '✕' : '⚙️'} Filtres
          </button>
          <div className="view-toggle">
            <button 
              onClick={() => setViewMode('grid')}
              className={viewMode === 'grid' ? 'active' : ''}
              aria-label="Vue grille"
            >
              ⬜
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={viewMode === 'list' ? 'active' : ''}
              aria-label="Vue liste"
            >
              ☰
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="filters-panel">
            <div className="filter-group">
              <label>Type d'alcool</label>
              <div className="type-chips">
                <button
                  onClick={() => setTypeFilter('')}
                  className={`type-chip ${typeFilter === '' ? 'active' : ''}`}
                >
                  Tous
                </button>
                {alcoholTypes.map(type => (
                  <button
                    key={type}
                    onClick={() => setTypeFilter(typeFilter === type ? '' : type)}
                    className={`type-chip ${typeFilter === type ? 'active' : ''}`}
                  >
                    {getTypeLabel(type)}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <label className="favorites-filter">
                <input
                  type="checkbox"
                  checked={showFavoritesOnly}
                  onChange={(e) => setShowFavoritesOnly(e.target.checked)}
                />
                ⭐ Favoris uniquement
              </label>
            </div>

            <div className="filter-group">
              <label>Trier par</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'name' | 'alcoholRate' | 'price')}
                className="sort-filter"
              >
                <option value="name">Nom</option>
                <option value="alcoholRate">Taux d'alcool</option>
                <option value="price">Prix</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {alcohols.length > 0 && (
        <div className="results-info">
          <span>{alcohols.length} alcool{alcohols.length > 1 ? 's' : ''} trouvé{alcohols.length > 1 ? 's' : ''}</span>
        </div>
      )}

      <div className={`alcohols-container ${viewMode === 'list' ? 'list-view' : 'grid-view'}`}>
        {alcohols.map((alcohol, index) => (
          <div 
            key={alcohol.id} 
            className={`alcohol-card ${viewMode === 'list' ? 'list-card' : 'grid-card'} fade-in`}
            style={{ animationDelay: `${index * 0.03}s` }}
          >
            <div className="alcohol-header">
              <div className="alcohol-title-section">
                <h3>
                  {favorites.has(alcohol.id) && <span className="favorite-indicator">⭐</span>}
                  {alcohol.name}
                </h3>
                <span className="alcohol-brand">{alcohol.brand}</span>
              </div>
              <div className="alcohol-header-right">
                <span className="alcohol-type">{getTypeLabel(alcohol.type)}</span>
                <button
                  onClick={() => toggleFavorite(alcohol)}
                  className={`favorite-btn ${favorites.has(alcohol.id) ? 'active' : ''}`}
                  aria-label={favorites.has(alcohol.id) ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                >
                  {favorites.has(alcohol.id) ? '⭐' : '☆'}
                </button>
              </div>
            </div>
            
            <div className="alcohol-info">
              <div className="alcohol-stats">
                <div className="stat-item">
                  <span className="stat-label">Alcool</span>
                  <span className="stat-value highlight">{alcohol.alcoholRate}%</span>
                </div>
                {alcohol.sugarRate && (
                  <div className="stat-item">
                    <span className="stat-label">Sucre</span>
                    <span className="stat-value">{alcohol.sugarRate} g/L</span>
                  </div>
                )}
                {alcohol.price && (
                  <div className="stat-item">
                    <span className="stat-label">Prix</span>
                    <span className="stat-value">{alcohol.price.toFixed(2)} €</span>
                  </div>
                )}
              </div>
            </div>

            <div className="alcohol-actions">
              <button
                onClick={() => handleQuickAdd(alcohol)}
                className="quick-add-btn"
                disabled={quickAdd === alcohol.id}
              >
                {quickAdd === alcohol.id ? '...' : '⚡ Ajout rapide'}
              </button>
              <button
                onClick={() => openAddModal(alcohol)}
                className="add-btn"
              >
                ➕ Détails
              </button>
            </div>
          </div>
        ))}
      </div>

      {alcohols.length === 0 && (
        <div className="empty-state">
          <p>{showFavoritesOnly ? 'Aucun favori trouvé.' : 'Aucun alcool trouvé. Essayez de modifier vos filtres.'}</p>
        </div>
      )}

      {showAddModal && selectedAlcohol && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Ajouter une consommation</h2>
            <div className="modal-alcohol-info">
              <strong>{selectedAlcohol.name}</strong> - {selectedAlcohol.brand}
              <br />
              <small>{selectedAlcohol.alcoholRate}% d'alcool</small>
            </div>
            <div className="form-group">
              <label>Format</label>
              <select
                value={selectedFormat?.name || ''}
                onChange={(e) => {
                  const formats = getFormatsForType(selectedAlcohol.type);
                  const format = formats.find(f => f.name === e.target.value);
                  setSelectedFormat(format || null);
                }}
              >
                {getFormatsForType(selectedAlcohol.type).map(format => (
                  <option key={format.name} value={format.name}>
                    {format.name} ({format.volume} mL)
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Quantité</label>
              <input
                type="number"
                min="0.1"
                step="0.1"
                value={quantity}
                onChange={(e) => setQuantity(parseFloat(e.target.value) || 1)}
              />
            </div>
            <div className="modal-actions">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setSelectedAlcohol(null);
                  setSelectedFormat(null);
                }}
                className="cancel-btn"
                disabled={adding}
              >
                Annuler
              </button>
              <button
                onClick={handleAddConsumption}
                className="confirm-btn"
                disabled={adding || !selectedFormat}
              >
                {adding ? 'Ajout...' : 'Ajouter'}
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <FloatingActionButton
        to="/"
        icon="📊"
        label="Stats"
      />
    </div>
  );
}
