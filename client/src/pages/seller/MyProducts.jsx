import { useState } from "react";
function MyProducts() {
  const [isStatus, setIsStatus] = useState("approved");
  return (
    <div className="m-4">
      <div className="flex justify-between items-center flex-wrap">
        <div className="flex items-center">
          <p className="text-black text-2xl">MyProducts</p>
        {
              isStatus === 'pending' ?
            <span className=" ml-1 h-6 flex justify-center items-center bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full">{isStatus}</span>
            :
            <span className=" ml-1 h-6 flex justify-center items-center bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full">{isStatus}</span>
          } 
        </div>
        
        <button
        disabled={isStatus === 'pending'} 
        className={`items-center justify-center bg-transparent border p-2 rounded-xl 
          ${isStatus === 'pending'? 
          'bg-gray-400 border-gray-400 text-gray-700 hover:bg-gray-400 hover:text-gray-700 cursor-not-allowed' 
        : 'bg-transparent border-[#5dd39e] text-[#5dd39e] hover:bg-[#5dd39e] hover:text-[#FFFDEC]' } `}>
          + Add Products
        </button>
      </div>
      {isStatus === "pending" ? (
        <div className="bg-gray-300 my-4 p-4 rounded-xl">
            <p> Your seller status is pending. You cannot add products yet.</p>
        </div>
      ) : (
        <div className="">
          {/* here the table will be there */}
        </div>
      )}
    </div>
  );
}

export default MyProducts;
