"use client";

import React, { useState } from 'react';
import { Poppins } from 'next/font/google';
import { FaSearch } from 'react-icons/fa';
import { TbCurrentLocation } from "react-icons/tb";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['800'], // 800 là Extra Bold
});

export default function Header() {
  // false = Nằm trái (Dark Mode)
  // true = Nằm phải (Light Mode)
  const [isOn, setIsOn] = useState(false);

  return (
    <header className="w-full flex items-center pt-[20px] pl-[7.2%]">
      
      {/* --- 1. CỤM SWITCH + TEXT --- */}
      {/* group: để bao bọc cả nút và chữ */}
      <div className="flex flex-col items-center relative">
        
        {/* === NÚT SWITCH === */}
        <div 
          onClick={() => setIsOn(!isOn)}
          className="
            w-[70px] h-[30px] bg-[#D9D9D9] rounded-full 
            relative cursor-pointer transition-colors duration-300
          "
        >
          {/* Cục tròn (Toggle) */}
          <div 
            className={`
              w-[20px] h-[20px] bg-[#111111] rounded-full shadow-md
              absolute top-[5px] transition-all duration-300
              ${isOn ? 'left-[44px]' : 'left-[4px]'}
            `}
          >
            {/* Giải thích toán học:
               - top-[5px]: (30px chiều cao cha - 20px chiều cao con) / 2 = 5px (Căn giữa dọc chuẩn)
               - left-[4px]: Cách trái 4px.
               - left-[46px]: 70px (rộng) - 20px (nút) - 4px (lề) = 46px (Cách phải 4px chuẩn)
            */}
          </div>
        </div>

        {/* === DÒNG CHỮ Ở DƯỚI === */}
        {/* absolute top-full: Đẩy xuống đáy của div cha */}
        {/* mt-1: Cách nút switch đúng 4px */}
        <span className={`absolute top-full mt-1 text-[12px] ${poppins.className}`}>
          {isOn ? 'Light Mode' : 'Dark Mode'}
        </span>
      
      </div>

      {/* --- 2. SEARCH BAR (CẬP NHẬT MỚI) --- */}
      {/* - ml-[8.8%]: Giữ nguyên khoảng cách
          - w-[53%]: (803px / 1512px) => Rộng hơn bản cũ
          - h-[62px]: Chiều cao đúng chuẩn thiết kế
          - rounded-[30px]: Bo tròn nhiều hơn cho hợp với độ cao 62px
      */}
      <div className="
        ml-[12.9%] w-[50%] h-[40px] 
        bg-[#444444] rounded-[30px] shadow-sm
        flex items-center pl-[20px] pr-6 overflow-hidden
      ">
        {/* Icon Search */}
        <FaSearch className="text-gray-200 text-[20px] mr-[13px]" />
        
        {/* Input nhập liệu */}
        <input 
          type="text" 
          placeholder="Search for your preffered city..." 
          style={{ color: 'white' }}
          className="w-full h-full bg-transparent outline-none border-none text-[20px] placeholder-gray-400 font-medium"
        />
      </div>
      {/* --- 3. CURRENT LOCATION (Giữ nguyên) --- */}
      <button className="
        ml-[12.8%] w-fit px-5 h-[40px] 
        bg-[#4CBB17] hover:bg-[#3D9612] transition-colors duration-200
        border-none outline-none cursor-pointer
        items-center justify-center rounded-[30px] flex text-[14px] whitespace-nowrap
     ">
        <TbCurrentLocation className="text-white text-[18px] mr-[4px]"/>
            <span style={{ color: '#FFFFFF' }} className={`text-white ${poppins.className}`}>
                Current Location
            </span>
      </button>
    </header>
  );
}