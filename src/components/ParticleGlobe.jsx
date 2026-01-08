import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Html, Sphere, Trail } from "@react-three/drei";
import * as THREE from "three";
import { easing } from "maath";

// --- constants ---
const GOLD_COLOR = "#FFD700";
const PIN_CORE_COLOR = "#FF4500";
const BG_COLOR = "#000000";

// Helper: Lat/Lon to Vector3
const latLongToVector3 = (lat, lon, radius) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const z = radius * Math.sin(phi) * Math.sin(theta);
    const y = radius * Math.cos(phi);
    return new THREE.Vector3(x, y, z);
};

// --- Particles Component ---
const Particles = ({ count, radius }) => {
    const points = useMemo(() => {
        const p = new Float32Array(count * 3);
        const phi = Math.PI * (3 - Math.sqrt(5));
        for (let i = 0; i < count; i++) {
            const y = 1 - (i / (count - 1)) * 2;
            const radiusAtY = Math.sqrt(1 - y * y);
            const theta = phi * i;

            const x = Math.cos(theta) * radiusAtY;
            const z = Math.sin(theta) * radiusAtY;

            // Add subtle random offset for "organic" feel
            const randomScale = 1 + (Math.random() * 0.03);

            p[i * 3] = x * radius * randomScale;
            p[i * 3 + 1] = y * radius * randomScale;
            p[i * 3 + 2] = z * radius * randomScale;
        }
        return p;
    }, [count, radius]);

    const ref = useRef();

    useFrame((state) => {
        if (!ref.current) return;
        // Idle rotation (independent of container)
        ref.current.rotation.y += 0.0005;
    });

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={points.length / 3}
                    array={points}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.018}
                color={GOLD_COLOR}
                sizeAttenuation={true}
                transparent={true}
                opacity={0.85}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
};

// --- Nearby Locations (Visual Only) ---
const NearbyLocations = ({ radius }) => {
    const points = useMemo(() => {
        const p = new Float32Array(50 * 3); // 50 nearby dots
        for (let i = 0; i < 50; i++) {
            // Random spread
            const lat = 26.15 + (Math.random() - 0.5) * 20;
            const lon = 85.90 + (Math.random() - 0.5) * 20;
            const v = latLongToVector3(lat, lon, radius * 1.01);
            p[i * 3] = v.x; p[i * 3 + 1] = v.y; p[i * 3 + 2] = v.z;
        }
        return p;
    }, [radius]);

    return (
        <points>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" count={50} array={points} itemSize={3} />
            </bufferGeometry>
            <pointsMaterial size={0.015} color="#FFFFFF" transparent opacity={0.4} sizeAttenuation />
        </points>
    )
}

// --- Atmosphere Glow (Fresnel) ---
const Atmosphere = ({ radius }) => {
    const materialRef = useRef();

    const vertexShader = `
      varying vec3 vNormal;
      varying vec3 vPosition;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      varying vec3 vNormal;
      varying vec3 vPosition;
      
      void main() {
        // Calculate Fresnel intensity (rim light)
        vec3 viewDirection = normalize(-vPosition); // Camera is at (0,0,0) in view space
        float intensity = pow(0.6 - dot(vNormal, viewDirection), 4.0);
        
        // Gold Color with fading alpha
        vec3 glowColor = vec3(1.0, 0.84, 0.0); // Gold #FFD700
        gl_FragColor = vec4(glowColor, intensity * 0.8);
      }
    `;

    return (
        <mesh>
            {/* Slightly larger radius for the glow to sit on top/around */}
            <sphereGeometry args={[radius * 1.2, 64, 64]} />
            <shaderMaterial
                ref={materialRef}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                blending={THREE.AdditiveBlending}
                side={THREE.BackSide} /* Render on inside of outer sphere or outside of inner? BackSide creates a halo effect */
                transparent={true}
                depthWrite={false}
            />
        </mesh>
    );
};

// --- Location Pin ---
const LocationPin = ({ position, label, onClick, isFocused, focusState }) => {
    const [hovered, setHovered] = useState(false);
    const meshRef = useRef();

    useFrame((state) => {
        if (!meshRef.current) return;
        // Pulse Animation (Sine InOut)
        const t = state.clock.getElapsedTime();
        const s = 1 + Math.sin(t * 3) * 0.2;
        meshRef.current.scale.setScalar(s);
    });

    return (
        <group position={position} onClick={(e) => { e.stopPropagation(); onClick(); }} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
            {/* Pulsing Core */}
            <mesh ref={meshRef}>
                <sphereGeometry args={[0.04, 16, 16]} />
                <meshBasicMaterial color={PIN_CORE_COLOR} toneMapped={false} />
            </mesh>

            {/* Glow */}
            <mesh>
                <sphereGeometry args={[0.08, 16, 16]} />
                <meshBasicMaterial color={GOLD_COLOR} transparent opacity={0.2} toneMapped={false} />
            </mesh>
        </group>
    );
};

