import { useState, useEffect, useRef } from 'react';
import { User, Moon, Sun, LogOut } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import type { AuthUser } from '@/types/auth';
import type { QuizProgress } from '@/types/quiz';
import type { MasterySummary } from '@/types/srs';

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
    const pauseTime = 2000; // Time to pause when word is complete

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (displayText.length < currentWord.length) {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
        } else {
          // Word complete, pause then start deleting
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        // Deleting
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          // Move to next word
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

interface StartScreenProps {
  startQuiz: () => void;
  resetProgress: () => void;
  progress: QuizProgress;
  mastery: MasterySummary | null;
  user: AuthUser | null;
  onLogout: () => void;
  isDark: boolean;
  toggleTheme: () => void;
}

export function StartScreen({
  startQuiz,
  resetProgress,
  progress,
  mastery,
  user,
  onLogout,
  isDark,
  toggleTheme,
}: StartScreenProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col gap-8">
      {/* Fixed corner controls */}
      <div
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
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

        {user && (
          <div ref={dropdownRef} style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                background: 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {user.picture ? (
                <img
                  src={user.picture}
                  alt={user.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    background: 'var(--bg-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <User className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                </div>
              )}
            </button>

            {/* Dropdown */}
            {showDropdown && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: '8px',
                  width: '200px',
                  background: 'var(--bg-primary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  overflow: 'hidden',
                }}
              >
                <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-color)' }}>
                  <p style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {user.name}
                  </p>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {user.email}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowDropdown(false);
                    onLogout();
                  }}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '14px',
                    color: 'var(--text-muted)',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--bg-secondary)';
                    e.currentTarget.style.color = 'var(--text-primary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = 'var(--text-muted)';
                  }}
                >
                  <LogOut style={{ width: '16px', height: '16px' }} />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Header */}
      <div className="text-center">
        <p className="text-[var(--text-secondary)] text-base tracking-widest uppercase">MSYS 51</p>
        <TypewriterTitle />
      </div>

      {/* Actions */}
      <div className="flex flex-col items-center gap-6">
        <button onClick={startQuiz} className="btn-primary">
          Begin
        </button>

        {/* Mastery indicator — shown after 3+ sessions */}
        {mastery && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            width: '100%',
            maxWidth: '260px',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}>
              <span style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 500 }}>
                Mastery
              </span>
              <span style={{ fontSize: '13px', color: 'var(--text-primary)', fontWeight: 600 }}>
                {mastery.overallMastery}%
              </span>
            </div>
            {/* Progress bar */}
            <div style={{
              width: '100%',
              height: '4px',
              background: 'var(--bg-tertiary)',
              borderRadius: '2px',
              overflow: 'hidden',
            }}>
              <div style={{
                width: `${mastery.overallMastery}%`,
                height: '100%',
                background: 'var(--accent)',
                borderRadius: '2px',
                transition: 'width 0.3s ease',
              }} />
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
            }}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                {mastery.questionsAttempted} / 192 seen
              </span>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                {mastery.abilityLabel}
              </span>
            </div>
          </div>
        )}

        {progress.totalAttempts > 0 && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors">
                Reset
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent className="dialog-content">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-lg font-medium">Reset Progress?</AlertDialogTitle>
                <AlertDialogDescription className="text-[var(--text-secondary)] mt-2">
                  This will clear your best score, attempt count, and learning history. This cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="mt-8 flex gap-3">
                <AlertDialogCancel className="btn-secondary">Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={resetProgress}
                  className="btn-primary bg-[var(--error)] hover:bg-red-600"
                >
                  Reset
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    </div>
  );
}
