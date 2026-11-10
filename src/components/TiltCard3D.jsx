import React, { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

const TiltCard3D = ({
    children,
    className = '',
    innerClassName = '',
    glowOnHover = false,
    intensity = 10,
    noPadding = false,
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
                y: isHovering ? -4 : 0,
            }}
            transition={{
                type: 'spring',
                stiffness: 300,
                damping: 25,
                mass: 0.5,
            }}
            style={{
                transformStyle: 'preserve-3d',
            }}
        >
            <div
                className={`relative bg-card border border-border/80 rounded-2xl transition-all duration-300 ${
                    noPadding ? '' : 'p-6 md:p-8'
                } ${
                    isHovering
                        ? 'shadow-card-hover border-primary/40'
                        : 'shadow-card'
                } ${innerClassName}`}
                style={{
                    transformStyle: 'preserve-3d',
                }}
            >
                {glowOnHover && (
                    <div
                        className="absolute inset-0 rounded-2xl transition-opacity duration-500 pointer-events-none"
                        style={{
                            background: 'radial-gradient(circle at center, hsl(var(--primary) / 0.08), transparent 70%)',
                            opacity: isHovering ? 1 : 0,
                        }}
                    />
                )}
                <div style={{ transform: 'translateZ(10px)' }} className="h-full">
                    {children}
                </div>
            </div>
        </motion.div>
    );
};

export default TiltCard3D;