// --- Ripple Effect ---
const Ripple = ({ active, onComplete }) => {
    const ref = useRef();
    const [started, setStarted] = useState(false);

    useEffect(() => {
        if (active) {
            setStarted(true);
            if (ref.current) {
                ref.current.scale.set(0, 0, 0);
                ref.current.material.opacity = 0.6;
            }
        }
    }, [active]);

    useFrame((state, delta) => {
        if (!started || !ref.current) return;

        // Expand
        const currentScale = ref.current.scale.x;
        if (currentScale < 1.5) {
            ref.current.scale.addScalar(delta * 2.5); // Speed of ripple
            ref.current.material.opacity -= delta * 0.8; // Fade out
        } else {
            setStarted(false);
            onComplete();
        }
    });

    if (!started) return null;

    return (
        <mesh ref={ref} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[1.8, 1.85, 64]} />
            <meshBasicMaterial color="#FFD700" transparent side={THREE.DoubleSide} />
        </mesh>
    );
};

// --- Main Globe Scene ---
const GlobeScene = ({ radius = 1.8, isMobile, onPinClick, onGlobeClick }) => {
    const groupRef = useRef();
    const controlsRef = useRef();

    const [focusState, setFocusState] = useState('IDLE');
    const [targetRotation, setTargetRotation] = useState(new THREE.Quaternion());
    const [hovered, setHovered] = useState(false);

    // Performance Optimization: Use Ref for drag state to avoid re-rendering component on every click
    const isDraggingRef = useRef(false);

    const { mouse, camera } = useThree();
    const lastInteractionTime = useRef(Date.now());

    // Ripple State
    const [rippleActive, setRippleActive] = useState(false);

    // Update interaction timer
    const handleInteractionStart = () => { isDraggingRef.current = true; lastInteractionTime.current = Date.now(); };
    const handleInteractionEnd = () => { isDraggingRef.current = false; lastInteractionTime.current = Date.now(); };

    const pinPos = useMemo(() => latLongToVector3(26.15, 85.90, radius), [radius]);

    // Handle Click Sequence
    const handleGlobeClick = (e) => {
        // Only trigger if purely clicking (not dragging end)
        if (!isDraggingRef.current) {
            setRippleActive(true);
            if (onGlobeClick) onGlobeClick();
        }
        e.stopPropagation();
    };

    const handlePinClick = () => {
        // trigger parent callback ALWAYS
        if (onPinClick) onPinClick();

        if (focusState === 'FOCUSED') {
            setFocusState('IDLE');
            return;
        }
        setFocusState('SEARCHING_OUT');

        const targetVector = new THREE.Vector3(0, 0, radius);
        const startVector = pinPos.clone().normalize();
        const endVector = targetVector.clone().normalize();
        const q = new THREE.Quaternion().setFromUnitVectors(startVector, endVector);
        setTargetRotation(q);
    };

    useFrame((state, delta) => {
        // 1. Zoom Logic (Camera Z) & Hover Scale
        let targetZ = 6;
        let dampSpeed = 0.5;
        let targetScale = 1.0;

        if (focusState === 'SEARCHING_OUT') {
            targetZ = 12; // Zoom far out
            dampSpeed = 2;
        }
        if (focusState === 'ROTATING') {
            targetZ = 12;
        }
        if (focusState === 'SEARCHING_IN' || focusState === 'FOCUSED') {
            targetZ = 4.5;
            dampSpeed = 1.5;
        }
        if (focusState === 'IDLE') {
            if (hovered && !isDraggingRef.current) {
                targetZ = 5.5; // Slight zoom in on hover
                targetScale = 1.04; // Gentle scale up (2-4%)
            }
        }

        easing.damp3(state.camera.position, [0, 0, targetZ], dampSpeed, delta);

        // Apply Hover Scale
        if (groupRef.current) {
            easing.damp3(groupRef.current.scale, [targetScale, targetScale, targetScale], 0.3, delta);
        }

        // 2. Rotation Logic & Magnetic Tilt
        if (focusState === 'IDLE' && groupRef.current) {

            if (!isDraggingRef.current) {
                // Check lag time since release
                const timeSinceInteraction = Date.now() - lastInteractionTime.current;

                if (timeSinceInteraction > 2000) { // Wait 2s before returning
                    // Auto-Return to Face Camera
                    // Goal: Rotate Group so Pin Local -> Camera Position
                    const targetQ = new THREE.Quaternion();
                    targetQ.setFromUnitVectors(pinPos.clone().normalize(), camera.position.clone().normalize());

                    // Slerp gently
                    groupRef.current.quaternion.slerp(targetQ, delta * 0.8);
                } else {
                    // Drift / Inertia phase before return
                    groupRef.current.rotation.y += delta * 0.05; // Fading spin
                }
            } else {
                // Dragging: Do nothing, let OrbitControls handle it
                lastInteractionTime.current = Date.now();
            }

        } else if (focusState === 'SEARCHING_OUT') {
            if (state.camera.position.z > 10) setFocusState('ROTATING');
        } else if (focusState === 'ROTATING') {
            if (groupRef.current) {
                const currentQ = groupRef.current.quaternion;
                if (currentQ.angleTo(targetRotation) < 0.02) {
                    groupRef.current.quaternion.copy(targetRotation);
                    setFocusState('SEARCHING_IN');
                } else {
                    currentQ.slerp(targetRotation, delta * 2.5);
                }
            }
        } else if (focusState === 'SEARCHING_IN') {
            if (state.camera.position.z < 6) setFocusState('FOCUSED');
        }
    });

    return (
        <>
            <group
                ref={groupRef}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                onClick={handleGlobeClick}
            >
                {/* Core Sphere */}
                <mesh>
                    <sphereGeometry args={[radius * 0.99, 64, 64]} />
                    <meshBasicMaterial color={BG_COLOR} />
                </mesh>

                <Particles count={isMobile ? 6000 : 15000} radius={radius} />
                <NearbyLocations radius={radius} />
                <Atmosphere radius={radius} />
                <Ripple active={rippleActive} onComplete={() => setRippleActive(false)} />

                <LocationPin
                    position={pinPos}
                    label={{ title: "NK Sah Rental House" }}
                    onClick={() => handlePinClick()}
                    isFocused={focusState === 'FOCUSED'}
                    focusState={focusState}
                />
            </group>

            <OrbitControls
                ref={controlsRef}
                enablePan={false}
                enableZoom={false}
                enabled={focusState === 'IDLE' || focusState === 'FOCUSED'}
                minPolarAngle={Math.PI / 3}
                maxPolarAngle={Math.PI / 1.5}
                // Interaction Smoothness Tuning
                enableDamping={true}
                dampingFactor={0.03} // Very smooth inertia
                rotateSpeed={0.35} // "Heavy" feel

                // Events to toggle "Drag Mode"
                onStart={handleInteractionStart}
                onEnd={handleInteractionEnd}

                enableRotate={!isMobile}
            />
        </>
    );
};

