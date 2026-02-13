# AI UI Generator - Frontend

A React-based frontend application that generates and previews user interface components dynamically using AI-powered code generation. This application communicates with a backend API to create customized UI components based on user descriptions and requirements.

## Table of Contents

- [Setup Instructions](#setup-instructions)
- [Architecture Overview](#architecture-overview)
- [Agent Design & Prompts](#agent-design--prompts)
- [Component System Design](#component-system-design)
- [Known Limitations](#known-limitations)
- [Future Improvements](#future-improvements)

---

## Setup Instructions

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager
- Backend API server running (see backend README for setup)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the frontend root directory:
   ```
   VITE_API_BASE_URL=http://localhost:5000
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server with hot module reloading
- `npm run build` - Create production-optimized build
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality

---

## Architecture Overview

### System Flow

```
User Input
    ↓
[App Component] → Sends request to Backend API
    ↓
Backend AI Agent (generates plan with components)
    ↓
[App receives component plan] → State management (useState)
    ↓
[Preview Component] → Dynamic component rendering
    ↓
[UI Component Library] → Display rendered components
```

### Directory Structure

```
src/
├── App.jsx                 # Main application component, handles user input & API communication
├── Preview.jsx             # Dynamic component renderer based on AI plan
├── main.jsx                # React entry point
├── index.css               # Global styles
└── components/
    └── ui/                 # Reusable UI component library
        ├── Button.jsx      # Action button with loading state
        ├── Card.jsx        # Data display card
        ├── Chart.jsx       # Data visualization component
        ├── Input.jsx       # Text input field
        ├── Modal.jsx       # Modal dialog component
        ├── Navbar.jsx      # Navigation bar
        ├── Sidebar.jsx     # Side navigation menu
        └── index.js        # Component exports barrel file
```

### Core Components

#### **App.jsx**
The main orchestrator component that:
- Manages user input and application state
- Communicates with the backend API via axios
- Stores generated code, explanations, and component plans
- Tracks loading states and multiple versions of generated UI
- Passes data to child components (Sidebar, Card, Preview)

#### **Preview.jsx**
Dynamic component renderer that:
- Receives a plan object from the backend containing component specifications
- Maps component names to actual React components from the UI library
- Dynamically renders components with props from the plan
- Handles missing/invalid component gracefully

#### **UI Component Library** (`components/ui/`)
A collection of pre-built, reusable components:
- **Button**: Interactive button with loading states
- **Card**: Data container with title, content, and description
- **Input**: Controlled text input field
- **Modal**: Dialog box for user interactions
- **Navbar**: Top navigation bar
- **Sidebar**: Vertical navigation menu with items
- **Chart**: Data visualization placeholder

---

## Agent Design & Prompts

### Backend AI Agent Flow

The frontend sends user requests to a backend AI agent that processes them through the following mechanism:

#### **Prompt Pattern**

The backend AI agent (running on Node.js) receives a user description and:

1. **Analyzes** the user's request for component requirements
2. **Generates** a structured plan in JSON format specifying:
   - Action type (`create`, `modify`, `delete`)
   - Components to render with their properties
   - Layout and styling information

3. **Returns** the plan to the frontend for rendering

#### **Example Plan Response**

```json
{
  "type": "create",
  "components": [
    {
      "name": "Sidebar",
      "props": {
        "header": "Dashboard Menu",
        "items": [
          { "label": "Overview" },
          { "label": "Analytics" },
          { "label": "Reports" }
        ]
      }
    },
    {
      "name": "Card",
      "props": {
        "title": "Total Users",
        "content": "1,234",
        "description": "Active users this month"
      }
    }
  ]
}
```

#### **Communication Protocol**

- **Request**: POST to `/api/generate` with `{ userInput: string }`
- **Response**: JSON containing:
  - `plan`: Component structure and specifications
  - `generatedCode`: The actual generated React code
  - `explanation`: Human-readable description of changes

### How It Works

1. User types a description (e.g., "Create a dashboard with user stats")
2. Frontend sends request to backend
3. Backend AI agent processes the request and creates a plan
4. Frontend receives the plan and renders components dynamically
5. User can preview the generated UI in real-time

---

## Component System Design

### Design Philosophy

The component system follows these principles:

1. **Composability**: Small components that can be combined to create complex UIs
2. **Simplicity**: Each component has a single, well-defined purpose
3. **Reusability**: Components accept props to customize behavior and appearance
4. **Consistency**: Shared styling using Tailwind CSS for uniform look and feel

### Component Specifications

#### **Button**
- Props: `label` (string), `onClick` (function), `loading` (boolean)
- Features: Loading spinner animation, disabled state
- Styling: Blue color scheme with hover effects

#### **Card**
- Props: `title` (string), `content` (string), `description` (string)
- Features: Shadow effect, rounded corners
- Styling: White background with responsive padding

#### **Sidebar**
- Props: `header` (string), `items` (array)
- Features: Vertical menu with item list
- Styling: Dark background with hover states

#### **Input**
- Props: `placeholder` (string), `value` (string), `onChange` (function)
- Features: Text input with validation support
- Styling: Bordered input with focus effects

#### **Modal**
- Props: `title` (string), `content` (string), `onClose` (function)
- Features: Overlay with centered dialog
- Styling: Semi-transparent background with white modal

#### **Chart**
- Props: `data` (array), `type` (string - 'bar'|'line'|'pie')
- Features: Data visualization placeholder
- Styling: Responsive container

#### **Navbar**
- Props: `logo` (string), `links` (array)
- Features: Navigation header with links
- Styling: Dark header with responsive layout

### Props Pattern

All components follow a consistent pattern:
```jsx
Component.propTypes = {
  propName: PropTypes.type.isRequired
}

Component.defaultProps = {
  propName: defaultValue
}
```

### Styling Approach

- **Framework**: Tailwind CSS v4 via `@tailwindcss/vite`
- **Methodology**: Utility-first CSS for rapid development
- **Customization**: Configured through `tailwind.config.js`

---

## Known Limitations

### 1. **Dynamic Component Rendering Constraints**
   - Components must be pre-defined in the UI library
   - Cannot render arbitrary custom components from user input
   - No support for nested component variations

### 2. **State Management**
   - Uses React's `useState` hook only (no Redux or Context API)
   - No persistence of generated components across sessions
   - Limited state history tracking

### 3. **Error Handling**
   - Minimal error feedback when the backend API is unavailable
   - No graceful degradation if component rendering fails
   - Missing error boundary implementation

### 4. **Performance**
   - No lazy loading or code splitting for components
   - All components loaded upfront regardless of usage
   - No memoization optimization for prevent unnecessary re-renders

### 5. **Accessibility**
   - Limited ARIA labels and semantic HTML usage
   - Keyboard navigation not fully implemented
   - No screen reader optimization

### 6. **Component Library**
   - Currently limited to 7 pre-built components
   - No advanced components (tables, calendars, etc.)
   - Basic styling without theme customization

### 7. **Preview Limitations**
   - Single preview view (no split view)
   - No code editor integration for direct editing
   - Cannot modify generated components in the UI

### 8. **Browser Support**
   - Targets modern browsers only (ES6+)
   - No polyfills for older browser versions

---

## Future Improvements

### High Priority

1. **Enhanced Error Handling**
   - Implement error boundaries to catch component rendering failures
   - Add user-friendly error notifications
   - Implement retry logic for API failures
   - Add loading skeleton screens for better UX

2. **Expanded Component Library**
   - Add Table component with sorting and filtering
   - Implement Date/Calendar picker
   - Add Dropdown/Select component
   - Create Form component wrapper
   - Add Toast/Alert notification system

3. **State Management**
   - Integrate Redux or Zustand for better state management
   - Add undo/redo functionality for component versions
   - Implement local storage persistence
   - Add component history timeline

### Medium Priority

4. **Code Editor Integration**
   - Embed Monaco Editor or CodeMirror for live code editing
   - Display and edit generated React code inline
   - Real-time syntax highlighting
   - Code formatting and validation

5. **Advanced Features**
   - Add component theming system (light/dark mode)
   - Implement component animation library integration
   - Add responsive design preview (mobile, tablet, desktop views)
   - Create component marketplace/sharing system

6. **Performance Optimization**
   - Implement code splitting for component library
   - Add component lazy loading
   - Use React.memo for component memoization
   - Implement virtual scrolling for large component lists

### Lower Priority

7. **Accessibility Improvements**
   - Add comprehensive ARIA labels
   - Implement keyboard navigation
   - Create accessible color palette
   - Add screen reader testing

8. **Developer Experience**
   - Convert to TypeScript for type safety
   - Add comprehensive JSDoc comments
   - Create Storybook for component documentation
   - Implement unit tests (Jest/React Testing Library)
   - Add E2E tests (Cypress/Playwright)

9. **Deployment & DevOps**
   - Set up CI/CD pipeline (GitHub Actions)
   - Configure automatic testing on pull requests
   - Add environment configuration management
   - Implement analytics tracking

---

## Technology Stack

| Technology | Purpose |
|-----------|---------|
| **React 19** | UI framework |
| **Vite 7** | Build tool & dev server |
| **Tailwind CSS 4** | Styling framework |
| **Axios** | HTTP client for API communication |
| **ESLint** | Code quality and style enforcement |

## Code Style

This project follows ESLint rules defined in `eslint.config.js`. Run linting with:
```bash
npm run lint
```

## Deployment

This project is configured for deployment on **Vercel** (see `vercel.json`).

### Deploy to Vercel

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Automatic deployments on push to main branch

---

## Questions & Support

For issues or questions, please refer to the main project repository or contact the development team.

---

**Last Updated**: February 2026
