type RedactedDecryptLabelProps = {
  label: string
}

export default function RedactedDecryptLabel({ label }: RedactedDecryptLabelProps) {
  return (
    <>
      <span className="block">{label}</span>
      <span
        aria-hidden="true"
        className="mt-2 block font-[family-name:var(--font-inter)] text-[10px] font-semibold uppercase tracking-[0.22em] text-white/48"
      >
        Status: Private
      </span>
    </>
  )
}
