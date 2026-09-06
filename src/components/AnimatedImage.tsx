import { useEffect, useRef, useState } from 'react';

interface AnimatedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
}

const AnimatedImage: React.FC<AnimatedImageProps> = ({ className, ...props }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the image is visible
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <img
      ref={ref}
      className={`transition-all duration-1000 ease-in-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'} ${className}`}
      {...props}
    />
  );
};

export default AnimatedImage;
