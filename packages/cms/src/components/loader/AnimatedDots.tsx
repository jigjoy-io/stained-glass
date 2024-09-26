import React, { useEffect, useState } from 'react';

const AnimatedDots = ({ color = 'currentColor', size = 4, spacing = 2 }) => {
    const [dots, setDots] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prevDots) => {
                if (prevDots.length >= 3) return '.';
                return prevDots + '.';
            });
        }, 500);

        return () => clearInterval(interval);
    }, []);

    return (
        <span className="inline-flex items-center pb-[5px]">
            {[0, 1, 2].map((index) => (
                <span
                    key={index}
                    className={`inline-block rounded-full transition-opacity duration-300 ease-in-out ${index < dots.length ? 'opacity-100' : 'opacity-20'
                        }`}
                    style={{
                        width: `${size}px`,
                        height: `${size}px`,
                        backgroundColor: color,
                        marginLeft: index === 0 ? 0 : `${spacing}px`,
                    }}
                />
            ))}
        </span>
    );
};

export default AnimatedDots;