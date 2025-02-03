const DemoCard = () => {
    return (
      <div className="flex flex-col gap-4 bg-gray-200 animate-pulse rounded-lg p-4 shadow-md border border-gray-300 w-60 h-32">
        <div className="h-4 bg-gray-300 rounded w-1/3"></div>
  
        <div className="flex items-center justify-between">
          <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
          <div className="h-4 bg-gray-300 rounded w-12"></div>
        </div>
      </div>
    );
  };
  
  export default DemoCard;
  