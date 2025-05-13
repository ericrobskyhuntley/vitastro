import { Previewer } from 'pagedjs';

document.addEventListener("DOMContentLoaded", () => {
  const paged = new Previewer();
  paged.preview(document.body);
});