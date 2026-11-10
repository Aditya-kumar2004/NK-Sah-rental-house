import React, { useState, useEffect, useRef, useCallback } from 'react';

const CLIPS_DESKTOP = [
    '/hero/hero-1.mp4',
    '/hero/hero-2.mp4',
    '/hero/hero-3.mp4',
    '/hero/hero-4.mp4',
];

const CLIPS_MOBILE = [
    '/hero/hero-1-m.mp4',
    '/hero/hero-2-m.mp4',
    '/hero/hero-3-m.mp4',
    '/hero/hero-4-m.mp4',
];

const POSTERS = [
    '/hero/hero-day-wide.jpg',
    '/hero/hero-dusk-wide.jpg',
    '/hero/hero-day-wide.jpg',
    '/hero/hero-dusk-wide.jpg',
];

const HeroVideoPlayer = ({ onClipChange }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [activeSlot, setActiveSlot] = useState('A'); // 'A' or 'B'
    const [isMobile, setIsMobile] = useState(false);
    const [shouldPlayVideo, setShouldPlayVideo] = useState(true);
    const [hasVideoError, setHasVideoError] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const videoRefA = useRef(null);
    const videoRefB = useRef(null);
    const containerRef = useRef(null);
    const isVisibleRef = useRef(true);

    // Track active index in ref for event callbacks
    const currentIndexRef = useRef(0);
    currentIndexRef.current = currentIndex;

    const activeSlotRef = useRef('A');
    activeSlotRef.current = activeSlot;

    const isTransitioningRef = useRef(false);
    isTransitioningRef.current = isTransitioning;

    // Detect device width, data-saver, and prefers-reduced-motion
    useEffect(() => {
        const mediaWidth = window.matchMedia('(min-width: 768px)');
        const mediaMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

        const checkCapabilities = () => {
            const mobile = !mediaWidth.matches;
            setIsMobile(mobile);

            const reducedMotion = mediaMotion.matches;
            const saveData = Boolean(
                navigator.connection && navigator.connection.saveData
            );

            if (reducedMotion || saveData) {
                setShouldPlayVideo(false);
            } else {
                setShouldPlayVideo(true);
            }
        };

        checkCapabilities();

        mediaWidth.addEventListener('change', checkCapabilities);
        mediaMotion.addEventListener('change', checkCapabilities);

        return () => {
            mediaWidth.removeEventListener('change', checkCapabilities);
            mediaMotion.removeEventListener('change', checkCapabilities);
        };
    }, []);

    // Get current playlist based on mobile vs desktop
    const clips = isMobile ? CLIPS_MOBILE : CLIPS_DESKTOP;

    // Switch to target clip with smooth 800ms crossfade
    const transitionToClip = useCallback(
        (targetIndex) => {
            if (isTransitioningRef.current) return;
            const currentSlot = activeSlotRef.current;
            const nextSlot = currentSlot === 'A' ? 'B' : 'A';
            const nextVideo = nextSlot === 'A' ? videoRefA.current : videoRefB.current;
            const currentVideo = currentSlot === 'A' ? videoRefA.current : videoRefB.current;

            if (!nextVideo) return;

            setIsTransitioning(true);

            // Prepare next video
            const nextSrc = clips[targetIndex];
            if (nextVideo.getAttribute('data-src') !== nextSrc) {
                nextVideo.src = nextSrc;
                nextVideo.setAttribute('data-src', nextSrc);
                nextVideo.load();
            }

            nextVideo.currentTime = 0;
            const playPromise = nextVideo.play();
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        // Smoothly crossfade
                        setActiveSlot(nextSlot);
                        setCurrentIndex(targetIndex);
                        if (onClipChange) onClipChange(targetIndex);

                        // Once fade completes (800ms), pause old video and preload the following clip
                        setTimeout(() => {
                            if (currentVideo) {
                                currentVideo.pause();
                                const followingIndex = (targetIndex + 1) % clips.length;
                                const followingSrc = clips[followingIndex];
                                currentVideo.src = followingSrc;
                                currentVideo.setAttribute('data-src', followingSrc);
                                currentVideo.load();
                            }
                            setIsTransitioning(false);
                        }, 850);
                    })
                    .catch((err) => {
                        console.warn('Video playback notice:', err);
                        setIsTransitioning(false);
                    });
            }
        },
        [clips, onClipChange]
    );

    // Initial load & autoplay for Slot A and preload for Slot B
    useEffect(() => {
        if (!shouldPlayVideo || hasVideoError) return;

        const videoA = videoRefA.current;
        const videoB = videoRefB.current;

        if (videoA && clips[0]) {
            videoA.muted = true;
            videoA.src = clips[0];
            videoA.setAttribute('data-src', clips[0]);
            videoA.load();
            videoA
                .play()
                .catch((e) => {
                    console.warn('Autoplay prevented or unsupported:', e);
                });
        }

        if (videoB && clips[1]) {
            videoB.muted = true;
            videoB.src = clips[1];
            videoB.setAttribute('data-src', clips[1]);
            videoB.load();
        }
    }, [shouldPlayVideo, hasVideoError, isMobile, clips]);

    // Setup timeupdate and ended listeners on both video elements
    useEffect(() => {
        const handleTimeUpdate = (slotName, videoEl) => {
            if (activeSlotRef.current !== slotName || isTransitioningRef.current) return;
            if (videoEl.duration && videoEl.currentTime >= videoEl.duration - 0.8) {
                const nextIndex = (currentIndexRef.current + 1) % clips.length;
                transitionToClip(nextIndex);
            }
        };

        const handleEnded = (slotName) => {
            if (activeSlotRef.current !== slotName || isTransitioningRef.current) return;
            const nextIndex = (currentIndexRef.current + 1) % clips.length;
            transitionToClip(nextIndex);
        };

        const videoA = videoRefA.current;
        const videoB = videoRefB.current;

        const onTimeA = () => videoA && handleTimeUpdate('A', videoA);
        const onTimeB = () => videoB && handleTimeUpdate('B', videoB);
        const onEndA = () => handleEnded('A');
        const onEndB = () => handleEnded('B');
        const onError = (e) => {
            console.warn('Hero video failed to load, falling back to poster:', e);
            setHasVideoError(true);
        };

        if (videoA) {
            videoA.addEventListener('timeupdate', onTimeA);
            videoA.addEventListener('ended', onEndA);
            videoA.addEventListener('error', onError);
        }
        if (videoB) {
            videoB.addEventListener('timeupdate', onTimeB);
            videoB.addEventListener('ended', onEndB);
            videoB.addEventListener('error', onError);
        }

        return () => {
            if (videoA) {
                videoA.removeEventListener('timeupdate', onTimeA);
                videoA.removeEventListener('ended', onEndA);
                videoA.removeEventListener('error', onError);
            }
            if (videoB) {
                videoB.removeEventListener('timeupdate', onTimeB);
                videoB.removeEventListener('ended', onEndB);
                videoB.removeEventListener('error', onError);
            }
        };
    }, [clips, transitionToClip]);

    // Battery / Resource saving: Pause when out of viewport or tab hidden
    useEffect(() => {
        const handleVisibilityChange = () => {
            const isTabHidden = document.visibilityState === 'hidden';
            const activeVideo =
                activeSlotRef.current === 'A' ? videoRefA.current : videoRefB.current;
            if (!activeVideo) return;

            if (isTabHidden || !isVisibleRef.current) {
                activeVideo.pause();
            } else if (shouldPlayVideo && !hasVideoError) {
                activeVideo.play().catch(() => {});
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        const observer = new IntersectionObserver(
            ([entry]) => {
                isVisibleRef.current = entry.isIntersecting;
                handleVisibilityChange();
            },
            { threshold: 0.15 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            observer.disconnect();
        };
    }, [shouldPlayVideo, hasVideoError]);

    const activePoster = POSTERS[currentIndex] || POSTERS[0];

    return (
        <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden bg-[#FFF8EE] dark:bg-black select-none pointer-events-none">
            {/* Base Poster Layer with Ken-Burns slow zoom on reduced motion or video disabled/failure */}
            <picture className="absolute inset-0 w-full h-full">
                <source srcSet="/hero/hero.webp" type="image/webp" />
                <img
                    src={activePoster}
                    alt="NK Sah Rental House exterior view"
                    className={`w-full h-full object-cover object-center ${
                        !shouldPlayVideo || hasVideoError ? 'animate-kenburns' : ''
                    }`}
                    loading="eager"
                    decoding="async"
                />
            </picture>

            {/* Video Slot A */}
            {shouldPlayVideo && !hasVideoError && (
                <video
                    ref={videoRefA}
                    muted
                    playsInline
                    autoPlay
                    preload="auto"
                    poster={POSTERS[0]}
                    className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-800 ease-in-out ${
                        activeSlot === 'A' ? 'opacity-100' : 'opacity-0'
                    }`}
                />
            )}

            {/* Video Slot B */}
            {shouldPlayVideo && !hasVideoError && (
                <video
                    ref={videoRefB}
                    muted
                    playsInline
                    preload="auto"
                    poster={POSTERS[1] || POSTERS[0]}
                    className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-800 ease-in-out ${
                        activeSlot === 'B' ? 'opacity-100' : 'opacity-0'
                    }`}
                />
            )}

            {/* DARK MODE ONLY: Proven cinematic dark overlay (user confirmed correct, DO NOT change) */}
            <div
                className="hidden dark:block absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-transparent lg:to-black/30 pointer-events-none z-[1]"
                aria-hidden="true"
            />

            {/* DARK MODE ONLY: Bottom transition into dark background */}
            <div
                className="hidden dark:block absolute bottom-0 left-0 right-0 h-12 md:h-14 bg-gradient-to-t from-[#121417] to-transparent pointer-events-none z-[1]"
                aria-hidden="true"
            />
        </div>
    );
};

export default HeroVideoPlayer;

