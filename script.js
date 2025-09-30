// Tailwind Css Configuration
tailwind.config = {
  theme: {
    extend: {
      colors: {
        "spotify-dark": "#121212",
        "spotify-light-dark": "#181818",
        "spotify-sidebar": "#000000",
        "spotify-green": "#1DB954",
        "spotify-gray": "#b3b3b3",
        "spotify-hover": "#282828",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
};
// JavaScript for dynamic greeting and mobile responsiveness

document.addEventListener("DOMContentLoaded", () => {
  const greetingElement = document.getElementById("greeting");
  const mobileNav = document.getElementById("mobile-nav");
  const playerBar = document.getElementById("player-bar");

  // 1. Dynamic Greeting
  function setGreeting() {
    const now = new Date();
    const hour = now.getHours();
    let greeting;

    if (hour < 12) {
      greeting = "Good morning";
    } else if (hour < 18) {
      greeting = "Good afternoon";
    } else {
      greeting = "Good evening";
    }

    if (greetingElement) {
      greetingElement.textContent = greeting;
    }
  }

  setGreeting();

  // 2. Adjust main content padding for mobile bottom bar
  function adjustContentPadding() {
    const mainContent = document.getElementById("main-content");
    if (mainContent) {
      // Check if mobile nav is visible (lg:hidden means it's visible on smaller screens)
      const isMobileView = window.innerWidth < 1024; // Tailwind's lg breakpoint is 1024px

      if (isMobileView) {
        // Add padding equal to player bar height + mobile nav height for proper scrolling
        const playerHeight = playerBar ? playerBar.offsetHeight : 96;
        const navHeight = mobileNav ? mobileNav.offsetHeight : 64;
        const totalHeight = playerHeight + navHeight;
        mainContent.style.paddingBottom = `${totalHeight + 10}px`; // +10 for extra space
      } else {
        // Reset padding for desktop, only needs player bar height
        const playerHeight = playerBar ? playerBar.offsetHeight : 96;
        mainContent.style.paddingBottom = `${playerHeight + 10}px`;
      }
    }
  }

  // Set initial padding
  adjustContentPadding();
  // Recalculate padding on resize
  window.addEventListener("resize", adjustContentPadding);

  // 3. Simple Play/Pause toggle for the button
  const playPauseButton = document.querySelector(
    "#player-bar button:nth-child(3)"
  );
  const playPauseIcon = document.getElementById("play-pause-icon");
  let isPlaying = false;

  playPauseButton.addEventListener("click", () => {
    isPlaying = !isPlaying;
    if (isPlaying) {
      playPauseIcon.classList.remove("fa-play");
      playPauseIcon.classList.add("fa-pause");
    } else {
      playPauseIcon.classList.remove("fa-pause");
      playPauseIcon.classList.add("fa-play");
    }
  });
});
