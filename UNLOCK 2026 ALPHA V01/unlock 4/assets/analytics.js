/**
 * Analytics System - Tracks user behavior and game metrics
 * Sends data to Google Analytics and local storage for analysis
 */

class AnalyticsManager {
  constructor() {
    this.sessionId = this.generateSessionId();
    this.sessionStart = Date.now();
    this.gameMetrics = {
      totalTime: 0,
      gamesPlayed: 0,
      totalScore: 0,
      gameDetails: []
    };
    this.init();
  }

  init() {
    // Initialize Google Analytics if gtag is available
    if (window.gtag) {
      this.setupGoogleAnalytics();
    }

    // Save session to localStorage
    this.saveSession();
  }

  generateSessionId() {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Track game start
   */
  trackGameStart(gameName, difficulty) {
    if (window.gtag) {
      gtag('event', 'game_start', {
        game_name: gameName,
        difficulty: difficulty,
        session_id: this.sessionId
      });
    }

    // Log locally
    console.log(`📊 Analytics: Game started - ${gameName} (${difficulty})`);

    this.currentGameStart = {
      game: gameName,
      difficulty: difficulty,
      startTime: Date.now()
    };
  }

  /**
   * Track game end
   */
  trackGameEnd(gameName, score, result, timeSpent) {
    if (window.gtag) {
      gtag('event', 'game_end', {
        game_name: gameName,
        score: score,
        result: result, // 'win', 'lose', 'quit'
        time_spent: Math.round(timeSpent / 1000), // in seconds
        session_id: this.sessionId
      });
    }

    // Track locally
    this.gameMetrics.gamesPlayed++;
    this.gameMetrics.totalScore += score;
    this.gameMetrics.totalTime += timeSpent;
    this.gameMetrics.gameDetails.push({
      game: gameName,
      score: score,
      result: result,
      timeSpent: timeSpent,
      timestamp: new Date().toISOString()
    });

    console.log(`📊 Analytics: Game ended - ${gameName} | Score: ${score} | Result: ${result}`);

    this.saveSession();
  }

  /**
   * Track class/aula selection
   */
  trackAulaSelected(aulaTitle, gameType) {
    if (window.gtag) {
      gtag('event', 'aula_selected', {
        aula: aulaTitle,
        game_type: gameType,
        session_id: this.sessionId
      });
    }

    console.log(`📊 Analytics: Aula selected - ${aulaTitle} (${gameType})`);
  }

  /**
   * Track difficulty/mode selection
   */
  trackDifficultySelected(difficulty) {
    if (window.gtag) {
      gtag('event', 'difficulty_selected', {
        difficulty: difficulty,
        session_id: this.sessionId
      });
    }

    console.log(`📊 Analytics: Difficulty selected - ${difficulty}`);
  }

  /**
   * Track user engagement metrics
   */
  trackEngagement(action, value) {
    if (window.gtag) {
      gtag('event', 'engagement', {
        action: action,
        value: value,
        session_id: this.sessionId
      });
    }

    console.log(`📊 Analytics: Engagement - ${action}: ${value}`);
  }

  /**
   * Track page views
   */
  trackPageView(pageName) {
    if (window.gtag) {
      gtag('event', 'page_view', {
        page_title: pageName,
        page_location: window.location.href,
        session_id: this.sessionId
      });
    }

    console.log(`📊 Analytics: Page view - ${pageName}`);
  }

  /**
   * Track error events
   */
  trackError(errorName, errorMessage) {
    if (window.gtag) {
      gtag('event', 'exception', {
        description: `${errorName}: ${errorMessage}`,
        fatal: false,
        session_id: this.sessionId
      });
    }

    console.error(`📊 Analytics: Error tracked - ${errorName}: ${errorMessage}`);
  }

  /**
   * Get session duration
   */
  getSessionDuration() {
    return Date.now() - this.sessionStart;
  }

  /**
   * Save metrics to localStorage
   */
  saveSession() {
    const sessionData = {
      sessionId: this.sessionId,
      duration: this.getSessionDuration(),
      metrics: this.gameMetrics,
      savedAt: new Date().toISOString()
    };

    try {
      const existing = JSON.parse(localStorage.getItem('unlock_sessions') || '[]');
      existing.push(sessionData);

      // Keep only last 50 sessions
      if (existing.length > 50) {
        existing.shift();
      }

      localStorage.setItem('unlock_sessions', JSON.stringify(existing));
    } catch (e) {
      console.warn('Could not save session data:', e);
    }
  }

  /**
   * Get all saved sessions for analysis
   */
  getAllSessions() {
    try {
      return JSON.parse(localStorage.getItem('unlock_sessions') || '[]');
    } catch (e) {
      console.warn('Could not load sessions:', e);
      return [];
    }
  }

  /**
   * Get summary statistics
   */
  getSummaryStats() {
    const sessions = this.getAllSessions();

    if (sessions.length === 0) {
      return {
        totalSessions: 0,
        totalPlayTime: 0,
        avgPlayTime: 0,
        totalGamesPlayed: 0,
        avgScore: 0
      };
    }

    const totalPlayTime = sessions.reduce((sum, s) => sum + s.duration, 0);
    const totalGames = sessions.reduce((sum, s) => sum + s.metrics.gamesPlayed, 0);
    const totalScore = sessions.reduce((sum, s) => sum + s.metrics.totalScore, 0);

    return {
      totalSessions: sessions.length,
      totalPlayTime: Math.round(totalPlayTime / 1000 / 60), // minutes
      avgPlayTime: Math.round(totalPlayTime / sessions.length / 1000 / 60), // minutes
      totalGamesPlayed: totalGames,
      avgScore: totalGames > 0 ? Math.round(totalScore / totalGames) : 0,
      lastSession: sessions[sessions.length - 1].savedAt
    };
  }

  /**
   * Export data for analysis (CSV format)
   */
  exportData() {
    const sessions = this.getAllSessions();
    let csv = 'Session ID,Duration (min),Games Played,Total Score,Avg Score,Timestamp\n';

    sessions.forEach(session => {
      const avgScore = session.metrics.gamesPlayed > 0
        ? Math.round(session.metrics.totalScore / session.metrics.gamesPlayed)
        : 0;

      csv += `${session.sessionId},${Math.round(session.duration / 1000 / 60)},${session.metrics.gamesPlayed},${session.metrics.totalScore},${avgScore},${session.savedAt}\n`;
    });

    return csv;
  }

  /**
   * Download export as CSV
   */
  downloadAnalytics() {
    const csv = this.exportData();
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `unlock-analytics-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }

  setupGoogleAnalytics() {
    // Google Analytics is already initialized via GTM script
    // Just log that it's ready
    console.log('📊 Google Analytics initialized');
  }
}

// Create global analytics instance
const analytics = new AnalyticsManager();
