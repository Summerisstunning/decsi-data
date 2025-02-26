export default function MoleculeIcon({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className} float-animation`}>
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Central atom */}
        <circle cx="20" cy="20" r="6" fill="rgba(0, 102, 204, 0.8)" />

        {/* Orbital rings */}
        <circle cx="20" cy="20" r="12" stroke="rgba(0, 102, 204, 0.4)" strokeWidth="1" fill="none" />
        <circle cx="20" cy="20" r="18" stroke="rgba(0, 102, 204, 0.2)" strokeWidth="1" fill="none" />

        {/* Electrons */}
        <circle cx="32" cy="20" r="3" fill="rgba(0, 204, 255, 0.7)" />
        <circle cx="8" cy="20" r="3" fill="rgba(0, 204, 255, 0.7)" />
        <circle cx="20" cy="32" r="3" fill="rgba(0, 204, 255, 0.7)" />
        <circle cx="20" cy="8" r="3" fill="rgba(0, 204, 255, 0.7)" />

        {/* Diagonal electrons */}
        <circle cx="27.3" cy="27.3" r="2" fill="rgba(0, 204, 255, 0.5)" />
        <circle cx="12.7" cy="12.7" r="2" fill="rgba(0, 204, 255, 0.5)" />
        <circle cx="27.3" cy="12.7" r="2" fill="rgba(0, 204, 255, 0.5)" />
        <circle cx="12.7" cy="27.3" r="2" fill="rgba(0, 204, 255, 0.5)" />
      </svg>
    </div>
  )
}

