"use client";

import { useRef, useState, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";

const DOMAIN_POINTS = [
    {
        id: "ai",
        label: "Artificial Intelligence",
        description: "Deep learning, neural networks, and AI-powered systems",
        lat: 40,
        lng: 30,
        color: "#4f8cff",
    },
    {
        id: "ds",
        label: "Data Science",
        description: "Statistical analysis, data pipelines, and predictive modeling",
        lat: -20,
        lng: -60,
        color: "#a78bfa",
    },
    {
        id: "ml",
        label: "Machine Learning",
        description: "Supervised, unsupervised learning and model deployment",
        lat: 55,
        lng: -80,
        color: "#34d399",
    },
    {
        id: "web",
        label: "Web Development",
        description: "High-performance full-stack web applications",
        lat: -35,
        lng: 140,
        color: "#fb923c",
    },
    {
        id: "genai",
        label: "Generative AI",
        description: "LLMs, prompt engineering, RAG, and AI-driven products",
        lat: 20,
        lng: 80,
        color: "#f472b6",
    },
    {
        id: "quant",
        label: "Quant & Trading",
        description: "Algorithmic trading, backtesting, and risk analytics",
        lat: -50,
        lng: 20,
        color: "#fbbf24",
    },
];

function latLngToVec3(lat: number, lng: number, radius: number) {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);
    return new THREE.Vector3(
        -radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta)
    );
}

function GlobeMesh() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((_, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.12;
        }
    });

    return (
        <mesh ref={meshRef}>
            <sphereGeometry args={[1.8, 64, 64]} />
            <meshPhongMaterial
                color="#16161c"
                emissive="#0f0f12"
                specular="#4f8cff"
                shininess={30}
                transparent
                opacity={0.95}
                wireframe={false}
            />
            {/* Wireframe overlay */}
            <mesh>
                <sphereGeometry args={[1.82, 32, 32]} />
                <meshBasicMaterial
                    color="#4f8cff"
                    wireframe
                    transparent
                    opacity={0.06}
                />
            </mesh>
        </mesh>
    );
}

function DomainMarker({
    point,
    onHover,
    onClick,
}: {
    point: (typeof DOMAIN_POINTS)[0];
    onHover: (id: string | null, screenPos: { x: number; y: number } | null) => void;
    onClick: (id: string) => void;
}) {
    const position = latLngToVec3(point.lat, point.lng, 1.85);
    const { camera, gl } = useThree();
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame(() => {
        if (!meshRef.current) return;
        meshRef.current.lookAt(camera.position);
    });

    function getScreenPos() {
        const v = position.clone();
        v.project(camera);
        const canvas = gl.domElement;
        return {
            x: ((v.x + 1) / 2) * canvas.clientWidth,
            y: ((-v.y + 1) / 2) * canvas.clientHeight,
        };
    }

    return (
        <mesh
            ref={meshRef}
            position={[position.x, position.y, position.z]}
            onPointerEnter={() => onHover(point.id, getScreenPos())}
            onPointerLeave={() => onHover(null, null)}
            onClick={() => onClick(point.id)}
        >
            <circleGeometry args={[0.06, 16]} />
            <meshBasicMaterial color={point.color} transparent opacity={0.9} />
        </mesh>
    );
}

function Lights() {
    return (
        <>
            <ambientLight intensity={0.3} />
            <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
            <pointLight position={[-5, -5, -5]} intensity={0.3} color="#4f8cff" />
            <pointLight position={[0, 8, 0]} intensity={0.2} color="#a78bfa" />
        </>
    );
}

export default function GlobeScene() {
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);

    const hoveredPoint = DOMAIN_POINTS.find((p) => p.id === hoveredId);

    return (
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <Canvas
                camera={{ position: [0, 0, 5], fov: 45 }}
                style={{ background: "transparent" }}
            >
                <Lights />
                <Suspense fallback={null}>
                    <GlobeMesh />
                    {DOMAIN_POINTS.map((point) => (
                        <DomainMarker
                            key={point.id}
                            point={point}
                            onHover={(id, pos) => {
                                setHoveredId(id);
                                setTooltipPos(pos);
                            }}
                            onClick={(id) => {
                                console.log("clicked domain:", id);
                            }}
                        />
                    ))}
                </Suspense>
                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate
                    autoRotateSpeed={0.4}
                    minPolarAngle={Math.PI / 4}
                    maxPolarAngle={(3 * Math.PI) / 4}
                />
            </Canvas>

            {/* Tooltip */}
            <AnimatePresence>
                {hoveredId && tooltipPos && hoveredPoint && (
                    <motion.div
                        key={hoveredId}
                        initial={{ opacity: 0, scale: 0.9, y: 4 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.18 }}
                        style={{
                            position: "absolute",
                            left: tooltipPos.x + 12,
                            top: tooltipPos.y - 40,
                            pointerEvents: "none",
                            zIndex: 10,
                            background: "rgba(22, 22, 28, 0.95)",
                            border: "1px solid rgba(79,140,255,0.3)",
                            borderRadius: "10px",
                            padding: "10px 14px",
                            backdropFilter: "blur(12px)",
                            maxWidth: "200px",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                marginBottom: "4px",
                            }}
                        >
                            <div
                                style={{
                                    width: "8px",
                                    height: "8px",
                                    borderRadius: "50%",
                                    background: hoveredPoint.color,
                                }}
                            />
                            <span
                                style={{
                                    fontSize: "13px",
                                    fontWeight: 600,
                                    color: "var(--text-primary)",
                                }}
                            >
                                {hoveredPoint.label}
                            </span>
                        </div>
                        <p
                            style={{
                                fontSize: "11px",
                                color: "var(--text-secondary)",
                                lineHeight: "1.5",
                            }}
                        >
                            {hoveredPoint.description}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
