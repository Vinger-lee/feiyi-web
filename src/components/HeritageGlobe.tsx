import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useCursor } from '@react-three/drei';
import { useReducedMotion } from 'framer-motion';
import * as THREE from 'three';
import type { HeritageItem, HeritageCategory } from '../types';
import { HERITAGE_CATEGORIES } from '../types';

// 默认非遗图片占位
const DEFAULT_HERITAGE_IMAGE = 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&q=80';

const HERITAGE_LEVEL_LABELS: Record<NonNullable<HeritageItem['level']>, string> = {
  national: '国家级',
  provincial: '省级',
  municipal: '市级',
};

const getHeritageImage = (item: HeritageItem) =>
  item.imageUrl || item.images?.[0] || DEFAULT_HERITAGE_IMAGE;

const getHeritageLevelLabel = (item: HeritageItem) =>
  item.level ? HERITAGE_LEVEL_LABELS[item.level] : '非遗项目';

const stableNoise = (seed: number) => {
  const wave = Math.sin(seed * 12.9898) * 43758.5453;
  return wave - Math.floor(wave);
};

const CATEGORY_ACCENTS: Record<HeritageCategory, string> = {
  craft: '#f2c86d',
  art: '#d9552e',
  performance: '#b75cff',
  music: '#4fb8ff',
  dance: '#ff7aa8',
  literature: '#fff1c6',
  medicine: '#57c99a',
  folk: '#f08a4b',
  sport: '#7dd3fc',
};

const GLOBE_SPHERE_RADIUS = 2.02;
const GLOBE_CARD_RADIUS = 2.045;

const drawRoundRect = (
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) => {
  const safeRadius = Math.min(radius, width / 2, height / 2);

  context.beginPath();
  context.moveTo(x + safeRadius, y);
  context.lineTo(x + width - safeRadius, y);
  context.quadraticCurveTo(x + width, y, x + width, y + safeRadius);
  context.lineTo(x + width, y + height - safeRadius);
  context.quadraticCurveTo(x + width, y + height, x + width - safeRadius, y + height);
  context.lineTo(x + safeRadius, y + height);
  context.quadraticCurveTo(x, y + height, x, y + height - safeRadius);
  context.lineTo(x, y + safeRadius);
  context.quadraticCurveTo(x, y, x + safeRadius, y);
  context.closePath();
};

const drawCoverImage = (
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  x: number,
  y: number,
  width: number,
  height: number
) => {
  const sourceRatio = image.width / image.height;
  const targetRatio = width / height;
  let sourceX = 0;
  let sourceY = 0;
  let sourceWidth = image.width;
  let sourceHeight = image.height;

  if (sourceRatio > targetRatio) {
    sourceWidth = image.height * targetRatio;
    sourceX = (image.width - sourceWidth) / 2;
  } else {
    sourceHeight = image.width / targetRatio;
    sourceY = (image.height - sourceHeight) / 2;
  }

  context.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, x, y, width, height);
};

const getTextLines = (
  context: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  maxLines: number
) => {
  const lines: string[] = [];
  let currentLine = '';
  let truncated = false;

  for (const character of text) {
    if (lines.length === maxLines) {
      truncated = true;
      break;
    }

    const testLine = `${currentLine}${character}`;

    if (currentLine && context.measureText(testLine).width > maxWidth) {
      lines.push(currentLine);
      currentLine = character;

      if (lines.length === maxLines) {
        truncated = true;
        break;
      }
    } else {
      currentLine = testLine;
    }
  }

  if (currentLine && lines.length < maxLines) {
    lines.push(currentLine);
  }

  if (truncated && lines.length === maxLines) {
    const lastIndex = maxLines - 1;

    while (
      context.measureText(`${lines[lastIndex]}...`).width > maxWidth &&
      lines[lastIndex].length > 1
    ) {
      lines[lastIndex] = lines[lastIndex].slice(0, -1);
    }

    lines[lastIndex] = `${lines[lastIndex]}...`;
  }

  return lines;
};

