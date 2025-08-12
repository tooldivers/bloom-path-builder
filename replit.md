# MentionMates

## Overview

MentionMates is a SaaS web application designed to connect content creators for cross-promotion and collaboration opportunities. The platform facilitates creator-to-creator matching based on niche, audience size, and goals, enabling creators to grow their reach through partnerships rather than paid advertising.

The application is built as a full-stack TypeScript application with a React frontend and Express.js backend, featuring real-time messaging capabilities and a matching algorithm to connect compatible creators.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for development tooling
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens for brand consistency
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management and caching
- **Real-time Communication**: WebSocket integration for live messaging

### Backend Architecture
- **Framework**: Express.js with TypeScript in ESM module format
- **API Design**: RESTful API endpoints with WebSocket support for real-time features
- **Data Storage**: In-memory storage implementation with interface for future database integration
- **Real-time Features**: WebSocket server for instant messaging between creators
- **Middleware**: Request logging, JSON parsing, and error handling

### Database Design
- **ORM**: Drizzle ORM configured for PostgreSQL
- **Schema**: Creator profiles, collaborations, messages, and matches tables
- **Migration Strategy**: Drizzle-kit for schema migrations and database management

### Key Features
- **Creator Onboarding**: Multi-step form collecting niche, audience size, platform, and goals
- **Matching Algorithm**: Score-based system considering niche alignment, audience compatibility, and platform diversity
- **Real-time Messaging**: WebSocket-powered chat system for creator communication
- **Collaboration Management**: Request/response system for managing partnership proposals

### Authentication & Authorization
- Currently using localStorage for user session management
- Designed to accommodate future authentication system integration

### Design System
- **Component Library**: Comprehensive UI components following consistent design patterns
- **Typography**: Inter font family for readability and modern appearance
- **Color Scheme**: Custom brand colors (primary blue, coral, mint) with neutral grays
- **Responsive Design**: Mobile-first approach with breakpoint-based layouts

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React 18, React DOM, React Hook Form with Zod validation
- **Build Tools**: Vite with TypeScript support and development plugins
- **Styling**: Tailwind CSS with PostCSS processing

### UI Component Libraries
- **Radix UI**: Comprehensive primitive components for accessibility and functionality
- **Lucide React**: Icon library for consistent iconography
- **Class Variance Authority**: Type-safe component variant management

### Backend Dependencies
- **Express.js**: Web application framework with middleware support
- **WebSocket**: Real-time communication via 'ws' library
- **Database**: Drizzle ORM with PostgreSQL support via Neon serverless
- **Development**: tsx for TypeScript execution and esbuild for production builds

### Development Tools
- **Replit Integration**: Development environment plugins for Replit platform
- **TypeScript**: Strict type checking with modern ES module support
- **ESLint/Prettier**: Code quality and formatting (implicit in project structure)

### Deployment Configuration
- **Build Process**: Vite for frontend bundling, esbuild for backend compilation
- **Environment**: NODE_ENV-based configuration for development/production modes
- **Asset Management**: Static file serving and development middleware integration