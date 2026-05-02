import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = true,
  glow = false,
}) => {
  return (
    <div
      className={`
        glass-card rounded-2xl p-6
        ${hover ? 'transition-all duration-300 hover:border-gold-500/30 hover:shadow-lg' : ''}
        ${glow ? 'gold-glow' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};