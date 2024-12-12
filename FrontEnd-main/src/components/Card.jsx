import React from 'react';

function Card({ id, from, avatar, subject, description, date, favourite, read, unread }) {
  return (
    <div className='flex items-center justify-center w-full '>
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl "> {/* Adjusted width */}
            <div className="flex items-center mb-4 ">
                <div className="bg-red-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold">
                    <img src={avatar} alt="" />
                </div>
                <div className="ml-4">
                    <p className="font-bold">{from.name} &lt;{from.email}&gt;</p>
                    <p className="text-sm text-gray-500 text-left">Subject: <span className="font-semibold text-gray-800">{subject}</span></p>
                </div>
            </div>
        
            <p className="text-gray-700 mb-4">Description: {description}</p>
            
            <div className="text-sm text-gray-500 flex justify-between">
                <span>{date}</span>
                <a href="#" className="text-pink-500 font-semibold">{favourite ? "favourite": ""}</a>
            </div>
        </div>
    </div>
  );
}

export default Card;
