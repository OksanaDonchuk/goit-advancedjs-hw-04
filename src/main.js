import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchPost } from './js/get-img';

const RES_PER_PAGE = 40;

const formSearch = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const divObserver = document.querySelector('.observer');
const endPage = document.querySelector('.end-page');

const lightbox = new SimpleLightbox('.gallery a');
const observer = new IntersectionObserver(observerAction, {
  rootMargin: '1000px',
});

endPage.classList.add('is-hidden');

formSearch.addEventListener('submit', onSubmit);

let currentPage;
let currentQuery;

function onSubmit(event) {
  event.preventDefault();
  const query = event.currentTarget.elements.searchQuery.value.trim();
  if (!query) {
    iziToast.show({
      message: 'Enter the value to search for.',
      position: 'topRight',
      color: '#FCE8E6',
    });
    return;
  }

  currentPage = 0;
  currentQuery = query;
  gallery.innerHTML = '';
  observer.observe(divObserver);
}

async function observerAction(entries) {
  entries.forEach(async entry => {
    if (entry.isIntersecting) {
      currentPage += 1;
      const newMarkup = await createMarkup(currentQuery, currentPage);
      if (newMarkup) {
        gallery.insertAdjacentHTML('beforeend', newMarkup);
        lightbox.refresh();
      }
    }
  });
}

async function createMarkup(query, pageNumber = 1) {
  try {
    endPage.classList.add('is-hidden');
    const data = await fetchPost(query, pageNumber, RES_PER_PAGE);

    if (!data.totalHits) {
      iziToast.show({
        message:
          'Sorry, there are no images matching your search query. Please try again.',
        position: 'topRight',
        color: '#FCE8E6',
      });
      observer.disconnect();
      return '';
    }
    if (pageNumber === 1) {
      iziToast.show({
        message: `Hooray! We found ${data.totalHits} images.`,
        position: 'topRight',
        color: '#E6FCED',
      });
    }
    if (data.totalHits <= pageNumber * RES_PER_PAGE) {
      observer.disconnect();
      endPage.classList.remove('is-hidden');
    }

    return data.hits
      .map(
        ({
          largeImageURL,
          webformatURL,
          tags,
          likes,
          views,
          comments,
          downloads,
        }) => {
          return `
                <a class="gallery__item" href="${largeImageURL}">
                  <div class="photo-card">
                      <img src="${webformatURL}" alt="${tags}" loading="lazy" />
                      <div class="info">
                        <p class="info-item"><b>Likes</b> ${likes}</p>
                        <p class="info-item"><b>Views</b> ${views}</p>
                        <p class="info-item"><b>Comments</b> ${comments}</p>
                        <p class="info-item"><b>Downloads</b> ${downloads}</p>
                      </div>
                    </div>
                 </a>`;
        }
      )
      .join('');
  } catch (err) {
    console.dir(err);
    iziToast.error({ message: err.message });
    observer.disconnect();
  }
}
