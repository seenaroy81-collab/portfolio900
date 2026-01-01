import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, PerspectiveCamera } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

const ParticleLayer = ({ count = 40 }) => {
    const meshRef = useRef<THREE.Points>(null);

    const particles = useMemo(() => {
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 20;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
        }
        return positions;
    }, [count]);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.001;
            meshRef.current.rotation.x += 0.0005;
        }
    });

    return (
        <points ref={meshRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={particles}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.05}
                color="#d4af37"
                transparent
                opacity={0.3}
                sizeAttenuation
            />
        </points>
    );
};

const Blob = ({ position, color, speed, distort, radius }: any) => {
    return (
        <Float speed={speed} rotationIntensity={2} floatIntensity={2}>
            <Sphere args={[radius, 64, 64]} position={position}>
                <MeshDistortMaterial
                    color={color}
                    speed={speed}
                    distort={distort}
                    radius={radius}
                    transparent
                    opacity={0.15}
                />
            </Sphere>
        </Float>
    );
};

const Background3D = () => {
    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none opacity-40">
            <Canvas shadows dpr={[1, 2]}>
                <PerspectiveCamera makeDefault position={[0, 0, 5]} />
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
                <pointLight position={[-10, -10, -10]} color="#d4af37" intensity={0.5} />

                <Blob
                    position={[4, 2, -5]}
                    color="#d4af37"
                    speed={1.5}
                    distort={0.4}
                    radius={2}
                />
                <Blob
                    position={[-5, -3, -4]}
                    color="#7c9082"
                    speed={1.2}
                    distort={0.5}
                    radius={2.5}
                />
                <Blob
                    position={[0, -5, -8]}
                    color="#ffffff"
                    speed={1}
                    distort={0.3}
                    radius={3}
                />

                <ParticleLayer count={100} />
            </Canvas>
            <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background/20" />
        </div>
    );
};

export default Background3D;
