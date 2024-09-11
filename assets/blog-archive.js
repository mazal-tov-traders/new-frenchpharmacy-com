
  const blogDataEl = document.querySelector("[data-section='blogs']");
  const blogData = JSON.parse(blogDataEl.textContent);
  const blogsData = blogData.blogs;



const tagsWrappers = document.querySelectorAll(".tags-wrapper");
const moreBtns = document.querySelectorAll(".tag-toggle.more");
const lessBtns = document.querySelectorAll(".tag-toggle.less");

moreBtns.forEach(btn => {
  btn.addEventListener("click", () => {
      const tagsWrapper = btn.closest(".tags-wrapper");
      if (tagsWrapper) {
          tagsWrapper.classList.add("active");
      }
  });
});

lessBtns.forEach(btn => {
  btn.addEventListener("click", () => {
      const tagsWrapper = btn.closest(".tags-wrapper");
      if (tagsWrapper) {
          tagsWrapper.classList.remove("active");
      }
  });
});
