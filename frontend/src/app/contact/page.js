function EngineerCard({ name, photo, linkedin, github, subtitle }) {
  return (
    <div className="bg-gray-800/90 backdrop-blur-sm rounded-2xl p-10 border border-gray-700 shadow-lg hover:border-emerald-500/70 hover:-translate-y-2 transition-all duration-300 flex flex-col items-center w-full max-w-sm">
      <div className="w-40 h-40 rounded-full border-2 border-emerald-500 overflow-hidden mb-6 bg-gray-900 animate-pulse-glow">
        {photo ? (
          <img
            src={photo}
            alt={`${name}'s photo`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl font-bold text-emerald-400 bg-gray-700">
            {name.split(' ').map(n => n[0]).join('')}
          </div>
        )}
      </div>

      <h2 className="text-3xl font-bold text-white">{name}</h2>
      <p className="text-emerald-400 font-medium text-lg mt-1">DevOps & Cloud Engineer</p>
      {subtitle && <p className="text-gray-400 text-sm mt-1">{subtitle}</p>}

      <div className="flex gap-6 mt-6">
        <a
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-300 hover:text-emerald-400 transition-colors underline underline-offset-4 text-lg"
        >
          LinkedIn
        </a>
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-300 hover:text-emerald-400 transition-colors underline underline-offset-4 text-lg"
        >
          GitHub
        </a>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-20 px-4">
      <div className="text-center w-full">
        <h1 className="text-4xl font-bold text-white mb-4">Our Team</h1>
        <p className="text-lg text-gray-400 mb-12">
          The engineers who designed, built, and automated HomeOffice Hub.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-8">
          <EngineerCard
            name="Ahmed Aman"
            photo="https://avatars.githubusercontent.com/u/128940419?v=4"
            linkedin="https://www.linkedin.com/in/ahmedaman1/"
            github="https://github.com/aman-ahmed0"
          />

          <EngineerCard
            name="Ahmed Fawzy"
            photo="https://avatars.githubusercontent.com/u/77797471?v=4"
            subtitle="(Ahmed Abdelsamad)"
            linkedin="https://www.linkedin.com/in/ahmed-abdelsamad-2825851b0/"
            github="https://github.com/AhmeFawzy"
          />
        </div>
      </div>
    </div>
  );
}