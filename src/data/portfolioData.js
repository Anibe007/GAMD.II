/**
 * Portfolio Data Configuration for GAMAD.II
 * 
 * =========================================================================
 * GOOGLE DRIVE & YOUTUBE INTEGRATION GUIDE:
 * =========================================================================
 * 
 * 1. HOW TO ADD GOOGLE DRIVE VIDEOS (Showreel & Portfolio Videos):
 *    - Upload your video to Google Drive.
 *    - Right-click the file -> "Share" -> Change permission to "Anyone with the link can view".
 *    - Open the video in Google Drive, double-click to play it.
 *    - Click the three dots (More actions) in the top-right corner -> "Open in new window".
 *    - In the new window, click the three dots again -> "Embed item...".
 *    - Copy the URL inside the src attribute of the iframe. It will look like this:
 *      https://drive.google.com/file/d/YOUR_FILE_ID/preview
 *    - Set the 'source' field in this file to that URL, and set 'type' to "video".
 * 
 * 2. HOW TO ADD GOOGLE DRIVE IMAGES (Portfolio Images & Profile Photo):
 *    - Upload your image to Google Drive.
 *    - Right-click the file -> "Share" -> Change permission to "Anyone with the link can view".
 *    - Copy the share link. It will look like this:
 *      https://drive.google.com/file/d/YOUR_IMAGE_ID/view?usp=sharing
 *    - Extract the "YOUR_IMAGE_ID" part.
 *    - To render this image directly in the browser, format it using Google's direct link API:
 *      https://lh3.googleusercontent.com/d/YOUR_IMAGE_ID
 *      (Or: https://drive.google.com/uc?export=view&id=YOUR_IMAGE_ID)
 *    - Use this formatted link for both 'thumbnail' and 'source' (if image).
 * 
 * 3. HOW TO HOST VIDEOS ON YOUTUBE (AS UNLISTED):
 *    - Upload your video projects to YouTube.
 *    - Set the visibility to "Unlisted" so they won't appear in public searches or channel feeds.
 *    - Copy the embed link format:
 *      https://www.youtube.com/embed/YOUR_VIDEO_ID
 *    - Set the 'source' field in this file to that URL, and set 'type' to "video".
 * =========================================================================
 */

