export type GalleryItem = { src: string; alt: string; label: string; section?: string; href?: string }
export type Prototype = {
  title: string; href: string; eyebrow?: string; description?: string
  buttonLabel?: string; platform?: string; preview?: { src: string; alt: string }
}
export type ProjectSection = {
  id: string; type: string; title?: string; imageSources?: string[]
  paragraphs?: string[]; prototype?: Prototype
}
export type Project = {
  id: string; slug: string; title: string; company: string; status: string
  summary: string | string[]; summaryEmphasis?: string[]; gallery: GalleryItem[]
  disciplines: string[]; tools: string[]; problemsSolved?: string[]
  modules?: { title: string; summary: string }[]; sections?: ProjectSection[]
  prototype?: Prototype; listed?: boolean; noIndex?: boolean
}
