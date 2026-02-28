export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  date: string;
  readTime: string;
  imageUrl: string;
  videoUrl?: string;
  category: string;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 2,
    slug: 'using-digital-marketing-to-fill-up-workshops',
    title: 'Using Digital Marketing to Fill Up Workshops',
    subtitle: 'Digital vs. Traditional Mailers',
    description: 'Discover how digital marketing compares to traditional mailers for filling educational workshops and dinner seminars, backed by real results.',
    date: 'October 24, 2025',
    readTime: '8 min read',
    imageUrl: '/pictures/UsingDigital.jpg',
    videoUrl: 'https://www.youtube.com/embed/CcK2ZD8a-KY',
    category: 'Practice Management',
    content: `
      <p class="text-xl leading-relaxed font-light italic border-l-4 border-brand-accent pl-6 mb-12">
        "In today's rapidly evolving financial landscape, the path from 'Building' a practice to 'Capitalizing' on its full value is rarely a straight line. It requires a fundamental shift in mindset from being a practitioner to being a business owner."
      </p>

      <h2 class="text-3xl font-serif font-bold text-brand-blue mt-12 mb-6">Digital vs. Traditional Mailers</h2>
      <p>
        First off, if you are using mailers and it's working, don't stop what you are doing. Mailers have been the backbone of advisor workshops for decades, and for many, they still provide a reliable stream of prospects.
      </p>
      <p>
        However, if you are looking to add more workshops in an area, or market to a different list of clients, then digital might work for you. Digital marketing offers a level of targeting and cost-efficiency that traditional mail simply cannot match.
      </p>

      <h2 class="text-3xl font-serif font-bold text-brand-blue mt-12 mb-6">Real Results from the Field</h2>
      <p>
        Today I just want to focus on some results from the recent workshops we have been running using digital marketing. We spent over <strong>$1 MILLION DOLLARS</strong> of digital ads last year for our advisors, and the data is clear.
      </p>
      
      <div class="bg-slate-50 p-8 rounded-lg my-12 border border-gray-100">
        <h4 class="text-brand-accent font-bold text-lg mb-4">The Scottsdale Snapshot</h4>
        <p class="mb-0 italic text-gray-700">
          In a recent set of workshops in the Scottsdale area, we saw a significant return on a $1,500 ad spend per night. The cost per attendee and subsequent appointment rate outperformed traditional mailers in the same demographic.
        </p>
      </div>

      <h2 class="text-3xl font-serif font-bold text-brand-blue mt-12 mb-6">The Takeaway</h2>
      <p>
        The takeaway is that Digital should be part of your advertising for your workshops. It's not necessarily about replacing what works, but about diversifying your lead sources and reaching prospects where they spend their time—online.
      </p>
      <p>
        Over the next weeks I'll include some content that answers many of the questions advisors have about using Digital. If you're ready to see how this can work for your specific practice, let's connect.
      </p>
    `
  }
];
