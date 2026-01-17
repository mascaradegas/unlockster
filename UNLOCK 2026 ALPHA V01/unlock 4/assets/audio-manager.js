/**
 * Audio Manager - Handles all sound effects and background music
 * Uses Web Audio API for dynamic sound generation
 */

class AudioManager {
  constructor() {
    this.audioContext = null;
    this.isMuted = localStorage.getItem('unlock_audio_muted') === 'true';
    this.musicOscillator = null;
    this.musicPlaying = false;
    this.masterVolume = 0.3;
    this.sfxVolume = 0.4;
    this.musicVolume = 0.15;
    this.backgroundMusicAudio = null;
    this.init();
  }

  init() {
    // Initialize audio context on first user interaction
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  /**
   * Plays correct answer sound - ascending arpeggio
   */
  playCorrect() {
    if (this.isMuted) return;

    const ctx = this.audioContext;
    const now = ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6

    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.type = 'sine';
      osc.frequency.value = freq;

      const startTime = now + (index * 0.05);
      gain.gain.setValueAtTime(this.sfxVolume, startTime);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.15);

      osc.start(startTime);
      osc.stop(startTime + 0.15);
    });
  }

  /**
   * Plays wrong answer sound - descending tones
   */
  playWrong() {
    if (this.isMuted) return;

    const ctx = this.audioContext;
    const now = ctx.currentTime;
    const notes = [392.00, 349.23]; // G4, F4

    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.type = 'square';
      osc.frequency.value = freq;

      const startTime = now + (index * 0.1);
      gain.gain.setValueAtTime(this.sfxVolume * 0.8, startTime);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.2);

      osc.start(startTime);
      osc.stop(startTime + 0.2);
    });
  }

  /**
   * Plays combo/streak sound - ascending chirp
   */
  playCombo() {
    if (this.isMuted) return;

    const ctx = this.audioContext;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = 'sine';
    osc.frequency.setValueAtTime(700, now);
    osc.frequency.exponentialRampToValueAtTime(1400, now + 0.15);

    gain.gain.setValueAtTime(this.sfxVolume, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

    osc.start(now);
    osc.stop(now + 0.15);
  }

  /**
   * Plays wave/level complete sound - triumphant chord
   */
  playLevelUp() {
    if (this.isMuted) return;

    const ctx = this.audioContext;
    const now = ctx.currentTime;
    const notes = [523.25, 659.25, 783.99]; // C5, E5, G5 (major chord)

    notes.forEach(freq => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.type = 'sine';
      osc.frequency.value = freq;

      gain.gain.setValueAtTime(this.sfxVolume * 0.7, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);

      osc.start(now);
      osc.stop(now + 0.4);
    });
  }

  /**
   * Plays selection/click sound - light single tone
   */
  playSelect() {
    if (this.isMuted) return;

    const ctx = this.audioContext;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = 'sine';
    osc.frequency.value = 659.25; // E5 - bright but soft note

    // Very light volume and quick decay
    gain.gain.setValueAtTime(this.sfxVolume * 0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

    osc.start(now);
    osc.stop(now + 0.08);
  }

  /**
   * Plays game over sound - descending sad tone
   */
  playGameOver() {
    if (this.isMuted) return;

    const ctx = this.audioContext;
    const now = ctx.currentTime;
    const notes = [523.25, 440, 349.23, 293.66]; // C5, A4, F4, D4

    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.type = 'sine';
      osc.frequency.value = freq;

      const startTime = now + (index * 0.1);
      gain.gain.setValueAtTime(this.sfxVolume, startTime);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.25);

      osc.start(startTime);
      osc.stop(startTime + 0.25);
    });
  }

  /**
   * Plays victory sound - ascending triumphant scale
   */
  playVictory() {
    if (this.isMuted) return;

    const ctx = this.audioContext;
    const now = ctx.currentTime;
    const notes = [523.25, 587.33, 659.25, 783.99, 1046.50]; // C5-E5-G5-C6

    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.type = 'sine';
      osc.frequency.value = freq;

      const startTime = now + (index * 0.08);
      gain.gain.setValueAtTime(this.sfxVolume, startTime);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.2);

      osc.start(startTime);
      osc.stop(startTime + 0.2);
    });
  }

  /**
   * Plays background music - disabled
   */
  playBackgroundMusic() {
    // Background music disabled
    return;
  }

  /**
   * Stops background music
   */
  stopBackgroundMusic() {
    // Not implemented
  }

  /**
   * Toggle mute state
   */
  toggleMute() {
    this.isMuted = !this.isMuted;
    localStorage.setItem('unlock_audio_muted', this.isMuted);
    return this.isMuted;
  }

  /**
   * Set mute state directly
   */
  setMuted(muted) {
    this.isMuted = muted;
    localStorage.setItem('unlock_audio_muted', this.isMuted);
  }

  /**
   * Get current mute state
   */
  getMuted() {
    return this.isMuted;
  }

  /**
   * Resume audio context if suspended
   */
  resumeContext() {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  }
}

// Create global instance
const audioManager = new AudioManager();