const paintHeritageCardTexture = (
  canvas: HTMLCanvasElement,
  item: HeritageItem,
  image?: HTMLImageElement
) => {
  const context = canvas.getContext('2d');
  if (!context) return;

  const width = canvas.width;
  const height = canvas.height;
  const accent = CATEGORY_ACCENTS[item.category];
  const imageHeight = height;
  const pad = width * 0.055;
  const radius = width * 0.082;
  const pillHeight = height * 0.07;
  const bottomBase = height * 0.52;

  context.clearRect(0, 0, width, height);
  context.save();
  drawRoundRect(context, 0, 0, width, height, radius);
  context.clip();

  const backgroundGradient = context.createLinearGradient(0, 0, width, height);
  backgroundGradient.addColorStop(0, '#31261d');
  backgroundGradient.addColorStop(0.48, '#121713');
  backgroundGradient.addColorStop(1, '#060706');
  context.fillStyle = backgroundGradient;
  context.fillRect(0, 0, width, height);

  if (image?.complete && image.naturalWidth > 0) {
    context.save();
    context.filter = 'saturate(1.12) contrast(1.06)';
    drawCoverImage(context, image, 0, 0, width, imageHeight);
    context.restore();
  } else {
    const fallbackGradient = context.createRadialGradient(width * 0.38, height * 0.32, width * 0.05, width * 0.5, height * 0.5, width * 0.78);
    fallbackGradient.addColorStop(0, accent);
    fallbackGradient.addColorStop(0.52, '#2e3d30');
    fallbackGradient.addColorStop(1, '#0f110e');
    context.fillStyle = fallbackGradient;
    context.fillRect(0, 0, width, height);
  }

  const vignette = context.createRadialGradient(width * 0.46, height * 0.34, width * 0.12, width * 0.5, height * 0.48, width * 0.76);
  vignette.addColorStop(0, 'rgba(0, 0, 0, 0)');
  vignette.addColorStop(0.62, 'rgba(0, 0, 0, 0.18)');
  vignette.addColorStop(1, 'rgba(0, 0, 0, 0.64)');
  context.fillStyle = vignette;
  context.fillRect(0, 0, width, height);

  const titleWash = context.createLinearGradient(0, bottomBase - height * 0.16, 0, height);
  titleWash.addColorStop(0, 'rgba(8, 8, 7, 0)');
  titleWash.addColorStop(0.34, 'rgba(8, 8, 7, 0.72)');
  titleWash.addColorStop(1, 'rgba(8, 8, 7, 0.96)');
  context.fillStyle = titleWash;
  context.fillRect(0, bottomBase - height * 0.16, width, height - bottomBase + height * 0.16);

  const topWash = context.createLinearGradient(0, 0, 0, height * 0.22);
  topWash.addColorStop(0, 'rgba(8, 8, 7, 0.58)');
  topWash.addColorStop(1, 'rgba(8, 8, 7, 0)');
  context.fillStyle = topWash;
  context.fillRect(0, 0, width, height * 0.24);

  const innerGlow = context.createLinearGradient(0, 0, width, height);
  innerGlow.addColorStop(0, 'rgba(255, 247, 232, 0.72)');
  innerGlow.addColorStop(0.42, 'rgba(242, 200, 109, 0.32)');
  innerGlow.addColorStop(1, `${accent}aa`);
  context.strokeStyle = innerGlow;
  context.lineWidth = width * 0.008;
  drawRoundRect(context, width * 0.003, width * 0.003, width - width * 0.006, height - width * 0.006, radius * 0.95);
  context.stroke();

  context.save();
  context.globalAlpha = 0.92;
  context.strokeStyle = accent;
  context.lineWidth = width * 0.012;
  context.beginPath();
  context.moveTo(pad, height - pad);
  context.lineTo(width * 0.42, height - pad);
  context.stroke();
  context.globalAlpha = 1;
  context.restore();

  const categoryLabel = HERITAGE_CATEGORIES[item.category].name;
  const levelLabel = getHeritageLevelLabel(item);

  context.save();
  context.shadowColor = 'rgba(0, 0, 0, 0.42)';
  context.shadowBlur = width * 0.018;
  drawRoundRect(context, pad, pad, width * 0.25, pillHeight, pillHeight / 2);
  context.fillStyle = 'rgba(255, 247, 232, 0.88)';
  context.fill();
  context.fillStyle = accent;
  context.beginPath();
  context.arc(pad + width * 0.033, pad + pillHeight / 2, width * 0.011, 0, Math.PI * 2);
  context.fill();
  context.fillStyle = '#17120e';
  context.font = `800 ${Math.round(width * 0.035)}px "Noto Sans SC", "Microsoft YaHei", sans-serif`;
  context.textBaseline = 'middle';
  context.fillText(categoryLabel, pad + width * 0.056, pad + pillHeight / 2);

  drawRoundRect(context, width - pad - width * 0.24, pad, width * 0.24, pillHeight, pillHeight / 2);
  context.fillStyle = 'rgba(8, 8, 7, 0.58)';
  context.fill();
  context.strokeStyle = 'rgba(255, 247, 232, 0.26)';
  context.lineWidth = width * 0.002;
  drawRoundRect(context, width - pad - width * 0.24, pad, width * 0.24, pillHeight, pillHeight / 2);
  context.stroke();
  context.fillStyle = '#fff7e8';
  context.font = `800 ${Math.round(width * 0.031)}px "Noto Sans SC", "Microsoft YaHei", sans-serif`;
  context.fillText(levelLabel, width - pad - width * 0.205, pad + pillHeight / 2);
  context.restore();

  context.fillStyle = '#fffaf0';
  context.shadowColor = 'rgba(0, 0, 0, 0.72)';
  context.shadowBlur = width * 0.025;
  context.font = `800 ${Math.round(width * 0.096)}px "ZCOOL XiaoWei", "Noto Serif SC", "Microsoft YaHei", serif`;
  context.textBaseline = 'top';
  const titleLines = getTextLines(context, item.name, width - pad * 2.15, 2);
  titleLines.forEach((line, index) => {
    context.fillText(line, pad, bottomBase + index * height * 0.118);
  });

  context.shadowBlur = 0;
  context.fillStyle = 'rgba(255, 247, 232, 0.78)';
  context.font = `700 ${Math.round(width * 0.037)}px "Noto Sans SC", "Microsoft YaHei", sans-serif`;
  const locationText = item.region.replace('承德市', '') || '承德';
  const locationLines = getTextLines(context, locationText, width - pad * 2.15, 1);
  context.fillText(locationLines[0] ?? '', pad, height - height * 0.105);

  context.restore();
};

