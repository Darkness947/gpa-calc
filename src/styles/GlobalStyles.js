import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
    /* Base Colors */
    --bg-dark: #0f172a;
    --bg-card: #1e293b;
    --primary-color: #8b5cf6; /* Violet */
    --secondary-color: #ec4899; /* Pink */
    --accent-color: #06b6d4; /* Cyan */
    
    /* Text Colors */
    --text-primary: #f8fafc;
    --text-secondary: #94a3b8;
    
    /* Glassmorphism */
    --glass-bg: rgba(30, 41, 59, 0.7);
    --glass-border: 1px solid rgba(255, 255, 255, 0.1);
    --glass-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
    
    --card-radius: 20px;
    --transition-speed: 0.3s;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Outfit', 'Inter', sans-serif; /* Recommended font upgrade */
    background-color: var(--bg-dark);
    background-image: 
        radial-gradient(at 0% 0%, rgba(139, 92, 246, 0.15) 0px, transparent 50%),
        radial-gradient(at 100% 0%, rgba(236, 72, 153, 0.15) 0px, transparent 50%),
        radial-gradient(at 100% 100%, rgba(6, 182, 212, 0.15) 0px, transparent 50%);
    background-attachment: fixed;
    color: var(--text-primary);
    min-height: 100vh;
    direction: ${props => props.dir || 'ltr'};
    overflow-x: hidden;
  }

  * {
    box-sizing: border-box;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    font-weight: 700;
  }

  a {
    text-decoration: none;
    color: inherit;
    transition: var(--transition-speed);
  }

  button {
    cursor: pointer;
    font-family: inherit;
    border: none;
    outline: none;
  }

  /* Scrollbar Styling */
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: var(--bg-dark); 
  }
  ::-webkit-scrollbar-thumb {
    background: var(--bg-card); 
    border-radius: 4px;
    border: 1px solid rgba(255,255,255,0.1);
  }
  ::-webkit-scrollbar-thumb:hover {
    background: var(--primary-color); 
  }
`;
