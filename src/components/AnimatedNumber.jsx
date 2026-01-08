import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

const AnimatedNumber = ({ value, duration = 2, delay = 0 }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [displayValue, setDisplayValue] = useState(0);

    const startTimeRef = useRef(null);

    useEffect(() => {
        if (!isInView) return;

        let animationFrameId;

        const animate = (timestamp) => {
            if (!startTimeRef.current) startTimeRef.current = timestamp;
            const progress = timestamp - startTimeRef.current;

            // Calculate percentage complete
            const percentage = Math.min(progress / (duration * 1000), 1);

            // Ease out quart
            const ease = 1 - Math.pow(1 - percentage, 4);

            const current = Math.floor(ease * value);
            setDisplayValue(current);

            if (percentage < 1) {
                animationFrameId = requestAnimationFrame(animate);
            }
        };

        const timeoutId = setTimeout(() => {
            animationFrameId = requestAnimationFrame(animate);
        }, delay * 1000);

        return () => {
            cancelAnimationFrame(animationFrameId);
            clearTimeout(timeoutId);
        };
    }, [isInView, value, duration, delay]);

    return (
        <span ref={ref} className="font-serif tabular-nums text-4xl md:text-5xl font-bold text-[#FFD700] text-shadow-gold">
            {displayValue}
        </span>
    );
};

export default AnimatedNumber;
