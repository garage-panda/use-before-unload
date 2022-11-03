import { useEffect, useState } from "react";

export interface UseBeforeUnloadProps {
  initEnable: boolean,
  onRefresh: () => void,
  onCancel: () => void,
};

const storageKeys = {
  WAS_ABOUT_TO_CLOSE_BROWSER: '@garagePanda/was-about-to-close-browser',
  WILL_REFRESH: '@garagePanda/will-refresh',
};

export const useBeforeUnload = ({initEnable, onRefresh, onCancel}: UseBeforeUnloadProps) => {
  const [enabled, setEnabled] = useState(initEnable);
  
  const userWasAboutToLeaveThePage = (): boolean => {
    return !!sessionStorage.getItem(storageKeys.WAS_ABOUT_TO_CLOSE_BROWSER);
  };

  const willRefresh = (): boolean => {
    return !!sessionStorage.getItem(storageKeys.WILL_REFRESH);
  }

  const handleBeforeUnload = (e: BeforeUnloadEvent) => {
    sessionStorage.setItem(storageKeys.WAS_ABOUT_TO_CLOSE_BROWSER, 'true');
    sessionStorage.setItem(storageKeys.WILL_REFRESH, 'true');
    e.preventDefault();
    e.returnValue = '';
  };

  const handleFocus = () => {
    if (userWasAboutToLeaveThePage()) {
      setTimeout(() => {
        onCancel();
        sessionStorage.removeItem(storageKeys.WAS_ABOUT_TO_CLOSE_BROWSER);
      }, 1000);
    }
  };

  const setEnabledBeforeUnload = (enabled: boolean) => {
    setEnabled(enabled);
  };

  useEffect(() => {
    if (enabled) {
      window.addEventListener('beforeunload', handleBeforeUnload);
      window.addEventListener('focus', handleFocus);
    }

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('focus', handleFocus);
    };
  }, [enabled]);

  useEffect(() => {
    if (willRefresh()) {
      onRefresh();
      sessionStorage.removeItem(storageKeys.WILL_REFRESH);
    }
  }, []);

  return setEnabledBeforeUnload;
};