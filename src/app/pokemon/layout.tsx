import { Suspense } from "react"

export default function PokemonLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <Suspense fallback={
      <div className="flex justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    }>{children}</Suspense>
}