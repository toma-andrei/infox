import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const particles = (fps, interact, number) => {
  const particlesInit = async (main) => {
    await loadFull(main);
  };
  const particlesLoaded = (container) => {};

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        background: {
          color: {
            value: localStorage.getItem("background")
              ? localStorage.getItem("background")
              : "#208f8f",
          },
          opacity: 0,
        },
        fpsLimit: fps,
        interactivity: {
          events: {
            onClick: {
              enable: false,
              mode: "push",
            },
            onHover: {
              enable: interact,
              mode: "repulse",
            },
            resize: true,
          },
          modes: {
            push: {
              quantity: 4,
            },
            repulse: {
              distance: 70,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: "#ffffff",
          },
          links: {
            color: "#ffffff",
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1,
          },
          collisions: {
            enable: true,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: false,
            speed: 0.7,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 600,
            },
            value: 120,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 3, max: 7 },
          },
        },
        detectRetina: true,
      }}
    />
  );
};

export default particles;
