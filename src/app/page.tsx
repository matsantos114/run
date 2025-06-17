// pages/page.tsx
"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

interface LocationData {
  latitude: number;
  longitude: number;
}

const Page: React.FC = () => {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (err) => {
        setError(err.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Running Tracker</h1>

      {error && <p className={styles.error}>Error: {error}</p>}

      {location ? (
        <div className={styles.metrics}>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
          {/* Add more metrics here */}
        </div>
      ) : (
        <p>Tracking your run...</p>
      )}

      {/* Add more components like Start/Stop buttons, Maps, etc. */}
    </div>
  );
};

export default Page;
