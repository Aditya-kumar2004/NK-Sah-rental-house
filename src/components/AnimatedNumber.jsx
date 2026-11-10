import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

const AnimatedNumber = ({ value, duration = 1.8, delay = 0 }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-40px' });
    const [displayValue, setDisplayValue] = useState(0);
    const startTimeRef = useRef(null);

    const isDecimal = typeof value === 'number' && !Number.isInteger(value);

    useEffect(() => {
        if (!isInView) return;

        let animationFrameId;

        const animate = (timestamp) => {
            if (!startTimeRef.current) startTimeRef.current = timestamp;
            const progress = timestamp - startTimeRef.current;
            const percentage = Math.min(progress / (duration * 1000), 1);

            // Quartic ease-out
            const ease = 1 - Math.pow(1 - percentage, 4);

            if (isDecimal) {
                const current = (ease * value).toFixed(1);
                setDisplayValue(current);
            } else {
                const current = Math.floor(ease * value);
                setDisplayValue(current);
            }

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
    }, [isInView, value, duration, delay, isDecimal]);

    return (
        <span ref={ref} className="tabular-nums">
            {displayValue}
        </span>
    );
};

export default AnimatedNumber;
