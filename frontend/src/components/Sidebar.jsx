import React from 'react';

const Sidebar = () => {
  return (
    <div className="fixed top-14 bottom-0 lg:top-16 left-0 h-full w-16 md:w-64 border-r-2 border-r-black">
      <div className="flex flex-col gap-4 h-full px-2 py-8">
        <span className="p-2">Product</span>
        <span className="p-2">Order</span>
        <span className="p-2">User</span>
      </div>
    </div>
  );
};

export default Sidebar;
