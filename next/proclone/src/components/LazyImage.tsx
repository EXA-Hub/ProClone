"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface LazyImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

function useElementBoundaryObserver(
  rootmargin: string,
  thresholdValue: number
) {
  const ref = useRef<HTMLAnchorElement | null>(null); // We initialize a useRef to track our element.
  const [boundary, setBoundary] = useState<string>(""); // The boundary state will indicate whether the element is at the top or bottom of the viewport.

  useEffect(() => {
    const currentRef = ref.current;
    const observerOptions = {
      root: null, // root null means it's relative to the viewport.
      rootMargin: rootmargin,
      threshold: thresholdValue,
    };

    // Create a new IntersectionObserver instance.
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const rect = entry.boundingClientRect; // This provides the location of the observed element.

        // Here we check the position of the element and update the boundary state accordingly.
        if (rect.y <= 0) {
          entry.isIntersecting ? setBoundary("topIn") : setBoundary("topOut");
        } else if (
          rect.y <=
          (window.innerHeight || document.documentElement.clientHeight)
        ) {
          setBoundary("bottomIn");
        } else if (
          rect.y >=
          (window.innerHeight || document.documentElement.clientHeight)
        ) {
          setBoundary("bottomOut");
        }
      });
    }, observerOptions);

    // Start observing the current reference.
    if (currentRef) {
      observer.observe(currentRef);
    }

    // Make sure to unobserve the element on component unmount to avoid memory leaks.
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [rootmargin, thresholdValue]); // We add rootmargin and thresholdValue to the dependency array so the effect reruns when they change.

  return [ref, boundary] as const; // Return the ref and boundary state.
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  width,
  height,
  className,
}) => {
  const [ref, boundary] = useElementBoundaryObserver("0px", 0.1);
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (boundary === "bottomIn" && !loaded) {
      setLoaded(true);
    }
  }, [boundary, loaded]);

  return (
    <a ref={ref} className="full-width" key={alt}>
      {loaded && (
        <Image
          className={className}
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
        />
      )}
    </a>
  );
};

export default LazyImage;
