import { useState, useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { Moon, Sun } from 'lucide-react';

// Words semantically similar to "Simulator"
const TITLE_WORDS = [
  'Simulator',
  'Trainer',
  'Practice',
  'Drills',
  'Prep',
];

function TypewriterTitle() {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = TITLE_WORDS[wordIndex];
    const typeSpeed = isDeleting ? 50 : 100;
    const pauseTime = 2000;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentWord.length) {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % TITLE_WORDS.length);
        }
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, wordIndex]);

  return (
    <h1 className="text-[var(--text-primary)]">
      {displayText}
      <span className="animate-blink">|</span>
    </h1>
  );
}

interface LoginScreenProps {
  onGoogleLogin: (credential: string) => void;
  isDark: boolean;
  toggleTheme: () => void;
}

export function LoginScreen({ onGoogleLogin, isDark, toggleTheme }: LoginScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] gap-8">
      {/* Theme Toggle - Fixed Top Right */}
      <div
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 100,
        }}
      >
        <button
          onClick={toggleTheme}
          style={{
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-muted)',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            transition: 'color 0.15s',
          }}
          title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; }}
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>

      {/* Header */}
      <div className="text-center">
        <p className="text-[var(--text-secondary)] text-sm tracking-widest uppercase">MSYS 21</p>
        <TypewriterTitle />
      </div>

      {/* Login Options */}
      <div className="flex flex-col items-center gap-6">
        <p className="text-[var(--text-muted)] text-sm">Sign in with Google to save your progress</p>

        {/* Google Login Button */}
        <GoogleLogin
          onSuccess={(response) => {
            if (response.credential) {
              onGoogleLogin(response.credential);
            }
          }}
          onError={() => {
            console.error('Google login failed');
          }}
          theme={isDark ? 'filled_black' : 'outline'}
          size="large"
          text="signin_with"
          shape="rectangular"
        />

        <p className="text-[var(--text-muted)] text-xs text-center max-w-[280px]">
          Your progress is synced across devices when signed in
        </p>
      </div>
    </div>
  );
}
