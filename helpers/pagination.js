function paginate(currentPage, limit, count) {
  const totalPages = Math.ceil(count / limit);

  const paginationArr = [...Array(totalPages).keys()].map(item => item + 1);
  let paginationItems = [];
  const currentPageIndex = paginationArr.indexOf(currentPage);
  const maxLastPgItems = totalPages - 5;
  if (currentPage >= 5 && totalPages >= 5) {
    if (currentPage >= maxLastPgItems) {
      paginationItems = paginationArr.slice(
        maxLastPgItems,
        paginationArr[paginationArr.length - 1]
      );
    } else {
      paginationItems = paginationArr.slice(
        currentPageIndex,
        currentPageIndex + 5
      );
    }
  } else {
    paginationItems = paginationArr.slice(0, 5);
  }

  return {
    prevPage: currentPage - 1,
    nxPage: currentPage + 1,
    currentPage: currentPage,
    pages: totalPages,
    hasNextPage: limit * currentPage < count,
    hasPreviousPage: currentPage > 1,
    paginations: paginationItems,
  };
}

module.exports = paginate;
