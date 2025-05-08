import { Object3DNode } from '@react-three/fiber';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as THREE from 'three';

declare module '@react-three/fiber' {
  interface ThreeElements {
    group: Object3DNode<THREE.Group, typeof THREE.Group>;
    mesh: Object3DNode<THREE.Mesh, typeof THREE.Mesh>;
    meshPhysicalMaterial: Object3DNode<
      THREE.MeshPhysicalMaterial,
      typeof THREE.MeshPhysicalMaterial
    >;
    meshLineGeometry: Object3DNode<MeshLineGeometry, typeof MeshLineGeometry>;
    meshLineMaterial: Object3DNode<MeshLineMaterial, typeof MeshLineMaterial>;
  }
}
