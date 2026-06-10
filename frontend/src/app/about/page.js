export default function AboutPage() {
  return (
    <div className="relative max-w-7xl mx-auto py-20 px-4 overflow-hidden min-h-screen">
      {/* Multiple rotating gears – background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10 select-none">
        {/* Large gear */}
        <svg className="w-80 h-80 absolute animate-spin-slow" viewBox="0 0 100 100">
          <defs>
            <linearGradient id="gear1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00a650" />
              <stop offset="100%" stopColor="#006e34" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="35" fill="none" stroke="url(#gear1)" strokeWidth="6" strokeDasharray="8 6" />
          <circle cx="50" cy="50" r="20" fill="none" stroke="url(#gear1)" strokeWidth="5" />
          <circle cx="50" cy="50" r="8" fill="url(#gear1)" />
          {[0, 60, 120, 180, 240, 300].map(a => (
            <rect key={a} x="46" y="10" width="8" height="14" rx="4" fill="url(#gear1)" transform={`rotate(${a} 50 50)`} />
          ))}
        </svg>

        {/* Medium gear (reverse) */}
        <svg className="w-64 h-64 absolute top-20 left-10 animate-spin-reverse-slow" viewBox="0 0 100 100">
          <defs>
            <linearGradient id="gear2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00a650" />
              <stop offset="100%" stopColor="#004d26" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="28" fill="none" stroke="url(#gear2)" strokeWidth="5" strokeDasharray="6 4" />
          <circle cx="50" cy="50" r="15" fill="none" stroke="url(#gear2)" strokeWidth="4" />
          <circle cx="50" cy="50" r="6" fill="url(#gear2)" />
          {[0, 72, 144, 216, 288].map(a => (
            <rect key={a} x="47" y="12" width="6" height="12" rx="3" fill="url(#gear2)" transform={`rotate(${a} 50 50)`} />
          ))}
        </svg>

        {/* Small gear */}
        <svg className="w-48 h-48 absolute bottom-10 right-20 animate-spin-medium" viewBox="0 0 100 100">
          <defs>
            <linearGradient id="gear3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00a650" />
              <stop offset="100%" stopColor="#008a42" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="22" fill="none" stroke="url(#gear3)" strokeWidth="4" strokeDasharray="5 4" />
          <circle cx="50" cy="50" r="12" fill="none" stroke="url(#gear3)" strokeWidth="3" />
          <circle cx="50" cy="50" r="5" fill="url(#gear3)" />
          {[0, 90, 180, 270].map(a => (
            <rect key={a} x="47" y="14" width="6" height="10" rx="3" fill="url(#gear3)" transform={`rotate(${a} 50 50)`} />
          ))}
        </svg>

        {/* Extra tiny gear */}
        <svg className="w-32 h-32 absolute top-40 right-10 animate-spin-slow" viewBox="0 0 100 100">
          <defs>
            <linearGradient id="gear4" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00a650" />
              <stop offset="100%" stopColor="#006e34" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="16" fill="none" stroke="url(#gear4)" strokeWidth="4" strokeDasharray="4 3" />
          <circle cx="50" cy="50" r="8" fill="none" stroke="url(#gear4)" strokeWidth="3" />
          <circle cx="50" cy="50" r="4" fill="url(#gear4)" />
          {[0, 120, 240].map(a => (
            <rect key={a} x="48" y="16" width="4" height="8" rx="2" fill="url(#gear4)" transform={`rotate(${a} 50 50)`} />
          ))}
        </svg>
      </div>

      {/* Content */}
      <div className="relative">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-8 text-center">
          Built for <span className="text-accent-400">Production</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-20 leading-relaxed text-center">
          HomeOffice Hub is more than an e‑commerce demo – it’s a fully automated,
          cloud‑native platform engineered with modern DevOps practices from the ground up.
        </p>

        {/* Feature cards (unchanged) */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {[
            {
              title: "Containerized",
              icon: "📦",
              desc: "Every service (frontend, backend, database) runs in its own Docker container, ensuring consistent environments from development to production."
            },
            {
              title: "Orchestrated",
              icon: "☸️",
              desc: "Kubernetes on GCP handles deployment, scaling, and self‑healing. ArgoCD keeps the cluster in sync with Git – true GitOps."
            },
            {
              title: "Infrastructure as Code",
              icon: "🏗️",
              desc: "Terraform provisions the entire GCP infrastructure: VPC, GKE cluster, Artifact Registry. One command to spin it all up."
            },
            {
              title: "Observable",
              icon: "📊",
              desc: "Prometheus scrapes metrics, Grafana displays rich dashboards. You can see exactly what’s happening under the hood."
            }
          ].map((item, i) => (
            <div key={i} className="bg-gray-800/90 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-accent-500 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Fancy tech stack section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-6">The Tech Behind It</h2>
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-3xl mx-auto">
            {[
              { name: "Python", icon: "🐍" },
              { name: "Flask", icon: "🔥" },
              { name: "Next.js", icon: "⚡" },
              { name: "Tailwind", icon: "🎨" },
              { name: "PostgreSQL", icon: "🗄️" },
              { name: "Docker", icon: "🐳" },
              { name: "Kubernetes", icon: "☸️" },
              { name: "Terraform", icon: "🏗️" },
              { name: "GCP", icon: "☁️" },
              { name: "ArgoCD", icon: "🚀" },
              { name: "Prometheus", icon: "📈" },
              { name: "Grafana", icon: "📊" },
            ].map((tech) => (
              <div
                key={tech.name}
                className="bg-gray-800/90 backdrop-blur-sm border border-gray-700 rounded-xl p-4 flex flex-col items-center gap-2 hover:border-accent-500 hover:bg-gray-700/50 transition-all duration-300 group"
              >
                <span className="text-2xl group-hover:scale-125 transition-transform duration-300">{tech.icon}</span>
                <span className="text-sm font-medium text-gray-300 group-hover:text-white">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}