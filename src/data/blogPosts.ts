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
    id: 1,
    slug: 'solve-a-problem-dont-sell-a-product',
    title: 'Solve a Problem, Don\'t Sell a Product',
    subtitle: 'Shifting from Practitioner to Business Owner',
    description: 'Discover why shifting your focus from product features to solving client problems is the key to building lasting advisory relationships.',
    date: 'February 28, 2026',
    readTime: '6 min read',
    imageUrl: '/pictures/solve.jpg',
    videoUrl: 'https://www.youtube.com/embed/NCX_3OvVnkA',
    category: 'Practice Management',
    content: `
      <p class="text-xl leading-relaxed font-light italic border-l-4 border-brand-accent pl-6 mb-12">
        "In today's rapidly evolving financial landscape, the path from 'Building' a practice to 'Capitalizing' on its full value is rarely a straight line. It requires a fundamental shift in mindset from being a practitioner to being a business owner."
      </p>

      <h2 class="text-3xl font-serif font-bold text-brand-blue mt-12 mb-6">The Product Expert Trap</h2>
      <p>
        Once you get your insurance license, it's easy to think the quickest way to success is to be a product expert. You research every annuity, learn every feature, and run the numbers to show the highest possible returns. You think that if you become the ultimate expert, people will naturally flock to your office like the "Field of Dreams."
      </p>
      <p>
        But then reality hits. You find out that nobody really cares how much of an expert you are, and they don't care how much you know about a specific product. This is where many advisors fail, but it's also where the top 1% have their greatest epiphany: <strong>Their main goal is to solve a problem, not sell a product.</strong>
      </p>

      <h2 class="text-3xl font-serif font-bold text-brand-blue mt-12 mb-6">Identifying Your Dream Customer</h2>
      <p>
        To become a problem solver, you first have to identify who your "dream customer" is. And here's a hint: it's not just someone you can make a large commission on. That's solving a problem for yourself, not for them.
      </p>
      <p>
        You need to understand your ideal client thoroughly. What are their pains? What are their specific problems? Where are they running into roadblocks, and where are they trying to go? Only once you understand the destination can you start thinking about the vehicle—the product—that will get them there.
      </p>

      <div class="bg-slate-50 p-8 rounded-lg my-12 border border-gray-100">
        <h4 class="text-brand-accent font-bold text-lg mb-4">The Power of the Process</h4>
        <p class="mb-0 italic text-gray-700">
          "Once you show the ideal result and the problem you will solve to a client, you must lead with your process. A product is just a vehicle, but your process is the roadmap that ensures they reach their destination safely."
        </p>
      </div>

      <h2 class="text-3xl font-serif font-bold text-brand-blue mt-12 mb-6">From Rookie to Top Advisor</h2>
      <p>
        The rookie advisor immediately jumps into selling a product. The top advisor leads with a multi-step process that addresses the client's biggest risks in order:
      </p>
      <ul class="list-disc pl-6 space-y-4 text-gray-600">
        <li><strong>Maximize Projected Income:</strong> Starting with Social Security to create a solid baseline.</li>
        <li><strong>Secure the Paycheck:</strong> Ensuring basic needs are met before taking market risks.</li>
        <li><strong>Minimize Tax Risk:</strong> Looking at the money from a tax perspective to keep more of what was saved.</li>
      </ul>

      <p>
        By framing your work as solving a series of problems through a proprietary process, you stop being a salesperson and start being a trusted consultant. You're no longer selling a vehicle; you're selling the result.
      </p>
    `
  },
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
  },
  {
    id: 3,
    slug: 'the-most-important-part-of-a-workshop',
    title: 'The Most Important Part of a Workshop',
    subtitle: 'Winning the Room in the First 10 Minutes',
    description: 'A workshop is won or lost during the opening sequence. Learn the blueprint to winning the room and why prospects buy you, not your PowerPoint.',
    date: 'February 28, 2026',
    readTime: '7 min read',
    imageUrl: '/pictures/TheMost.jpg',
    videoUrl: 'https://www.youtube.com/embed/4Cg_Sb-MGBc',
    category: 'Practice Management',
    content: `
      <p class="text-xl leading-relaxed font-light italic border-l-4 border-brand-accent pl-6 mb-12">
        "I've seen two advisors do the exact same workshop—same slides, same restaurant, same marketing. One booked the entire room, the other booked almost nobody. The only difference? The opening sequence."
      </p>

      <h2 class="text-3xl font-serif font-bold text-brand-blue mt-12 mb-6">A Tale of Two Openings</h2>
      <p>
        I want to share a true story that perfectly illustrates why the first ten minutes of your presentation are more important than the next hour of facts and figures.
      </p>
      
      <h3 class="text-2xl font-serif font-bold text-brand-blue mt-8 mb-4">Advisor #1: The "Rockstar" Disaster</h3>
      <p>
        In the first scenario, the atmosphere was chaotic. Prospects walked in with no one to greet them. They wandered around looking for name tags and eventually found seats in the back. Then, classic rock started blasting, and the advisor ran onto the stage like he was at a concert.
      </p>
      <p>
        He spent the first fifteen minutes talking about himself and how successful he was. He tried to break the ice with jokes about why men die younger than women and his own recent divorce. The room was silent. By the time he got to the actual financial content, he had already lost them. Only one or two people booked an appointment; everyone else couldn't wait to leave.
      </p>

      <h3 class="text-2xl font-serif font-bold text-brand-blue mt-8 mb-4">Advisor #2: The Choreographed Professional</h3>
      <p>
        The second advisor was different. Every prospect was greeted at the door and personally walked to the registration table. The advisor then walked them to their pre-assigned seats in the front of the room, where professional branded materials were waiting.
      </p>
      <p>
        When he took the stage, he didn't talk about himself. He talked about <em>them</em>. He spoke to their pains, their frustrations, and their fears. He told a powerful personal story about why he chose this profession. Before he even touched a single slide of "logic," the entire room was emotionally ready to work with him.
      </p>

      <div class="bg-slate-50 p-8 rounded-lg my-12 border border-gray-100">
        <h4 class="text-brand-accent font-bold text-lg mb-4">The Psychology of the Close</h4>
        <p class="mb-0 italic text-gray-700">
          "People make decisions based on emotion and justify them with logic. Your opening sequence handles the emotion; your main content provides the justification. If you fail the opening, the logic doesn't matter."
        </p>
      </div>

      <h2 class="text-3xl font-serif font-bold text-brand-blue mt-12 mb-6">The Blueprint for Success</h2>
      <p>
        A perfectly choreographed opening sequence is intentional. It’s not just about being "nice"—it’s about creating an environment where prospects feel safe, understood, and confident in your leadership.
      </p>
      <p>
        If you want to know the exact script and structure that top advisors use to close the room before the first course is even served, reach out to me. This is exactly what we coach advisors on every single day.
      </p>
    `
  }
];
