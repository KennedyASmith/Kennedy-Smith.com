
let shouldHidePortfolio = false;

$(document).ready(function() {
    setInterval(function() {
        $('.carousel').carousel('next');
    }, 2000);
});

document.getElementById("cards").onmousemove = e => {
  for(const card of document.getElementsByClassName("card")) {
    const rect = card.getBoundingClientRect(),
          x = e.clientX - rect.left,
          y = e.clientY - rect.top;

    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text)
    .then(() => {
      console.log('Text copied to clipboard');
    })
    .catch((error) => {
      console.error('Error copying text to clipboard:', error);
    });
}

function showHome() {
  shouldHidePortfolio = true;
  scrollToTop();
  document.getElementById("portfolioButton").classList.remove('active');
  document.getElementById("aboutMeButton").classList.add('active');

  document.getElementById("home").classList.remove("move-out");
  document.getElementById("home").classList.add("move-in");
  document.getElementById("portfolio").classList.remove("move-in");
  document.getElementById("portfolio").classList.add("move-out-left");
  setTimeout(function() {
    if(shouldHide){
        document.getElementById("portfolio").style.display = "none";
    }
  }, 800);
}

function showPortfolio() {
  shouldHidePortfolio = false;
  document.getElementById("aboutMeButton").classList.remove('active');
  document.getElementById("portfolioButton").classList.add('active');
  document.getElementById("portfolio").style.setProperty("display", "inherit");

  document.getElementById("home").classList.remove("move-in");
  document.getElementById("home").classList.add("move-out");
  document.getElementById("portfolio").classList.remove("move-out-left");
  document.getElementById("portfolio").classList.add("move-in");
  openPortfolio();
}


function scrollToTop() {
  const scrollDuration = 500; // Duration in milliseconds
  const scrollStep = -window.scrollY / (scrollDuration / 15);
  let scrollInterval = setInterval(function() {
    if (window.scrollY !== 0) {
      window.scrollBy(0, scrollStep);
    } else {
      clearInterval(scrollInterval);
    }
  }, 15);
}