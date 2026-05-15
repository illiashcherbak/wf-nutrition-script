/**
 * NutriHealth — All Resources Page
 * Shows/hides the "not found" message when CMS Filter returns empty results.
 * Dependencies: Finsweet CMS Filter (loaded via Webflow)
 */

// #region Empty state — toggle .not-found based on filtered results
(function initEmptyState() {
  const notFound = document.querySelector(".not-found");
  if (!notFound) return;

  const LIST_SELECTOR = ".blog__list";

  function updateNotFound() {
    const list = document.querySelector(LIST_SELECTOR);
    if (!list) return;
    notFound.style.display = list.children.length === 0 ? "flex" : "none";
  }

  // Finsweet Attributes callback — fires after filter is initialized
  window.fsAttributes = window.fsAttributes || [];
  window.fsAttributes.push([
    "cmsfilter",
    (filterInstances) => {
      updateNotFound();

      // Re-check on every filter render (search, category change, reset)
      filterInstances[0].listInstance.on("renderitems", () => {
        updateNotFound();
      });
    },
  ]);

  // Fallback: initial check in case FS loads before this script
  updateNotFound();
})();
// #endregion
