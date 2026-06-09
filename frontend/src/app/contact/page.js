function EngineerCard({ name, photo, linkedin, github, subtitle }) {
  return (
    <div className="bg-gray-800/90 rounded-2xl p-8 border border-gray-700 shadow-lg hover:border-emerald-500/70 transition-colors flex flex-col items-center">
      <div className="w-32 h-32 rounded-full border-2 border-emerald-500 overflow-hidden mb-5 bg-gray-900">
        {photo ? (
          <img
            src={photo}
            alt={`${name}'s photo`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-emerald-400 bg-gray-700">
            {name.split(' ').map(n => n[0]).join('')}
          </div>
        )}
      </div>

      <h2 className="text-2xl font-bold text-white">{name}</h2>
      <p className="text-emerald-400 font-medium mt-1">DevOps & Cloud Engineer</p>
      {subtitle ? <p className="text-gray-400 text-sm mt-1">{subtitle}</p> : null}

      <div className="flex gap-5 mt-5">
        <a
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-300 hover:text-emerald-400 transition-colors underline underline-offset-4"
        >
          LinkedIn
        </a>
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-300 hover:text-emerald-400 transition-colors underline underline-offset-4"
        >
          GitHub
        </a>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <div className="max-w-5xl mx-auto py-20 px-4 text-center">
      <h1 className="text-4xl font-bold text-white mb-4">Our Team</h1>
      <p className="text-lg text-gray-400 mb-12">
        The engineers who designed, built, and automated HomeOffice Hub.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
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
  );
}