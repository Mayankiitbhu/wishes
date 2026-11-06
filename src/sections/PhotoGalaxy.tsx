import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Billboard, OrbitControls, Sparkles, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { ArrowDown, MousePointer2 } from 'lucide-react';
import birthdayConfig, { type GalaxyPhoto } from '../data/birthdayConfig';

/**
 * Loads a texture imperatively so a failed/blocked image degrades to a tinted
 * plane instead of suspending the whole canvas forever.
 */
function usePhotoTexture(url: string) {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    let cancelled = false;
    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin('anonymous');
    loader.load(
      url,
      (tex) => {
        if (cancelled) {
          tex.dispose();
          return;
        }
        tex.colorSpace = THREE.SRGBColorSpace;
        setTexture(tex);
      },
      undefined,
      () => {
        /* leave null — fallback material renders */
      }
    );
    return () => {
      cancelled = true;
    };
  }, [url]);

  useEffect(() => () => texture?.dispose(), [texture]);

  return texture;
}

function PhotoPlane({ photo, index }: { photo: GalaxyPhoto; index: number }) {
  const group = useRef<THREE.Group>(null);
  const texture = usePhotoTexture(photo.url);
  const phase = useMemo(() => index * 0.7, [index]);
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.getElapsedTime();
    group.current.position.y = photo.position[1] + Math.sin(t * 0.55 + phase) * 0.28;
    group.current.position.x = photo.position[0] + Math.cos(t * 0.34 + phase) * 0.16;
    const target = hovered ? 1.22 : 1;
    group.current.scale.lerp(new THREE.Vector3(target, target, target), 0.1);
  });

  return (
    <group ref={group} position={photo.position}>
      <Billboard>
        {/* white polaroid-ish backing */}
        <mesh position={[0, -0.045, -0.012]}>
          <planeGeometry args={[1.42, 1.56]} />
          <meshBasicMaterial color="#ffffff" toneMapped={false} />
        </mesh>
        <mesh
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
          }}
          onPointerOut={() => setHovered(false)}
        >
          <planeGeometry args={[1.3, 1.3]} />
          {/* Keyed so the material is rebuilt when the texture arrives — swapping
              `map` on a live material does not always recompile the shader. */}
          <meshBasicMaterial
            key={texture ? texture.uuid : 'placeholder'}
            map={texture ?? undefined}
            color={texture ? '#ffffff' : '#3f3f46'}
            toneMapped={false}
          />
        </mesh>
      </Billboard>
    </group>
  );
}

function GalaxyScene() {
  return (
    <>
      <ambientLight intensity={1.2} />
      <Stars radius={90} depth={60} count={6500} factor={4.5} saturation={0} fade speed={0.8} />
      <Sparkles count={160} scale={16} size={2.6} speed={0.3} color="#ffd9a0" opacity={0.7} />
      {birthdayConfig.galaxyPhotos.map((photo, i) => (
        <PhotoPlane key={i} photo={photo} index={i} />
      ))}
      <OrbitControls
        enableZoom
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        minDistance={2}
        maxDistance={22}
        enableDamping
        dampingFactor={0.07}
      />
    </>
  );
}

export default function PhotoGalaxy() {
  return (
    <section id="section-5" className="relative h-screen w-full bg-black">
      <Canvas camera={{ position: [0, 0.6, 10], fov: 55 }} dpr={[1, 2]} gl={{ antialias: true }}>
        <color attach="background" args={['#000000']} />
        <fog attach="fog" args={['#000000', 14, 34]} />
        <GalaxyScene />
      </Canvas>

      {/* overlay copy */}
      <div className="pointer-events-none absolute inset-x-0 top-12 z-10 text-center">
        <h2 className="font-serif text-3xl italic text-white sm:text-4xl">A galaxy of us</h2>
        <p className="mt-3 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/45">
          <MousePointer2 className="h-3.5 w-3.5" />
          Drag to orbit • scroll to fly closer
        </p>
      </div>

      <a
        href="#section-6"
        className="absolute bottom-24 left-1/2 z-10 -translate-x-1/2 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md transition hover:bg-white/20"
      >
        One last thing
        <ArrowDown className="h-4 w-4" />
      </a>
    </section>
  );
}
