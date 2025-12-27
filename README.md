<div align="center">
  <h1>🪑 Coseat</h1>
  <p><strong>The most seamless seating arrangement organizer you could ever use</strong></p>
  
  <p>
    <a href="#features">Features</a> •
    <a href="#demo">Demo</a> •
    <a href="#getting-started">Getting Started</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#contributing">Contributing</a>
  </p>

  ![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=flat-square&logo=next.js)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
  ![Firebase](https://img.shields.io/badge/Firebase-12.7-orange?style=flat-square&logo=firebase)
  ![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)
</div>

---

## 📖 About

**Coseat** is a modern, collaborative seating arrangement application designed for event organizers, wedding planners, and venue managers. Create beautiful seating layouts with an intuitive drag-and-drop canvas, collaborate in real-time with your team, and make every seat count.

### ✨ Why Coseat?

- **Infinite Canvas** - Design layouts of any size with zoom and pan controls
- **Real-time Collaboration** - Share event codes and work together seamlessly
- **Drag & Drop Interface** - Intuitive controls for chairs, tables, and blocks
- **Named Seating** - Assign names to chairs and manage guest lists
- **Multiple Events** - Organize unlimited events from a single dashboard
- **Lightning Fast** - Built with performance in mind using Next.js and Firebase

---

## 🚀 Features

### 🎨 Interactive Canvas
- Drag and drop chairs and blocks anywhere on an infinite canvas
- Zoom and pan to navigate large seating arrangements
- Smooth animations and responsive interactions

### 👥 Collaboration
- Create events with unique shareable codes
- Invite team members to collaborate in real-time
- Role-based access control for event members

### 🪑 Flexible Seating
- Add and position chairs with custom names
- Create blocks/tables of custom sizes
- Edit and delete elements with context menus

### 📱 Responsive Design
- Beautiful UI built with Tailwind CSS and shadcn/ui
- Works seamlessly on desktop and mobile devices
- Dark mode support (coming soon)

---

## 🎬 Demo

> 🚧 Demo coming soon! Check back later for screenshots and video walkthrough.

---

## 🏁 Getting Started

### Prerequisites

- **Node.js** 18.x or higher
- **pnpm** (recommended) or npm/yarn
- **Firebase** account with Firestore enabled

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/coseat.git
   cd coseat
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up Firebase**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Firebase Client Configuration
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

   # Firebase Admin SDK
   FIREBASE_ADMIN_PROJECT_ID=your_project_id
   FIREBASE_ADMIN_CLIENT_EMAIL=your_client_email
   FIREBASE_ADMIN_PRIVATE_KEY=your_private_key
   ```

4. **Run the development server**
   ```bash
   pnpm dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
pnpm build
pnpm start
```

---

## 🛠️ Tech Stack

### Frontend
- **[Next.js 16](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Re-usable component library
- **[Lucide Icons](https://lucide.dev/)** - Beautiful icon set

### Backend & Database
- **[Firebase Authentication](https://firebase.google.com/products/auth)** - User authentication
- **[Firestore](https://firebase.google.com/products/firestore)** - NoSQL database
- **[Firebase Admin SDK](https://firebase.google.com/docs/admin/setup)** - Server-side operations

### State Management
- **[Zustand](https://zustand-demo.pmnd.rs/)** - Lightweight state management

### UI/UX
- **[Radix UI](https://www.radix-ui.com/)** - Accessible component primitives
- **[Sonner](https://sonner.emilkowal.ski/)** - Toast notifications
- **[tw-animate-css](https://github.com/ben-rogerson/twin.macro)** - Tailwind animations

---

## 📁 Project Structure

```
coseat/
├── actions/              # Server actions
│   ├── auth/            # Authentication actions
│   ├── block/           # Block CRUD operations
│   ├── chair/           # Chair CRUD operations
│   ├── events/          # Event management
│   └── profile/         # User profile actions
├── app/                 # Next.js App Router
│   ├── (auth)/         # Auth routes
│   ├── (canvas)/       # Canvas/event routes
│   ├── (home)/         # Home dashboard
│   └── page.tsx        # Landing page
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   └── ...
├── hooks/              # Custom React hooks
├── lib/                # Utilities and configs
│   ├── firebase/       # Firebase configuration
│   ├── types.ts        # TypeScript types
│   └── utils.ts        # Helper functions
├── store/              # Zustand stores
└── public/             # Static assets
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style and conventions
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons by [Lucide](https://lucide.dev/)
- Hosted on [Vercel](https://vercel.com/)

---

<div align="center">
  <p>Made with ❤️ for event organizers everywhere</p>
  <p>© 2025 CoSeat. Making every seat count.</p>
</div>