export const getYouTubeId = (url) => {
  if (!url) return null;
  // Handle YouTube Shorts URLs (/shorts/VIDEO_ID)
  const shortsMatch = url.match(/\/shorts\/([a-zA-Z0-9_-]{11})/);
  if (shortsMatch) return shortsMatch[1];
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/ ;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

export const formatYouTubeEmbed = (url) => {
  const id = getYouTubeId(url);
  return id ? `https://www.youtube.com/embed/${id}` : url;
};

export const getYouTubeThumbnail = (url) => {
  const id = getYouTubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
};

export const showreelVideo = {
  title: "Culture, Love & Tradition | Cinematic Pre-Wedding Story",
  thumbnail: "https://img.youtube.com/vi/0DfWODdvtCA/hqdefault.jpg",
  source: "https://www.youtube.com/embed/0DfWODdvtCA",
  aspectRatio: "9/16"
};

export const portfolioItems = [
  {
    id: 2,
    title: "Gideon’s Proposal | A Love Story in One Moment",
    category: "videography",
    thumbnail: "https://img.youtube.com/vi/4UNVGkAm4fI/hqdefault.jpg",
    type: "video",
    source: "https://www.youtube.com/embed/4UNVGkAm4fI",
    aspectRatio: "16/9"
  },
  {
    id: 3,
    title: "Culture, Love & Tradition | Cinematic Pre-Wedding Story",
    category: "videography",
    thumbnail: "https://img.youtube.com/vi/0DfWODdvtCA/hqdefault.jpg",
    type: "video",
    source: "https://www.youtube.com/embed/0DfWODdvtCA",
    aspectRatio: "9/16"
  },
  {
    id: 4,
    title: "Discover Viki’s New Book | Book Promo",
    category: "video-editing",
    thumbnail: "https://img.youtube.com/vi/1Q7VsH-oe6w/hqdefault.jpg",
    type: "video",
    source: "https://www.youtube.com/embed/1Q7VsH-oe6w",
    aspectRatio: "9/16"
  },
  {
    id: 5,
    title: "Their Journey to Forever | Pre-Wedding Story",
    category: "videography",
    thumbnail: "https://img.youtube.com/vi/r7gyvCI1luY/hqdefault.jpg",
    type: "video",
    source: "https://www.youtube.com/embed/r7gyvCI1luY",
    aspectRatio: "9/16"
  },
  {
    id: 6,
    title: "Cinematic Short | Visual Story",
    category: "videography",
    thumbnail: "https://img.youtube.com/vi/lL13A1lvQa8/hqdefault.jpg",
    type: "video",
    source: "https://www.youtube.com/embed/lL13A1lvQa8",
    aspectRatio: "9/16"
  },
  {
    id: 31,
    title: "Cinematic Highlights | GAMAD.II Reel",
    category: "videography",
    thumbnail: "https://img.youtube.com/vi/EnM_qnRM1Xk/hqdefault.jpg",
    type: "video",
    source: "https://www.youtube.com/embed/EnM_qnRM1Xk",
    aspectRatio: "16/9"
  },
  // Concert Photography
  {
    id: 50,
    title: "On Stage | Concert Photography",
    category: "concert-photography",
    thumbnail: "/images/Concert img/DSC09351 (1).jpg",
    type: "image",
    source: "/images/Concert img/DSC09351 (1).jpg",
  },
  {
    id: 51,
    title: "Green Haze | Concert Photography",
    category: "concert-photography",
    thumbnail: "/images/Concert img/DSC09356 (1).jpg",
    type: "image",
    source: "/images/Concert img/DSC09356 (1).jpg",
  },
  {
    id: 52,
    title: "Spotlight | Concert Photography",
    category: "concert-photography",
    thumbnail: "/images/Concert img/DSC09359 (1).jpg",
    type: "image",
    source: "/images/Concert img/DSC09359 (1).jpg",
  },
  {
    id: 53,
    title: "Blue Stage | Concert Photography",
    category: "concert-photography",
    thumbnail: "/images/Concert img/DSC09365 (1).jpg",
    type: "image",
    source: "/images/Concert img/DSC09365 (1).jpg",
  },

  // Food Photography
  {
    id: 60,
    title: "Beef Stir Fried | Food Photography",
    category: "food-photography",
    thumbnail: "/images/Food img/Beef stir fried.jpeg",
    type: "image",
    source: "/images/Food img/Beef stir fried.jpeg",
  },
  {
    id: 61,
    title: "Burger 01 | Food Photography",
    category: "food-photography",
    thumbnail: "/images/Food img/Burger 01.jpeg",
    type: "image",
    source: "/images/Food img/Burger 01.jpeg",
  },
  {
    id: 62,
    title: "Burger 02 | Food Photography",
    category: "food-photography",
    thumbnail: "/images/Food img/Burger 02.jpeg",
    type: "image",
    source: "/images/Food img/Burger 02.jpeg",
  },
  {
    id: 63,
    title: "Burger 03 | Food Photography",
    category: "food-photography",
    thumbnail: "/images/Food img/Burger 03.jpeg",
    type: "image",
    source: "/images/Food img/Burger 03.jpeg",
  },
  {
    id: 64,
    title: "Cocktail | Food Photography",
    category: "food-photography",
    thumbnail: "/images/Food img/Cocktail.jpeg",
    type: "image",
    source: "/images/Food img/Cocktail.jpeg",
  },
  {
    id: 65,
    title: "Creamy Penne Pasta | Food Photography",
    category: "food-photography",
    thumbnail: "/images/Food img/Creamy Penne Pasta.jpeg",
    type: "image",
    source: "/images/Food img/Creamy Penne Pasta.jpeg",
  },

  // Outdoor Portraits
  {
    id: 70,
    title: "Outdoor Portrait I",
    category: "outdoor-portrait",
    thumbnail: "/images/Outdoor Portrait/Outdoor Portraits 1.JPG",
    type: "image",
    source: "/images/Outdoor Portrait/Outdoor Portraits 1.JPG",
  },
  {
    id: 71,
    title: "Outdoor Portrait II",
    category: "outdoor-portrait",
    thumbnail: "/images/Outdoor Portrait/Outdoor Portrait 2.JPG",
    type: "image",
    source: "/images/Outdoor Portrait/Outdoor Portrait 2.JPG",
  },
  {
    id: 72,
    title: "Outdoor Portrait III",
    category: "outdoor-portrait",
    thumbnail: "/images/Outdoor Portrait/Outdoor Portrait 3.JPG",
    type: "image",
    source: "/images/Outdoor Portrait/Outdoor Portrait 3.JPG",
  },
];


export const initialReviews = [
  {
    id: 1,
    name: "Amina Bello",
    rating: 5,
    text: "Gandu David Gama captured our wedding day in the most breathtaking way. The cinematic style made it feel like a real movie! Highly professional and easy to work with.",
    date: "2026-05-18"
  },
  {
    id: 2,
    name: "Chinedu Okafor",
    rating: 5,
    text: "The promotional video for our brand launch exceeded all expectations. GAMAD.II's editing, sound design, and color grading were flawless. Strongly recommend.",
    date: "2026-06-02"
  },
  {
    id: 3,
    name: "Chioma Adebayo",
    rating: 4,
    text: "Stunning portrait photography. Gandu knows exactly how to work with natural light and angles. Very happy with the final shots!",
    date: "2026-06-10"
  }
];
