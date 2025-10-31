import React from 'react';

interface AboutCompanyProps {
    name: string;
    about: string;
}

const AboutCompany: React.FC<AboutCompanyProps> = ({ name, about }) => {
    return (
        <div className="bg-gray-800/50 backdrop-blur-sm shadow-2xl rounded-2xl p-6 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-4">About {name}</h2>
            <p className="text-gray-300 leading-relaxed">{about}</p>
        </div>
    );
};

export default AboutCompany;
