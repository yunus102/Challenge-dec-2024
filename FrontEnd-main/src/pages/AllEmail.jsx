import React, { useState, useEffect } from 'react';
import { Container, Card } from '../components/index.js';
import authService from '../service/auth.service.js';

function AllEmail() {
    const [emails, setEmails] = useState([]);
    const [selectedEmailId, setSelectedEmailId] = useState(null); // Store selected email ID
    const [selectedEmailDetails, setSelectedEmailDetails] = useState(null); // Store full email details
    const [loading, setLoading] = useState(false); // Loading state for API call
    const [filter, setFilter] = useState('All'); // State for email filter

    useEffect(() => {
        authService.getEmails().then((email) => {
            if (email.length > 0) {
                setEmails(email);
            }
        });
    }, []);

    // Filtered emails based on the selected filter
    const filteredEmails = emails.filter((mail) => {
        if (filter === 'Unread') return mail.unread;
        if (filter === 'Read') return mail.read;
        if (filter === 'Favorites') return mail.favourite;
        return true; // For 'All' filter
    });

    // Function to handle email click and fetch detailed email content
    const handleEmailClick = (emailId) => {
        setSelectedEmailId(emailId); // Update selected email ID
        setLoading(true); // Start loading while fetching data
        authService.fetchEmailDetail(emailId) // Make API call to fetch detailed email data
            .then((details) => {
                setSelectedEmailDetails(details); // Set the detailed email data
                setLoading(false); // Stop loading after data is fetched
            })
            .catch(() => {
                setLoading(false); // Stop loading even if there is an error
            });
    };

    const handleFavoriteToggle = () => {
      
        authService.toggleFavorite(selectedEmailId)
            .then((updatedDetails) => {
                setSelectedEmailDetails(updatedDetails);
                setEmails((prevEmails) =>
                    prevEmails.map((email) =>
                        email.id === selectedEmailId
                            ? { ...email, favourite: updatedDetails.data.favourite } // Update favorite status
                            : email
                    )
                );
                handleEmailClick(selectedEmailId)
            })
            .catch(() => {
                
            });
    };

    const stripHtmlTags = (html) => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || "";
    };

    return (
        <div className="w-full py-8">
            {/* Filter Buttons */}
            <div className="flex justify-start mb-4">
                Filter By :   
                <button 
                    className={`mr-4 pl-5 ${filter === 'Unread' ? 'text-blue-500' : 'text-gray-500'}`} 
                    onClick={() => setFilter('Unread')}
                >
                    Unread
                </button>
                <button 
                    className={`mr-4 ${filter === 'Read' ? 'text-blue-500' : 'text-gray-500'}`} 
                    onClick={() => setFilter('Read')}
                >
                    Read
                </button>
                <button 
                    className={`mr-4 ${filter === 'Favorites' ? 'text-blue-500' : 'text-gray-500'}`} 
                    onClick={() => setFilter('Favorites')}
                >
                    Favorites
                </button>
                <button 
                    className={`mr-4 ${filter === 'All' ? 'text-blue-500' : 'text-gray-500'}`} 
                    onClick={() => setFilter('All')}
                >
                    All
                </button>
            </div>
            <div className="flex">
                {/* Left Column: Email List */}
                <div className={`overflow-y-auto h-screen p-4 ${selectedEmailId ? 'w-1/3' : 'w-full'}`}>
                    {filteredEmails.map((mail, index) => (
                        <div 
                            
                            key={index} 
                            className={`p-2 m-0 cursor-pointer  ${mail.read ? 'bg-gray-200' : ''} ${selectedEmailId === mail.id ? 'border-2 border-red-400' : ''}`} 
                            onClick={() => handleEmailClick(mail.id)} // Pass email ID on click
                        >
                            <Card 
                                id={mail.id}
                                from={mail.from}
                                avatar={mail.avatar}
                                subject={mail.subject}
                                description={mail.short_description}
                                date={mail.date}
                                favourite={mail.favourite}
                                read={mail.read}
                                unread={mail.unread}
                            />
                        </div>
                    ))}
                </div>

                {/* Right Column: Full Email View */}
                {selectedEmailId && ( // Only render if an email is selected
                    <div className="w-2/3 p-4">
                        {loading ? (
                            <div>Loading...</div> // Show loading state
                        ) : selectedEmailDetails ? (
                                <div className="p-6 bg-white shadow-md rounded-lg">
                                    <div className="flex items-center mb-4">
                                        <div className="bg-red-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold">
                                            <img src={selectedEmailDetails.data.avatar} alt="" />
                                        </div>
                                        <div className="ml-4">
                                            <p className="font-bold">{selectedEmailDetails.data.subject}</p>
                                            <p className="text-sm text-gray-500">{selectedEmailDetails.data.readableDate} <span className="font-semibold text-gray-800"></span></p>
                                        </div>
                                        <div className='ml-auto'>
                                            <button className="text-pink-500 font-semibold" onClick={handleFavoriteToggle}>
                                                    {selectedEmailDetails.data.favourite ? "Remove from Favorites" : "Mark as Favorite"}
                                            </button>
                                        </div>
                                    </div>

                                <div className="mb-4">{stripHtmlTags(selectedEmailDetails.data.emailBody)}</div> {/* Render full email body */}

                            </div>
                        ) : (
                            <div className="text-gray-500">Select an email to view its content</div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default AllEmail;
