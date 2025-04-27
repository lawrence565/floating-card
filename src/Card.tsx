import { useEffect, useRef, useState } from "react";
import avatar from "./assets/avatar.png";
import LinkedInIcon from "./assets/LinkedIn.svg";
import InstagramIcon from "./assets/Instagram.svg";
import MailIcon from "./assets/Mail.svg";
import GitHubIcon from "./assets/GitHub.svg";
import "./style/Card.css";

export default function Card() {
  const [rotate, setRotate] = useState({ beta: 0, gamma: 0 });
  const avatarRef = useRef<HTMLImageElement>(null);
  const [center, setCenter] = useState({ x: 90, y: 90 }); // 初始值先給個預設
  const [radius, setRadius] = useState(90); // 初始值先給個預設
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (avatarRef.current) {
      const rect = avatarRef.current.getBoundingClientRect();
      const rectWidth = avatarRef.current.offsetWidth;
      setCenter({
        x: rect.x,
        y: rect.y,
      });
      setRadius((rectWidth / 2) * 1.22);
    }
  }, [avatarRef.current]);

  useEffect(() => {
    let lastUpdate = Date.now();

    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.beta !== null && e.gamma !== null) {
        const now = Date.now();
        if (now - lastUpdate > 50) {
          // 降低更新頻率
          setRotate({ beta: e.beta, gamma: e.gamma });
          lastUpdate = now;
        }
      }
    };

    if (window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", handleOrientation);
    }

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, []);

  console.log(`X: ${center.x},Y: ${center.y}\nwidth: ${radius}`);

  return (
    <div
      className="card"
      style={{
        transform: `rotateX(${rotate.beta / 20}deg) rotateY(${
          rotate.gamma / 20
        }deg)`,
      }}
    >
      <div className="avatar-ring">
        <img src={avatar} className="avatar" ref={avatarRef} />
        <svg
          className="circular-text"
          viewBox="0 0 300 300"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            transform: isHovered ? "scale(1.1)" : "scale(1)",
          }}
        >
          <defs>
            <path
              id="circle"
              d={`M${radius},${radius} m-${radius},0
                  a${radius},${radius} 0 1,0 ${2 * radius},0
                  a${radius},${radius} 0 1,0 -${2 * radius},0`}
            />
            <filter
              id="text-shadow"
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              <feDropShadow
                dx="0"
                dy="0"
                stdDeviation="2"
                flood-color="#7f00ff"
              />
            </filter>
          </defs>
          <text textAnchor="middle" filter="url(#text-shadow)">
            <textPath href="#circle" startOffset="30%">
              Front End • Techolic • Engineer
            </textPath>
          </text>
        </svg>
      </div>
      <div className="social-icons">
        <a href="https://github.com/lawrence565">
          <img src={GitHubIcon} />
        </a>
        <a href="https://www.linkedin.com/in/jeremy-zheng-a699a2146/">
          <img src={LinkedInIcon} />
        </a>
        <a href="https://www.instagram.com/py___wuuuuuuuuuu/">
          <img src={InstagramIcon} />
        </a>
        <a href="mailto:lawrence891106@gmail.com">
          <img src={MailIcon} />
        </a>
      </div>
      <div className="info">
        <h1 className="c-name">
          吳秉耀 <span className="e-name"> Lawrence Wu</span>
        </h1>
        <p className="job-title">SDET @ SUPER 8 Studio</p>
        <p className="email">lawrence891106@gmail.com</p>
      </div>
    </div>
  );
}
