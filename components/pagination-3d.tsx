"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

interface Pagination3DProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function Pagination3D({ currentPage, totalPages, onPageChange }: Pagination3DProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const spheresRef = useRef<THREE.Mesh[]>([])
  const animationIdRef = useRef<number | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene
    scene.background = new THREE.Color(0xfafafa)

    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000,
    )
    camera.position.z = 5

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    rendererRef.current = renderer
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    containerRef.current.appendChild(renderer.domElement)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)

    const pointLight = new THREE.PointLight(0xffffff, 0.8)
    pointLight.position.set(5, 5, 5)
    scene.add(pointLight)

    // Create page spheres
    const spheres: THREE.Mesh[] = []
    const spacing = 1.2
    const startX = -(totalPages - 1) * spacing * 0.5

    for (let i = 0; i < totalPages; i++) {
      const geometry = new THREE.IcosahedronGeometry(0.4, 4)
      const material = new THREE.MeshPhongMaterial({
        color: i === currentPage ? 0xd97706 : 0xe5e7eb,
        emissive: i === currentPage ? 0xb45309 : 0x000000,
        shininess: 100,
      })
      const sphere = new THREE.Mesh(geometry, material)
      sphere.position.x = startX + i * spacing
      sphere.userData = { index: i, isActive: i === currentPage }
      scene.add(sphere)
      spheres.push(sphere)
    }

    spheresRef.current = spheres

    // Mouse interaction
    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()

    const onMouseMove = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect()
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObjects(spheres)

      spheres.forEach((sphere) => {
        const isHovered = intersects.length > 0 && intersects[0].object === sphere
        const isActive = sphere.userData.index === currentPage
        const material = sphere.material as THREE.MeshPhongMaterial
        material.color.setHex(isActive ? 0xd97706 : isHovered ? 0xfbbf24 : 0xe5e7eb)
        material.emissive.setHex(isActive ? 0xb45309 : isHovered ? 0xf59e0b : 0x000000)
        sphere.scale.set(
          isHovered || isActive ? 1.2 : 1,
          isHovered || isActive ? 1.2 : 1,
          isHovered || isActive ? 1.2 : 1,
        )
      })
    }

    const onClick = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect()
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObjects(spheres)

      if (intersects.length > 0) {
        const clickedSphere = intersects[0].object as THREE.Mesh
        const pageIndex = clickedSphere.userData.index
        onPageChange(pageIndex)
      }
    }

    renderer.domElement.addEventListener("mousemove", onMouseMove)
    renderer.domElement.addEventListener("click", onClick)

    // Animation loop
    let rotationAngle = 0
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate)

      spheres.forEach((sphere, index) => {
        sphere.rotation.x += 0.005
        sphere.rotation.y += 0.008
        const isActive = sphere.userData.index === currentPage
        if (isActive) {
          sphere.position.y = Math.sin(rotationAngle) * 0.3
        }
      })

      rotationAngle += 0.05

      renderer.render(scene, camera)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return
      const width = containerRef.current.clientWidth
      const height = containerRef.current.clientHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      renderer.domElement.removeEventListener("mousemove", onMouseMove)
      renderer.domElement.removeEventListener("click", onClick)
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
      containerRef.current?.removeChild(renderer.domElement)
    }
  }, [currentPage, totalPages, onPageChange])

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <div ref={containerRef} className="w-full h-32 rounded-lg border border-border bg-card" />
      <div className="flex gap-2 items-center justify-center flex-wrap">
        <button
          onClick={() => onPageChange(Math.max(0, currentPage - 1))}
          disabled={currentPage === 0}
          className="px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Previous
        </button>
        <span className="text-sm text-muted-foreground">
          Page {currentPage + 1} of {totalPages}
        </span>
        <button
          onClick={() => onPageChange(Math.min(totalPages - 1, currentPage + 1))}
          disabled={currentPage === totalPages - 1}
          className="px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Next
        </button>
      </div>
    </div>
  )
}
