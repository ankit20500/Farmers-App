import React from 'react';
import { FaBan } from 'react-icons/fa';
import Button from './Button';
import './ReusableComponents.css';

function EmptyState({ 
  icon = <FaBan />, 
  title = 'No Data Found', 
  description = 'Sorry! We could not find anything matching this category.', 
  actionLabel, 
  onAction,
  className = ''
}) {
  return (
    <div className={`empty-state-card ${className} animate-slide-up`}>
      <div className="empty-state-icon">{icon}</div>
      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-desc">{description}</p>
      {actionLabel && onAction && (
        <div className="empty-state-action">
          <Button value={actionLabel} onclick={onAction} variant="primary" />
        </div>
      )}
    </div>
  );
}

export default EmptyState;