const useHeritageCardTexture = (item: HeritageItem) => {
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 724;
    paintHeritageCardTexture(canvas, item);

    const cardTexture = new THREE.CanvasTexture(canvas);
    cardTexture.colorSpace = THREE.SRGBColorSpace;
    cardTexture.anisotropy = 8;
    cardTexture.generateMipmaps = false;
    cardTexture.minFilter = THREE.LinearFilter;
    cardTexture.magFilter = THREE.LinearFilter;
    cardTexture.wrapS = THREE.ClampToEdgeWrapping;
    cardTexture.wrapT = THREE.ClampToEdgeWrapping;
    cardTexture.needsUpdate = true;

    return cardTexture;
  }, [item]);

  useEffect(() => {
    const imageSrc = getHeritageImage(item);
    const shouldLoadImage = !/^https?:\/\//i.test(imageSrc);
    let cancelled = false;
    const canvas = texture.image as HTMLCanvasElement;

    if (shouldLoadImage) {
      const image = new Image();

      image.onload = () => {
        if (cancelled) return;
        paintHeritageCardTexture(canvas, item, image);
        texture.needsUpdate = true;
      };

      image.onerror = () => {
        if (cancelled) return;
        paintHeritageCardTexture(canvas, item);
        texture.needsUpdate = true;
      };

      image.src = imageSrc;
    }

    return () => {
      cancelled = true;
      texture.dispose();
    };
  }, [item, texture]);

  return texture;
};

