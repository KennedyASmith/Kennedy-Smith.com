

// Set the value of portfolioEntries
let portfolioEntries = null;
let initialized = true;

// Function to populate the portfolio slides
function populateSlides(portfolioEntries) {
    const slider = document.querySelector('.slider');

    portfolioEntries.slice(-7).forEach(entry => {
        const { image, name, modalContent } = entry;
        const slide = createSlide(image, name, modalContent);

        // Add event listeners for hover effect on slide elements

        slide.addEventListener('mouseenter', () => {
            slide.classList.add('hovered');
        });

        slide.addEventListener('mouseleave', () => {
            slide.classList.remove('hovered');
        });

        slider.appendChild(slide);
    });
}

// Function to populate the portfolio rows
function populateRows(portfolioEntries) {
    const portfolioRow1 = document.getElementById('portfolio-row-1');
    const portfolioRow2 = document.getElementById('portfolio-row-2');
    const portfolioRow3 = document.getElementById('portfolio-row-3');

    portfolioEntries.forEach((entry, index) => {
        const { image, name, modalContent } = entry;
        const portfolioItem = createPortfolioItem(image, name, modalContent);

        if (index < 4) {
            portfolioRow1.appendChild(portfolioItem);
        } else if (index < 8) {
            portfolioRow2.appendChild(portfolioItem);
        } else {
            portfolioRow3.appendChild(portfolioItem);
        }
    });
}

// Function to create a portfolio slide element
function createSlide(imageSrc, projectName, modalContent) {
    const slide = document.createElement('div');
    slide.classList.add('slide');

    const item = document.createElement('div');
    item.classList.add('item');
    item.setAttribute('data-project', projectName);

    const img = document.createElement('img');
    img.src = imageSrc;
    img.draggable = false;
    img.alt = '';

    const p = document.createElement('p');
    const spanProjectName = document.createElement('span');
    spanProjectName.classList.add('projectName');
    spanProjectName.textContent = projectName;

    const spanLearnMore = document.createElement('span');
    spanLearnMore.classList.add('learn-more');
    spanLearnMore.innerHTML = 'Learn More &rarr;';

    p.appendChild(spanProjectName);
    p.appendChild(spanLearnMore);

    item.appendChild(img);
    item.appendChild(p);
    slide.appendChild(item);

    // Add click event listener to open modal
    item.addEventListener('click', () => {
        openModal(projectName, modalContent);
    });

    return slide;
}

// Function to create a portfolio item element
function createPortfolioItem(imageSrc, projectName, modalContent) {
    const colDiv = document.createElement('div');
    colDiv.classList.add('col-lg-3');

    const itemDiv = document.createElement('div');
    itemDiv.classList.add('item', 'mb-item', 'p-0');

    const img = document.createElement('img');
    img.src = imageSrc;
    img.draggable = false;
    img.alt = '';

    const p = document.createElement('p');
    const spanProjectName = document.createElement('span');
    spanProjectName.classList.add('projectName');
    spanProjectName.textContent = projectName;

    const spanLearnMore = document.createElement('span');
    spanLearnMore.classList.add('learn-more');
    spanLearnMore.innerHTML = 'Learn More &rarr;';

    p.appendChild(spanProjectName);
    p.appendChild(spanLearnMore);

    itemDiv.appendChild(img);
    itemDiv.appendChild(p);

    colDiv.appendChild(itemDiv);

    // Add click event listener to open modal
    itemDiv.addEventListener('click', () => {
        openModal(projectName, modalContent);
    });

    return colDiv;
}

// Function to open the modal
function openModal(projectName, modalContent) {
    // Create the modal element
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
        <div class="modal-dialog modal-lg" id="portfolioModal" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="portfolioModalLabel">${projectName}</h5>
                                <button type="button" class="btn-close btn-close-white close" data-dismiss="modal" aria-label="Close">
                                </button>
                            </div>
                            <div class="modal-body">
                                ${modalContent}
                            </div>
                        </div>
                    </div>
    `;

    // Append the modal to the body
    document.body.appendChild(modal);

    // Initialize the Bootstrap modal
    const bootstrapModal = new bootstrap.Modal(modal);
    bootstrapModal.show();

    // Add event listener to the close button
    const closeButton = modal.querySelector('.close');
    closeButton.addEventListener('click', () => {
        bootstrapModal.hide();
    });

    // Remove the modal from the DOM after it's closed
    modal.addEventListener('hidden.bs.modal', () => {
        document.body.removeChild(modal);
    });
}

// Function to check if an element is in the viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

  // Calculate the minimum required visibility percentage for half of the element
  const requiredVisibility = 0.50; // 50% of the element needs to be visible

  // Calculate the visible width and height of the element
  const visibleWidth = Math.min(rect.right, viewportWidth) - Math.max(rect.left, 0);
  const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);

  // Calculate the visibility percentage
  const visibilityPercentage = (visibleWidth * visibleHeight) / (rect.width * rect.height);

  // Return true if the visibility percentage is greater than or equal to the required visibility
  return visibilityPercentage >= requiredVisibility;
}

// Function to add fade-in class to rows in viewport
function addFadeInClassToRows() {
  const rows = document.querySelectorAll('.row');
  rows.forEach(row => {
    if (isInViewport(row)) {
      row.classList.remove('fade-out');
      row.classList.add('fade-in');
    }else {
      row.classList.remove('fade-in');
      row.classList.add('fade-out');
    }
  });
}

function openPage(){
    if(portfolioEntries == null){
     fetch('portfolio_entries.json')
        .then(response => response.json())
        .then(data => {
            // Set the value of portfolioEntries
            portfolioEntries = data;

            // Call the populateSlides and populateRows functions
            populateSlides(portfolioEntries);
            populateRows(portfolioEntries);
            addFadeInClassToRows();

            // Add the script after the portfolio entries are populated
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.innerHTML = `
                $('.center').slick({
                    centerMode: true,
                    centerPadding: '60px',
                    slidesToShow: 3,
                    dots: true,
                    responsive: [
                        {
                            breakpoint: 768,
                            settings: {
                                arrows: true,
                                centerMode: false,
                                centerPadding: '40px',
                                slidesToShow: 3
                            }
                        },
                        {
                            breakpoint: 480,
                            settings: {
                                arrows: true,
                                centerMode: true,
                                centerPadding: '40px',
                                slidesToShow: 1
                            }
                        }
                    ]
                });

                const sliders = document.querySelectorAll('.slideFromAbove');
                            sliders.forEach(slider => {
                              slider.classList.add('show');
                            });
            `;

            // Append the script to the document body
            document.body.appendChild(script);
        })
        .catch(error => console.error('Error fetching portfolio entries:', error));
    }else{
        // Call the populateSlides and populateRows functions
        addFadeInClassToRows();
    }


}


function isPageFullyScrolled() {
  return (window.innerHeight + window.scrollY) >= document.body.offsetHeight;
}

// Add event listener for scroll to trigger the fade-in effect
window.addEventListener('scroll', addFadeInClassToRows);



