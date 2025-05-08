const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-black text-white">
      <header className="container mx-auto py-16 px-4 text-center">
        <h1 className="text-5xl font-bold mb-6 text-blue-300">Cosmic Explorer</h1>
        <p className="text-xl mb-8">Immerse yourself in the latest discoveries and challenges of the cosmos</p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="articles.html" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition-all">
            Explore Articles
          </a>
          <a href="games.html" className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full transition-all">
            Play Space Games
          </a>
          <a href="planet-weight.html" className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-full transition-all">
            Calculate Planet Weight
          </a>
        </div>
      </header>

      <section className="container mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-blue-300">Featured Content</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-blue-900/50 p-6 rounded-lg backdrop-blur-sm border border-blue-700/50 hover:transform hover:scale-105 transition-transform">
            <h3 className="text-xl font-bold mb-4">Space Articles</h3>
            <p className="mb-4">Explore the latest discoveries in space science and astronomy.</p>
            <a href="articles.html" className="text-blue-300 hover:text-blue-100">Read more →</a>
          </div>
          
          <div className="bg-purple-900/50 p-6 rounded-lg backdrop-blur-sm border border-purple-700/50 hover:transform hover:scale-105 transition-transform">
            <h3 className="text-xl font-bold mb-4">Space Games</h3>
            <p className="mb-4">Test your knowledge and skills with our space-themed games.</p>
            <a href="games.html" className="text-purple-300 hover:text-purple-100">Play now →</a>
          </div>
          
          <div className="bg-teal-900/50 p-6 rounded-lg backdrop-blur-sm border border-teal-700/50 hover:transform hover:scale-105 transition-transform">
            <h3 className="text-xl font-bold mb-4">Planet Weight Calculator</h3>
            <p className="mb-4">Discover what you would weigh on different planets in our solar system.</p>
            <a href="planet-weight.html" className="text-teal-300 hover:text-teal-100">Calculate now →</a>
          </div>
        </div>
      </section>

      <footer className="mt-12 py-8 bg-black/50 text-center">
        <p>Created by Shaurya Mehta</p>
        <div className="flex justify-center gap-4 mt-4">
          <a href="index.html" className="text-blue-300 hover:text-blue-100">Home</a>
          <a href="articles.html" className="text-blue-300 hover:text-blue-100">Articles</a>
          <a href="games.html" className="text-blue-300 hover:text-blue-100">Games</a>
          <a href="planet-weight.html" className="text-blue-300 hover:text-blue-100">Planet Weight</a>
        </div>
      </footer>
    </div>
  );
};

export default Index;












