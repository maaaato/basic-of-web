import * as fn from "./util/quiz";
import { XMLHttpRequest } from "xmlhttprequest-ts";

// Quiz.1
export const writeDataInLocal = (data: string): Boolean => {
  try {
    fn.FileManager.saveInLocal(data);
    return true;
  } catch (error) {
    return false;
  }
};

// Quiz.2
export const fetchURL = (url: string): Promise<string> => {
  return new Promise((resolve, reject): void => {
    const req = new XMLHttpRequest();
    req.onloadend = () => {
      if (200 <= req.status && req.status < 300) {
        resolve(JSON.parse(req.responseText));
      } else {
        reject(new Error(JSON.parse(req.statusText)));
      }
    };
    req.onerror = () => {
      reject(new Error(JSON.parse(req.statusText)));
    };
    req.open("GET", url, true);
    req.send(null);
  });
};

// Quiz.3
export const newConfig = (path: string): fn.Config => {
  const config = new fn.Config();
  config.load(path);
  return config;
};
