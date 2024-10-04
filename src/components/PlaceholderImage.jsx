export function PlaceholderImage({ width, height, className }) {
    return (
      <div 
        className={`bg-gray-200 rounded-lg flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <span className="text-gray-400 text-sm">{width}x{height}</span>
      </div>
    );
  }