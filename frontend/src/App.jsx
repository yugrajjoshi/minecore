function App() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-12 text-slate-100">
      <section className="w-full max-w-3xl rounded-2xl border border-slate-800 bg-slate-900/70 p-8 shadow-2xl shadow-slate-950/30 backdrop-blur">
        <p className="mb-3 inline-flex rounded-full border border-teal-400/40 bg-teal-500/10 px-3 py-1 text-xs font-semibold tracking-wide text-teal-300">
          Frontend Ready
        </p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          React + Tailwind setup complete
        </h1>
        <p className="mt-4 text-slate-300">
          Start building your UI in
          <span className="mx-1 rounded bg-slate-800 px-2 py-1 text-slate-100">
            src/App.jsx
          </span>
          and Tailwind classes are already enabled.
        </p>
      </section>
    </main>
  )
}

export default App
