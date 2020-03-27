export const setValueCurrentPage = (previousPage, btn, maxPage) => {
  let page = 1;
  switch (btn) {
  case 'previous':
    if (previousPage > 1) {
      page = previousPage - 1;
    }
    break;
  case 'next':
    if (previousPage + 1 <= maxPage) {
      page = previousPage + 1;
    } else {
      page = previousPage;
    }
    break;
  }
  return page;
};

