import React, { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

const TiltCard3D = ({
    children,
    className = '',
    glowOnHover = true,
    intensity = 15,
}) => {
    const cardRef = useRef(null);
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseMove = useCallback((e) => {
        if (!cardRef.current) return;

        const card = cardRef.current;
        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;

        const rotateXValue = (mouseY / (rect.height / 2)) * -intensity;
        const rotateYValue = (mouseX / (rect.width / 2)) * intensity;

        setRotateX(rotateXValue);
        setRotateY(rotateYValue);
    }, [intensity]);

    const handleMouseEnter = () => {
        setIsHovering(true);
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
        setRotateX(0);
        setRotateY(0);
    };

    return (
        <motion.div
            ref={cardRef}
            className={`perspective-1000 ${className}`}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            animate={{
                rotateX,
                rotateY,
                scale: isHovering ? 1.02 : 1,
            }}
            transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
                mass: 0.5,
            }}
            style={{
                transformStyle: 'preserve-3d',
            }}
        >
            <div
                className={`relative glass-card p-6 md:p-8 transition-shadow duration-500 ${glowOnHover && isHovering ? 'shadow-glow shadow-elevated' : 'shadow-card'
                    }`}
                style={{
                    transformStyle: 'preserve-3d',
                }}
            >
                {/* Subtle inner glow effect */}
                <div
                    className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 pointer-events-none"
                    style={{
                        background: 'radial-gradient(circle at center, hsl(38 70% 50% / 0.1), transparent 70%)',
                        opacity: isHovering ? 1 : 0,
                    }}
                />
                <div style={{ transform: 'translateZ(20px)' }}>
                    {children}
                </div>
            </div>
        </motion.div>
    );
};

export default TiltCard3D;
