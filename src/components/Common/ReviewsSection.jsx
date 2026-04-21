import React from 'react';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

const reviewsData = [
  {
    id: 1,
    name: "Eleanor Pena",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Eleanor",
    courseTitle: "Advanced Machine Learning Concepts",
    rating: 5.0,
    reviewText: "This course completely transformed my understanding of ML algorithms. The instructor breaks down complex topics into digestible, easy-to-understand modules. Highly recommended for anyone looking to level up their skills.",
    timestamp: "2 weeks ago"
  },
  {
    id: 2,
    name: "Guy Hawkins",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Guy",
    courseTitle: "Full-Stack Web Development Bootcamp",
    rating: 4.5,
    reviewText: "Incredible depth and clarity. The real-world projects helped me land my first job as a developer. The community support is also top-notch. I feel fully prepared for the industry.",
    timestamp: "1 month ago"
  },
  {
    id: 3,
    name: "Kristin Watson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kristin",
    courseTitle: "UI/UX Design Masterclass",
    rating: 5.0,
    reviewText: "A masterclass in every sense. I learned how to create beautiful, accessible, and user-centric designs. The practical exercises were exactly what I needed to build my portfolio.",
    timestamp: "3 days ago"
  }
];

const StarRating = ({ rating }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(<FaStar key={i} className="text-yellow-400 w-4 h-4" />);
    } else if (i === fullStars && hasHalfStar) {
      stars.push(<FaStarHalfAlt key={i} className="text-yellow-400 w-4 h-4" />);
    } else {
      stars.push(<FaStar key={i} className="text-richblack-600 w-4 h-4" />);
    }
  }

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex">{stars}</div>
      <span className="text-sm font-semibold text-richblack-50 ml-1">{rating.toFixed(1)}</span>
    </div>
  );
};

const ReviewCard = ({ review }) => {
  return (
    <div className="group relative flex flex-col justify-between rounded-2xl border border-richblack-700/50 bg-richblack-800/40 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-richblack-500/50 hover:bg-richblack-800/60 hover:shadow-card">
      {/* Subtle glow on hover behind the card */}
      <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100 blur-xl"></div>
      
      <div>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-50 blur-sm"></div>
              <img 
                src={review.avatar} 
                alt={review.name} 
                className="relative h-12 w-12 rounded-full border-[1.5px] border-richblack-600 bg-richblack-700 object-cover"
              />
            </div>
            <div>
              <h4 className="text-base font-semibold text-richblack-5">{review.name}</h4>
              <p className="text-xs font-medium text-richblack-300 line-clamp-1">{review.courseTitle}</p>
            </div>
          </div>
        </div>

        <div className="mt-5 mb-4">
          <StarRating rating={review.rating} />
        </div>

        <p className="text-sm leading-relaxed text-richblack-100 mb-6">
          "{review.reviewText}"
        </p>
      </div>

      <div className="mt-auto border-t border-richblack-700/50 pt-4 flex items-center justify-between">
        <span className="text-xs text-richblack-400 font-medium flex items-center gap-1.5">
           <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
           </svg>
          {review.timestamp}
        </span>
      </div>
    </div>
  );
};

const ReviewsSection = () => {
  return (
    <section className="relative w-full overflow-hidden bg-richblack-900 py-24 font-inter">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Soft Mesh Gradient Orbs */}
        <div className="absolute top-[-20%] left-[-10%] h-[600px] w-[600px] rounded-full bg-blue-600/15 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] h-[700px] w-[700px] rounded-full bg-purple-600/10 blur-[150px]"></div>
        <div className="absolute top-[20%] left-[50%] h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[100px]"></div>
        
        {/* Noise Texture Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.04] mix-blend-overlay" 
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
        ></div>
        
        {/* Grid lines for depth & structure */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_20%,transparent_100%)]"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-maxContent px-4 sm:px-6 lg:px-8">
        {/* Header Area */}
        <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <h2 className="bg-gradient-to-br from-richblack-5 to-richblack-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl lg:text-5xl">
              Reviews from other learners
            </h2>
            <p className="mt-4 text-base text-richblack-300">
              See what our community has to say about their learning experience and how it transformed their careers.
            </p>
          </div>
          <button className="group relative inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-richblack-800/80 px-6 py-2.5 text-sm font-medium text-richblack-50 transition-all hover:bg-richblack-700 border border-richblack-700/50 hover:border-richblack-500 shadow-sm backdrop-blur-sm hover:shadow-glow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-richblack-900">
            See all reviews
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1 text-richblack-300 group-hover:text-richblack-50"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviewsData.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
