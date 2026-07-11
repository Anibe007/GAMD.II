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

export const showreelVideo = {
  title: "GAMAD.II - Creative Videography Showreel",
  thumbnail: "/images/canon-camera.jpg",
  source: "/Videos/FUGA CULTURAL.mp4"
};

export const portfolioItems = [
  {
    id: 1,
    title: "FUGA CULTURAL - Cultural Production",
    category: "videography",
    thumbnail: "/images/logo_gamad.jpg",
    type: "video",
    source: "/Videos/FUGA CULTURAL.mp4"
  },
  {
    id: 2,
    title: "Cinematic Highlight Reel",
    category: "videography",
    thumbnail: "/images/canon-camera.jpg",
    type: "video",
    source: "/Videos/IMG_0536.MP4"
  },
  {
    id: 3,
    title: "FUGA CULTURAL - Film Assembly",
    category: "video-editing",
    thumbnail: "/images/logo_gamad.jpg",
    type: "video",
    source: "/Videos/FUGA CULTURAL.mp4"
  },
  {
    id: 4,
    title: "Color Grading & Sound Design Session",
    category: "video-editing",
    thumbnail: "/images/canon-camera.jpg",
    type: "video",
    source: "/Videos/IMG_0536.MP4"
  },
  {
    id: 5,
    title: "Studio Portrait Session",
    category: "photography",
    thumbnail: "/images/Profile_pics.jpeg",
    type: "image",
    source: "/images/Profile_pics.jpeg"
  },
  {
    id: 7,
    title: "Serene Wilderness Study",
    category: "photography",
    thumbnail: "/images/DSC00009.jpg",
    type: "image",
    source: "/images/DSC00009.jpg"
  },
  {
    id: 8,
    title: "Golden Hour Editorial",
    category: "photography",
    thumbnail: "/images/DSC00023.jpg",
    type: "image",
    source: "/images/DSC00023.jpg"
  },
  {
    id: 9,
    title: "Urban Architecture Silhouette",
    category: "photography",
    thumbnail: "/images/DSC00031.jpg",
    type: "image",
    source: "/images/DSC00031.jpg"
  },
  {
    id: 10,
    title: "Cinematic Shadow Play",
    category: "photography",
    thumbnail: "/images/DSC00035.jpg",
    type: "image",
    source: "/images/DSC00035.jpg"
  },
  {
    id: 11,
    title: "Reflections of Light",
    category: "photography",
    thumbnail: "/images/DSC00036.jpg",
    type: "image",
    source: "/images/DSC00036.jpg"
  },
  {
    id: 12,
    title: "Monochrome Editorial Portrait",
    category: "photography",
    thumbnail: "/images/DSC00038.jpg",
    type: "image",
    source: "/images/DSC00038.jpg"
  },
  {
    id: 13,
    title: "Geometric Patterns in Design",
    category: "photography",
    thumbnail: "/images/DSC00041.jpg",
    type: "image",
    source: "/images/DSC00041.jpg"
  },
  {
    id: 14,
    title: "Vibrant Horizon Landscape",
    category: "photography",
    thumbnail: "/images/DSC00050.jpg",
    type: "image",
    source: "/images/DSC00050.jpg"
  },
  {
    id: 15,
    title: "Dramatic Stormy Skies",
    category: "photography",
    thumbnail: "/images/DSC00053.jpg",
    type: "image",
    source: "/images/DSC00053.jpg"
  },
  {
    id: 16,
    title: "High-Contrast Studio Portrait",
    category: "photography",
    thumbnail: "/images/DSC00054.jpg",
    type: "image",
    source: "/images/DSC00054.jpg"
  },
  {
    id: 17,
    title: "Ethereal Morning Haze",
    category: "photography",
    thumbnail: "/images/DSC00091.jpg",
    type: "image",
    source: "/images/DSC00091.jpg"
  },
  {
    id: 18,
    title: "Fine Art Botanical Close-Up",
    category: "photography",
    thumbnail: "/images/DSC00093.jpg",
    type: "image",
    source: "/images/DSC00093.jpg"
  },
  {
    id: 19,
    title: "Street Candid Narrative",
    category: "photography",
    thumbnail: "/images/DSC09938.jpg",
    type: "image",
    source: "/images/DSC09938.jpg"
  }
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
