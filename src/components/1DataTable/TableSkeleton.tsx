import React from 'react';
import './TableSkeleton.scss';

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
  showHeader?: boolean;
  showPagination?: boolean;
  className?: string;
}

const TableSkeleton: React.FC<TableSkeletonProps> = ({
  rows = 5,
  columns = 4,
  showHeader = true,
  showPagination = true,
  className = '',
}) => {
  return (
    <div className={`table-skeleton ${className}`}>
      {/* Skeleton Table */}
      <div className="table-skeleton__container">
        <table className="table-skeleton__table">
          {/* Header Skeleton */}
          {showHeader && (
            <thead className="table-skeleton__header">
              <tr className="table-skeleton__header-row">
                {Array.from({ length: columns }, (_, index) => (
                  <th key={index} className="table-skeleton__header-cell">
                    <div className="table-skeleton__shimmer table-skeleton__shimmer--header" />
                  </th>
                ))}
              </tr>
            </thead>
          )}
          
          {/* Body Skeleton */}
          <tbody className="table-skeleton__body">
            {Array.from({ length: rows }, (_, rowIndex) => (
              <tr key={rowIndex} className="table-skeleton__row">
                {Array.from({ length: columns }, (_, colIndex) => (
                  <td key={colIndex} className="table-skeleton__cell">
                    <div 
                      className="table-skeleton__shimmer table-skeleton__shimmer--cell"
                      style={{ 
                        width: `${Math.random() * 40 + 60}%`, // Largura variável entre 60-100%
                        animationDelay: `${(rowIndex * columns + colIndex) * 0.1}s` 
                      }}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Skeleton */}
      {showPagination && (
        <div className="table-skeleton__pagination">
          <div className="table-skeleton__pagination-info">
            <div className="table-skeleton__shimmer table-skeleton__shimmer--text" style={{ width: '120px' }} />
          </div>
          
          <div className="table-skeleton__pagination-controls">
            {Array.from({ length: 5 }, (_, index) => (
              <div 
                key={index} 
                className="table-skeleton__shimmer table-skeleton__shimmer--button"
              />
            ))}
          </div>
          
          <div className="table-skeleton__page-size">
            <div className="table-skeleton__shimmer table-skeleton__shimmer--select" />
          </div>
        </div>
      )}
    </div>
  );
};

export default TableSkeleton; 