function paginate(currentPage, limit, count) {
  const totalPages = Math.ceil(count / limit);

  let paginations = [...Array(totalPages).keys()].map(item => item + 1);

  const currentPageIndex = paginations.indexOf(currentPage);

  if (currentPage >= 5) {
    paginations = paginations.slice(currentPageIndex, currentPage + 4);
  } else {
    paginations = paginations.slice(0, 5);
  }

  return {
    prevPage: currentPage - 1,
    nxPage: currentPage + 1,
    currentPage: currentPage,
    pages: totalPages,
    hasNextPage: limit * currentPage < count,
    hasPreviousPage: currentPage > 1,
    paginations,
  };
}

module.exports = paginate;
