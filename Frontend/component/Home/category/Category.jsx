import React from 'react';
import './Category.css';
import CategorySection from './SabCategorySection';
import SectionHeader from '../../Resuable_Comp/SectionHeader';

function Category() {
  const categoriesList = [
    {
      name: 'Pesticides',
      image: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=400',
      desc: 'Herbicides & natural organic insect sprays'
    },
    {
      name: 'Seeds',
      image: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?w=400',
      desc: 'Wheat, rice, high-yield vegetable crops'
    },
    {
      name: 'Fertilizers',
      image: 'https://static.vecteezy.com/system/resources/previews/006/037/292/non_2x/hand-giving-fertilizer-to-young-green-sprout-growing-in-soil-on-green-nature-blur-background-free-photo.JPG',
      desc: 'Chemical feeds & slow-release organic fertilizers'
    },
    {
      name: 'Nutrients',
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400',
      desc: 'Plant growth promoters & micro-nutrient mixes'
    },
    {
      name: 'Storage Solutions',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400',
      desc: 'Tarpaulin crop covers, silos, grain storage bags'
    },
    {
      name: 'Flower Seeds',
      image: 'https://images.unsplash.com/photo-1560717789-0ac7c58ac90a?w=400',
      desc: 'Hybrid decorative & seasonal flower cultivars'
    },
    {
      name: 'Organic Farming',
      image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400',
      desc: 'Bio-composts, earthworm manure, neem cakes'
    },
    {
      name: 'Protective Gear',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400',
      desc: 'Rubber gloves, farming boots, spray respirators'
    },
    {
      name: 'Animal Husbandry',
      image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=400',
      desc: 'Nutritious feeds, veterinary vaccines, dairy tools'
    },
    {
      name: 'Farming Equipments',
      image: 'https://tse4.mm.bing.net/th/id/OIP.m5bSfUW5EmEVGaxDT_e56wHaHa?r=0&w=626&h=626&rs=1&pid=ImgDetMain&o=7&rm=3',
      desc: 'Sickles, mechanical rotavators, drip irrigation sets'
    }
  ];

  return (
    <section className="categories-section py-xxl" id="categories-section">
      <div className="container">
        <SectionHeader
          title="Browse Farming Needs"
          subtitle="Shop top quality seeds, fertilizers, tools, and crop protection materials directly from verified supply centers."
          badge="Product Categories"
        />

        <div className="categories-grid">
          {categoriesList.map((cat, idx) => (
            <div key={idx} className="category-card hover-scale animate-slide-up" style={{ animationDelay: `${idx * 0.05}s` }}>
              <CategorySection
                name={cat.name}
                image={cat.image}
              />
              <div className="category-card-meta">
                <p className="category-card-desc">{cat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Category;