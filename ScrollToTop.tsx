import { Youtube, ArrowRight } from 'lucide-react';
import personalVideos from '../data/personalVideos.json';

export default function Personal() {

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-brand-blue py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://picsum.photos/seed/personalhero/1920/1080"
            alt="Personal Life"
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover opacity-20 mix-blend-multiply"
          />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-serif font-bold tracking-tight text-white sm:text-6xl">
            Beyond the Business
          </h1>
          <div className="mt-12 mb-8 mx-auto max-w-4xl rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <img
              src="/pictures/personal.jpg"
              alt="Kevin Nuber Personal"
              className="w-full h-auto object-cover aspect-[2/1]"
            />
          </div>
          <p className="mt-6 text-lg leading-8 text-gray-300 max-w-2xl mx-auto">
            Life isn't just about work, but work provides us the freedom to pursue our hobbies and spend time with the people we cherish. Balancing work and life is the key achieving happiness.
          </p>
          <div className="mt-10 flex justify-center gap-x-6">
            <a
              href="https://www.youtube.com/@TheKnuber"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-md bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 transition-all"
            >
              <Youtube className="mr-2 h-5 w-5" />
              Subscribe to TheKnuber
            </a>
          </div>
        </div>
      </div>

      {/* YouTube Gallery */}
      <div className="bg-brand-light py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-serif font-bold tracking-tight text-brand-blue">Latest from YouTube</h2>
              <p className="mt-2 text-lg text-gray-600">Catch up on my recent adventures.</p>
            </div>
            <a
              href="https://www.youtube.com/@TheKnuber"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center text-brand-blue font-semibold hover:text-brand-accent transition-colors"
            >
              View all videos <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {personalVideos.map((video) => (
              <div key={video.id} className="flex flex-col rounded-2xl bg-white shadow-lg border border-gray-100 overflow-hidden">
                <iframe
                  className="w-full aspect-video"
                  src={`https://www.youtube.com/embed/${video.youtubeId}`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <div className="p-6">
                  <h3 className="text-lg font-serif font-semibold leading-6 text-brand-blue">
                    {video.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-10 sm:hidden flex justify-center">
            <a
              href="https://www.youtube.com/@TheKnuber"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-brand-blue font-semibold hover:text-brand-accent transition-colors"
            >
              View all videos <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
