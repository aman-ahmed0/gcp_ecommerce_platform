export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto py-20 px-4">
      {/* Hero */}
      <div className="text-center mb-20">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6">
          Built for <span className="text-accent-400">Production</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
          HomeOffice Hub is more than an e‑commerce demo – it’s a fully automated,
          cloud‑native platform engineered with modern DevOps practices from the ground up.
        </p>
      </div>

      {/* Core pillars grid */}
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
          <div key={i} className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-accent-500 transition-all duration-300 hover:shadow-xl">
            <div className="text-3xl mb-3">{item.icon}</div>
            <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
            <p className="text-gray-400">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Tech stack badge cloud */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-6">The Tech Behind It</h2>
        <div className="flex flex-wrap justify-center gap-3">
          {["Python", "Flask", "Next.js", "Tailwind", "PostgreSQL", "Docker", "Kubernetes", "Terraform", "GCP", "ArgoCD", "Prometheus", "Grafana"].map(tech => (
            <span key={tech} className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-full text-sm font-medium text-accent-400 hover:bg-accent-400 hover:text-gray-900 transition-colors cursor-default">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}