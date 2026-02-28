import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, Linkedin, Mail, Youtube } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h1 className="text-4xl font-serif font-bold text-brand-blue mb-4">Post Not Found</h1>
          <Link to="/blog" className="text-brand-accent hover:underline flex items-center justify-center">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Insights
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-brand-blue pt-24 pb-48 sm:pt-32 sm:pb-64 overflow-hidden">
        {/* Background Texture/Image */}
        <div className="absolute inset-0 opacity-10">
          <img
            src={post.imageUrl}
            alt="Background"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-brand-blue mix-blend-multiply"></div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px]"></div>
        
        <div className="relative mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <Link to="/blog" className="inline-flex items-center text-brand-accent hover:text-white transition-colors mb-8 text-sm font-bold">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Insights
          </Link>
          <div className="flex flex-col items-center">
            <span className="text-brand-accent font-semibold tracking-[0.2em] uppercase text-base sm:text-lg mb-6">
              Insights & Strategy
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight tracking-tight">
              {post.title.split(' ').slice(0, -2).join(' ')} <br />
              <span className="text-brand-accent italic mt-2 inline-block">
                {post.title.split(' ').slice(-2).join(' ')}
              </span>
            </h1>
            
            <div className="mt-8 flex items-center justify-center space-x-6 text-gray-400 text-sm italic">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 text-brand-accent mr-2" />
                {post.date}
              </div>
              <span className="text-gray-600">•</span>
              <div className="flex items-center">
                <Clock className="h-4 w-4 text-brand-accent mr-2" />
                {post.readTime}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative mx-auto max-w-4xl px-6 lg:px-8 -mt-32 sm:-mt-48 pb-24">
        {/* Video Section (if applicable) */}
        {post.videoUrl && (
          <div className="mb-16">
            <div className="aspect-video bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <iframe
                src={post.videoUrl}
                title={post.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="mt-4 text-center">
              <p className="text-brand-blue font-serif text-xl italic">Watch the Strategy Session</p>
            </div>
          </div>
        )}

        {/* Article Body */}
        <article className="bg-white rounded-3xl shadow-xl p-8 sm:p-12 border border-gray-100">
          <div 
            className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-brand-blue prose-p:text-gray-600 prose-strong:text-brand-blue prose-a:text-brand-accent hover:prose-a:underline"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Author Bio */}
          <div className="mt-20 pt-12 border-t border-gray-100 flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 border-2 border-brand-accent/20">
              <img 
                alt="Kevin Nuber" 
                className="w-full h-full object-cover" 
                src="/pictures/kevin-headshot.jpg"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://picsum.photos/seed/kevin/200/200";
                }}
              />
            </div>
            <div>
              <h4 className="text-xl font-serif font-bold text-brand-blue mb-2">Written by Kevin Nuber</h4>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Advisor Development Consultant helping seasoned financial professionals overcome unique challenges at every phase of their lifecycle.
              </p>
              <div className="flex space-x-6">
                <Link to="/blog" className="text-brand-accent hover:underline text-sm font-bold">
                  View more posts
                </Link>
                <a href="https://www.linkedin.com/in/kevin-nuber-7b4b1a1/" target="_blank" rel="noopener noreferrer" className="text-brand-accent hover:underline text-sm font-bold">
                  Connect on LinkedIn
                </a>
              </div>
            </div>
          </div>
        </article>

        {/* Navigation Back */}
        <div className="mt-12 text-center">
          <Link to="/blog" className="inline-flex items-center text-brand-blue font-bold hover:text-brand-accent transition-colors">
            <ArrowLeft className="mr-2 h-5 w-5" /> Back to all insights
          </Link>
        </div>
      </div>
    </div>
  );
}
