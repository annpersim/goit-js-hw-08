import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { galleryItems } from './gallery-items';

const galleryDiv = document.querySelector('.gallery');
const markupGallery = makeGalleryItemMarkup(galleryItems);
const galleryHtml = addGalleryToHtml(markupGallery, galleryDiv);
const lightboxGallery = createLightboxGallery('.gallery a');

galleryDiv.addEventListener('click', preventDefaultDownload);

function makeGalleryItemMarkup(galleryItems) {
  return galleryItems
    .map(({ original, preview, description }) => {
      return `<a class="gallery__item" href="${original}">
            <img
                class="gallery__image"
                src="${preview}"
                alt="${description}"
            />
        </a>`;
    })
    .join('');
}

function addGalleryToHtml(gallery, htmlElement) {
  htmlElement.innerHTML = gallery;
}

function preventDefaultDownload(event) {
  event.preventDefault();
}

function createLightboxGallery(className) {
  return new SimpleLightbox(className, {
    captionsData: 'alt',
    captionDelay: 250,
  });
}
