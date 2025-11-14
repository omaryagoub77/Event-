# Elegant Events - Event Venue Website

A beautiful, modern React website for an event venue business owned by a woman who rents her space for birthdays and small parties.

## Features

- **Modern UI/UX**: Beautiful design with animations and transitions
- **Fully Responsive**: Mobile-first design that works on all devices
- **Firebase Integration**: Connected to Firestore for dynamic content
- **Animated Components**: Smooth animations using Framer Motion
- **Complete Page Set**: Home, About, Facilities, Gallery, Packages, Booking, Policies, Testimonials, Contact, and FAQ

## Tech Stack

- React (functional components + hooks)
- TailwindCSS (styling)
- Framer Motion (animations)
- Firebase v9+ (Firestore + Storage)
- React Router (navigation)
- react-icons (icons)

## Pages

1. **Home** - Landing page with hero section and features
2. **About** - Our story and values
3. **Facilities** - Venue amenities with animated cards
4. **Gallery** - Photo gallery with filtering and lightbox
5. **Packages** - Event packages with pricing
6. **Booking** - Multi-step booking form with date validation
7. **Policies** - Accordion-style policy information
8. **Testimonials** - Client reviews with carousel
9. **Contact** - Contact form and information
10. **FAQ** - Frequently asked questions with accordion

## Design Guidelines

- **Color Scheme**: Soft purple + white + blush pink accent
- **Typography**: Poppins (body) + Playfair Display (headings)
- **Layout**: Rounded corners (2xl), subtle shadows
- **Animations**: Fade, slide, zoom, stagger effects with Framer Motion

## Firebase Structure

```
firestore-root
│
├── settings (doc)
│   ├── heroHeadline
│   ├── heroSubtext
│   ├── heroBackgroundUrl
│
├── facilities (collection)
│   ├── { title, icon, description, order }
│
├── gallery (collection)
│   ├── { url, category, caption, uploadedAt }
│
├── packages (collection)
│   ├── { name, description, price, features[], popular, order }
│
├── bookings (collection)
│   ├── { name, email, phone, eventDate, packageId, guests, notes, status, createdAt }
│
├── policies (collection)
│   ├── { title, description, order }
│
├── testimonials (collection)
│   ├── { name, review, rating, photo, createdAt }
│
├── contactInfo (doc)
│   ├── { address, phone, email, instagram, whatsapp, mapEmbedUrl }
│
└── faqs (collection)
    ├── { question, answer, order }
```

## Getting Started

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm run dev
   ```

3. Visit `http://localhost:5176` in your browser

## Deployment

The site is ready for deployment to Firebase Hosting or any other static hosting service.

## Future Admin Dashboard

The Firebase structure is designed to make it easy to build an admin dashboard for managing all content.