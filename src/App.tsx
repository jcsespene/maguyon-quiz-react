import { useQuiz } from '@/hooks/useQuiz';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';
import { LoginScreen } from '@/components/screens/LoginScreen';
import { StartScreen } from '@/components/screens/StartScreen';
import { QuizScreen } from '@/components/screens/QuizScreen';
import { ResultsScreen } from '@/components/screens/ResultsScreen';

function App() {
  const auth = useAuth();
  const theme = useTheme();
  const quiz = useQuiz(auth.user?.id || 'guest');

  // Show loading while checking auth state
  if (auth.isLoading) {
    return (
      <div className="main-card min-h-screen p-4 sm:p-8 flex items-center justify-center">
        <p className="text-[var(--text-muted)]">Loading...</p>
      </div>
    );
  }

  // Show login screen if not authenticated
  if (!auth.isAuthenticated) {
    return (
      <div className="main-card min-h-screen p-4 sm:p-8">
        <LoginScreen
          onGoogleLogin={auth.loginWithGoogle}
          isDark={theme.isDark}
          toggleTheme={theme.toggleTheme}
        />
      </div>
    );
  }

  return (
    <div className="main-card min-h-screen p-4 sm:p-8">
      {quiz.currentScreen === 'start' && (
        <StartScreen
          startQuiz={quiz.startQuiz}
          resetProgress={quiz.resetProgress}
          progress={quiz.progress}
          user={auth.user}
          onLogout={auth.logout}
          isDark={theme.isDark}
          toggleTheme={theme.toggleTheme}
        />
      )}

      {quiz.currentScreen === 'quiz' && (
        <QuizScreen
          currentIndex={quiz.currentIndex}
          totalQuestions={quiz.questions.length}
          timeRemaining={quiz.timer.timeRemaining}
          formatTime={quiz.timer.formatTime}
          isWarning={quiz.timer.isWarning}
          currentQuestion={quiz.currentQuestion}
          currentAnswer={quiz.currentAnswer}
          setAnswer={quiz.setAnswer}
          nextQuestion={quiz.nextQuestion}
          submitQuiz={quiz.submitQuiz}
        />
      )}

      {quiz.currentScreen === 'results' && quiz.results && (
        <ResultsScreen
          results={quiz.results}
          tryAgain={quiz.tryAgain}
          returnToStart={quiz.returnToStart}
        />
      )}
    </div>
  );
}

export default App;
