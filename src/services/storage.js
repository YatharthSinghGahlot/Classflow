/**
 * LocalStorage Service for TeachAI
 * Persists history, saved lessons, active lesson package, and user activity stats.
 */

import { INITIAL_HISTORY_LESSONS, DEFAULT_PHOTOSYNTHESIS_LESSON } from './mockData.js';
import { googleAuth } from './googleAuth.js';

const KEYS = {
  HISTORY: 'teachai_lessons_history',
  CURRENT: 'teachai_current_lesson',
  STATS: 'teachai_user_stats',
};

export const storage = {
  // Check if localStorage is supported
  isSupported() {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  },

  // Get all saved lessons
  getLessons() {
    try {
      if (!this.isSupported()) return INITIAL_HISTORY_LESSONS;
      const data = localStorage.getItem(KEYS.HISTORY);
      if (!data) {
        localStorage.setItem(KEYS.HISTORY, JSON.stringify(INITIAL_HISTORY_LESSONS));
        return INITIAL_HISTORY_LESSONS;
      }
      return JSON.parse(data);
    } catch (e) {
      console.error('Failed to load lessons from localStorage', e);
      return INITIAL_HISTORY_LESSONS;
    }
  },

  // Save a new lesson into history & automatically sync to Google Drive
  saveLesson(lessonPackage) {
    try {
      if (!this.isSupported()) return;
      const history = this.getLessons();

      // Trigger automatic background save to student's Google Drive
      let driveRecord = null;
      try {
        driveRecord = googleAuth.saveLessonToDrive(lessonPackage);
      } catch (err) {
        console.warn('Background Google Drive sync caught:', err);
      }

      const newEntry = {
        id: lessonPackage.id || `hist-${Date.now()}`,
        topic: lessonPackage.meta?.topic || 'Untitled Lesson',
        grade: lessonPackage.meta?.grade || 'Grade 8',
        subject: lessonPackage.meta?.subject || 'Science',
        duration: lessonPackage.meta?.duration || '45 minutes',
        createdAt: "Just now",
        timestamp: Date.now(),
        resourcesCount: 7,
        status: "Completed",
        fullPackage: lessonPackage,
        driveSynced: true,
        driveSyncedAt: new Date().toISOString(),
        driveFolderUrl: driveRecord?.folderUrl || 'https://drive.google.com/drive/folders/demo-classflow-lessons',
        driveFiles: driveRecord?.files || null
      };
      
      // Filter out existing by same id if updating
      const updated = [newEntry, ...history.filter(h => h.id !== newEntry.id)];
      localStorage.setItem(KEYS.HISTORY, JSON.stringify(updated));

      // Update stats
      this.incrementStats();
      return newEntry;
    } catch (e) {
      console.error('Failed to save lesson to localStorage', e);
    }
  },

  // Delete a lesson from history
  deleteLesson(id) {
    try {
      if (!this.isSupported()) return [];
      const history = this.getLessons();
      const updated = history.filter(item => item.id !== id);
      localStorage.setItem(KEYS.HISTORY, JSON.stringify(updated));
      return updated;
    } catch (e) {
      console.error('Failed to delete lesson from localStorage', e);
      return [];
    }
  },

  // Get currently active lesson package in workspace
  getCurrentLesson() {
    try {
      if (!this.isSupported()) return DEFAULT_PHOTOSYNTHESIS_LESSON;
      const data = localStorage.getItem(KEYS.CURRENT);
      if (!data) {
        return DEFAULT_PHOTOSYNTHESIS_LESSON;
      }
      return JSON.parse(data);
    } catch (e) {
      console.error('Failed to get current lesson', e);
      return DEFAULT_PHOTOSYNTHESIS_LESSON;
    }
  },

  // Set currently active lesson package in workspace
  setCurrentLesson(lessonPackage) {
    try {
      if (!this.isSupported()) return;
      localStorage.setItem(KEYS.CURRENT, JSON.stringify(lessonPackage));
    } catch (e) {
      console.error('Failed to set current lesson', e);
    }
  },

  // Get activity stats
  getStats() {
    try {
      if (!this.isSupported()) return { lessonsCreated: 24, resourcesGenerated: 72, timeSavedHours: 18 };
      const data = localStorage.getItem(KEYS.STATS);
      if (!data) {
        const defaultStats = {
          lessonsCreated: 24,
          resourcesGenerated: 72,
          timeSavedHours: 18
        };
        localStorage.setItem(KEYS.STATS, JSON.stringify(defaultStats));
        return defaultStats;
      }
      return JSON.parse(data);
    } catch (e) {
      return {
        lessonsCreated: 24,
        resourcesGenerated: 72,
        timeSavedHours: 18
      };
    }
  },

  // Increment stats on new generation
  incrementStats() {
    try {
      const stats = this.getStats();
      const updated = {
        lessonsCreated: stats.lessonsCreated + 1,
        resourcesGenerated: stats.resourcesGenerated + 3,
        timeSavedHours: stats.timeSavedHours + 1
      };
      localStorage.setItem(KEYS.STATS, JSON.stringify(updated));
      return updated;
    } catch (e) {
      console.error('Failed to update stats', e);
    }
  }
};
