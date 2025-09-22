import { GiCardboardBoxClosed } from "react-icons/gi";
import { FaCheck } from "react-icons/fa6";
import { FaBan } from "react-icons/fa";
function SellerDashboard() {
  return (
    <div className="bg-[#bdbeba00] !text-[#fff] h-full">
      <div className="flex flex-col justify-center gap-1 md:flex-row">
        <span className="flex flex-col m-4 py-4 px-6 bg-[#a590cf] rounded-2xl">
          <span className="w-12 h-12 p-1 mb-2 flex justify-center items-center rounded-full bg-[#09376e]"><GiCardboardBoxClosed size={25}/></span>
          <span className="text-sm sm:text-lg">Total Products</span>
          <p className="text-2xl">10</p>
        </span>
        <span className="flex flex-col m-4 py-4 px-6 bg-[#57e35e] rounded-2xl">
          <span className="w-12 h-12 p-1 mb-2 flex justify-center items-center rounded-full bg-[#09376e]"><FaCheck size={20} /></span>
          <span className="text-sm sm:text-lg">Approved Products</span>
          <p className="text-2xl">10</p>
        </span>
        <span className="flex flex-col m-4 py-4 px-6 bg-[#bd6666] rounded-2xl">
          <span className="w-12 h-12 p-1 mb-2 flex justify-center items-center rounded-full bg-[#09376e]"><FaBan size={20}/></span>
          <span className="text-sm sm:text-lg">Rejected Products</span>
          <p className="text-2xl">10</p>
        </span>
      </div>
      {/* <div className="bg-[#203b44] m-4 flex justify-center items-center h-30 rounded-lg">
        chart here showing total sales each month
      </div> */}
    </div>
  )
}

export default SellerDashboard