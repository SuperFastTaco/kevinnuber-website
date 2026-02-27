import { PlayCircle, FileText, ArrowRight } from 'lucide-react';

export default function Blog() {
  const writtenBlogs = [
    {
      id: 1,
      title: 'Solve a Problem, Don\'t Sell a Product',
      description: 'Discover why shifting your focus from product features to solving client problems is the key to building lasting advisory relationships.',
      date: 'Recent',
      link: 'https://www.lifepro.com/Blog/solve-a-problem-dont-sell-a-product',
      imageUrl: '/pictures/solve.jpg'
    },
    {
      id: 2,
      title: 'Using Digital Marketing to Fill Up Workshops',
      description: 'Discover how digital marketing compares to traditional mailers for filling educational workshops and dinner seminars, backed by real results.',
      date: 'Recent',
      link: 'https://vid.us/0knd5k',
      imageUrl: '/pictures/UsingDigital.jpg'
    },
    {
      id: 3,
      title: 'The Most Important Part of a Workshop',
      description: 'A workshop is won or lost during the opening sequence. Learn the blueprint to winning the room and why prospects buy you, not your PowerPoint.',
      date: 'Recent',
      link: 'https://vid.us/lob1c8',
      imageUrl: '/pictures/TheMost.jpg'
    },
    {
      id: 4,
      title: 'Why Top Advisors Sell Their Process, Not Product',
      description: 'Products change, but a solid process endures. See why the industry\'s most successful advisors lead with their methodology.',
      date: 'Recent',
      link: 'https://www.lifepro.com/Blog/why-top-advisors-sell-their-process-not-product',
      imageUrl: '/pictures/WhyTop.jpg'
    }
  ];

  const videoBlogs = [
    {
      id: 1,
      title: 'The Advisor Lifecycle Explained',
      description: 'A deep dive into the Build, Scale, and Capitalize phases of an advisory practice.',
      duration: '5:24',
      imageUrl: 'https://picsum.photos/seed/video1/600/400'
    },
    {
      id: 2,
      title: 'Overcoming the Growth Plateau',
      description: 'Why most advisors get stuck at $1M in revenue and how to break through.',
      duration: '8:15',
      imageUrl: 'https://picsum.photos/seed/video2/600/400'
    }
  ];

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-serif font-bold tracking-tight text-brand-blue sm:text-5xl">Insights & Strategies</h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Actionable advice, proven frameworks, and industry insights to help you build, scale, and capitalize your practice.
          </p>
        </div>

        {/* Written Blogs Section */}
        <div className="mt-20">
          <div className="flex items-center gap-3 mb-10 border-b border-gray-200 pb-4">
            <FileText className="h-6 w-6 text-brand-accent" />
            <h3 className="text-2xl font-serif font-bold text-brand-blue">Latest Articles</h3>
          </div>
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            {writtenBlogs.map((post) => (
              <article key={post.id} className="flex flex-col items-start justify-between bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative w-full">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    referrerPolicy="no-referrer"
                    className="aspect-[16/9] w-full object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                  />
                  <div className="absolute inset-0 rounded-t-2xl ring-1 ring-inset ring-gray-900/10" />
                </div>
                <div className="max-w-xl p-8">
                  <div className="flex items-center gap-x-4 text-xs">
                    <time dateTime={post.date} className="text-gray-500">
                      {post.date}
                    </time>
                    <span className="relative z-10 rounded-full bg-blue-50 px-3 py-1.5 font-medium text-brand-blue">
                      Practice Management
                    </span>
                  </div>
                  <div className="group relative">
                    <h3 className="mt-4 text-xl font-serif font-semibold leading-6 text-brand-blue group-hover:text-brand-accent transition-colors">
                      <a href={post.link} target="_blank" rel="noopener noreferrer">
                        <span className="absolute inset-0" />
                        {post.title}
                      </a>
                    </h3>
                    <p className="mt-4 line-clamp-3 text-sm leading-6 text-gray-600">
                      {post.description}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center gap-x-2 text-sm font-medium text-brand-blue">
                    Read full article <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Video Blogs Section */}
        <div className="mt-32">
          <div className="flex items-center gap-3 mb-10 border-b border-gray-200 pb-4">
            <PlayCircle className="h-6 w-6 text-brand-accent" />
            <h3 className="text-2xl font-serif font-bold text-brand-blue">Video Insights</h3>
          </div>
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {videoBlogs.map((video) => (
              <article key={video.id} className="flex flex-col items-start justify-between group cursor-pointer">
                <div className="relative w-full rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                  <img
                    src={video.imageUrl}
                    alt={video.title}
                    referrerPolicy="no-referrer"
                    className="aspect-[16/9] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/90 rounded-full p-3 shadow-lg transform transition-transform group-hover:scale-110">
                      <PlayCircle className="h-8 w-8 text-brand-blue" />
                    </div>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded font-medium">
                    {video.duration}
                  </div>
                </div>
                <div className="max-w-xl mt-6">
                  <h3 className="text-lg font-serif font-semibold leading-6 text-brand-blue group-hover:text-brand-accent transition-colors">
                    {video.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-600">
                    {video.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-12 text-center">
            <p className="text-sm text-gray-500 italic">
              * Video section is ready for your content. You can easily add YouTube or Vimeo embeds here.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
