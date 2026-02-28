import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Blog() {
  const writtenBlogs = [
    {
      id: 1,
      title: 'Solve a Problem, Don\'t Sell a Product',
      description: 'Discover why shifting your focus from product features to solving client problems is the key to building lasting advisory relationships.',
      date: 'February 28, 2026',
      link: '/blog/solve-a-problem-dont-sell-a-product',
      imageUrl: '/pictures/solve.jpg'
    },
    {
      id: 2,
      title: 'Using Digital Marketing to Fill Up Workshops',
      description: 'Discover how digital marketing compares to traditional mailers for filling educational workshops and dinner seminars, backed by real results.',
      date: 'Recent',
      link: '/blog/using-digital-marketing-to-fill-up-workshops',
      imageUrl: '/pictures/UsingDigital.jpg'
    },
    {
      id: 3,
      title: 'The Most Important Part of a Workshop',
      description: 'A workshop is won or lost during the opening sequence. Learn the blueprint to winning the room and why prospects buy you, not your PowerPoint.',
      date: 'February 28, 2026',
      link: '/blog/the-most-important-part-of-a-workshop',
      imageUrl: '/pictures/TheMost.jpg'
    },
    {
      id: 4,
      title: 'Why Top Advisors Sell Their Process, Not Product',
      description: 'Products change, but a solid process endures. See why the industry\'s most successful advisors lead with their methodology.',
      date: 'February 28, 2026',
      link: '/blog/why-top-advisors-sell-their-process-not-product',
      imageUrl: '/pictures/WhyTop.jpg'
    }
  ];

  return (
    <div className="relative bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-brand-blue pt-24 pb-48 sm:pt-32 sm:pb-64 overflow-hidden">
        {/* Background Texture/Image */}
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://picsum.photos/seed/insights/1920/1080"
            alt="Background"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-brand-blue mix-blend-multiply"></div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px]"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-accent/10 rounded-full blur-3xl"></div>
        
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <div className="flex flex-col items-center">
            <span className="text-brand-accent font-semibold tracking-[0.2em] uppercase text-base sm:text-lg mb-6">
              Insights & Strategy
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight tracking-tight max-w-4xl">
              Navigating the Complexities of <br />
              <span className="text-brand-accent italic mt-2 inline-block">Advisor Growth</span>
            </h1>
            <p className="mt-8 text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Actionable advice, proven frameworks, and industry insights to help you build, scale, and capitalize your practice.
            </p>
          </div>
        </div>
      </div>

      {/* Blog Posts Section */}
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 -mt-32 sm:-mt-48 pb-24">
        <div className="flex items-center gap-3 mb-10 border-b border-white/10 sm:border-gray-200 pb-4">
          <h3 className="text-2xl font-serif font-bold text-white sm:text-brand-blue">Latest Articles</h3>
        </div>
        
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          {writtenBlogs.map((post) => (
            <article key={post.id} className="relative flex flex-col items-start justify-between bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 group">
              <div className="relative w-full overflow-hidden">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  referrerPolicy="no-referrer"
                  className="aspect-[16/9] w-full object-cover sm:aspect-[2/1] lg:aspect-[3/2] transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="max-w-xl p-8">
                <div className="flex items-center gap-x-4 text-xs">
                  <time dateTime={post.date} className="text-gray-500 font-medium">
                    {post.date}
                  </time>
                  <span className="relative z-10 rounded-full bg-brand-blue/5 px-3 py-1.5 font-semibold text-brand-blue">
                    Practice Management
                  </span>
                </div>
                <div className="group">
                  <h3 className="mt-4 text-xl sm:text-2xl font-serif font-bold leading-tight text-brand-blue group-hover:text-brand-accent transition-colors">
                    {post.link.startsWith('http') ? (
                      <a href={post.link} target="_blank" rel="noopener noreferrer">
                        <span className="absolute inset-0" />
                        {post.title}
                      </a>
                    ) : (
                      <Link to={post.link}>
                        <span className="absolute inset-0" />
                        {post.title}
                      </Link>
                    )}
                  </h3>
                  <p className="mt-4 line-clamp-3 text-sm leading-6 text-gray-600">
                    {post.description}
                  </p>
                </div>
                <div className="mt-8 flex items-center gap-x-2 text-sm font-bold text-brand-blue group-hover:text-brand-accent transition-colors">
                  Read full article <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
