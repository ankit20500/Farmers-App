import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IoCheckmarkCircleOutline, IoLocationOutline, IoLeafOutline } from 'react-icons/io5';
import { GiWheat, GiTomato, GiOrangeSlice } from 'react-icons/gi';
import { RiSeedlingLine } from 'react-icons/ri';
import SectionHeader from '../Resuable_Comp/SectionHeader';
import Button from '../Resuable_Comp/Button';
import './ChooseCategory.css';

function ChooseCategory() {
  const navigate = useNavigate();
  const { name } = useParams();
  
  // Normalizing the category name parameter
  const normalizedCategoryName = name.replace(/\s+/g, '_').toLowerCase();

  // Category sub-items mapping
  const categoryItems = {
    pesticides: [
      { name: 'herbicides', desc: 'Control weed competition in crop beds safely', icon: '🌿' },
      { name: 'insecticides', desc: 'Protect harvests from worms, borers, and pests', icon: '🐛' },
      { name: 'fungicides', desc: 'Prevent fungal blight, rust, and powdery mildew', icon: '🍄' },
      { name: 'organic pesticides', desc: 'Natural botanical insect controls (Neem oil, etc.)', icon: '🍃' }
    ],
    seeds: [
      { name: 'wheat seeds', desc: 'Premium Sharbati, Lokwan and high-yield grain cultivars', icon: <GiWheat /> },
      { name: 'rice seeds', desc: 'Fragrant Basmati, IR64 and premium long-grain paddy seeds', icon: '🌾' },
      { name: 'vegetable seeds', desc: 'Hybrid Tomato, Chilli, Okra, and seasonal greens seeds', icon: <GiTomato /> },
      { name: 'fruit seeds', desc: 'High-yield papaya, melon, and citrus seed variants', icon: <GiOrangeSlice /> }
    ],
    fertilizers: [
      { name: 'organic fertilizers', desc: 'Natural cow dung manure, vermicompost, bone meal', icon: '🍂' },
      { name: 'chemical fertilizers', desc: 'Urea, NPK mixes, DAP for instant nutrient delivery', icon: '🧪' },
      { name: 'liquid fertilizers', desc: 'Foliar sprays and water-soluble nutrient feeds', icon: '💧' }
    ],
    nutrients: [
      { name: 'bio-nutrients', desc: 'Active seaweed extracts and organic growth stimulators', icon: '🌱' },
      { name: 'growth enhancers', desc: 'Micronutrient packets to trigger leaf & root extension', icon: '⚡' },
      { name: 'soil conditioners', desc: 'Gypsum and humic acid to optimize soil root structures', icon: '🧱' }
    ],
    storage_solutions: [
      { name: 'grain storage bags', desc: 'Hermetic bags to prevent pests and moisture spoilage', icon: '🛍️' },
      { name: 'silos', desc: 'Metal structures for long-term grain reservation', icon: '🏢' },
      { name: 'storage tanks', desc: 'Heavy-duty poly tanks for water and liquid feeds', icon: '🛢️' }
    ],
    flower_seeds: [
      { name: 'hybrid flower seeds', desc: 'High-germinating marigold, rose, and jasmine seeds', icon: '🌸' },
      { name: 'wildflower seeds', desc: 'Natural eco-mixes to support honeybee pollination', icon: '🌼' },
      { name: 'organic flower seeds', desc: 'Unprocessed seeds for natural floriculture beds', icon: '🌻' },
      { name: 'seasonal flower seeds', desc: 'Winter and summer ornamental flower selections', icon: '🌺' }
    ],
    organic_farming: [
      { name: 'bio fertilizers', desc: 'Azotobacter, Rhizobium cultures for soil activation', icon: '🦠' },
      { name: 'bio pesticides', desc: 'Trichoderma, Pseudomonas crop safety formulas', icon: '🛡️' },
      { name: 'vermicompost', desc: 'Premium earthworm manure for moisture preservation', icon: '🪱' }
    ],
    protective_gear: [
      { name: 'gloves', desc: 'Chemical-resistant nitrile and heavy-duty farm gloves', icon: '🧤' },
      { name: 'masks', desc: 'Spray respirators and dust masks for safety', icon: '🎭' },
      { name: 'hats and boots', desc: 'Wide-brim solar hats and rubber mud boots', icon: '🥾' },
      { name: 'shoes', desc: 'Tough steel-toe field working safety footwear', icon: '👟' }
    ],
    animal_husbandry: [
      { name: 'animal feed', desc: 'High-protein cattle feeds, poultry mash, mineral blocks', icon: '🐄' },
      { name: 'medicine and vaccines', desc: 'Standard livestock veterinary health supplements', icon: '💉' },
      { name: 'fencing and shelter supplier', desc: 'Wire mesh fences, roofing panels, cattle gates', icon: '🚧' },
      { name: 'milking and dairy equipment', desc: 'Milking machines, stainless steel cans, cream separators', icon: '🥛' }
    ],
    farming_equipments: [
      { name: 'hand tools', desc: 'Sickles, spades, pickaxes, and hand weeders', icon: '🛠️' },
      { name: 'Machinery', desc: 'Power weeders, rotavators, spray pumps, tillers', icon: '🚜' },
      { name: 'irrigation tools', desc: 'Drip drip lines, sprinklers, layflat hoses, valves', icon: '🚿' },
      { name: 'planting and harvesting equipment', desc: 'Seed drills, crop reapers, manual seed planters', icon: '🧺' }
    ]
  };

  const items = categoryItems[normalizedCategoryName] || [];

  // Seed Recommender Widget State
  const [season, setSeason] = useState('Kharif');
  const [soilType, setSoilType] = useState('Loamy');
  const [recommendations, setRecommendations] = useState([
    { name: 'Basmati Paddy (Rice)', subCat: 'rice seeds', yield: '4.5 Tons/Acre', depth: '2-3 cm', desc: 'Premium long-grain fragrant rice seed.' }
  ]);

  const handleProduct = (subCatName) => {
    navigate(`/categories/${normalizedCategoryName}/subCategory/${subCatName.replace(/\s+/g, '_')}`);
  };

  // Recommender trigger logic
  const handleCalculateRecommendation = (e) => {
    e.preventDefault();
    let cropResults = [];

    if (season === 'Kharif') {
      if (soilType === 'Loamy' || soilType === 'Alluvial') {
        cropResults = [
          { name: 'Basmati Paddy (Rice)', subCat: 'rice seeds', yield: '4.5 Tons/Acre', depth: '2-3 cm', desc: 'Premium long-grain fragrant rice seed.' },
          { name: 'Hybrid Gold Corn (Maize)', subCat: 'vegetable seeds', yield: '3.5 Tons/Acre', depth: '4-5 cm', desc: 'High starch kernel yielding maize.' }
        ];
      } else {
        cropResults = [
          { name: 'Pearl Millet (Bajra)', subCat: 'rice seeds', yield: '1.8 Tons/Acre', depth: '2 cm', desc: 'Drought-resistant millet seed.' },
          { name: 'Direct-Sow Cotton', subCat: 'vegetable seeds', yield: '2.2 Tons/Acre', depth: '3 cm', desc: 'Bt cotton seeds with pest resistance.' }
        ];
      }
    } else if (season === 'Rabi') {
      if (soilType === 'Loamy' || soilType === 'Alluvial') {
        cropResults = [
          { name: 'Sharbati Wheat', subCat: 'wheat seeds', yield: '5.0 Tons/Acre', depth: '4 cm', desc: 'Premium golden wheat grain seed.' },
          { name: 'Yellow Mustard', subCat: 'vegetable seeds', yield: '1.2 Tons/Acre', depth: '2-3 cm', desc: 'Oilseed crop with high oil yield.' }
        ];
      } else {
        cropResults = [
          { name: 'Desi Chickpeas (Chana)', subCat: 'vegetable seeds', yield: '1.5 Tons/Acre', depth: '5 cm', desc: 'High protein content gram pulse seeds.' },
          { name: 'Six-Row Barley', subCat: 'wheat seeds', yield: '2.5 Tons/Acre', depth: '4 cm', desc: 'Highly tolerant fodder grain seed.' }
        ];
      }
    } else { // Zaid (Summer)
      if (soilType === 'Loamy' || soilType === 'Alluvial') {
        cropResults = [
          { name: 'Hybrid Sweet Watermelon', subCat: 'fruit seeds', yield: '15 Tons/Acre', depth: '2 cm', desc: 'Super sweet red pulp summer melon.' },
          { name: 'Poinsette Cucumber', subCat: 'vegetable seeds', yield: '8 Tons/Acre', depth: '1.5 cm', desc: 'High yield slicing cucumber seeds.' }
        ];
      } else {
        cropResults = [
          { name: 'Organic Moong Bean', subCat: 'vegetable seeds', yield: '0.8 Tons/Acre', depth: '3 cm', desc: 'Nitrogen-fixing pulse crop seeds.' },
          { name: 'Summer Fodder Grass', subCat: 'vegetable seeds', yield: '20 Tons/Acre', depth: '1 cm', desc: 'Fast growing green animal feed grass.' }
        ];
      }
    }
    setRecommendations(cropResults);
    toast.success('Crop recommendations updated based on your soil profile!');
  };

  const isSeeds = normalizedCategoryName === 'seeds';

  return (
    <div className="category-page-wrap container py-xl animate-fade-in">
      
      {/* SEEDS SPECIALIZED MODULE (Option B - Seeds Assistant Recommender Hub) */}
      {isSeeds ? (
        <div className="seeds-hub-container">
          
          {/* Seeds Hero Card */}
          <div className="seeds-hero-banner card-glass">
            <div className="seeds-banner-content">
              <span className="badge badge-primary"><RiSeedlingLine /> Seeds Hub</span>
              <h1>Smart Seeds Selection Hub</h1>
              <p>Optimize your farm yield. Use our agronomic Crop Selection Assistant to find seeds customized to your planting season and soil conditions.</p>
            </div>
            <div className="seeds-banner-illust">🌾</div>
          </div>

          {/* Assistant Recommender Widget */}
          <div className="recommender-widget-layout mt-xl">
            <div className="recommender-input-card card-premium">
              <h3>Crop Selection Assistant</h3>
              <p className="text-meta" style={{ marginBottom: '16px' }}>Provide your field profile parameters to fetch recommendations.</p>
              
              <form onSubmit={handleCalculateRecommendation}>
                <div className="recommender-input-group">
                  <label className="input-label">Select Cropping Season</label>
                  <div className="season-pills-row">
                    {['Kharif', 'Rabi', 'Zaid'].map((s) => (
                      <button
                        key={s}
                        type="button"
                        className={`season-pill-btn ${season === s ? 'active' : ''}`}
                        onClick={() => setSeason(s)}
                      >
                        {s} Season
                      </button>
                    ))}
                  </div>
                </div>

                <div className="quiz-select-field mt-md" style={{ marginBottom: '20px' }}>
                  <label className="input-label">Primary Soil Classification</label>
                  <select value={soilType} onChange={(e) => setSoilType(e.target.value)}>
                    <option>Loamy</option>
                    <option>Sandy</option>
                    <option>Clayey</option>
                    <option>Alluvial</option>
                  </select>
                </div>

                <Button
                  value="Generate Crop Suggestions"
                  type="submit"
                  variant="primary"
                  className="w-full"
                />
              </form>
            </div>

            {/* Recommendations Output */}
            <div className="recommender-output-col">
              <SectionHeader
                title="Recommended Crop Options"
                subtitle="Best suited seeds based on season temperature and water retention metrics."
              />

              <div className="recommendations-list">
                {recommendations.map((crop, idx) => (
                  <div key={idx} className="recommendation-result-card card-glass hover-scale animate-slide-up">
                    <div className="recom-card-badge-row">
                      <span className="badge badge-success"><IoLeafOutline /> High Germination</span>
                    </div>
                    <div className="recom-card-body">
                      <h4>{crop.name}</h4>
                      <p className="text-meta">{crop.desc}</p>
                      <div className="recom-metrics-grid">
                        <div>
                          <span>Est. Yield:</span>
                          <strong>{crop.yield}</strong>
                        </div>
                        <div>
                          <span>Sow Depth:</span>
                          <strong>{crop.depth}</strong>
                        </div>
                      </div>
                    </div>
                    <div className="recom-card-footer">
                      <Button
                        value="Shop Seeds in Store"
                        onclick={() => handleProduct(crop.subCat)}
                        variant="secondary"
                        className="w-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Seeds Subcategories Browsing */}
          <div className="mt-xxl">
            <SectionHeader
              title="Browse Seed Categories"
              subtitle="Choose a category to browse specific seed varieties, check catalog prices, and view stock status."
            />
            
            <div className="categories-pills-grid mt-lg">
              {items.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => handleProduct(item.name)}
                  className="subcategory-modern-card card-premium hover-scale animate-slide-up"
                  style={{ animationDelay: `${idx * 0.05}s` }}
                >
                  <div className="subcat-icon-box">{item.icon}</div>
                  <h4>{item.name.toUpperCase()}</h4>
                  <p>{item.desc}</p>
                  <span className="subcat-link-prompt">Explore Variety ➔</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      ) : (
        // GENERIC REDESIGNED CATEGORY PAGE (Pesticides, Fertilizers, etc.)
        <div className="generic-category-container">
          <SectionHeader
            title={name.toUpperCase()}
            subtitle={`Explore verified agricultural subgroups under ${name.toUpperCase()} category.`}
            badge="Categories Directory"
          />

          <div className="categories-pills-grid mt-lg">
            {items.length > 0 ? (
              items.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => handleProduct(item.name)}
                  className="subcategory-modern-card card-premium hover-scale animate-slide-up"
                  style={{ animationDelay: `${idx * 0.05}s` }}
                >
                  <div className="subcat-icon-box">{item.icon}</div>
                  <h4>{item.name.toUpperCase()}</h4>
                  <p>{item.desc}</p>
                  <span className="subcat-link-prompt">Browse Products ➔</span>
                </div>
              ))
            ) : (
              <div className="text-center py-xl w-full">
                <p style={{ color: 'var(--text-muted)' }}>No subcategories found for this category.</p>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

export default ChooseCategory;