const createCurvedCardGeometry = (
  width: number,
  height: number,
  sphereRadius: number,
  lift: number,
  segmentsX = 22,
  segmentsY = 16
) => {
  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  for (let yIndex = 0; yIndex <= segmentsY; yIndex += 1) {
    const v = yIndex / segmentsY;
    const y = (0.5 - v) * height;

    for (let xIndex = 0; xIndex <= segmentsX; xIndex += 1) {
      const u = xIndex / segmentsX;
      const x = (u - 0.5) * width;
      const direction = new THREE.Vector3(x, y, sphereRadius).normalize();
      const point = direction.multiplyScalar(sphereRadius);

      positions.push(point.x, point.y, point.z - sphereRadius + lift);
      uvs.push(u, 1 - v);
    }
  }

  for (let yIndex = 0; yIndex < segmentsY; yIndex += 1) {
    for (let xIndex = 0; xIndex < segmentsX; xIndex += 1) {
      const a = yIndex * (segmentsX + 1) + xIndex;
      const b = a + 1;
      const c = a + segmentsX + 1;
      const d = c + 1;

      indices.push(a, c, b, b, c, d);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setIndex(indices);
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geometry.computeVertexNormals();

  return geometry;
};

type GlobeNode = {
  item: HeritageItem;
  position: [number, number, number];
  quaternion: [number, number, number, number];
  scale: number;
  accent: string;
};

const createGlobeNodes = (items: HeritageItem[]): GlobeNode[] => {
  const radius = GLOBE_CARD_RADIUS;
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  const cardForward = new THREE.Vector3(0, 0, 1);

  return items.map((item, index) => {
    const offset = items.length === 1 ? 0 : index / (items.length - 1);
    const y = 0.82 - offset * 1.64;
    const orbitRadius = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = index * goldenAngle + 0.58 + stableNoise(index + 41) * 0.24;
    const normal = new THREE.Vector3(
      Math.cos(theta) * orbitRadius,
      y,
      Math.sin(theta) * orbitRadius
    ).normalize();
    const position = normal.clone().multiplyScalar(radius);
    const quaternion = new THREE.Quaternion().setFromUnitVectors(cardForward, normal);

    return {
      item,
      position: position.toArray() as [number, number, number],
      quaternion: quaternion.toArray() as [number, number, number, number],
      scale: 0.82 + stableNoise(index + 23) * 0.16,
      accent: CATEGORY_ACCENTS[item.category],
    };
  });
};

function HeritageSurfaceCard({
  node,
  index,
  compact,
  onSelect,
}: {
  node: GlobeNode;
  index: number;
  compact: boolean;
  onSelect: (item: HeritageItem) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const { camera } = useThree();
  const texture = useHeritageCardTexture(node.item);
  const cardWidth = compact ? 0.88 : 1.24;
  const cardHeight = compact ? 0.64 : 0.88;
  const cardScale = node.scale * (compact ? 0.86 : 1) * (hovered ? 1.075 : 1);
  const visibilityVectors = useMemo(
    () => ({
      position: new THREE.Vector3(),
      normal: new THREE.Vector3(),
      toCamera: new THREE.Vector3(),
    }),
    []
  );
  const cardGeometry = useMemo(
    () => createCurvedCardGeometry(cardWidth, cardHeight, GLOBE_CARD_RADIUS, 0.065),
    [cardHeight, cardWidth]
  );
  const glowGeometry = useMemo(
    () => createCurvedCardGeometry(cardWidth * 1.08, cardHeight * 1.08, GLOBE_CARD_RADIUS, 0.049, 18, 12),
    [cardHeight, cardWidth]
  );
  const frameCountRef = useRef(0);

  useCursor(hovered);

  useFrame(() => {
    if (!groupRef.current) return;

    frameCountRef.current += 1;
    if (frameCountRef.current % 2 !== 0) return;

    groupRef.current.getWorldPosition(visibilityVectors.position);
    visibilityVectors.normal.copy(visibilityVectors.position).normalize();
    visibilityVectors.toCamera.copy(camera.position).sub(visibilityVectors.position).normalize();
    groupRef.current.visible = visibilityVectors.normal.dot(visibilityVectors.toCamera) > (compact ? 0.32 : 0.26);
  });

  useEffect(() => {
    return () => {
      cardGeometry.dispose();
      glowGeometry.dispose();
    };
  }, [cardGeometry, glowGeometry]);

  return (
    <group
      ref={groupRef}
      position={node.position}
      quaternion={node.quaternion}
      scale={cardScale}
      renderOrder={12 + index}
    >
      <mesh position={[0, 0, -0.028]} scale={[1.08, 1.08, 1]} renderOrder={9 + index}>
        <primitive object={glowGeometry} attach="geometry" />
        <meshBasicMaterial
          color={node.accent}
          transparent
          opacity={hovered ? 0.34 : 0.18}
          blending={THREE.AdditiveBlending}
          depthTest
          depthWrite={false}
          side={THREE.FrontSide}
        />
      </mesh>

      <mesh
        renderOrder={12 + index}
        onClick={(event) => {
          event.stopPropagation();
          onSelect(node.item);
        }}
        onPointerOver={(event) => {
          event.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
      >
        <primitive object={cardGeometry} attach="geometry" />
        {texture ? (
          <meshBasicMaterial
            map={texture}
            transparent
            opacity={1}
            toneMapped={false}
            depthTest
            depthWrite={false}
            polygonOffset
            polygonOffsetFactor={-4}
            polygonOffsetUnits={-4}
            side={THREE.FrontSide}
          />
        ) : (
          <meshBasicMaterial
            color={node.accent}
            transparent
            opacity={0.72}
            depthTest
            depthWrite={false}
            polygonOffset
            polygonOffsetFactor={-4}
            polygonOffsetUnits={-4}
            side={THREE.FrontSide}
          />
        )}
      </mesh>
    </group>
  );
}

function GlobeStructure({ reducedMotion }: { reducedMotion: boolean }) {
  const ringsRef = useRef<THREE.Group>(null);
  const emberRef = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const count = 150;
    const particlePositions = new Float32Array(count * 3);
    const particleColors = new Float32Array(count * 3);
    const colorChoices = [
      new THREE.Color('#f7d889'),
      new THREE.Color('#d9552e'),
      new THREE.Color('#56c79a'),
      new THREE.Color('#fff3d6'),
    ];

    for (let index = 0; index < count; index += 1) {
      const radius = 2.18 + stableNoise(index + 7) * 0.22;
      const theta = stableNoise(index + 91) * Math.PI * 2;
      const phi = Math.acos(2 * stableNoise(index + 151) - 1);
      particlePositions[index * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[index * 3 + 1] = radius * Math.cos(phi);
      particlePositions[index * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);

      const color = colorChoices[index % colorChoices.length];
      particleColors[index * 3] = color.r;
      particleColors[index * 3 + 1] = color.g;
      particleColors[index * 3 + 2] = color.b;
    }

    return { positions: particlePositions, colors: particleColors };
  }, []);

  useFrame((state, delta) => {
    if (reducedMotion) return;

    if (ringsRef.current) {
      ringsRef.current.rotation.y += delta * 0.08;
      ringsRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.28) * 0.04;
      const breathScale = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
      ringsRef.current.scale.set(breathScale, breathScale, breathScale);
    }

    if (emberRef.current) {
      emberRef.current.rotation.y -= delta * 0.045;
      emberRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
    }
  });

  const latitudeAngles = [-58, -34, -16, 0, 16, 34, 58];
  const longitudeCount = 12;

  return (
    <group>
      <mesh renderOrder={-20}>
        <sphereGeometry args={[GLOBE_SPHERE_RADIUS - 0.015, 24, 24]} />
        <meshBasicMaterial colorWrite={false} depthWrite depthTest />
      </mesh>

      <mesh>
        <sphereGeometry args={[GLOBE_SPHERE_RADIUS, 24, 24]} />
        <meshPhysicalMaterial
          color="#16251e"
          metalness={0.18}
          roughness={0.28}
          clearcoat={0.72}
          transparent
          opacity={0.22}
          depthWrite={false}
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[GLOBE_SPHERE_RADIUS + 0.008, 24, 24]} />
        <meshBasicMaterial color="#f2c86d" wireframe transparent opacity={0.052} depthWrite={false} />
      </mesh>

      <points ref={emberRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.018}
          vertexColors
          transparent
          opacity={0.8}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <group ref={ringsRef}>
        {latitudeAngles.map(angle => {
          const radians = THREE.MathUtils.degToRad(angle);
          const ringRadius = Math.cos(radians) * (GLOBE_SPHERE_RADIUS + 0.018);

          return (
            <mesh key={angle} position={[0, Math.sin(radians) * (GLOBE_SPHERE_RADIUS + 0.018), 0]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[ringRadius, 0.006, 8, 180]} />
              <meshBasicMaterial color="#f2d184" transparent opacity={angle === 0 ? 0.22 : 0.12} depthWrite={false} />
            </mesh>
          );
        })}

        {Array.from({ length: longitudeCount }, (_, index) => (
          <mesh key={index} rotation={[Math.PI / 2, 0, (index * Math.PI) / longitudeCount]}>
            <torusGeometry args={[GLOBE_SPHERE_RADIUS + 0.02, 0.0045, 8, 180]} />
            <meshBasicMaterial color="#57c99a" transparent opacity={0.1} depthWrite={false} />
          </mesh>
        ))}

        {[2.36, 2.72, 3.08].map((radius, index) => (
          <mesh key={radius} rotation={[Math.PI / 2.2, index * 0.3, index * 0.42]}>
            <torusGeometry args={[radius, 0.0055, 8, 220]} />
            <meshBasicMaterial color={index === 1 ? '#d9552e' : '#f2c86d'} transparent opacity={0.32} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function HeritageGlobeScene({
  items,
  onSelect,
  reducedMotion,
}: {
  items: HeritageItem[];
  onSelect: (item: HeritageItem) => void;
  reducedMotion: boolean;
}) {
  const nodes = useMemo(() => createGlobeNodes(items), [items]);
  const { size } = useThree();
  const compact = size.width < 640;

  return (
    <>
      <ambientLight intensity={1.65} />
      <directionalLight position={[4, 5, 6]} intensity={2.4} color="#fff1c6" />
      <pointLight position={[-4, -3, 3]} intensity={1.6} color="#d9552e" />
      <pointLight position={[3, 1, -4]} intensity={1.2} color="#57c99a" />

      <GlobeStructure reducedMotion={reducedMotion} />

      {nodes.map((node, index) => (
        <HeritageSurfaceCard
          key={node.item.id}
          node={node}
          index={index}
          compact={compact}
          onSelect={onSelect}
        />
      ))}

      <OrbitControls
        makeDefault
        enablePan={false}
        enableZoom={false}
        autoRotate={!reducedMotion}
        autoRotateSpeed={0.3}
        dampingFactor={0.06}
        enableDamping
        minPolarAngle={0.62}
        maxPolarAngle={Math.PI - 0.62}
      />
    </>
  );
}

function InteractiveHeritageGlobe({
  items,
  onSelect,
}: {
  items: HeritageItem[];
  onSelect: (item: HeritageItem) => void;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="globe-canvas-shell" data-webgl-scene="heritage-globe">
      <Canvas
        camera={{ position: [0, 0.12, 6.45], fov: 46 }}
        dpr={[1, 1]}
        gl={{ alpha: true, antialias: true, preserveDrawingBuffer: true, powerPreference: 'high-performance' }}
      >
        <HeritageGlobeScene
          items={items}
          onSelect={onSelect}
          reducedMotion={Boolean(prefersReducedMotion)}
        />
      </Canvas>
    </div>
  );
}

export function HeritageGlobeSection({
  items,
  totalCount,
  onSelect,
  onRandom,
  onOpenArchive,
  onOpenCategory,
}: {
  items: HeritageItem[];
  totalCount: number;
  onSelect: (item: HeritageItem) => void;
  onRandom: () => void;
  onOpenArchive: () => void;
  onOpenCategory: (category: HeritageCategory) => void;
}) {
  const nationalItems = items.filter(item => item.level === 'national').length;

  return (
    <section className="globe-section">
      <div className="globe-section-copy">
        <span>Orbit Archive</span>
        <h2>非遗星球</h2>
        <p>
          把项目卡片放到一颗可旋转的热河星球上，图像、门类、地区和等级在同一个空间里形成关系网络。
        </p>

        <div className="globe-actions">
          <button onClick={onOpenArchive}>打开全部项目</button>
          <button onClick={onRandom}>随机点亮</button>
          <button onClick={() => onOpenCategory('art')}>传统美术</button>
          <button onClick={() => onOpenCategory('folk')}>民俗现场</button>
        </div>

        <div className="globe-metrics" aria-label="非遗星球统计">
          <div>
            <strong>{String(totalCount).padStart(2, '0')}</strong>
            <small>项目档案</small>
          </div>
          <div>
            <strong>{String(items.length).padStart(2, '0')}</strong>
            <small>球面卡片</small>
          </div>
          <div>
            <strong>{String(nationalItems).padStart(2, '0')}</strong>
            <small>国家级焦点</small>
          </div>
        </div>
      </div>

      <div className="globe-stage-wrap">
        <div className="globe-backplate" />
        <InteractiveHeritageGlobe items={items} onSelect={onSelect} />
      </div>
    </section>
  );
}