export default function ParticleGlobe() {
    const [isMobile, setIsMobile] = useState(false);
    const [showLabel, setShowLabel] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(/Mobi|Android/i.test(navigator.userAgent) || window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    return (
        <div className="relative z-10 fade-in-scale flex items-center justify-center pointer-events-none lg:pointer-events-auto">
            {/* Circular Container - Centered and constrained */}
            <div className="
                relative 
                w-[300px] h-[300px] 
                md:w-[450px] md:h-[450px] 
                lg:w-[600px] lg:h-[600px] 
                rounded-full 
                overflow-hidden 
                shadow-[0_0_50px_rgba(255,215,0,0.15),inset_0_0_60px_rgba(0,0,0,0.5)] 
                border border-white/10
                pointer-events-auto
             ">
                <Canvas
                    camera={{ position: [0, 0, 8.5], fov: 45 }}
                    gl={{
                        antialias: true,
                        alpha: true,
                        powerPreference: "high-performance",
                        pixelRatio: typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1
                    }}
                    className="w-full h-full"
                >
                    <fog attach="fog" args={['#000', 5, 30]} />
                    {/* Lighting */}
                    <ambientLight intensity={1.5} />
                    <pointLight position={[10, 10, 10]} intensity={1} color="#FFD700" />

                    <GlobeScene
                        radius={2.2}
                        isMobile={isMobile}
                        onPinClick={() => setShowLabel(true)}
                        onGlobeClick={() => setShowLabel(false)}
                    />
                </Canvas>

                {/* Centered Overlay Label with Pointer */}
                <div
                    className={`
                        absolute inset-0 z-[100] flex flex-col items-center justify-center pb-12 md:pb-24
                        pointer-events-none transition-all duration-500
                        ${showLabel ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                    `}
                >
                    <div
                        className="pointer-events-auto relative bg-black/90 border border-[#FFD700] backdrop-blur-xl text-white px-4 py-2 md:px-5 md:py-3 rounded-xl shadow-[0_0_20px_rgba(255,215,0,0.2)] cursor-pointer hover:bg-black transition-all group max-w-[85%]"
                        onClick={() => setShowLabel(false)}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FFD700]/10 to-transparent opacity-50 rounded-xl"></div>
                        <div className="flex items-center gap-2 md:gap-3">
                            <h3 className="font-bold text-[#FFD700] text-xs md:text-lg tracking-wide uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] flex items-center gap-2 whitespace-nowrap">
                                <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#FFD700] animate-pulse shadow-[0_0_10px_#FFD700]"></span>
                                NK Sah Rental House
                            </h3>
                            <button className="text-white/50 group-hover:text-white hover:scale-110 transition-transform p-0.5">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:w-4 md:h-4"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                        </div>
                    </div>
                    {/* Connecting Line to Center (Red Dot) */}
                    <div className="w-px h-12 md:h-24 bg-gradient-to-b from-[#FFD700] to-transparent shadow-[0_0_8px_#FFD700]"></div>
                    {/* Tiny endpoint dot to fuse with the 3D dot */}
                    <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-[#FFD700] shadow-[0_0_10px_#FFD700]"></div>
                </div>

            </div>
        </div>
    );
}
