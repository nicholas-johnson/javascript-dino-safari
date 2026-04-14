export function BrendanEichSlide() {
  return (
    <div className="flex-1 flex flex-col justify-center items-center p-8">
      <div className="flex flex-col md:flex-row items-center gap-10 max-w-4xl">
        <img
          src="/brendan-eich.jpg"
          alt="Brendan Eich, creator of JavaScript"
          className="w-64 h-64 rounded-2xl object-cover shadow-lg shadow-purple-900/40"
        />
        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Brendan Eich
          </h1>
          <p className="text-xl text-gray-300 mb-2">
            Created JavaScript in <strong className="text-white">10 days</strong> at
            Netscape, May 1995.
          </p>
          <p className="text-lg text-gray-400">
            His brief was: "make it look like Java, but make it for non-programmers." What
            he actually built was something far more interesting.
          </p>
          <p className="text-sm text-gray-600 mt-6">
            Photo: Darcy Padilla / Mozilla Foundation - CC BY-SA 3.0
          </p>
        </div>
      </div>
    </div>
  );
}
